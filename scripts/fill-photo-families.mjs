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
const ignored = new Set(["simple", "basic", "quick", "easy", "style", "home", "classic", "bowl", "plate", "cup", "indian", "vegetable", "plain", "one", "pot"]);
const identities = ["fish", "chicken", "egg", "paneer", "mutton", "lamb", "pork", "beef", "prawn", "shrimp", "tofu", "soya", "soy", "tempeh", "tamago"];

function tokens(value) {
  return new Set(String(value).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((word) => word && !ignored.has(word)));
}

function identity(recipe) {
  const words = tokens(recipe.name);
  return identities.find((word) => words.has(word)) || (recipe.diet === "Egg" ? "egg" : null);
}

function dietLane(recipe) {
  return ["Vegetarian", "Vegan"].includes(recipe.diet) ? "Veg" : recipe.diet;
}

const exactDonors = recipes.flatMap((recipe) => {
  const photo = recipe.photo || photos[recipe.id];
  return photo && !photo.representative ? [{ recipe, photo }] : [];
});

function donorScore(recipe, donor, enforceIdentity = true) {
  const wantedIdentity = identity(recipe);
  const donorIdentity = identity(donor.recipe);
  if (enforceIdentity && wantedIdentity && wantedIdentity !== donorIdentity) return -Infinity;
  if (!wantedIdentity && donorIdentity && recipe.diet !== donor.recipe.diet) return -Infinity;
  const recipeTokens = tokens(recipe.name);
  const donorTokens = tokens(donor.recipe.name);
  const nameOverlap = [...recipeTokens].filter((word) => donorTokens.has(word)).length;
  const tagOverlap = (recipe.tags || []).filter((tag) => donor.recipe.tags?.includes(tag)).length;
  let score = nameOverlap * 60 + tagOverlap * 18;
  if (dietLane(recipe) === dietLane(donor.recipe)) score += 18;
  if (recipe.region === donor.recipe.region) score += 13;
  if (recipe.cuisine === donor.recipe.cuisine) score += 16;
  if (recipe.country === donor.recipe.country) score += 10;
  score -= Math.abs((recipe.stage || 0) - (donor.recipe.stage || 0)) * 2;
  return score;
}

let filled = 0;
for (const recipe of recipes) {
  if (recipe.photo || photos[recipe.id]) continue;
  let donor = exactDonors.map((candidate) => ({ ...candidate, score: donorScore(recipe, candidate) }))
    .filter((candidate) => Number.isFinite(candidate.score)).sort((a, b) => b.score - a.score)[0];
  if (!donor) {
    donor = exactDonors.map((candidate) => ({ ...candidate, score: donorScore(recipe, candidate, false) }))
      .filter((candidate) => Number.isFinite(candidate.score) && dietLane(candidate.recipe) === dietLane(recipe))
      .sort((a, b) => b.score - a.score)[0];
  }
  if (!donor || !Number.isFinite(donor.score)) throw new Error(`No safe photo family for ${recipe.name}`);
  photos[recipe.id] = {
    ...donor.photo,
    representative: true,
    referenceFor: donor.recipe.name
  };
  filled += 1;
}

const sorted = Object.fromEntries(Object.entries(photos).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(outputPath, `/* Generated from source-linked food photography. Exact matches are preferred; representative entries identify their dish-family donor. */\nwindow.CHEFFU_RECIPE_PHOTOS = ${JSON.stringify(sorted, null, 2)};\n`);
console.log(`Filled ${filled} related-dish references; ${recipes.filter((recipe) => recipe.photo || sorted[recipe.id]).length}/${recipes.length} recipes now have imagery.`);
