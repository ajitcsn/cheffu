import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const dataSource = fs.readFileSync(new URL("./data.js", import.meta.url), "utf8");
const catalogueSource = fs.readFileSync(new URL("./catalog-expansion.js", import.meta.url), "utf8");
const photoSource = fs.readFileSync(new URL("./recipe-photos.js", import.meta.url), "utf8");
const titleSource = fs.readFileSync(new URL("./title-catalog.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(dataSource, sandbox);
vm.runInContext(catalogueSource, sandbox);
vm.runInContext(photoSource, sandbox);
vm.runInContext(titleSource, sandbox);

const { stages, skills, recipes, badges, collectionConfig } = sandbox.window.CHEFFU_DATA;
const skillIds = new Set(skills.map((skill) => skill.id));
const recipeIds = new Set(recipes.map((recipe) => recipe.id));
const sourcedPhotos = sandbox.window.CHEFFU_RECIPE_PHOTOS || {};
const titles = sandbox.window.CHEFFU_TITLE_CATALOG || [];
const titleIds = new Set(titles.map((title) => title.id));

assert.equal(stages.length, 8, "Roadmap must have eight stages");
assert.equal(recipeIds.size, recipes.length, "Recipe IDs must be unique");
assert.ok(recipes.length >= 250, "Roadmap should offer at least 250 missions");
assert.ok(skills.length >= 100, "The skill system must remain granular");
assert.ok(recipes.every((recipe) => recipe.steps.length >= 4), "Every mission needs at least four safe steps");
assert.ok(recipes.every((recipe) => recipe.description && recipe.description.includes(recipe.name)), "Every dish needs a dish-specific description");
assert.ok(recipes.every((recipe) => recipe.skillIds.every((id) => skillIds.has(id))), "Every recipe skill must exist");
assert.ok(skills.every((skill) => recipes.some((recipe) => recipe.skillIds.includes(skill.id))), "Every micro-skill needs a practice dish");
assert.ok(stages.every((stage) => recipes.some((recipe) => recipe.stage === stage.id)), "Every stage needs recipes");
assert.ok(recipes.some((recipe) => recipe.region === "South India"), "South Indian path is required");
assert.ok(recipes.some((recipe) => recipe.region === "North India"), "North Indian path is required");
assert.ok(recipes.some((recipe) => recipe.protein >= 30), "Protein-forward missions are required");
assert.ok(badges.length >= 5, "Collectible loop is required");
assert.equal(collectionConfig.indiaStates.length, 28, "India collection must represent all 28 states");
assert.ok(collectionConfig.worldCountries.length >= 20, "World collection needs at least 20 countries");
assert.ok(collectionConfig.indiaStates.every((item) => recipeIds.has(item.dishId)), "Every Indian state needs a linked dish");
assert.ok(collectionConfig.worldCountries.every((item) => recipeIds.has(item.dishId)), "Every passport country needs a linked dish");
assert.ok(recipes.every((recipe) => recipe.photo || sourcedPhotos[recipe.id]), "Every recipe needs source-linked imagery");
assert.equal(titles.length, 100, "Collections must expose exactly 100 titles");
assert.equal(titleIds.size, titles.length, "Title IDs must be unique");
assert.ok(titles.every((title) => title.description && title.requirement && title.condition), "Every title needs flavour text and an unlock rule");
assert.ok(titles.filter((title) => title.condition.type === "skillXp").every((title) => skillIds.has(title.condition.value)), "Skill titles must reference real micro-skills");
assert.ok(titles.filter((title) => title.condition.type === "recipeCooks").every((title) => recipeIds.has(title.condition.value)), "Dish titles must reference real dishes");

const index = fs.readFileSync(new URL("./index.html", import.meta.url), "utf8");
const appSource = fs.readFileSync(new URL("./app.js", import.meta.url), "utf8");
assert.ok(fs.existsSync(new URL("./cheffu-tara-logo.png", import.meta.url)), "Cheffu must include the Tara mascot logo asset");
assert.ok(index.includes("cheffu-tara-logo.png"), "Header and app metadata must use the Tara mascot logo");
for (const asset of ["tara-welcome.png", "tara-skills.png", "tara-streak.png", "tara-challenge.png"]) {
  assert.ok(fs.existsSync(new URL(`./${asset}`, import.meta.url)), `Home companion asset missing: ${asset}`);
  assert.ok(appSource.includes(asset), `Home companion must use ${asset}`);
}
assert.ok(appSource.includes("taraHomePanel") && appSource.includes("TARA'S PICK"), "Home must include one reactive Tara recommendation");
const taraVariationFiles = fs.readdirSync(new URL("./tara-variations/", import.meta.url)).filter((file) => file.endsWith(".jpg"));
assert.equal(taraVariationFiles.length, 12, "Tara expression deck must contain 12 additional poses");
assert.ok(taraVariationFiles.every((file) => appSource.includes(`tara-variations/${file}`)), "Every Tara expression must be available to the automatic home commentary");
assert.ok(!appSource.includes("data-tara-pose") && !appSource.includes("data-tara-cycle") && !appSource.includes("More moods"), "Tara commentary must not expose manual mood choices");
assert.ok(!/Ayyo|Seri/.test(appSource), "Tara's dialogue must use a friendly, region-neutral voice");
assert.ok(!appSource.includes("TODAY'S 1× QUEST") && appSource.includes("TODAY'S RECOMMENDATION"), "Daily recommendation wording must stay clear");
assert.ok(!dataSource.includes("Boot Sequence") && dataSource.includes("Kitchen First Steps"), "Beginner roadmap wording must use plain language");
assert.ok(!fs.readFileSync(new URL("./styles.css", import.meta.url), "utf8").includes('.nav-item[data-route="dishes"]'), "Dishes navigation must not have a special highlight");
assert.ok(fs.existsSync(new URL("./cheffu-wordmark.png", import.meta.url)), "Cheffu must include the illustrated wordmark");
assert.ok(index.includes("cheffu-wordmark.png"), "Header must use the illustrated Cheffu wordmark");
for (const file of ["styles.css", "data.js", "catalog-expansion.js", "recipe-photos.js", "title-catalog.js", "app.js"]) {
  assert.ok(index.includes(file), `index.html must load ${file}`);
}
assert.ok(appSource.includes("renderSkillTree"), "Skills page must keep its connected tree view");
assert.ok(appSource.includes("clusterStyles"), "Skill systems must remain colour-coded");
assert.ok(appSource.includes("renderCollections"), "Collections page must remain available");
assert.ok(appSource.includes("checkpointXpForStep"), "Recipe checkpoints must award partial XP");
assert.ok(appSource.includes('"1": "dishes"') && appSource.includes('"3": "home"') && appSource.includes('"5": "roadmap"'), "Five navigation hotkeys must follow visual order");
assert.ok(index.includes('class="nav-icon"') && !index.includes(">⚡<") && !index.includes(">⌁<"), "Skills and Roadmap must use monochrome navigation icons");
assert.ok(!appSource.includes("All diets"), "Diet lanes must stay visible instead of using an All diets option");
assert.ok(appSource.includes("equippedTitleId") && appSource.includes("renderTitleVault"), "Titles must be unlockable and equippable in Collections");
assert.ok(appSource.includes("playerName") && appSource.includes("openNameDialog"), "Player name must be requested and saved locally");
const guidedTrackIds = ["morning", "dal-legume", "veg-curry", "rice-onepot", "family-meals", "plant-protein-fast", "plant-protein-meals", "egg-meat-protein", "one-pot", "dough", "south-tiffin", "south-meals", "north", "west", "east-ne", "sweet", "pan-asian", "italian", "world-foundations", "world-showpieces"];
assert.ok(guidedTrackIds.every((id) => appSource.includes(`id: "${id}"`)), "Roadmap must retain all 20 focused guided paths");

console.log(`Verified ${recipes.length} recipes, ${skills.length} skills, ${stages.length} stages, ${badges.length} badges, and ${titles.length} titles.`);
