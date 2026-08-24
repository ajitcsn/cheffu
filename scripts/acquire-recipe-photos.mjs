import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "assets", "recipes");
const searchCachePath = path.join(root, "assets", "recipe-search-cache.json");
const photoMapPath = path.join(root, "recipe-photos.js");
const manifestPath = path.join(outputDir, "manifest.json");
const dryRun = process.argv.includes("--dry-run");

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["data.js", "catalog-expansion.js"]) {
  vm.runInContext(await fs.readFile(path.join(root, file), "utf8"), sandbox, { filename: file });
}
const recipes = sandbox.window.CHEFFU_DATA.recipes;

const aliases = {
  "nimbu-pani": "Indian nimbu pani lemonade",
  "banana-badam-milkshake": "banana milkshake",
  "curd-peanut-bowl": "yogurt peanut bowl",
  "plain-rice": "cooked white rice",
  "sambar": "sambar",
  "moong-khichdi": "moong dal khichdi food",
  "paratha": "plain paratha",
  "uttapam": "uttapam",
  "balanced-thali": "Indian thali",
  "sambar-meal": "South Indian sambar meal",
  "ragi-meal": "ragi mudde",
  "wash-rice": "rinsing rice in bowl",
  "boil-milk": "boiled milk saucepan",
  "salt-water": "salt water drink",
  "catalog-cocoa-milk": "chocolate milk",
  "catalog-cucumber-paneer-bowl": "paneer cucumber salad",
  "catalog-plain-sweet-lassi": "sweet lassi",
  "catalog-sattu-cooler": "sattu drink",
  "catalog-ragi-malt": "ragi drink",
  "catalog-kala-chana-salad": "black chickpea salad",
  "catalog-hung-curd-sandwich": "yogurt sandwich",
  "catalog-boiled-potato-chaat": "aloo chaat",
  "catalog-chhattisgarhi-chila": "rice cheela",
  "catalog-haryanvi-bajra-khichdi": "bajra khichdi food",
  "catalog-himachali-chana-madra": "chana madra",
  "catalog-jharkhand-dhuska-with-ghugni": "dhuska",
  "catalog-malwa-bhutte-ka-kees": "bhutte ka kees food",
  "catalog-mizo-vegetable-bai": "Mizoram bai food",
  "catalog-rajasthani-panchmel-dal": "panchratna dal",
  "catalog-tamil-ven-pongal-bowl": "ven pongal",
  "catalog-telangana-sarva-pindi": "sarvapindi",
  "catalog-up-vegetable-tehri": "tehri rice",
  "catalog-uttarakhand-kafuli": "kafuli food",
  "catalog-oats-idli": "oats idli food",
  "catalog-arisi-paruppu-sadam": "arisi paruppu sadam food",
  "catalog-vatha-kuzhambu": "vathal kuzhambu",
  "catalog-keerai-masiyal": "keerai masiyal food",
  "catalog-koshambari": "kosambari",
  "catalog-green-gram-sundal": "moong sundal",
  "catalog-kala-chana-sundal": "chana sundal",
  "catalog-kerala-vegetable-stew": "appam vegetable stew",
  "catalog-lauki-tomato-sabzi": "lauki sabzi",
  "catalog-cabbage-peas-sabzi": "cabbage peas curry",
  "catalog-carrot-beans-sabzi": "carrot beans poriyal",
  "catalog-bharwa-capsicum": "stuffed capsicum Indian",
  "catalog-stovetop-paneer-tikka": "paneer tikka",
  "catalog-tofu-bhurji": "tofu scramble",
  "catalog-soya-vegetable-pulao": "soya pulao",
  "catalog-rajma-rice-bowl": "rajma chawal",
  "catalog-chole-rice-bowl": "chole chawal",
  "catalog-masala-vegetable-khichdi": "vegetable khichdi",
  "catalog-bajra-moong-khichdi": "bajra khichdi",
  "catalog-dalia-vegetable-khichdi": "dalia khichdi",
  "catalog-phulka": "chapati",
  "catalog-besan-chilla": "besan cheela",
  "catalog-moong-dal-chilla": "moong cheela",
  "catalog-kanda-batata-poha": "batata poha",
  "catalog-paneer-tikka-wrap": "paneer wrap",
  "catalog-fruit-curd-bowl": "fruit yogurt bowl",
  "catalog-microwave-sweet-potato-chaat": "sweet potato chaat",
  "catalog-andhra-pesarattu-upma-plate": "pesarattu upma",
  "catalog-arunachal-vegetable-thukpa": "vegetable thukpa",
  "catalog-assamese-masor-tenga": "masor tenga",
  "catalog-haryanvi-bajra-khichdi": "bajra khichdi",
  "catalog-jharkhand-dhuska-with-ghugni": "dhuska ghugni",
  "catalog-kerala-appam-vegetable-stew": "appam vegetable stew",
  "catalog-malwa-bhutte-ka-kees": "bhutte ka kees",
  "catalog-meghalaya-jadoh": "jadoh",
  "catalog-naga-smoked-pork-with-axone": "smoked pork axone",
  "catalog-sikkim-vegetable-momos": "vegetable momos",
  "catalog-tripura-chakhwi": "chakhwi",
  "catalog-up-vegetable-tehri": "vegetable tehri",
  "catalog-curd-rice-with-roasted-peanuts": "curd rice peanuts",
  "catalog-soy-keema-pav": "vegetarian keema pav",
  "catalog-chickpea-paneer-salad": "paneer chickpea salad",
  "catalog-one-pot-chicken-pulao": "chicken pulao",
  "catalog-chicken-saag": "saag chicken",
  "catalog-bengali-chicken-bhuna-khichuri": "chicken bhuna khichuri",
  "catalog-andhra-kodi-pulao": "kodi pulao",
  "catalog-tamil-meen-kuzhambu-rice": "meen kuzhambu rice",
  "catalog-amritsari-fish-tikka-wrap": "fish tikka wrap",
  "catalog-mumbai-chicken-tikka-toastie": "chicken tikka sandwich food",
  "catalog-kashmiri-chicken-yakhni": "chicken yakhni",
  "catalog-telangana-gongura-mutton": "gongura mutton",
  "catalog-rajasthani-laal-maas": "lal maas",
  "catalog-bengali-kosha-mangsho": "kosha mangsho",
  "catalog-kashmiri-rogan-josh": "rogan josh",
  "catalog-mangalorean-chicken-ghee-roast": "chicken ghee roast",
  "catalog-goan-pork-vindaloo": "pork vindaloo",
  "catalog-malabar-prawn-curry": "Malabar prawn curry",
  "catalog-one-pan-chicken-pasta": "chicken pasta",
  "catalog-stovetop-margherita-pizza": "margherita pizza",
  "catalog-black-bean-rice-bowl": "black bean rice",
  "catalog-chickpea-shakshuka": "chickpea shakshuka food",
  "catalog-greek-yogurt-cucumber-bowl": "tzatziki bowl",
  "catalog-greek-chickpea-salad": "chickpea Greek salad",
  "catalog-three-bean-chilli": "three bean chili",
  "catalog-chicken-rice-skillet": "chicken rice dish",
  "catalog-tempeh-rice-bowl": "tempeh rice",
  "catalog-coconut-chickpea-curry": "chickpea coconut curry",
  "catalog-vegetable-pho-inspired-soup": "vegetable pho",
  "catalog-mapo-tofu-inspired-bowl": "mapo tofu",
  "catalog-korean-tofu-rice-bowl": "Korean tofu rice",
  "catalog-sri-lankan-parippu": "Sri Lankan dhal curry",
  "catalog-bangladeshi-masoor-bhuna": "masoor dal bhuna",
  "catalog-russian-buckwheat-bowl": "buckwheat porridge",
  "catalog-german-potato-egg-skillet": "German fried potatoes egg",
  "catalog-malaysian-tofu-laksa": "tofu laksa",
  "catalog-date-and-nut-bites": "date nut balls",
  "catalog-mango-cream-cups": "mango cream dessert",
  "catalog-no-bake-cocoa-oat-bites": "chocolate oat balls",
  "catalog-shrikhand-shortcut": "shrikhand",
  "catalog-stovetop-vanilla-custard": "vanilla custard",
  "catalog-berry-fruit-compote": "berry compote",
  "catalog-silky-chocolate-sauce": "chocolate sauce",
  "catalog-sweet-cinnamon-toast": "cinnamon toast",
  "catalog-eggless-chocolate-mug-cake": "chocolate mug cake",
  "catalog-shahi-tukda-shortcut": "shahi tukda",
  "catalog-classic-rice-kheer": "rice kheer",
  "catalog-stovetop-chocolate-pudding": "chocolate pudding",
  "catalog-eggless-banana-bread": "banana bread",
  "catalog-fudgy-cocoa-brownies": "chocolate brownies",
  "catalog-apple-oat-crumble": "apple crumble",
  "catalog-set-cheesecake-jars": "cheesecake jars",
  "catalog-shortcrust-tart-shells": "tart shells",
  "catalog-eggless-chocolate-layer-cake": "chocolate layer cake",
  "catalog-skillet-garlic-bread": "garlic bread",
  "catalog-skillet-vegetable-lasagna": "vegetable lasagna",
  "catalog-margherita-pizza-from-scratch": "margherita pizza",
  "catalog-eggplant-parmigiana-meal": "eggplant parmigiana",
  "catalog-chinese-sesame-cucumber-salad": "Chinese cucumber salad",
  "catalog-simple-miso-broth": "miso soup",
  "catalog-steamed-vegetable-bao": "vegetable bao",
  "catalog-basic-sponge-cake": "sponge cake",
  "catalog-layered-celebration-cake": "layer cake",
  "catalog-vegan-bibimbap-table": "vegan bibimbap"
};

const stopWords = new Set([
  "a", "an", "and", "the", "with", "from", "style", "styled", "home", "homestyle", "simple", "basic",
  "quick", "easy", "classic", "everyday", "one", "pot", "plate", "bowl", "cup", "meal", "table", "mini",
  "indian", "south", "north", "east", "west", "central", "pan", "regional", "state", "high", "protein",
  "andhra", "arunachal", "assamese", "bengali", "bihari", "chhattisgarhi", "goan", "gujarati", "haryanvi",
  "himachali", "jharkhand", "karnataka", "kashmiri", "kerala", "madhya", "maharashtrian", "malwa", "manipuri",
  "meghalaya", "mizo", "naga", "odia", "punjabi", "rajasthani", "sikkim", "tamil", "telangana", "tripura",
  "uttarakhand", "marathi", "kannada", "french", "italian", "mexican", "thai", "chinese", "japanese",
  "korean", "vietnamese", "brazilian", "filipino", "nepali", "sri", "lankan", "moroccan", "spanish", "greek"
]);
const identityWords = new Set([
  "chicken", "fish", "egg", "eggs", "paneer", "mutton", "lamb", "pork", "beef", "prawn", "prawns", "shrimp",
  "tofu", "soya", "soy", "tuna", "crab", "duck", "turkey", "salmon", "meat"
]);
const blockedWords = /\b(map|flag|logo|coat of arms|diagram|portrait|temple|lake|river|district|locator|plant|flower|politician|actor|album|film|book cover)\b/i;

function normalize(value) {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokens(value) {
  return normalize(value).split(/\s+/).filter(Boolean);
}

function keyTokens(value) {
  const filtered = tokens(value).filter((word) => !stopWords.has(word));
  return filtered.length ? filtered : tokens(value);
}

function stripHtml(value = "") {
  return String(value).replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
}

async function getJson(url, attempt = 0) {
  const response = await fetch(url, {
    headers: { "User-Agent": "CheffuRoadmap/2.0 (recipe image research; local prototype)" },
    signal: AbortSignal.timeout(20000)
  });
  const body = await response.text();
  const throttled = response.status === 429 || body.startsWith("You are making too many requests");
  if ((throttled || response.status >= 500) && attempt < 8) {
    await new Promise((resolve) => setTimeout(resolve, 2500 * (attempt + 1)));
    return getJson(url, attempt + 1);
  }
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  if (throttled) throw new Error("Wikimedia rate limit remained active");
  return JSON.parse(body);
}

async function searchCommons(recipe) {
  const query = aliases[recipe.id] || recipe.name;
  const url = new URL("https://commons.wikimedia.org/w/api.php");
  const params = {
    action: "query", generator: "search", gsrsearch: query, gsrnamespace: "6", gsrlimit: "16",
    prop: "imageinfo", iiprop: "url|mime|size|extmetadata", iiurlwidth: "720", format: "json", origin: "*"
  };
  Object.entries(params).forEach(([key, value]) => url.searchParams.set(key, value));
  const data = await getJson(url);
  const pages = Object.values(data.query?.pages || {}).sort((a, b) => a.index - b.index);
  return { query, candidates: pages.map((page) => scoreCandidate(recipe, query, page)).filter(Boolean).sort((a, b) => b.score - a.score) };
}

function scoreCandidate(recipe, query, page) {
  const info = page.imageinfo?.[0];
  if (!info?.thumburl || !/^image\/(jpeg|png|webp)$/i.test(info.mime || "") || blockedWords.test(page.title)) return null;
  const title = page.title.replace(/^File:/, "").replace(/\.[^.]+$/, "");
  const titleTokens = new Set(tokens(title));
  const queryKeys = keyTokens(query);
  const recipeKeys = keyTokens(recipe.name);
  const requiredIdentity = recipeKeys.filter((word) => identityWords.has(word));
  const candidateIdentity = [...titleTokens].filter((word) => identityWords.has(word));
  if (requiredIdentity.length && !requiredIdentity.some((word) => titleTokens.has(word))) return null;
  if (!requiredIdentity.length && candidateIdentity.length && ["Vegan", "Vegetarian"].includes(recipe.diet)) return null;

  const overlap = queryKeys.filter((word) => titleTokens.has(word)).length;
  const recipeOverlap = recipeKeys.filter((word) => titleTokens.has(word)).length;
  const coverage = overlap / Math.max(1, queryKeys.length);
  const recipeCoverage = recipeOverlap / Math.max(1, recipeKeys.length);
  const normalizedTitle = normalize(title);
  const normalizedQuery = normalize(query);
  const phraseBonus = normalizedTitle.includes(normalizedQuery) || normalizedQuery.includes(normalizedTitle) ? 34 : 0;
  const foodContext = /food|dish|cuisine|cooked|curry|rice|bread|cake|salad|soup|stew|sandwich|drink|milk|tea|coffee|dosa|idli|dal|roti|pasta|noodle|egg|chicken|fish|mutton|pork|prawn/i.test(`${title} ${stripHtml(info.extmetadata?.ImageDescription?.value)}`);
  const score = Math.round((coverage * 52) + (recipeCoverage * 24) + phraseBonus + (foodContext ? 5 : 0) - ((page.index || 1) - 1) * 0.7);
  return {
    score, coverage, recipeCoverage, title: page.title, mime: info.mime, width: info.thumbwidth || info.width,
    height: info.thumbheight || info.height, url: info.thumburl.replace(/\?.*$/, ""), sourceUrl: info.descriptionurl,
    license: stripHtml(info.extmetadata?.LicenseShortName?.value || info.extmetadata?.UsageTerms?.value || "See source"),
    artist: stripHtml(info.extmetadata?.Artist?.value || "Wikimedia Commons contributor"),
    credit: stripHtml(info.extmetadata?.Credit?.value || "")
  };
}

function chooseCandidate(recipe, result, usedTitles) {
  const candidates = result.candidates.filter((candidate) => candidate.coverage >= 0.5 || candidate.recipeCoverage >= 0.6 || candidate.score >= 68);
  const unused = candidates.find((candidate) => !usedTitles.has(candidate.title));
  const chosen = unused || candidates[0] || null;
  if (chosen) usedTitles.add(chosen.title);
  return chosen;
}

function extensionFor(mime) {
  if (mime === "image/png") return "png";
  if (mime === "image/webp") return "webp";
  return "jpg";
}

async function downloadImage(url, destination) {
  const partial = `${destination}.part`;
  await execFileAsync("curl", [
    "--location", "--fail", "--silent", "--show-error", "--retry", "6", "--retry-all-errors",
    "--retry-delay", "2", "--connect-timeout", "15", "--max-time", "90",
    "--user-agent", "CheffuRoadmap/2.0 (recipe image acquisition; local prototype)",
    "--output", partial, url
  ]);
  await fs.rename(partial, destination);
}

async function runPool(items, worker, concurrency = 5) {
  const output = new Array(items.length);
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      output[index] = await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, run));
  return output;
}

await fs.mkdir(path.dirname(searchCachePath), { recursive: true });
let searchCache = {};
try {
  searchCache = JSON.parse(await fs.readFile(searchCachePath, "utf8"));
} catch {
  searchCache = {};
}

console.log(`Searching Wikimedia Commons for ${recipes.length} recipes...`);
const searches = await runPool(recipes, async (recipe, index) => {
  const expectedQuery = aliases[recipe.id] || recipe.name;
  if (searchCache[recipe.id]?.query === expectedQuery && Array.isArray(searchCache[recipe.id].candidates)) {
    if ((index + 1) % 25 === 0) process.stdout.write(` ${index + 1}`);
    return searchCache[recipe.id];
  }
  try {
    const result = await searchCommons(recipe);
    searchCache[recipe.id] = result;
    await fs.writeFile(searchCachePath, `${JSON.stringify(searchCache, null, 2)}\n`);
    if ((index + 1) % 25 === 0) process.stdout.write(` ${index + 1}`);
    await new Promise((resolve) => setTimeout(resolve, 900));
    return result;
  } catch (error) {
    return { query: aliases[recipe.id] || recipe.name, candidates: [], error: error.message };
  }
}, 1);
process.stdout.write("\n");

const usedTitles = new Set();
const selections = recipes.map((recipe, index) => ({ recipe, search: searches[index], chosen: chooseCandidate(recipe, searches[index], usedTitles) }));
const missing = selections.filter((item) => !item.chosen);
const lowConfidence = selections.filter((item) => item.chosen && item.chosen.score < 75);

if (dryRun) {
  console.log(JSON.stringify({
    total: recipes.length,
    matched: selections.length - missing.length,
    missing: missing.map(({ recipe, search }) => ({ id: recipe.id, name: recipe.name, query: search.query })),
    lowConfidence: lowConfidence.map(({ recipe, search, chosen }) => ({ id: recipe.id, name: recipe.name, query: search.query, score: chosen.score, title: chosen.title }))
  }, null, 2));
  process.exit(missing.length ? 2 : 0);
}

await fs.mkdir(outputDir, { recursive: true });
const manifest = [];
const photoMap = {};
const downloadFailures = [];

await runPool(selections.filter((item) => item.chosen), async ({ recipe, search, chosen }, index) => {
  const extension = extensionFor(chosen.mime);
  const fileName = `${recipe.id}.${extension}`;
  const localPath = `assets/recipes/${fileName}`;
  try {
    await fs.access(path.join(outputDir, fileName));
  } catch {
    try {
      await downloadImage(chosen.url, path.join(outputDir, fileName));
    } catch (error) {
      downloadFailures.push({ recipe: recipe.name, error: error.message });
      return;
    }
  }
  photoMap[recipe.id] = { url: localPath, page: chosen.sourceUrl, title: chosen.title.replace(/^File:/, "") };
  manifest.push({
    recipeId: recipe.id, recipeName: recipe.name, query: search.query, localPath, sourceTitle: chosen.title,
    sourcePage: chosen.sourceUrl, sourceImage: chosen.url, license: chosen.license, artist: chosen.artist,
    credit: chosen.credit, score: chosen.score, width: chosen.width, height: chosen.height
  });
  if ((index + 1) % 25 === 0) process.stdout.write(` ${index + 1}`);
}, 10);
process.stdout.write("\n");

manifest.sort((a, b) => a.recipeId.localeCompare(b.recipeId));
const sortedMap = Object.fromEntries(Object.entries(photoMap).sort(([a], [b]) => a.localeCompare(b)));
await fs.writeFile(manifestPath, `${JSON.stringify({ generatedAt: new Date().toISOString(), total: manifest.length, items: manifest }, null, 2)}\n`);
await fs.writeFile(photoMapPath, `/* Dish-specific local assets acquired from Wikimedia Commons. Source and licence metadata: assets/recipes/manifest.json */\nwindow.CHEFFU_RECIPE_PHOTOS = ${JSON.stringify(sortedMap, null, 2)};\n`);

console.log(`Acquired ${manifest.length}/${recipes.length} dish images.`);
console.log(`Low-confidence matches: ${lowConfidence.length}`);
if (downloadFailures.length) console.log(`Download failures: ${downloadFailures.map((item) => item.recipe).join(", ")}`);
if (missing.length) {
  console.log(`Missing: ${missing.map(({ recipe }) => recipe.name).join(", ")}`);
  process.exitCode = 2;
}
if (downloadFailures.length) process.exitCode = 2;
