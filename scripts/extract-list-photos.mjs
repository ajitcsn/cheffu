import fs from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["data.js", "catalog-expansion.js", "recipe-photos.js"]) {
  vm.runInContext(fs.readFileSync(new URL(file, root), "utf8"), sandbox);
}

const recipes = sandbox.window.CHEFFU_DATA.recipes;
const photos = sandbox.window.CHEFFU_RECIPE_PHOTOS || {};
const outputPath = new URL("recipe-photos.js", root);
const removable = new Set([
  "andhra", "arunachal", "assamese", "bengali", "bihari", "chhattisgarhi", "goan", "gujarati", "haryanvi",
  "himachali", "jharkhand", "karnataka", "kashmiri", "kerala", "malwa", "maharashtrian", "manipuri",
  "meghalaya", "mizo", "naga", "odia", "punjabi", "rajasthani", "sikkim", "tamil", "telangana",
  "tripura", "uttarakhand", "simple", "basic", "quick", "easy", "style", "home", "classic", "bowl", "plate"
]);
const blockedFileWords = /\b(map|flag|logo|chemical|structure|diagram|portrait|temple|lake|river|landscape|district|locator|comic|convention|hybrid|crop|field|mádl)\b/i;
const identityWords = new Set(["fish", "chicken", "egg", "paneer", "mutton", "lamb", "pork", "beef", "prawn", "shrimp", "tofu", "soya", "soy", "tempeh", "tamago"]);

function singular(token) {
  if (token.endsWith("ies") && token.length > 4) return `${token.slice(0, -3)}y`;
  if (token.endsWith("s") && !token.endsWith("ss") && token.length > 4) return token.slice(0, -1);
  return token;
}

function tokens(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter(Boolean).map(singular).filter((word) => !removable.has(word));
}

function plainText(html) {
  return html.replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, number) => String.fromCharCode(Number(number))).replace(/\s+/g, " ").trim();
}

function largeThumbnail(url) {
  const absolute = url.startsWith("//") ? `https:${url}` : url;
  return absolute.replace(/\/\d+px-/, "/960px-").replace(/&amp;/g, "&").replace(/\?.*$/, "");
}

function candidateScore(recipe, dishName) {
  const recipeTokens = tokens(recipe.name);
  const dishTokens = tokens(dishName);
  if (!recipeTokens.length || !dishTokens.length) return 0;
  const dishSet = new Set(dishTokens);
  const requiredIdentity = recipeTokens.filter((word) => identityWords.has(word));
  if (requiredIdentity.length && !requiredIdentity.some((word) => dishSet.has(word))) return 0;
  const overlap = recipeTokens.filter((word) => dishSet.has(word)).length;
  const required = Math.min(2, Math.min(recipeTokens.length, dishTokens.length));
  if (overlap < required) return 0;
  const recipePhrase = recipeTokens.join(" ");
  const dishPhrase = dishTokens.join(" ");
  const exact = recipePhrase.includes(dishPhrase) || dishPhrase.includes(recipePhrase);
  return overlap * 10 + (exact ? 25 : 0) - Math.abs(recipeTokens.length - dishTokens.length);
}

const listPages = [
  "List_of_Indian_dishes", "List_of_breakfast_foods", "List_of_egg_dishes", "List_of_rice_dishes",
  "List_of_legume_dishes", "List_of_pasta_dishes", "List_of_chicken_dishes", "List_of_soups",
  "List_of_salads", "List_of_breads", "List_of_sandwiches", "List_of_noodle_dishes",
  "List_of_desserts", "List_of_cakes", "List_of_pastries", "List_of_Italian_dishes"
];
const candidates = [];
for (const page of listPages) {
  const response = await fetch(`https://en.wikipedia.org/api/rest_v1/page/html/${page}`, {
    headers: { "User-Agent": "CheffuRoadmap/1.0 (local prototype; Wikimedia photo sourcing)" }
  });
  if (!response.ok) {
    console.warn(`Skipped ${page}: ${response.status}`);
    continue;
  }
  const html = await response.text();
  candidates.push(...[...html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)].flatMap((match) => {
    const row = match[1];
    const image = row.match(/<img\b[^>]*src="([^"]+)"[^>]*>/i);
    if (!image || /\.svg(?:\.|\/|\?)/i.test(image[1])) return [];
    const cells = [...row.matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map((cell) => plainText(cell[1])).filter(Boolean);
    const dishName = cells[0];
    if (!dishName) return [];
    const fileName = decodeURIComponent(image[1].split("/").pop().replace(/^\d+px-/, "").replace(/\?.*$/, "").replace(/&amp;.*$/, ""));
    return [{ dishName, fileName, url: largeThumbnail(image[1]) }];
  }));
  await new Promise((resolve) => setTimeout(resolve, 600));
}

for (const [recipeId, photo] of Object.entries(photos)) {
  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe || blockedFileWords.test(photo.title)) {
    delete photos[recipeId];
    continue;
  }
  const recipeTokens = tokens(recipe.name);
  const titleTokens = new Set(tokens(photo.title));
  const requiredIdentity = recipeTokens.filter((word) => identityWords.has(word));
  if (requiredIdentity.length && !requiredIdentity.some((word) => titleTokens.has(word))) delete photos[recipeId];
}

let added = 0;
for (const recipe of recipes) {
  if (recipe.photo || photos[recipe.id]) continue;
  const ranked = candidates.map((candidate) => ({ ...candidate, score: candidateScore(recipe, candidate.dishName) }))
    .filter((candidate) => candidate.score > 0).sort((a, b) => b.score - a.score);
  const match = ranked[0];
  if (!match) continue;
  photos[recipe.id] = {
    url: match.url,
    page: `https://commons.wikimedia.org/wiki/${encodeURIComponent(`File:${match.fileName}`.replaceAll(" ", "_"))}`,
    title: match.fileName
  };
  added += 1;
}

const sorted = Object.fromEntries(Object.entries(photos).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(outputPath, `/* Generated from Wikimedia Commons-linked Wikipedia page images. Re-run scripts/fetch-wikimedia-photos.mjs to refresh. */\nwindow.CHEFFU_RECIPE_PHOTOS = ${JSON.stringify(sorted, null, 2)};\n`);
console.log(`Added ${added} curated-list photos; ${Object.keys(sorted).length} generated mappings total.`);
