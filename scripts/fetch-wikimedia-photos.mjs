import fs from "node:fs";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["data.js", "catalog-expansion.js"]) {
  vm.runInContext(fs.readFileSync(new URL(file, root), "utf8"), sandbox);
}

const recipes = sandbox.window.CHEFFU_DATA.recipes;
const outputPath = new URL("recipe-photos.js", root);
const existing = fs.existsSync(outputPath)
  ? vm.runInNewContext(`${fs.readFileSync(outputPath, "utf8")}; window.CHEFFU_RECIPE_PHOTOS`, { window: {} }) || {}
  : {};

const aliases = {
  "creatine-water": "glass of drinking water",
  "wash-rice": "washing rice",
  "boil-milk": "hot milk",
  "salt-water": "glass salt water",
  "catalog-cocoa-milk": "chocolate milk",
  "catalog-basic-protein-shake": "protein shake",
  "catalog-electrolyte-lime-water": "lime water drink",
  "catalog-curd-rice-bowl": "curd rice",
  "catalog-sikkim-vegetable-momos": "momo food",
  "catalog-moroccan-chickpea-tagine": "chickpea tagine",
  "catalog-telangana-sarva-pindi": "sarva pindi"
};

const removableWords = new Set([
  "andhra", "arunachal", "assamese", "bengali", "bihari", "chhattisgarhi", "goan", "gujarati",
  "haryanvi", "himachali", "jharkhand", "karnataka", "kashmiri", "kerala", "madhya", "maharashtrian",
  "malwa", "manipuri", "meghalaya", "mizo", "naga", "odia", "punjabi", "rajasthani", "sikkim",
  "tamil", "telangana", "tripura", "uttarakhand", "marathi", "kannada", "tamilnadu", "up",
  "moroccan", "spanish", "greek", "chinese", "japanese", "korean", "vietnamese", "thai", "brazilian",
  "filipino", "nepali", "sri", "lankan", "simple", "basic", "quick", "easy", "style", "home",
  "homestyle", "classic", "engineer", "high", "protein", "one", "pot", "bowl", "plate", "cup",
  "vegetable", "vegetarian", "plain", "starter", "cooker", "version", "mini", "everyday"
]);

const blockedImageWords = /\b(map|flag|logo|coat of arms|chemical|structure|diagram|portrait|temple|lake|river|landscape|district|locator|comic|convention|hybrid|crop|field|mádl)\b/i;
const identityWords = new Set(["fish", "chicken", "egg", "paneer", "mutton", "lamb", "pork", "beef", "prawn", "shrimp", "tofu", "soya", "soy"]);

function singular(token) {
  if (token.endsWith("ies") && token.length > 4) return `${token.slice(0, -3)}y`;
  if (token.endsWith("oes") && token.length > 4) return token.slice(0, -2);
  if (token.endsWith("s") && !token.endsWith("ss") && token.length > 4) return token.slice(0, -1);
  return token;
}

function tokens(value) {
  return String(value).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter(Boolean).map(singular);
}

function searchName(recipe) {
  if (aliases[recipe.id]) return aliases[recipe.id];
  const useful = tokens(recipe.name).filter((word) => !removableWords.has(word));
  return useful.length ? useful.join(" ") : recipe.name;
}

function scoreCandidate(query, candidate, order) {
  if (blockedImageWords.test(candidate.title) || blockedImageWords.test(candidate.pageimage || "")) return -100;
  const queryTokens = new Set(tokens(query));
  const candidateTokens = new Set(tokens(candidate.title));
  let overlap = 0;
  queryTokens.forEach((token) => { if (candidateTokens.has(token)) overlap += 1; });
  const normalizedQuery = [...queryTokens].join(" ");
  const normalizedTitle = [...candidateTokens].join(" ");
  const phraseBonus = normalizedTitle.includes(normalizedQuery) || normalizedQuery.includes(normalizedTitle) ? 12 : 0;
  return overlap * 6 + phraseBonus - order * 0.15;
}

function imageMatches(query, fileTitle) {
  if (!fileTitle || blockedImageWords.test(fileTitle) || /(?:bai[_ ]ling|new[_ ]tehri)/i.test(fileTitle)) return false;
  const queryTokens = new Set(tokens(query));
  const titleTokens = new Set(tokens(fileTitle.replace(/^File:/, "")));
  const requiredIdentity = [...queryTokens].filter((token) => identityWords.has(token));
  if (requiredIdentity.length && !requiredIdentity.some((token) => titleTokens.has(token))) return false;
  return [...queryTokens].some((token) => titleTokens.has(token));
}

function largeThumbnail(url) {
  const absolute = url.startsWith("//") ? `https:${url}` : url;
  return absolute.replace(/\/\d+px-/, "/960px-").replace(/\?.*$/, "");
}

async function getJson(url, attempt = 0) {
  const response = await fetch(url, { headers: { "User-Agent": "CheffuRoadmap/1.0 (local prototype; Wikimedia photo sourcing)" } });
  if (response.status === 429 && attempt < 5) {
    await new Promise((resolve) => setTimeout(resolve, 2500 * (attempt + 1)));
    return getJson(url, attempt + 1);
  }
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  return response.json();
}

async function wikipediaPhoto(recipe) {
  const query = searchName(recipe);
  const params = new URLSearchParams({ q: query, limit: "8" });
  const data = await getJson(`https://en.wikipedia.org/w/rest.php/v1/search/page?${params}`);
  const candidates = (data.pages || [])
    .filter((page) => page.thumbnail?.url)
    .map((page, order) => {
      const rawTitle = decodeURIComponent(page.thumbnail.url.split("/").pop().replace(/^\d+px-/, "").replace(/\?.*$/, ""));
      return { ...page, fileTitle: rawTitle, order, score: scoreCandidate(query, page, order) };
    })
    .filter((page) => page.score > 0 && imageMatches(query, page.fileTitle))
    .sort((a, b) => b.score - a.score);
  const chosen = candidates[0];
  if (!chosen) return null;

  const fileTitle = `File:${chosen.fileTitle}`;
  const sourceUrl = largeThumbnail(chosen.thumbnail.url);
  if (/\.svg(?:\/|\?)/i.test(sourceUrl)) return null;
  return {
    url: sourceUrl.replace(/\?.*$/, ""),
    page: `https://commons.wikimedia.org/wiki/${encodeURIComponent(fileTitle.replaceAll(" ", "_"))}`,
    title: fileTitle.replace(/^File:/, "")
  };
}

let added = 0;
let missed = 0;
for (const [recipeId, photo] of Object.entries(existing)) {
  const recipe = recipes.find((item) => item.id === recipeId);
  if (!recipe || !imageMatches(searchName(recipe), photo.title)) delete existing[recipeId];
}
if (process.argv.includes("--sanitize-only")) {
  const sanitized = Object.fromEntries(Object.entries(existing).sort(([a], [b]) => a.localeCompare(b)));
  fs.writeFileSync(outputPath, `/* Generated from Wikimedia Commons-linked Wikipedia page images. Re-run scripts/fetch-wikimedia-photos.mjs to refresh. */\nwindow.CHEFFU_RECIPE_PHOTOS = ${JSON.stringify(sanitized, null, 2)};\n`);
  console.log(`Sanitized ${Object.keys(sanitized).length} generated photo mappings.`);
  process.exit(0);
}
for (const [index, recipe] of recipes.entries()) {
  if (recipe.photo || existing[recipe.id]) continue;
  try {
    const photo = await wikipediaPhoto(recipe);
    if (photo) {
      existing[recipe.id] = photo;
      added += 1;
    } else {
      missed += 1;
    }
  } catch (error) {
    missed += 1;
    process.stderr.write(`\n${recipe.name}: ${error.message}\n`);
  }
  if ((index + 1) % 20 === 0) {
    const checkpoint = Object.fromEntries(Object.entries(existing).sort(([a], [b]) => a.localeCompare(b)));
    fs.writeFileSync(outputPath, `/* Generated from Wikimedia Commons-linked Wikipedia page images. Re-run scripts/fetch-wikimedia-photos.mjs to refresh. */\nwindow.CHEFFU_RECIPE_PHOTOS = ${JSON.stringify(checkpoint, null, 2)};\n`);
    process.stdout.write(` ${index + 1}/${recipes.length}`);
  }
  await new Promise((resolve) => setTimeout(resolve, 1300));
}

const sorted = Object.fromEntries(Object.entries(existing).sort(([a], [b]) => a.localeCompare(b)));
const source = `/* Generated from Wikimedia Commons-linked Wikipedia page images. Re-run scripts/fetch-wikimedia-photos.mjs to refresh. */\nwindow.CHEFFU_RECIPE_PHOTOS = ${JSON.stringify(sorted, null, 2)};\n`;
fs.writeFileSync(outputPath, source);
console.log(`\nAdded ${added} photos; ${missed} unmatched; ${Object.keys(sorted).length} generated mappings total.`);
