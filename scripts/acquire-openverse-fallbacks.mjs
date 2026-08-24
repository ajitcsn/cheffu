import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "assets", "recipes");
const manifestPath = path.join(outputDir, "manifest.json");
const photoMapPath = path.join(root, "recipe-photos.js");
const cachePath = path.join(root, "assets", "openverse-search-cache.json");

const aliases = {
  "nimbu-pani": "nimbu pani",
  "curd-peanut-bowl": "yogurt bowl",
  "catalog-ragi-malt": "ragi porridge",
  "catalog-kala-chana-salad": "kala chana salad",
  "catalog-cucumber-paneer-bowl": "paneer salad",
  "catalog-haryanvi-bajra-khichdi": "bajra khichdi",
  "catalog-jharkhand-dhuska-with-ghugni": "dhuska",
  "catalog-malwa-bhutte-ka-kees": "savory corn",
  "catalog-mizo-vegetable-bai": "Mizo bai",
  "catalog-rajasthani-panchmel-dal": "panchmel dal",
  "catalog-up-vegetable-tehri": "vegetable pulao",
  "catalog-uttarakhand-kafuli": "spinach curry",
  "catalog-oats-idli": "idli",
  "catalog-arisi-paruppu-sadam": "arisi paruppu sadam",
  "catalog-vatha-kuzhambu": "vatha kuzhambu",
  "catalog-keerai-masiyal": "keerai masiyal",
  "catalog-green-gram-sundal": "green gram salad",
  "catalog-bajra-moong-khichdi": "bajra khichdi",
  "catalog-moong-dal-chilla": "pesarattu",
  "catalog-kanda-batata-poha": "batata poha",
  "catalog-paneer-tikka-wrap": "paneer wrap",
  "catalog-curd-rice-with-roasted-peanuts": "curd rice",
  "catalog-soy-keema-pav": "keema pav",
  "catalog-chickpea-paneer-salad": "chickpea paneer",
  "catalog-tamil-meen-kuzhambu-rice": "meen kuzhambu",
  "catalog-amritsari-fish-tikka-wrap": "fish tikka",
  "catalog-mumbai-chicken-tikka-toastie": "chicken tikka sandwich",
  "catalog-malabar-prawn-curry": "Malabar prawn curry",
  "catalog-chickpea-shakshuka": "chickpea shakshuka",
  "catalog-greek-yogurt-cucumber-bowl": "tzatziki",
  "catalog-greek-chickpea-salad": "Greek chickpea salad",
  "catalog-three-bean-chilli": "three bean chili",
  "catalog-coconut-chickpea-curry": "curried chickpeas",
  "catalog-sri-lankan-parippu": "Sri Lankan dal",
  "catalog-bangladeshi-masoor-bhuna": "masoor dal",
  "catalog-german-potato-egg-skillet": "bratkartoffeln egg",
  "catalog-no-bake-cocoa-oat-bites": "oat energy balls",
  "catalog-black-bean-rice-bowl": "black beans rice",
  "catalog-cabbage-poriyal": "cabbage poriyal",
  "catalog-coconut-chickpea-curry": "curried chickpeas",
  "catalog-green-gram-sundal": "mung bean salad",
  "catalog-paneer-rice-bowl": "paneer rice",
  "catalog-sri-lankan-coconut-sambol": "coconut sambol",
  "catalog-salted-buttermilk": "chaas buttermilk",
  "catalog-masala-corn-cup": "masala corn",
  "catalog-dal-chawal-plate": "dal chawal",
  "catalog-tamago-rice-bowl": "tamago kake gohan",
  "catalog-caramelised-bananas": "caramelized bananas",
  "catalog-steamed-vegetable-bao": "vegetable bao",
  "catalog-moroccan-chickpea-tagine": "chickpea tagine",
  "catalog-chole-rice-bowl": "chole rice",
  "catalog-cabbage-peas-sabzi": "cabbage peas curry",
  "catalog-bharwa-capsicum": "stuffed peppers",
  "catalog-cabbage-poriyal": "cabbage poriyal",
  "catalog-ragi-rotti": "ragi roti",
  "catalog-chole-rice-bowl": "chole rice",
  "catalog-besan-chilla": "besan chilla",
  "catalog-aloo-paratha": "aloo paratha",
  "catalog-coconut-sevai": "coconut sevai",
  "catalog-stovetop-paneer-tikka": "paneer tikka",
  "catalog-aloo-capsicum": "aloo capsicum",
  "catalog-pepper-rasam": "pepper rasam",
  "catalog-paneer-momos": "paneer momos",
  "catalog-paneer-paratha": "paneer paratha",
  "catalog-goan-pork-vindaloo": "pork vindaloo",
  "catalog-chicken-quesadilla": "chicken quesadilla",
  "catalog-amritsari-fish-fry": "Amritsari fish fry",
  "catalog-rajasthani-laal-maas": "laal maas",
  "catalog-kerala-fish-moilee": "fish moilee",
  "catalog-telangana-gongura-mutton": "gongura mutton",
  "catalog-shakshuka": "shakshuka",
  "catalog-odia-santula": "santula",
  "catalog-ful-medames": "ful medames",
  "catalog-russian-buckwheat-bowl": "buckwheat porridge",
  "catalog-thai-basil-tofu": "Thai basil tofu",
  "catalog-miso-tofu-soup": "miso tofu soup",
  "catalog-sri-lankan-coconut-sambol": "coconut sambol",
  "catalog-menemen": "menemen",
  "catalog-nankhatai": "nankhatai",
  "catalog-fluffy-breakfast-pancakes": "pancakes"
};

const manualSources = {
  "catalog-haryanvi-bajra-khichdi": {
    title: "Haryanvi Bajra Khichdi",
    url: "https://indipost-img.s3.amazonaws.com/indipost-img-600x400-830320.jpg?x-request=html",
    foreign_landing_url: "https://www.indiblogger.in/indipost.php?post=830320",
    creator: "IndiBlogger contributor",
    license: "See source terms",
    coverage: 1,
    score: 100,
    catalog: "Web image search"
  },
  "catalog-bajra-moong-khichdi": {
    title: "Bajra and Moong Dal Khichdi",
    url: "https://indipost-img.s3.amazonaws.com/indipost-img-600x400-830320.jpg?x-request=html",
    foreign_landing_url: "https://www.indiblogger.in/indipost.php?post=830320",
    creator: "IndiBlogger contributor",
    license: "See source terms",
    coverage: 1,
    score: 100,
    catalog: "Web image search"
  },
  "curd-peanut-bowl": {
    title: "Curd bowl with roasted peanuts",
    url: "https://img-global.cpcdn.com/steps/82b6e93d32a9a36c/400x400cq80/photo.jpg",
    foreign_landing_url: "https://cookpad.com/eng/recipes/5174327",
    creator: "Dr Swati Rai",
    license: "See source terms",
    coverage: 1,
    score: 100,
    catalog: "Web image search"
  },
  "catalog-date-and-nut-bites": {
    title: "Sticky date and nut bites",
    url: "https://images.squarespace-cdn.com/content/61a6521b3147f1620ce96c5e/1709065554730-GTHV69KHKSR0GQLNR80D/group3.jpg?content-type=image%2Fjpeg&format=1500w",
    foreign_landing_url: "https://www.thepatchworkkitchen.com/blog/sticky-date-bites",
    creator: "The Patchwork Kitchen",
    license: "See source terms",
    coverage: 1,
    score: 100,
    catalog: "Web image search"
  },
  "catalog-malwa-bhutte-ka-kees": {
    title: "Bhutte ka Kees",
    url: "https://www.vegrecipesofindia.com/wp-content/uploads/2017/01/bhutte-ka-kees-recipe20.jpg",
    foreign_landing_url: "https://www.vegrecipesofindia.com/bhutte-ka-kees-recipe/",
    creator: "Dassana's Veg Recipes",
    license: "See source terms",
    coverage: 1,
    score: 100,
    catalog: "Web image search"
  },
  "catalog-south-indian-potato-roast": {
    title: "South Indian roast potatoes",
    url: "https://www.makepotato.com/wp-content/uploads/2021/03/SouthIndianRoastPotatoes2-rotated.jpg",
    foreign_landing_url: "https://www.makepotato.com/south-indian-roast-potatoes/",
    creator: "Make Potato",
    license: "See source terms",
    coverage: 1,
    score: 100,
    catalog: "Web image search"
  }
};

const preferredTitles = {
  "catalog-black-bean-rice-bowl": "Cuban black beans & rice",
  "catalog-cabbage-poriyal": "File:Cabbage and Carrot Poriyal.jpg",
  "catalog-coconut-chickpea-curry": "Curried chickpeas",
  "catalog-green-gram-sundal": "Asian Edamame and Mung Bean Salad.",
  "catalog-paneer-rice-bowl": "Paneer Fried Rice - Easy Paneer Rice (1)",
  "catalog-sri-lankan-coconut-sambol": "Coconut Sambol",
  "catalog-salted-buttermilk": "Chaas at Bobby Dhaba",
  "catalog-masala-corn-cup": "Masala corn by be hungry",
  "catalog-dal-chawal-plate": "Dal Chawal",
  "catalog-tamago-rice-bowl": "Tamago Kake Gohan for Sunday breakfast",
  "catalog-caramelised-bananas": "Caramelized Bananas and Waffles",
  "catalog-steamed-vegetable-bao": "vegetable bao",
  "catalog-moroccan-chickpea-tagine": "Chickpea Tagine",
  "catalog-chole-rice-bowl": "That's the Close up to the Chole Chawal",
  "catalog-cabbage-peas-sabzi": "Cabbage peas curry"
};

const replacementIds = new Set([
  "curd-peanut-bowl",
  "catalog-black-bean-rice-bowl", "catalog-cabbage-poriyal", "catalog-coconut-chickpea-curry",
  "catalog-green-gram-sundal", "catalog-paneer-rice-bowl", "catalog-sri-lankan-coconut-sambol",
  "catalog-date-and-nut-bites", "catalog-salted-buttermilk", "catalog-south-indian-potato-roast",
  "catalog-masala-corn-cup", "catalog-dal-chawal-plate", "catalog-tamago-rice-bowl",
  "catalog-caramelised-bananas", "catalog-steamed-vegetable-bao", "catalog-moroccan-chickpea-tagine",
  "catalog-chole-rice-bowl", "catalog-cabbage-peas-sabzi", "catalog-malwa-bhutte-ka-kees"
]);

const sandbox = { window: {} };
vm.createContext(sandbox);
for (const file of ["data.js", "catalog-expansion.js", "recipe-photos.js"]) {
  vm.runInContext(await fs.readFile(path.join(root, file), "utf8"), sandbox, { filename: file });
}
const recipes = sandbox.window.CHEFFU_DATA.recipes;
const photoMap = sandbox.window.CHEFFU_RECIPE_PHOTOS || {};
let manifest = { generatedAt: new Date().toISOString(), total: 0, items: [] };
let cache = {};
let commonsCache = {};
try { manifest = JSON.parse(await fs.readFile(manifestPath, "utf8")); } catch {}
try { cache = JSON.parse(await fs.readFile(cachePath, "utf8")); } catch {}
try { commonsCache = JSON.parse(await fs.readFile(path.join(root, "assets", "recipe-search-cache.json"), "utf8")); } catch {}

const stopWords = new Set(["a", "an", "and", "with", "food", "dish", "bowl", "indian", "style", "rice"]);
const identityWords = new Set(["chicken", "fish", "prawn", "pork", "mutton", "lamb", "beef", "egg", "tofu", "paneer"]);
function normalize(value) {
  return String(value || "").replace(/([a-z0-9])([A-Z])/g, "$1 $2").toLowerCase().normalize("NFKD").replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}
function tokens(value) { return normalize(value).split(/\s+/).filter((x) => x && !stopWords.has(x)); }

async function search(recipe, query) {
  if (cache[recipe.id]?.query === query) return cache[recipe.id];
  const url = new URL("https://api.openverse.org/v1/images/");
  url.searchParams.set("q", query);
  url.searchParams.set("page_size", "20");
  url.searchParams.set("mature", "false");
  const response = await fetch(url, { headers: { "User-Agent": "CheffuRoadmap/2.0 recipe asset research" }, signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  const data = await response.json();
  const queryTokens = tokens(query);
  const requiredIdentity = tokens(recipe.name).filter((word) => identityWords.has(word));
  const results = (data.results || []).map((item, index) => {
    const searchable = `${item.title || ""} ${(item.tags || []).map((tag) => tag.name).join(" ")}`;
    const found = new Set(tokens(searchable));
    if (requiredIdentity.length && !requiredIdentity.some((word) => found.has(word))) return null;
    const overlap = queryTokens.filter((word) => found.has(word)).length;
    const coverage = overlap / Math.max(1, queryTokens.length);
    const phrase = normalize(item.title).includes(normalize(query)) ? 40 : 0;
    return { ...item, score: Math.round(coverage * 70 + phrase - index), coverage };
  }).filter(Boolean).sort((a, b) => b.score - a.score);
  cache[recipe.id] = { query, results };
  await fs.writeFile(cachePath, `${JSON.stringify(cache, null, 2)}\n`);
  return cache[recipe.id];
}

async function download(url, fallbackUrl, destination, force = false) {
  const partial = `${destination}.part`;
  if (force) await fs.rm(destination, { force: true });
  try {
    await fs.access(destination);
    return;
  } catch {}
  let lastError;
  let proxyUrl = null;
  if (url?.includes("upload.wikimedia.org/")) {
    const fileName = decodeURIComponent(new URL(url).pathname.split("/").pop());
    proxyUrl = `https://commons.wikimedia.org/w/thumb.php?f=${encodeURIComponent(fileName)}&w=720`;
  }
  for (const candidateUrl of [...new Set([proxyUrl, url, fallbackUrl].filter(Boolean))]) {
    try {
      await execFileAsync("curl", ["--location", "--fail", "--silent", "--show-error", "--retry", "2", "--retry-all-errors", "--connect-timeout", "10", "--max-time", "25", "--output", partial, candidateUrl]);
      await fs.rename(partial, destination);
      return;
    } catch (error) {
      lastError = error;
      await fs.rm(partial, { force: true });
    }
  }
  throw lastError || new Error("download failed");
}

async function runPool(items, worker, concurrency = 5) {
  let cursor = 0;
  async function run() {
    while (cursor < items.length) {
      const index = cursor++;
      await worker(items[index], index);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, run));
}

const unresolved = recipes.filter((recipe) => !photoMap[recipe.id] || replacementIds.has(recipe.id));
console.log(`Searching Openverse for ${unresolved.length} unresolved recipes...`);
const failures = [];
let completed = 0;
await runPool(unresolved, async (recipe) => {
  const query = aliases[recipe.id] || recipe.name;
  try {
    const result = manualSources[recipe.id] ? { results: [] } : await search(recipe, query);
    const preferredTitle = normalize(preferredTitles[recipe.id]);
    let chosen = manualSources[recipe.id]
      || (preferredTitle ? result.results.find((item) => normalize(item.title) === preferredTitle) : null)
      || result.results.find((item) => item.coverage >= 0.5 || item.score >= 65);
    if (!chosen) {
      const commons = commonsCache[recipe.id]?.candidates?.find((item) => item.coverage >= 0.5 || item.recipeCoverage >= 0.6 || item.score >= 68);
      if (commons) {
        chosen = {
          ...commons,
          foreign_landing_url: commons.sourceUrl,
          creator: commons.artist,
          attribution: commons.credit,
          catalog: "Wikimedia Commons"
        };
      }
    }
    chosen ||= manualSources[recipe.id];
    if (!chosen) throw new Error("no strong match");
    const fileName = `${recipe.id}.jpg`;
    await download(chosen.url, chosen.thumbnail, path.join(outputDir, fileName), replacementIds.has(recipe.id));
    const localPath = `assets/recipes/${fileName}`;
    photoMap[recipe.id] = { url: localPath, page: chosen.foreign_landing_url, title: chosen.title || recipe.name };
    manifest.items.push({
      recipeId: recipe.id, recipeName: recipe.name, query, localPath, sourceTitle: chosen.title || recipe.name,
      sourcePage: chosen.foreign_landing_url, sourceImage: chosen.url || chosen.thumbnail,
      license: `${String(chosen.license || "").toUpperCase()} ${chosen.license_version || ""}`.trim(),
      licenseUrl: chosen.license_url, artist: chosen.creator || "Openverse contributor",
      credit: chosen.attribution || "", score: chosen.score, width: chosen.width, height: chosen.height, catalog: chosen.catalog || "Openverse"
    });
  } catch (error) {
    failures.push({ id: recipe.id, name: recipe.name, query, error: error.message });
  }
  completed += 1;
  if (completed % 10 === 0) process.stdout.write(` ${completed}`);
}, 5);
process.stdout.write("\n");

const uniqueItems = new Map(manifest.items.map((item) => [item.recipeId, item]));
manifest.items = [...uniqueItems.values()].sort((a, b) => a.recipeId.localeCompare(b.recipeId));
manifest.total = manifest.items.length;
manifest.generatedAt = new Date().toISOString();
const sortedMap = Object.fromEntries(Object.entries(photoMap).sort(([a], [b]) => a.localeCompare(b)));
await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
await fs.writeFile(photoMapPath, `/* Dish-specific local assets acquired from Wikimedia Commons and Openverse. Source and licence metadata: assets/recipes/manifest.json */\nwindow.CHEFFU_RECIPE_PHOTOS = ${JSON.stringify(sortedMap, null, 2)};\n`);
console.log(`Coverage: ${Object.keys(sortedMap).length}/${recipes.length}`);
if (failures.length) console.log(`Still unresolved: ${failures.map((item) => `${item.name} [${item.query}]`).join(", ")}`);
process.exitCode = failures.length ? 2 : 0;
