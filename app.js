(function () {
  const { stages, skills, recipes, badges, collectionConfig } = window.CHEFFU_DATA;
  const sourcedPhotos = window.CHEFFU_RECIPE_PHOTOS || {};
  recipes.forEach((recipe) => {
    if (sourcedPhotos[recipe.id]) recipe.photo = sourcedPhotos[recipe.id];
  });
  const STORAGE_KEY = "cheffu-roadmap-state-v1";
  const XP_PER_LEVEL = 140;
  const MAX_LEVEL = 30;
  const titleCatalog = window.CHEFFU_TITLE_CATALOG || [];

  const roadmapTracks = [
    { id: "morning", name: "Morning Starter", icon: "🌅", colour: "#ffd84d", description: "Build confidence with drinks, poha, upma, toast, and fast breakfasts." },
    { id: "dal-legume", name: "Dal & Bean Foundations", icon: "🫘", colour: "#b9e85b", description: "Learn soaking, pressure, simmering, and tadka through dependable dals and beans." },
    { id: "veg-curry", name: "Everyday Sabzi", icon: "🥦", colour: "#80c95b", description: "Build dry sabzis and vegetable curries for realistic weeknight cooking." },
    { id: "rice-onepot", name: "Rice & One-Pot Meals", icon: "🍚", colour: "#d9b34c", description: "Master rice ratios, khichdi, pulao, and compact one-pot Indian meals." },
    { id: "family-meals", name: "Family Table", icon: "🏠", colour: "#74c65d", description: "Coordinate complete Indian meals and serve several people with calm timing." },
    { id: "plant-protein-fast", name: "Plant Protein Sprint", icon: "🌱", colour: "#ff9c46", description: "Build fast vegetarian protein meals in twenty minutes or less." },
    { id: "plant-protein-meals", name: "Plant Protein Meals", icon: "💪", colour: "#ee7d38", description: "Practise substantial paneer, tofu, pulse, and dairy meals." },
    { id: "egg-meat-protein", name: "Indian Egg, Fish & Meat", icon: "🥚", colour: "#e5643c", description: "Explore regional egg, chicken, fish, seafood, pork, and mutton dishes." },
    { id: "one-pot", name: "One-Pot Comforts", icon: "🫕", colour: "#da9d45", description: "Make filling meals with one main vessel and a manageable washing-up queue." },
    { id: "dough", name: "Dough & Bread Workshop", icon: "🫓", colour: "#c9825b", description: "Progress from kneading and rotis to fermented breads and structured doughs." },
    { id: "south-tiffin", name: "South Tiffin Route", icon: "🥥", colour: "#42b79a", description: "Master batter, tempering, chutneys, dosa, idli, and South Indian breakfasts." },
    { id: "south-meals", name: "South Indian Table", icon: "🍚", colour: "#2ea77c", description: "Build rice, sambar, rasam, vegetables, and complete southern meals." },
    { id: "north", name: "North Indian Comfort", icon: "🧈", colour: "#ef7950", description: "Explore dals, gravies, breads, snacks, and hearty northern comfort food." },
    { id: "west", name: "Western India Snack Route", icon: "🥜", colour: "#ea9550", description: "Travel through Maharashtra, Gujarat, Goa, and western snacks." },
    { id: "east-ne", name: "East & Northeast Trail", icon: "🎋", colour: "#5ca976", description: "Practise lighter stews, rice, fish, mustard, greens, and regional specialities." },
    { id: "sweet", name: "Sweet Studio", icon: "🧁", colour: "#ee6f9f", description: "Progress from no-bake cups to custards, Indian sweets, pastry, and celebration cakes." },
    { id: "pan-asian", name: "Wok & Bowl Explorer", icon: "🥢", colour: "#e84949", description: "Learn East and Southeast Asian bowls, noodles, stir-fries, soups, and composed meals." },
    { id: "italian", name: "Italian Workshop", icon: "🍝", colour: "#28a77a", description: "Move from bruschetta to sauces, pasta, risotto, dough, pizza, and Italian desserts." },
    { id: "world-foundations", name: "World Kitchen Basics", icon: "🌍", colour: "#4b82d4", description: "Use approachable international dishes to expand your ingredients and techniques." },
    { id: "world-showpieces", name: "World Kitchen Showpieces", icon: "🛫", colour: "#5d66c9", description: "Attempt ambitious international mains, baking, and composed dishes." },
    { id: "all", name: "Open Catalogue", icon: "🗺️", colour: "#7655d5", description: "The full recipe library for free exploration, intentionally larger than a guided path." }
  ];

  const defaultState = {
    xp: 0,
    cooks: {},
    skillXp: {},
    streak: 0,
    lastCookDate: null,
    completedSteps: {},
    checkpointXp: {},
    checkpointClaims: {},
    dietPreference: "Veg",
    equippedTitleId: "kitchen-visitor",
    playerName: "",
    hasSeenNamePrompt: false,
    navSeen: {},
    dailyQuest: {},
    questPreferences: { time: "20", goal: "confidence" }
  };

  const BACKUP_FORMAT = "cheffu-progress-v1";
  let storageWarningShown = false;

  let state = loadState();
  let activeRoute = "home";
  let roadmapFilters = { search: "", region: "all", diet: state.dietPreference, track: "morning" };
  let skillFilters = { search: "", status: "all" };
  let dishFilters = { search: "", goal: "all" };
  let dishResultLimit = 12;
  let dishObserver = null;
  let titleFilters = { search: "", category: "all" };
  let skillView = "tree";
  let selectedSkillCluster = null;
  let titleVaultExpanded = false;
  let roadmapCatalogueExpanded = false;
  const expandedRoadmapStages = new Set();

  const clusterStyles = {
    "Kitchen Readiness": { colour: "#ff8a3d", icon: "🧰" },
    "Clean & Safe": { colour: "#28a77a", icon: "🫧" },
    "Measuring & Tools": { colour: "#d9a514", icon: "🥄" },
    "Mixing & Texture": { colour: "#8d61d9", icon: "🌀" },
    "Knife & Prep": { colour: "#e45265", icon: "🔪" },
    "Stove & Heat": { colour: "#e34b28", icon: "🔥" },
    "Flavour Building": { colour: "#ce3f8a", icon: "🌶️" },
    "Grains & Legumes": { colour: "#8f702f", icon: "🫘" },
    "Eggs & Protein": { colour: "#e49b24", icon: "🥚" },
    "Pressure & Steam": { colour: "#3988c6", icon: "☁️" },
    "Dough & Batter": { colour: "#bc7545", icon: "🫓" },
    "Timing & Planning": { colour: "#4771c8", icon: "⏱️" },
    "Storage & Serving": { colour: "#5d9b43", icon: "🍽️" }
  };

  const views = [...document.querySelectorAll("[data-view]")];
  const navItems = [...document.querySelectorAll(".nav-item")];
  const topbar = document.querySelector(".topbar");
  const cookDialog = document.querySelector("#cook-dialog");
  const cookDialogContent = document.querySelector("#cook-dialog-content");
  const settingsDialog = document.querySelector("#settings-dialog");
  const nameDialog = document.querySelector("#name-dialog");
  const nameForm = document.querySelector("#name-form");
  const nameInput = document.querySelector("#player-name-input");
  const toastRegion = document.querySelector("#toast-region");
  let lastWindowScrollY = Math.max(0, window.scrollY);
  let topbarScrollFrame = 0;

  function updateTopbarVisibility() {
    topbarScrollFrame = 0;
    const currentY = Math.max(0, window.scrollY);
    if (currentY <= 24 || currentY < lastWindowScrollY) topbar.classList.remove("is-hidden");
    else if (currentY > 72 && currentY > lastWindowScrollY) topbar.classList.add("is-hidden");
    lastWindowScrollY = currentY;
  }

  function handleTopbarScroll() {
    if (topbarScrollFrame) return;
    topbarScrollFrame = window.requestAnimationFrame(updateTopbarVisibility);
  }

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved) return { ...defaultState };
      const loaded = normaliseState(saved);
      const validSkillIds = new Set(skills.map((skill) => skill.id));
      const hasOldSkillData = Object.keys(loaded.skillXp || {}).some((id) => !validSkillIds.has(id));
      if (hasOldSkillData) {
        loaded.skillXp = {};
        Object.entries(loaded.cooks || {}).forEach(([recipeId, cook]) => {
          const recipe = recipes.find((item) => item.id === recipeId);
          if (!recipe || !cook.count) return;
          recipe.skillIds.forEach((skillId) => {
            loaded.skillXp[skillId] = (loaded.skillXp[skillId] || 0) + (18 + recipe.stage * 2) * cook.count;
          });
        });
      }
      return loaded;
    } catch (error) {
      return { ...defaultState };
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (error) {
      if (!storageWarningShown) {
        storageWarningShown = true;
        window.setTimeout(() => showToast("Progress cannot be saved in this browser. Download a backup before leaving."), 0);
      }
      return false;
    }
  }

  function isPlainObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function boundedNumber(value, fallback = 0, max = 1000000) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.max(0, Math.min(max, Math.floor(number))) : fallback;
  }

  function normaliseState(rawState) {
    if (!isPlainObject(rawState)) return { ...defaultState };
    const recipeById = new Map(recipes.map((recipe) => [recipe.id, recipe]));
    const skillIdSet = new Set(skills.map((skill) => skill.id));
    const cooks = {};
    if (isPlainObject(rawState.cooks)) {
      Object.entries(rawState.cooks).forEach(([recipeId, cook]) => {
        if (!recipeById.has(recipeId) || !isPlainObject(cook)) return;
        const count = boundedNumber(cook.count);
        if (count) cooks[recipeId] = { count };
      });
    }
    const skillXp = {};
    if (isPlainObject(rawState.skillXp)) {
      Object.entries(rawState.skillXp).forEach(([skillId, xp]) => {
        if (!skillIdSet.has(skillId)) return;
        const amount = boundedNumber(xp);
        if (amount) skillXp[skillId] = amount;
      });
    }
    const completedSteps = {};
    const checkpointClaims = {};
    const checkpointXp = {};
    if (isPlainObject(rawState.completedSteps)) {
      Object.entries(rawState.completedSteps).forEach(([key, steps]) => {
        const attempt = parseAttemptKey(key);
        const recipe = attempt && recipeById.get(attempt.recipeId);
        if (!recipe || !Array.isArray(steps)) return;
        const safeSteps = [...new Set(steps.map(Number).filter((step) => Number.isInteger(step) && step >= 0 && step < recipe.steps.length))].sort((a, b) => a - b);
        if (safeSteps.length) completedSteps[key] = safeSteps;
      });
    }
    if (isPlainObject(rawState.checkpointClaims)) {
      Object.entries(rawState.checkpointClaims).forEach(([key, steps]) => {
        if (!completedSteps[key] || !Array.isArray(steps)) return;
        const safeClaims = [...new Set(steps.map(Number).filter((step) => completedSteps[key].includes(step)))].sort((a, b) => a - b);
        if (safeClaims.length) checkpointClaims[key] = safeClaims;
      });
    }
    if (isPlainObject(rawState.checkpointXp)) {
      Object.entries(rawState.checkpointXp).forEach(([key, xp]) => {
        if (!completedSteps[key]) return;
        const amount = boundedNumber(xp, 0, 2000);
        if (amount) checkpointXp[key] = amount;
      });
    }
    const dietPreference = ["Veg", "Egg", "Non-vegetarian"].includes(rawState.dietPreference) ? rawState.dietPreference : defaultState.dietPreference;
    const titleIdSet = new Set(titleCatalog.map((title) => title.id));
    const playerName = typeof rawState.playerName === "string" ? rawState.playerName.trim().replace(/\s+/g, " ").slice(0, 30) : "";
    const lastCookDate = typeof rawState.lastCookDate === "string" && /^\d{4}-\d{2}-\d{2}$/.test(rawState.lastCookDate) ? rawState.lastCookDate : null;
    return {
      ...defaultState,
      xp: boundedNumber(rawState.xp),
      cooks,
      skillXp,
      streak: boundedNumber(rawState.streak, 0, 36500),
      lastCookDate,
      completedSteps,
      checkpointXp,
      checkpointClaims,
      dietPreference,
      equippedTitleId: titleIdSet.has(rawState.equippedTitleId) ? rawState.equippedTitleId : defaultState.equippedTitleId,
      playerName,
      hasSeenNamePrompt: Boolean(rawState.hasSeenNamePrompt),
      navSeen: isPlainObject(rawState.navSeen) ? rawState.navSeen : {},
      dailyQuest: isPlainObject(rawState.dailyQuest) ? rawState.dailyQuest : {},
      questPreferences: {
        time: ["10", "20", "30", "45"].includes(rawState.questPreferences?.time) ? rawState.questPreferences.time : defaultState.questPreferences.time,
        goal: ["confidence", "protein"].includes(rawState.questPreferences?.goal) ? rawState.questPreferences.goal : defaultState.questPreferences.goal
      }
    };
  }

  function downloadProgressBackup() {
    const payload = JSON.stringify({ format: BACKUP_FORMAT, exportedAt: new Date().toISOString(), progress: state }, null, 2);
    const download = document.createElement("a");
    download.href = URL.createObjectURL(new Blob([payload], { type: "application/json" }));
    download.download = `cheffu-progress-${localDateKey()}.json`;
    document.body.append(download);
    download.click();
    download.remove();
    window.setTimeout(() => URL.revokeObjectURL(download.href), 0);
    showToast("Backup downloaded. Keep it somewhere private.");
  }

  async function restoreProgressBackup(file) {
    if (!file || file.size > 250000) throw new Error("That backup file is too large.");
    const backup = JSON.parse(await file.text());
    if (!isPlainObject(backup) || backup.format !== BACKUP_FORMAT || !isPlainObject(backup.progress)) throw new Error("This is not a Cheffu progress backup.");
    state = normaliseState(backup.progress);
    saveState();
    renderAll();
    closeDialog(settingsDialog);
    showToast("Your Cheffu progress is restored.");
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function localDateKey(date = new Date()) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function parseAttemptKey(key) {
    const match = String(key).match(/^(.+)-(\d{4}-\d{2}-\d{2})$/);
    return match ? { recipeId: match[1], date: match[2] } : null;
  }

  function activeStepKey(recipe) {
    const saved = Object.entries(state.completedSteps || {})
      .map(([key, completed]) => ({ key, completed, parsed: parseAttemptKey(key) }))
      .filter((attempt) => attempt.parsed?.recipeId === recipe.id && attempt.completed.length > 0)
      .sort((a, b) => b.parsed.date.localeCompare(a.parsed.date))[0];
    return saved?.key || `${recipe.id}-${localDateKey()}`;
  }

  function navMetric(route) {
    if (route === "dishes") return completedRecipeIds().length;
    if (route === "skills") return skills.filter((skill) => (state.skillXp[skill.id] || 0) > 0).length;
    if (route === "collections") return badges.filter((badge) => badgeProgress(badge).complete).length + unlockedTitles().length;
    if (route === "roadmap") return levelInfo().unlockedStage + 1;
    return 0;
  }

  function navUnseenGrowth(route) {
    const seen = state.navSeen?.[route];
    return Math.max(0, navMetric(route) - (seen?.value || 0));
  }

  function navNotificationCount(route) {
    return navUnseenGrowth(route);
  }

  function markRouteSeen(route) {
    if (route === "home") return;
    const snapshot = { date: localDateKey(), value: navMetric(route) };
    const seen = state.navSeen?.[route];
    if (seen?.date === snapshot.date && seen?.value === snapshot.value) return;
    state.navSeen = { ...(state.navSeen || {}), [route]: snapshot };
    saveState();
  }

  function updateNavNotifications() {
    navItems.forEach((item) => {
      const route = item.dataset.route;
      const count = route === "home" ? 0 : navNotificationCount(route);
      const badge = item.querySelector(".nav-notification");
      if (badge) {
        badge.hidden = count === 0;
        badge.textContent = count > 9 ? "9+" : String(count);
      }
      const label = item.dataset.navLabel || "Today";
      item.setAttribute("aria-label", count ? `${label}, ${count} pending ${count === 1 ? "action" : "actions"}` : label);
    });
  }

  function dayDifference(fromKey, toKey) {
    const from = new Date(`${fromKey}T12:00:00`);
    const to = new Date(`${toKey}T12:00:00`);
    return Math.round((to - from) / 86400000);
  }

  function cookedRecipes() {
    return completedRecipeIds().map(getRecipe).filter(Boolean);
  }

  function titleProgress(title) {
    const { type, target, value } = title.condition;
    const cooked = cookedRecipes();
    let progress = 0;
    if (type === "uniqueCooks") progress = cooked.length;
    if (type === "skillCount") progress = skills.filter((skill) => (state.skillXp[skill.id] || 0) > 0).length;
    if (type === "skillXp") progress = state.skillXp[value] || 0;
    if (type === "stageCooks") progress = cooked.filter((recipe) => recipe.stage === value).length;
    if (type === "clusterSkills") progress = skills.filter((skill) => skill.cluster === value && (state.skillXp[skill.id] || 0) > 0).length;
    if (type === "skillMastery") progress = skills.filter((skill) => (state.skillXp[skill.id] || 0) >= 140).length;
    if (type === "tagCooks") progress = cooked.filter((recipe) => recipe.tags?.includes(value)).length;
    if (type === "proteinCooks") progress = cooked.filter((recipe) => recipe.protein >= 15 || recipe.tags?.includes("protein")).length;
    if (type === "dietCooks") {
      progress = cooked.filter((recipe) => value === "Veg"
        ? ["Vegetarian", "Vegan"].includes(recipe.diet)
        : recipe.diet === value).length;
    }
    if (type === "keywordCooks") {
      progress = cooked.filter((recipe) => value.some((keyword) => recipe.name.toLowerCase().includes(keyword))).length;
    }
    if (type === "quickCooks") progress = cooked.filter((recipe) => recipe.minutes <= 15).length;
    if (type === "dietVariety") {
      progress = new Set(cooked.map((recipe) => ["Vegetarian", "Vegan"].includes(recipe.diet) ? "Veg" : recipe.diet)).size;
    }
    if (type === "regionCooks") progress = cooked.filter((recipe) => recipe.region === value).length;
    if (type === "stateCooks") progress = cooked.filter((recipe) => recipe.state === value).length;
    if (type === "indiaMap") progress = collectionConfig.indiaStates.filter((item) => state.cooks[item.dishId]?.count).length;
    if (type === "countryCount") progress = new Set(cooked.filter((recipe) => recipe.country && recipe.country !== "India").map((recipe) => recipe.country)).size;
    if (type === "roadmapCooks") progress = cooked.filter((recipe) => matchesRoadmapTrack(recipe, value)).length;
    if (type === "countryGroupCooks") progress = cooked.filter((recipe) => value.includes(recipe.country)).length;
    if (type === "streak") progress = state.streak;
    if (type === "repeatCooks") progress = Object.values(state.cooks).reduce((sum, cook) => sum + Math.max(0, (cook.count || 0) - 1), 0);
    if (type === "totalCooks") progress = Object.values(state.cooks).reduce((sum, cook) => sum + (cook.count || 0), 0);
    if (type === "recipeCooks") progress = state.cooks[value]?.count || 0;
    return {
      value: Math.min(progress, target),
      rawValue: progress,
      total: target,
      complete: progress >= target,
      percent: target === 0 ? 100 : Math.min(100, Math.round((progress / target) * 100))
    };
  }

  function unlockedTitles() {
    return titleCatalog.filter((title) => titleProgress(title).complete);
  }

  function equippedTitle() {
    const selected = titleCatalog.find((title) => title.id === state.equippedTitleId && titleProgress(title).complete);
    return selected || unlockedTitles()[0] || { id: "kitchen-visitor", name: "Kitchen Visitor", icon: "🚪" };
  }

  function levelInfo() {
    const level = Math.min(MAX_LEVEL, Math.floor(state.xp / XP_PER_LEVEL) + 1);
    const floorXp = (level - 1) * XP_PER_LEVEL;
    const nextXp = level === MAX_LEVEL ? floorXp : level * XP_PER_LEVEL;
    const current = level === MAX_LEVEL ? XP_PER_LEVEL : state.xp - floorXp;
    const needed = level === MAX_LEVEL ? XP_PER_LEVEL : nextXp - floorXp;
    return {
      level,
      title: equippedTitle().name,
      current,
      needed,
      percent: Math.min(100, Math.round((current / needed) * 100)),
      unlockedStage: Math.min(7, Math.floor((level - 1) / 2))
    };
  }

  function completedRecipeIds() {
    return Object.keys(state.cooks).filter((id) => state.cooks[id]?.count > 0);
  }

  function getRecipe(id) {
    return recipes.find((recipe) => recipe.id === id);
  }

  function stableHash(text) {
    let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return Math.abs(hash);
  }

  function dietMatches(recipe, diet) {
    if (diet === "Veg") return recipe.diet === "Vegetarian" || recipe.diet === "Vegan";
    if (diet === "Egg") return ["Vegetarian", "Vegan", "Egg"].includes(recipe.diet);
    if (diet === "Non-vegetarian") return ["Vegetarian", "Vegan", "Egg", "Non-vegetarian"].includes(recipe.diet);
    return true;
  }

  function isDietLockedSkill(skill) {
    return state.dietPreference === "Veg" && skill.cluster === "Eggs & Protein";
  }

  function isReviewedGuide(recipe) {
    return recipe?.guide?.status === "reviewed";
  }

  function availableSkills() {
    return skills.filter((skill) => !isDietLockedSkill(skill) && recipes.some((recipe) => dietMatches(recipe, state.dietPreference) && recipe.skillIds.includes(skill.id)));
  }

  function treeSkills() {
    return skills.filter((skill) => isDietLockedSkill(skill) || recipes.some((recipe) => dietMatches(recipe, state.dietPreference) && recipe.skillIds.includes(skill.id)));
  }

  function dailyPicks(diet = state.dietPreference) {
    const info = levelInfo();
    const completed = new Set(completedRecipeIds());
    const dietPool = recipes.filter((recipe) => dietMatches(recipe, diet));
    const preferences = state.questPreferences || defaultState.questPreferences;
    const guidedPool = dietPool.filter(isReviewedGuide);
    const recommendationPool = guidedPool.length ? guidedPool : dietPool;
    const ready = recommendationPool.filter((recipe) => recipe.stage <= info.unlockedStage);
    const nextUp = recommendationPool.filter((recipe) => recipe.stage > info.unlockedStage).sort((a, b) => a.stage - b.stage);
    const basePool = [...ready, ...nextUp].slice(0, Math.max(3, ready.length));
    const timeLimit = Number(preferences.time);
    const timePool = Number.isFinite(timeLimit) ? basePool.filter((recipe) => recipe.minutes <= timeLimit) : basePool;
    const proteinPool = preferences.goal === "protein" ? timePool.filter((recipe) => recipe.protein >= 10) : timePool;
    const pool = proteinPool.length >= 3 ? proteinPool : timePool.length >= 3 ? timePool : basePool;
    const seed = `${localDateKey()}-${info.unlockedStage}-${diet}`;
    const sorted = [...pool].sort((a, b) => stableHash(`${seed}-${a.id}`) - stableHash(`${seed}-${b.id}`));
    if (completed.size === 0) {
      const firstRecipeId = preferences.goal === "protein" ? "curd-peanut-bowl" : "nimbu-pani";
      sorted.sort((a, b) => Number(b.id === firstRecipeId) - Number(a.id === firstRecipeId));
    }
    const untried = sorted.filter((recipe) => !completed.has(recipe.id));
    const tried = sorted.filter((recipe) => completed.has(recipe.id));
    return [...untried, ...tried].slice(0, 3);
  }

  function dailyQuestDeck() {
    const picks = dailyPicks();
    const saved = state.dailyQuest || {};
    const preferences = state.questPreferences || defaultState.questPreferences;
    const isCurrent = saved.date === localDateKey() && saved.diet === state.dietPreference && saved.time === preferences.time && saved.goal === preferences.goal;
    const index = isCurrent && Number.isInteger(saved.index) ? ((saved.index % picks.length) + picks.length) % picks.length : 0;
    return {
      picks,
      index,
      recipe: picks[index]
    };
  }

  function setDailyQuest(index = 0) {
    state.dailyQuest = {
      date: localDateKey(),
      diet: state.dietPreference,
      index,
      time: (state.questPreferences || defaultState.questPreferences).time,
      goal: (state.questPreferences || defaultState.questPreferences).goal
    };
    saveState();
  }

  function refreshHome() {
    renderHome();
  }

  function passDailyQuest() {
    const deck = dailyQuestDeck();
    if (deck.picks.length < 2) {
      showToast("This is Aanya's best fit right now. Try changing the time or goal above.");
      return;
    }
    const nextIndex = (deck.index + 1) % deck.picks.length;
    setDailyQuest(nextIndex);
    refreshHome();
    showToast(`🍳 Here's another idea from Aanya: ${deck.picks[nextIndex].name}.`, false, "Aanya's deck", "suggestion");
  }

  function acceptDailyQuest(recipeId) {
    const deck = dailyQuestDeck();
    const recipe = getRecipe(recipeId);
    if (!recipe) return;
    setDailyQuest(Math.max(0, deck.picks.findIndex((pick) => pick.id === recipe.id)));
    showToast(`${recipe.emoji} Great choice. Start when you're ready.`, false, "Aanya's deck");
    openRecipe(recipe.id);
  }

  function updateQuestPreference(key, value) {
    const current = state.questPreferences || defaultState.questPreferences;
    if (current[key] === value) return;
    state.questPreferences = { ...current, [key]: value };
    state.dailyQuest = {};
    saveState();
    refreshHome();
  }

  function badgeProgress(badge) {
    const cooked = completedRecipeIds().map(getRecipe).filter(Boolean);
    let value = 0;
    if (badge.type === "cooks") value = cooked.length;
    if (badge.type === "protein") value = cooked.filter((recipe) => recipe.protein >= 15).length;
    if (badge.type === "heat") value = cooked.filter((recipe) => recipe.skillIds.some((id) => ["ignite-stove", "pan-preheat", "simmer-recognition", "saute-stir", "tadka-sequence"].includes(id))).length;
    if (badge.type === "south") value = cooked.filter((recipe) => recipe.region === "South India").length;
    if (badge.type === "stage7") value = cooked.filter((recipe) => recipe.tags?.includes("full-meal")).length;
    return { value: Math.min(value, badge.target), rawValue: value, complete: value >= badge.target };
  }

  function nextBadge() {
    return [...badges]
      .filter((badge) => !badgeProgress(badge).complete)
      .sort((a, b) => {
        const aProgress = badgeProgress(a).rawValue / a.target;
        const bProgress = badgeProgress(b).rawValue / b.target;
        return bProgress - aProgress || a.target - b.target;
      })[0] || badges[badges.length - 1];
  }

  function stageProgress(stageId, recipePool = recipes) {
    const stageRecipes = recipePool.filter((recipe) => recipe.stage === stageId);
    const complete = stageRecipes.filter((recipe) => state.cooks[recipe.id]?.count).length;
    const total = stageRecipes.length;
    return { complete, total, percent: total ? Math.round((complete / total) * 100) : 0 };
  }

  function picture(recipe, size = "card") {
    if (!recipe.photo) {
      return `<div class="dish-picture dish-picture--${size} dish-picture--illustrated" role="img" aria-label="Illustration for ${escapeHtml(recipe.name)}"><span>${recipe.emoji}</span><small>${escapeHtml(recipe.name)}</small></div>`;
    }
    const isPriorityImage = size === "quest";
    return `
      <figure class="dish-picture dish-picture--${size} ${recipe.photo.representative ? "dish-picture--reference" : ""}">
        <img src="${recipe.photo.url}" alt="${escapeHtml(recipe.name)}" loading="${isPriorityImage ? "eager" : "lazy"}"${isPriorityImage ? ' fetchpriority="high"' : ""} referrerpolicy="no-referrer">
        <a class="photo-credit" href="${recipe.photo.page}" target="_blank" rel="noreferrer" aria-label="Open photo source for ${escapeHtml(recipe.name)}" title="${recipe.photo.representative ? `Related-dish reference: ${escapeHtml(recipe.photo.referenceFor)}` : `Photo of ${escapeHtml(recipe.name)}`}">${recipe.photo.representative ? "related-dish reference ↗" : "photo ↗"}</a>
      </figure>`;
  }

  function recipeMeta(recipe) {
    return `
      <div class="meta-row">
        <span>⏱ ${recipe.minutes} min</span>
        ${isReviewedGuide(recipe) ? `<span>💪 ~${recipe.protein} g / serving</span>` : recipe.protein >= 15 ? "<span>💪 Protein-focused</span>" : ""}
        <span>⚡ ${recipe.xp} XP</span>
      </div>`;
  }

  function questContextPicker() {
    const preferences = state.questPreferences || defaultState.questPreferences;
    const timeOptions = [
      { value: "10", label: "10 min" },
      { value: "20", label: "20 min" },
      { value: "40", label: "40 min" }
    ];
    const goalOptions = [
      { value: "confidence", label: "Gentle win" },
      { value: "protein", label: "More protein" }
    ];
    const selectedTime = timeOptions.find((option) => option.value === preferences.time)?.label || "20 min";
    const selectedGoal = goalOptions.find((option) => option.value === preferences.goal)?.label || "Gentle win";
    return `
      <details class="quest-context">
        <summary><strong>Make Aanya's idea fit today</strong><small>${selectedTime} · ${selectedGoal}</small></summary>
        <div class="quest-context-controls">
          <div class="quest-context-group" role="group" aria-label="Time available">${timeOptions.map((option) => `<button type="button" data-quest-time="${option.value}" aria-pressed="${preferences.time === option.value}" class="${preferences.time === option.value ? "is-active" : ""}">${option.label}</button>`).join("")}</div>
          <div class="quest-context-group" role="group" aria-label="Today's goal">${goalOptions.map((option) => `<button type="button" data-quest-goal="${option.value}" aria-pressed="${preferences.goal === option.value}" class="${preferences.goal === option.value ? "is-active" : ""}">${option.label}</button>`).join("")}</div>
        </div>
      </details>`;
  }

  function aanyaHomePanel(totalCooks, learnedSkills, badge, badgeStatus, questDeck) {
    const today = localDateKey();
    const playerName = state.playerName || "Chef";
    const pendingCook = Object.entries(state.completedSteps || {})
      .map(([key, completed]) => {
        const parsed = parseAttemptKey(key);
        const recipe = parsed ? getRecipe(parsed.recipeId) : null;
        if (!recipe || !completed.length) return null;
        return { key, date: parsed.date, recipe, completed: completed.length, bankedXp: state.checkpointXp[key] || 0 };
      })
      .filter(Boolean)
      .sort((a, b) => b.date.localeCompare(a.date))[0];
    const image = "assets/aanya/variations/proud-plating.jpg?v=3";

    const targetRecipe = pendingCook?.recipe || questDeck.recipe;
    const isChoosing = !pendingCook;
    const canPass = isChoosing && questDeck.picks.length > 1;
    const suggestedSkill = targetRecipe.skillIds
      .map((id) => skills.find((skill) => skill.id === id))
      .filter(Boolean)
      .sort((a, b) => (state.skillXp[a.id] || 0) - (state.skillXp[b.id] || 0) || a.name.localeCompare(b.name))[0] || skills[0];
    const suggestedSkillXp = state.skillXp[suggestedSkill.id] || 0;
    const suggestedSkillState = skillState(suggestedSkillXp);
    const skillXpReward = 18 + targetRecipe.stage * 2;
    const remainingRecipeXp = Math.max(0, targetRecipe.xp - (pendingCook?.bankedXp || 0));
    const targetCook = state.cooks[targetRecipe.id];
    const earnsFirstDish = !targetCook?.count;
    const firstCookBonus = earnsFirstDish ? 20 : 0;
    const questXpReward = (pendingCook ? remainingRecipeXp : targetRecipe.xp) + firstCookBonus;
    const collectionReward = earnsFirstDish ? "First-cook stamp" : "Cook count +1";
    let heading;
    let comment;
    if (pendingCook) {
      heading = `Hey ${playerName}, ${targetRecipe.name} is waiting for you.`;
      comment = `You already finished ${pendingCook.completed} of ${targetRecipe.steps.length} checkpoints and banked ${pendingCook.bankedXp} XP. Finish whenever you are ready and collect the remaining reward.`;
    } else if (totalCooks === 0) {
      heading = `Hi ${playerName}! Here's an easy first dish.`;
      comment = `${targetRecipe.name} trains ${suggestedSkill.name} in about ${targetRecipe.minutes} minutes.${canPass ? " Swipe right if you're up for the challenge! Swipe left and I'll find you something else to make 🥄" : " Accept it when you are ready."}`;
    } else if (state.lastCookDate === today) {
      heading = `Nice work today, ${playerName}!`;
      comment = `Your ${state.streak}-day streak is safe. Here's another idea if you feel like cooking more.`;
    } else {
      heading = `${playerName}, here's a dish idea for today.`;
      comment = `I picked ${targetRecipe.name} because ${suggestedSkill.name} is the least-practised skill in this dish.${canPass ? " Swipe right to cook it, or left for another idea." : " Cook it whenever you are ready."}`;
    }
    return `
      <section class="aanya-companion" aria-labelledby="aanya-companion-heading">
        <div class="aanya-companion-copy">
          <div class="aanya-guide-intro">
            <div class="aanya-companion-art"><img src="${image}" alt="Aanya proudly presenting a finished dish"></div>
            <div class="aanya-guide-message">
              <div class="aanya-companion-top"><div><p class="eyebrow">Aanya's idea for you</p><h2 id="aanya-companion-heading">${escapeHtml(heading)}</h2></div><span class="aanya-live-pill">AANYA'S PICK</span></div>
              <div class="aanya-speech"><span aria-hidden="true">💬</span><p>${escapeHtml(comment)}</p></div>
            </div>
          </div>
          ${!pendingCook ? questContextPicker() : ""}
          <div class="quest-deck-status">
            <strong>${pendingCook ? "COOK IN PROGRESS" : `AANYA'S IDEA ${questDeck.index + 1} OF ${questDeck.picks.length}`}</strong>
            ${isChoosing ? `<span class="quest-deck-dots" aria-label="Aanya idea ${questDeck.index + 1} of ${questDeck.picks.length}">${questDeck.picks.map((recipe, index) => `<i class="${index === questDeck.index ? "is-active" : ""}" aria-hidden="true"></i>`).join("")}</span>` : `<span class="quest-deck-lock" aria-hidden="true">⏳</span>`}
          </div>
          <div class="quest-card-stack ${isChoosing ? "is-choosing" : "is-locked"}">
            ${isChoosing ? '<span class="quest-card-shadow quest-card-shadow--back" aria-hidden="true"></span><span class="quest-card-shadow quest-card-shadow--middle" aria-hidden="true"></span>' : ""}
            <article class="quest-swipe-card ${pendingCook ? "is-locked" : ""}" ${isChoosing ? `data-quest-swipe-card="${targetRecipe.id}" tabindex="0" aria-describedby="quest-swipe-instructions"` : ""}>
              <span class="quest-swipe-verdict quest-swipe-verdict--pass" aria-hidden="true">ANOTHER IDEA</span>
              <span class="quest-swipe-verdict quest-swipe-verdict--accept" aria-hidden="true">COOK THIS</span>
              <span class="quest-aanya-stamp"><span aria-hidden="true">👩🏽‍🍳</span><strong>Aanya recommends</strong></span>
              ${picture(targetRecipe, "quest")}
              <div class="quest-card-copy">
                <div class="quest-card-heading"><div><p class="eyebrow">${isReviewedGuide(targetRecipe) ? "Reviewed guide" : "Draft guide"} · Stage ${targetRecipe.stage} · ${escapeHtml(targetRecipe.region)}</p><h3>${targetRecipe.emoji} ${escapeHtml(targetRecipe.name)}</h3></div><span class="difficulty-pill">${escapeHtml(targetRecipe.difficulty)}</span></div>
                <p>${escapeHtml(targetRecipe.summary)}</p>
                ${recipeMeta(targetRecipe)}
                <div class="quest-card-outcomes">
                  <div><small>SKILL TO TRAIN</small><strong>${suggestedSkill.icon} ${escapeHtml(suggestedSkill.name)}</strong><span>${escapeHtml(suggestedSkillState.name)} · ${suggestedSkillXp} XP now</span></div>
                  <div class="quest-card-reward"><small>COOKING REWARD</small><strong>+${questXpReward} XP</strong><span>+${skillXpReward} XP to each skill · ${collectionReward}</span></div>
                </div>
                ${isChoosing ? `<p class="quest-swipe-instructions" id="quest-swipe-instructions">${canPass ? "Swipe this card: ← another idea · cook this →" : "Swipe this card right to cook this →"}</p>` : ""}
              </div>
            </article>
          </div>
          ${isChoosing ? `
            <div class="quest-swipe-actions ${canPass ? "" : "quest-swipe-actions--single"}">
              ${canPass ? `<button class="quest-swipe-button quest-swipe-button--pass" type="button" data-pass-daily-quest aria-label="Show another dish idea instead of ${escapeHtml(targetRecipe.name)}"><span aria-hidden="true">←</span><strong>Another idea</strong></button>` : ""}
              <button class="quest-swipe-button quest-swipe-button--accept" type="button" data-accept-daily-quest="${targetRecipe.id}" aria-label="Open ${escapeHtml(targetRecipe.name)} to cook it"><span aria-hidden="true">→</span><strong>Cook this</strong></button>
            </div>
            <button class="text-button aanya-browse-dishes" type="button" data-route="dishes">Or browse every dish →</button>` : `
            <div class="aanya-plan-progress"><span>Next badge</span><strong>${badge.icon} ${escapeHtml(badge.name)}</strong><span>${badgeStatus.value}/${badge.target}</span></div>
            <div class="aanya-plan-actions">
              <button class="button button-primary aanya-action" type="button" data-open-recipe="${targetRecipe.id}">Continue ${escapeHtml(targetRecipe.name)} →</button>
              <button class="text-button" type="button" data-route="dishes">Browse every dish →</button>
            </div>`}
          </div>
      </section>`;
    observeDishSentinel();
  }

  function animateQuestChoice(card, choice) {
    if (!card || card.dataset.committing) return;
    card.dataset.committing = "true";
    card.classList.remove("is-dragging");
    card.classList.add(choice === "accept" ? "is-accepting" : "is-passing");
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 260;
    window.setTimeout(() => {
      if (choice === "accept") acceptDailyQuest(card.dataset.questSwipeCard);
      else passDailyQuest();
    }, delay);
  }

  function wireQuestSwipe() {
    const card = document.querySelector("#view-home [data-quest-swipe-card]");
    if (!card) return;
    let pointerId = null;
    let startX = 0;
    let currentX = 0;

    const resetCard = () => {
      pointerId = null;
      currentX = 0;
      card.classList.remove("is-dragging");
      card.style.removeProperty("--swipe-x");
      card.style.removeProperty("--swipe-rotation");
      card.querySelectorAll(".quest-swipe-verdict").forEach((verdict) => verdict.style.removeProperty("opacity"));
    };

    const finishSwipe = () => {
      if (pointerId === null) return;
      const threshold = Math.min(110, card.getBoundingClientRect().width * 0.24);
      if (Math.abs(currentX) >= threshold) animateQuestChoice(card, currentX > 0 ? "accept" : "pass");
      else resetCard();
    };

    card.addEventListener("pointerdown", (event) => {
      if (event.button !== 0 || event.target.closest("a, button")) return;
      pointerId = event.pointerId;
      startX = event.clientX;
      currentX = 0;
      card.setPointerCapture?.(event.pointerId);
      card.classList.add("is-dragging");
    });

    card.addEventListener("pointermove", (event) => {
      if (event.pointerId !== pointerId) return;
      currentX = event.clientX - startX;
      const rotation = Math.max(-9, Math.min(9, currentX / 18));
      const opacity = Math.min(1, Math.abs(currentX) / 90);
      card.style.setProperty("--swipe-x", `${currentX}px`);
      card.style.setProperty("--swipe-rotation", `${rotation}deg`);
      card.querySelector(".quest-swipe-verdict--accept").style.opacity = currentX > 0 ? opacity : 0;
      card.querySelector(".quest-swipe-verdict--pass").style.opacity = currentX < 0 ? opacity : 0;
      if (Math.abs(currentX) > 8) event.preventDefault();
    });

    card.addEventListener("pointerup", (event) => {
      if (event.pointerId === pointerId) finishSwipe();
    });
    card.addEventListener("pointercancel", resetCard);
    card.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      animateQuestChoice(card, event.key === "ArrowRight" ? "accept" : "pass");
    });
  }

  function homeRouteHub(primary, badge, badgeStatus) {
    const cooked = completedRecipeIds().map(getRecipe).filter(Boolean);
    const suggestedSkill = primary.skillIds
      .map((id) => skills.find((skill) => skill.id === id))
      .filter(Boolean)
      .sort((a, b) => (state.skillXp[a.id] || 0) - (state.skillXp[b.id] || 0) || a.name.localeCompare(b.name))[0] || skills[0];
    const currentStage = stages[levelInfo().unlockedStage];
    const dishGrowth = navUnseenGrowth("dishes");
    const skillGrowth = navUnseenGrowth("skills");
    const collectionGrowth = navUnseenGrowth("collections");
    const roadmapGrowth = navUnseenGrowth("roadmap");
    const prompts = [
      {
        route: "dishes",
        icon: "🍽️",
        label: "Dishes",
        reason: dishGrowth
          ? `${dishGrowth} new dish ${dishGrowth === 1 ? "card" : "cards"} to view`
          : cooked.length ? `${cooked.length} made, browse every recipe` : `Browse all ${recipes.filter((recipe) => dietMatches(recipe, state.dietPreference)).length} recipes`
      },
      {
        route: "skills",
        icon: "⚡",
        label: "Skills",
        reason: skillGrowth
          ? `${skillGrowth} new ${skillGrowth === 1 ? "skill" : "skills"} discovered`
          : `Train ${suggestedSkill.name} next`
      },
      {
        route: "collections",
        icon: "🏅",
        label: "Collections",
        reason: collectionGrowth
          ? `${collectionGrowth} new ${collectionGrowth === 1 ? "reward" : "rewards"} unlocked`
          : `${Math.max(0, badge.target - badgeStatus.value)} steps to ${badge.name}`
      },
      {
        route: "roadmap",
        icon: "🗺️",
        label: "Roadmap",
        reason: roadmapGrowth
          ? `${currentStage.name} is in your recommendation range`
          : `Continue the ${currentStage.name} path`
      }
    ];

    return `
      <section class="home-route-hub" aria-labelledby="home-route-hub-heading">
        <div class="home-route-hub-heading">
          <div><p class="eyebrow">Keep exploring</p><h2 id="home-route-hub-heading">Your next moves</h2></div>
          <small>Badges appear only when something new unlocks.</small>
        </div>
        <div class="home-route-grid">
          ${prompts.map((prompt) => {
            const count = navNotificationCount(prompt.route);
            return `
              <button class="home-route-button" type="button" data-route="${prompt.route}" aria-label="Open ${prompt.label}: ${escapeHtml(prompt.reason)}${count ? `. ${count} pending ${count === 1 ? "action" : "actions"}` : ""}">
                <span class="home-route-icon" aria-hidden="true">${prompt.icon}</span>
                <span class="home-route-copy"><strong>${prompt.label}</strong><small>${escapeHtml(prompt.reason)}</small></span>
                <span class="home-route-arrow" aria-hidden="true">→</span>
                ${count ? `<span class="home-route-notification" aria-hidden="true">${count > 9 ? "9+" : count}</span>` : ""}
              </button>`;
          }).join("")}
        </div>
      </section>`;
  }

  function renderHome() {
    const container = document.querySelector("#view-home");
    const info = levelInfo();
    const questDeck = dailyQuestDeck();
    const primary = questDeck.recipe;
    const badge = nextBadge();
    const progress = badgeProgress(badge);
    const nextStage = stages[info.unlockedStage];
    const totalCooks = Object.values(state.cooks).reduce((sum, cook) => sum + (cook.count || 0), 0);
    const learnedSkills = skills.filter((skill) => (state.skillXp[skill.id] || 0) > 0).length;

    container.innerHTML = `
      <div class="home-grid">
        <section class="hero-copy">
          <p class="eyebrow">Today · ${new Intl.DateTimeFormat("en-IN", { weekday: "long", day: "numeric", month: "short" }).format(new Date())}</p>
          <h1 id="home-heading">Hi, <span>${escapeHtml(state.playerName || "Chef")}</span>.</h1>
          <p class="hero-subtitle"><strong>${escapeHtml(info.title)}</strong><span>Level ${info.level}</span><span>Pick one small cooking win for today.</span></p>
        </section>

        <section class="level-panel" aria-label="Player progress">
          <div class="level-badge"><span>LVL</span><strong>${info.level}</strong></div>
          <div class="level-copy">
            <div class="level-line"><strong>${escapeHtml(info.title)}</strong><span>${state.xp} total XP</span></div>
            <div class="progress-track" role="progressbar" aria-valuenow="${info.percent}" aria-valuemin="0" aria-valuemax="100" aria-label="Progress to next level">
              <span style="width:${info.percent}%"></span>
            </div>
            <div class="level-line level-line--small"><span>${info.current} / ${info.needed} XP</span><span>${info.percent}%</span></div>
          </div>
        </section>

        <section class="incentive-card">
          <div class="badge-art" aria-hidden="true"><span>${badge.icon}</span></div>
          <div>
            <p class="eyebrow">Next collectible · closest badge</p>
            <h2>${escapeHtml(badge.name)}</h2>
            <p>${escapeHtml(badge.description)}</p>
            <div class="mini-progress"><span style="width:${Math.min(100, (progress.value / badge.target) * 100)}%"></span></div>
            <strong>${progress.value} / ${badge.target}</strong>
          </div>
        </section>

        <section class="dashboard-card">
          <p class="eyebrow">Your cooking progress</p>
          <div class="dashboard-numbers">
            <div class="dashboard-dishes"><strong>${completedRecipeIds().length}</strong><span>Dishes</span></div>
            <div><strong>${learnedSkills}</strong><span>Skills</span></div>
            <div><strong>${badges.filter((item) => badgeProgress(item).complete).length}</strong><span>Badges</span></div>
            <div><strong>${totalCooks}</strong><span>Total cooks</span></div>
          </div>
          <button class="text-button" data-route="roadmap" type="button">Explore ${escapeHtml(nextStage.name)} lessons →</button>
        </section>

        ${aanyaHomePanel(totalCooks, learnedSkills, badge, progress, questDeck)}

        ${homeRouteHub(primary, badge, progress)}

        <section class="home-badge-shelf" aria-labelledby="badge-shelf-heading">
          <div class="section-heading"><div><p class="eyebrow">Your collectibles</p><h2 id="badge-shelf-heading">Badge cabinet</h2></div><button class="text-button" data-route="collections" type="button">Open collections →</button></div>
          <div class="badge-shelf-row">
            ${badges.map((item) => {
              const itemProgress = badgeProgress(item);
              return `<div class="badge-shelf-item ${itemProgress.complete ? "is-earned" : ""}" title="${escapeHtml(item.description)}"><span>${item.icon}</span><strong>${escapeHtml(item.name)}</strong><small>${itemProgress.value}/${item.target}</small></div>`;
            }).join("")}
          </div>
        </section>

      </div>`;
    wireQuestSwipe();
    wireImageFallbacks(container);
  }

  function dietFilterButtons(activeDiet, scope) {
    const options = [
      { value: "Veg", label: "Veg", icon: "🥬" },
      { value: "Egg", label: "Veg + egg", icon: "🥚" },
      { value: "Non-vegetarian", label: "Everything", icon: "🍗" }
    ];
    return `<div class="diet-segment" role="group" aria-label="Choose diet">${options.map((option) => `
      <button class="diet-segment-button ${activeDiet === option.value ? "is-active" : ""}" type="button" data-diet-scope="${scope}" data-diet-value="${option.value}" aria-pressed="${activeDiet === option.value}">
        <span>${option.icon}</span>${option.label}
      </button>`).join("")}</div>`;
  }

  function renderGlobalDietFilter() {
    document.querySelector("#global-diet-filter").innerHTML = dietFilterButtons(state.dietPreference, "global");
  }

  function renderOnboardingDietFilter() {
    const filter = document.querySelector("#onboarding-diet-filter");
    if (filter) filter.innerHTML = dietFilterButtons(state.dietPreference, "onboarding");
  }

  function compactRecipeCard(recipe) {
    return `
      <article class="compact-recipe-card">
        ${picture(recipe, "compact")}
        <div class="compact-recipe-copy">
          <div><span class="tiny-tag recipe-format-tag ${isReviewedGuide(recipe) ? "is-guided" : "is-draft"}">${isReviewedGuide(recipe) ? "✓ Reviewed guide" : "Draft · check amounts"}</span><span class="tiny-tag">Stage ${recipe.stage}</span><span class="tiny-tag">${escapeHtml(recipe.region)}</span></div>
          <h3>${escapeHtml(recipe.name)}</h3>
          <p class="recipe-description">${escapeHtml(recipe.description)}</p>
          ${recipeMeta(recipe)}
          <button class="button button-secondary" type="button" data-open-recipe="${recipe.id}">${isReviewedGuide(recipe) ? "Start cooking" : "Review draft"}</button>
        </div>
      </article>`;
  }

  function skillState(xp) {
    if (xp === 0) return { name: "Not practised", percent: 0, className: "unknown" };
    if (xp < 45) return { name: "Discovered", percent: Math.round((xp / 140) * 100), className: "discovered" };
    if (xp < 90) return { name: "Practising", percent: Math.round((xp / 140) * 100), className: "practising" };
    if (xp < 140) return { name: "Comfortable", percent: Math.round((xp / 140) * 100), className: "comfortable" };
    return { name: "Reliable", percent: 100, className: "reliable" };
  }

  function renderSkills() {
    const container = document.querySelector("#view-skills");
    const visibleSkillSet = availableSkills();
    const learned = visibleSkillSet.filter((skill) => (state.skillXp[skill.id] || 0) > 0).length;
    const recommendedSkill = dailyQuestDeck().recipe?.skillIds
      .map((id) => skills.find((skill) => skill.id === id))
      .find((skill) => skill && !isDietLockedSkill(skill));
    const strongest = learned
      ? [...visibleSkillSet].sort((a, b) => (state.skillXp[b.id] || 0) - (state.skillXp[a.id] || 0))[0]
      : recommendedSkill || visibleSkillSet[0] || skills[0];
    const visibleSkills = filteredSkills();
    if (!selectedSkillCluster || !visibleSkillSet.some((skill) => skill.cluster === selectedSkillCluster)) selectedSkillCluster = strongest.cluster;

    container.innerHTML = `
      <header class="page-head">
        <div><p class="eyebrow">Your capability map</p><h1 id="skills-heading">Cooking skills</h1><p>Every dish lights up the small actions you practised. Tap a branch to find dishes that train it.</p></div>
        <div class="summary-chip"><strong>${learned} / ${visibleSkillSet.length}</strong><span>skills started</span></div>
      </header>

      <section class="skill-hero ${learned ? "" : "skill-hero--empty"}">
        <div class="skill-hero-icon">${strongest.icon}</div>
        <div><p class="eyebrow">${learned ? "Strongest skill" : "A good first skill"}</p><h2>${escapeHtml(strongest.name)}</h2><p>${learned ? `${state.skillXp[strongest.id] || 0} skill XP · ${skillState(state.skillXp[strongest.id] || 0).name}` : "Complete a dish using this skill to light up its branch."}</p></div>
        <button class="button button-secondary" type="button" data-skill-dishes="${strongest.id}">${learned ? "Keep training it" : "Find a dish to practise"}</button>
      </section>

      <div class="skill-view-switch" role="group" aria-label="Choose skill view">
        <button class="${skillView === "tree" ? "is-active" : ""}" type="button" data-skill-view="tree" aria-pressed="${skillView === "tree"}">⌘ Connected tree</button>
        <button class="${skillView === "list" ? "is-active" : ""}" type="button" data-skill-view="list" aria-pressed="${skillView === "list"}">☷ Searchable list</button>
      </div>

      ${skillView === "tree" ? renderSkillTree() : `
        <section class="micro-skill-toolbar" aria-label="Micro-skill filters">
          <label class="search-field"><span aria-hidden="true">⌕</span><input id="skills-search" type="search" value="${escapeHtml(skillFilters.search)}" placeholder="Find whisking, colander, onion…" aria-label="Search micro-skills"></label>
          <select id="skill-status-filter" aria-label="Filter micro-skills by status">
            <option value="all" ${skillFilters.status === "all" ? "selected" : ""}>All micro-skills</option>
            <option value="practised" ${skillFilters.status === "practised" ? "selected" : ""}>Practised</option>
            <option value="unpractised" ${skillFilters.status === "unpractised" ? "selected" : ""}>Not practised</option>
            <option value="reliable" ${skillFilters.status === "reliable" ? "selected" : ""}>Reliable</option>
          </select>
          <strong id="skill-result-count">${visibleSkills.length} shown</strong>
        </section>
        <div class="cluster-list" id="skill-cluster-list">${renderSkillClusters()}</div>`}`;
  }

  function renderSkillTree() {
    const visibleSkillSet = availableSkills();
    const treeSkillSet = treeSkills();
    const clusters = [...new Set(treeSkillSet.map((skill) => skill.cluster))];
    const centre = { x: 500, y: 310 };
    const nodes = clusters.map((cluster, index) => {
      const angle = (-Math.PI / 2) + (index * Math.PI * 2) / clusters.length;
      const clusterSkills = treeSkillSet.filter((skill) => skill.cluster === cluster);
      const locked = isDietLockedSkill(clusterSkills[0]);
      const practised = locked ? 0 : clusterSkills.filter((skill) => (state.skillXp[skill.id] || 0) > 0).length;
      return {
        cluster,
        x: Math.round(centre.x + Math.cos(angle) * 382),
        y: Math.round(centre.y + Math.sin(angle) * 224),
        practised,
        total: clusterSkills.length,
        locked,
        ...clusterStyles[cluster]
      };
    });

    return `
      <section class="skill-tree-shell" aria-labelledby="tree-title">
        <div class="tree-heading">
          <div><p class="eyebrow">Connected capability tree</p><h2 id="tree-title">Kitchen Confidence</h2><p>Choose a coloured skill family to inspect its micro-skill branch.</p></div>
          <div class="tree-total"><strong>${visibleSkillSet.filter((skill) => (state.skillXp[skill.id] || 0) > 0).length}</strong><span>nodes lit</span></div>
        </div>

        <div class="skill-tree-scroll" tabindex="0" aria-label="Scrollable overview of the cooking skill tree">
          <div class="skill-tree-canvas">
            <svg class="tree-connections" viewBox="0 0 1000 620" aria-hidden="true" preserveAspectRatio="none">
              ${nodes.map((node) => `<line class="${node.practised && !node.locked ? "is-lit" : ""}" x1="${centre.x}" y1="${centre.y}" x2="${node.x}" y2="${node.y}" style="--edge-colour:${node.colour}"></line>`).join("")}
            </svg>
            <div class="tree-root" style="left:${centre.x / 10}%;top:${centre.y / 6.2}%"><span>🧑‍🍳</span><strong>Kitchen<br>Confidence</strong><small>${Math.round((visibleSkillSet.filter((skill) => (state.skillXp[skill.id] || 0) > 0).length / visibleSkillSet.length) * 100)}% conquered</small></div>
            ${nodes.map((node) => `
              <button class="skill-system-node ${selectedSkillCluster === node.cluster ? "is-selected" : ""} ${node.practised ? "is-lit" : ""} ${node.locked ? "is-diet-locked" : ""}" type="button" ${node.locked ? "disabled" : `data-graph-cluster="${escapeHtml(node.cluster)}"`} style="left:${node.x / 10}%;top:${node.y / 6.2}%;--cluster-colour:${node.colour}" aria-label="${node.locked ? `${escapeHtml(node.cluster)} is unavailable while Veg is selected` : `Open ${escapeHtml(node.cluster)}, ${node.practised} of ${node.total} practised`}">
                <span>${node.icon}</span><strong>${escapeHtml(node.cluster)}</strong><small>${node.locked ? "Veg unavailable" : `${node.practised}/${node.total}`}</small>
              </button>`).join("")}
          </div>
        </div>

        <div class="tree-legend" aria-label="Skill state legend">
          <strong>Node state</strong>
          <span><i class="legend-node unknown"></i>Not practised</span>
          <span><i class="legend-node discovered"></i>Discovered</span>
          <span><i class="legend-node practising"></i>Practising</span>
          <span><i class="legend-node comfortable"></i>Comfortable</span>
          <span><i class="legend-node reliable"></i>Reliable</span>
        </div>

        <div id="selected-skill-branch">${renderSelectedSkillBranch()}</div>
      </section>`;
  }

  function renderSelectedSkillBranch() {
    const clusterSkills = availableSkills().filter((skill) => skill.cluster === selectedSkillCluster);
    const style = clusterStyles[selectedSkillCluster] || { colour: "#ff6b35", icon: "⚡" };
    const practised = clusterSkills.filter((skill) => (state.skillXp[skill.id] || 0) > 0).length;
    return `
      <section class="skill-branch" style="--cluster-colour:${style.colour}">
        <div class="branch-heading">
          <div class="branch-root-node"><span>${style.icon}</span></div>
          <div><p class="eyebrow">Selected skill family</p><h2>${escapeHtml(selectedSkillCluster)}</h2><p>${practised} of ${clusterSkills.length} micro-skills practised. Select a node to find dishes that train it.</p></div>
          <div class="branch-progress" role="progressbar" aria-valuemin="0" aria-valuemax="${clusterSkills.length}" aria-valuenow="${practised}" aria-label="${escapeHtml(selectedSkillCluster)} progress"><span style="width:${Math.round((practised / clusterSkills.length) * 100)}%"></span></div>
        </div>
        <div class="branch-trunk" aria-hidden="true"></div>
        <div class="branch-node-grid">
          ${clusterSkills.map((skill) => {
            const xp = state.skillXp[skill.id] || 0;
            const status = skillState(xp);
            return `
              <button class="branch-skill-node skill-card--${status.className}" type="button" data-skill-dishes="${skill.id}" style="--node-progress:${status.percent * 3.6}deg">
                <span class="branch-connector" aria-hidden="true"></span>
                <span class="branch-skill-ring"><i>${skill.icon}</i></span>
                <span class="branch-skill-copy"><strong>${escapeHtml(skill.name)}</strong><small>${status.name} · ${xp} XP</small></span>
              </button>`;
          }).join("")}
        </div>
      </section>`;
  }

  function filteredSkills() {
    const search = skillFilters.search.trim().toLowerCase();
    return availableSkills().filter((skill) => {
      const xp = state.skillXp[skill.id] || 0;
      const status = skillState(xp);
      const matchesSearch = !search || [skill.name, skill.description, skill.cluster].join(" ").toLowerCase().includes(search);
      const matchesStatus = skillFilters.status === "all"
        || (skillFilters.status === "practised" && xp > 0)
        || (skillFilters.status === "unpractised" && xp === 0)
        || (skillFilters.status === "reliable" && status.className === "reliable");
      return matchesSearch && matchesStatus;
    });
  }

  function renderSkillClusters() {
    const visibleSkills = filteredSkills();
    const available = availableSkills();
    const clusters = [...new Set(available.map((skill) => skill.cluster))];
    const markup = clusters.map((cluster) => {
      const clusterSkills = visibleSkills.filter((skill) => skill.cluster === cluster);
      if (!clusterSkills.length) return "";
      const allClusterSkills = available.filter((skill) => skill.cluster === cluster);
      const practised = allClusterSkills.filter((skill) => (state.skillXp[skill.id] || 0) > 0).length;
      return `
        <section class="skill-cluster">
          <div class="cluster-heading"><div><p class="eyebrow">Skill family</p><h2>${escapeHtml(cluster)}</h2></div><span>${practised}/${allClusterSkills.length} practised</span></div>
          <div class="skill-grid">${clusterSkills.map(skillCard).join("")}</div>
        </section>`;
    }).join("");
    return markup || `<section class="empty-state compact-empty"><div class="empty-art">🔎</div><h2>No micro-skills match that filter.</h2><button class="button button-secondary" type="button" id="clear-skill-filters">Clear filters</button></section>`;
  }

  function skillCard(skill) {
    const xp = state.skillXp[skill.id] || 0;
    const status = skillState(xp);
    return `
      <button class="skill-card skill-card--${status.className}" type="button" data-skill-dishes="${skill.id}">
        <span class="skill-icon">${skill.icon}</span>
        <span class="skill-main"><strong>${escapeHtml(skill.name)}</strong><small>${escapeHtml(skill.description)}</small><span class="skill-progress"><i style="width:${status.percent}%"></i></span></span>
        <span class="skill-status"><strong>${status.name}</strong><small>${xp} XP</small></span>
      </button>`;
  }

  function renderDishes() {
    const container = document.querySelector("#view-dishes");
    const cooked = completedRecipeIds()
      .map(getRecipe)
      .filter(Boolean)
      .filter((recipe) => dietMatches(recipe, state.dietPreference))
      .sort((a, b) => (state.cooks[b.id]?.lastCooked || "").localeCompare(state.cooks[a.id]?.lastCooked || ""));
    container.innerHTML = `
      <header class="page-head dishes-head">
        <div><p class="eyebrow">Your kitchen, your choice</p><h1 id="dishes-heading">Dishes</h1><p>Aanya can suggest a dish, but you can cook anything here. Every completed dish earns XP.</p></div>
        <div class="summary-chip"><strong>${cooked.length} / ${recipes.filter((recipe) => dietMatches(recipe, state.dietPreference)).length}</strong><span>dishes made</span></div>
      </header>

      <section class="dish-made-section" aria-labelledby="dishes-made-heading">
        <div class="section-heading"><div><p class="eyebrow">Made by you</p><h2 id="dishes-made-heading">Your cooked dishes</h2></div><span class="tiny-tag">${cooked.length} made</span></div>
        ${cooked.length ? `
        <div class="dish-collection-grid">
          ${cooked.map((recipe) => `
            <article class="collection-card">
              ${picture(recipe, "collection")}
              <div class="collection-copy">
                <div><span class="tiny-tag">${escapeHtml(recipe.region)}</span><span class="tiny-tag">${escapeHtml(recipe.diet)}</span></div>
                <h2>${escapeHtml(recipe.name)}</h2>
                <p class="recipe-description">${escapeHtml(recipe.description)}</p>
                ${recipeMeta(recipe)}
                <div class="collection-bottom"><strong>Cooked ×${state.cooks[recipe.id].count}</strong><button class="text-button" type="button" data-open-recipe="${recipe.id}">Cook again →</button></div>
              </div>
            </article>`).join("")}
        </div>` : `<div class="dish-empty-state"><span aria-hidden="true">🍽️</span><div><h3>Your first dish card will appear here.</h3><p>Complete any guided recipe or technique mission to start your collection.</p></div><button class="text-button" type="button" data-focus-dish-search>Find a dish ↓</button></div>`}
      </section>

      <section class="dish-library" aria-labelledby="dish-library-heading">
        <div class="section-heading"><div><p class="eyebrow">Find your next cook</p><h2 id="dish-library-heading">Browse all dishes</h2><p><strong>Guided recipes</strong> include exact ingredients. <strong>Technique missions</strong> coach the cooking sequence while you use a trusted recipe for amounts.</p></div></div>
        <div class="dish-discovery-bar">
          <label class="search-field dish-search"><span aria-hidden="true">⌕</span><input id="dishes-search" type="search" value="${escapeHtml(dishFilters.search)}" placeholder="Search dish, cuisine, or region…" aria-label="Search dishes" aria-describedby="dish-result-count"></label>
          <div class="dish-filter-chips" role="group" aria-label="Filter dishes">
            ${[
              ["all", "All"],
              ["guided", "Guided"],
              ["quick", "≤ 20 min"],
              ["protein", "Protein focus"]
            ].map(([value, label]) => `<button type="button" class="${dishFilters.goal === value ? "is-active" : ""}" data-dish-goal="${value}" aria-pressed="${dishFilters.goal === value}">${label}</button>`).join("")}
          </div>
        </div>
        <div id="dish-library-results">${renderDishLibraryResults()}</div>
      </section>`;
  }

  function renderDishLibraryResults() {
    const available = filteredDishes();
    const shown = available.slice(0, dishResultLimit);
    return `
      <strong class="dish-result-count" id="dish-result-count">Showing ${shown.length} of ${available.length}</strong>
      <div class="compact-card-grid" id="dish-library-grid">${shown.map(compactRecipeCard).join("") || `<div class="empty-state compact-empty"><div class="empty-art">🔎</div><h3>No dishes match those filters.</h3><p>Try a shorter name or choose All.</p></div>`}</div>
      ${shown.length < available.length ? `<div class="dish-scroll-sentinel" data-dish-scroll-sentinel role="status" aria-live="polite">Loading more dishes as you scroll…</div>` : ""}`;
  }

  function observeDishSentinel() {
    dishObserver?.disconnect();
    dishObserver = null;
    const sentinel = document.querySelector("[data-dish-scroll-sentinel]");
    if (!sentinel || !("IntersectionObserver" in window)) return;
    dishObserver = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;
      const total = filteredDishes().length;
      if (dishResultLimit >= total) return;
      dishResultLimit = Math.min(dishResultLimit + 12, total);
      updateDishLibraryResults();
    }, { rootMargin: "0px 0px 420px" });
    dishObserver.observe(sentinel);
  }

  function loadDishesNearBottom() {
    if (activeRoute !== "dishes" || !document.querySelector("[data-dish-scroll-sentinel]")) return;
    const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 560;
    const total = filteredDishes().length;
    if (!nearBottom || dishResultLimit >= total) return;
    dishResultLimit = Math.min(dishResultLimit + 12, total);
    updateDishLibraryResults();
  }

  function updateDishLibraryResults() {
    const results = document.querySelector("#dish-library-results");
    if (!results) return;
    results.innerHTML = renderDishLibraryResults();
    wireImageFallbacks(results);
    observeDishSentinel();
  }

  function filteredDishes() {
    const search = dishFilters.search.trim().toLowerCase();
    return recipes.filter((recipe) => {
      const matchesDiet = dietMatches(recipe, state.dietPreference);
      const matchesSearch = !search || [recipe.name, recipe.cuisine, recipe.region, recipe.description, recipe.tags?.join(" ")].join(" ").toLowerCase().includes(search);
      const matchesGoal = dishFilters.goal === "all"
        || (dishFilters.goal === "guided" && isReviewedGuide(recipe))
        || (dishFilters.goal === "quick" && recipe.minutes <= 20)
        || (dishFilters.goal === "protein" && recipe.protein >= 15);
      return matchesDiet && matchesSearch && matchesGoal;
    });
  }

  function themedCollectionProgress(collection) {
    const cooked = completedRecipeIds().map(getRecipe).filter(Boolean).filter((recipe) => dietMatches(recipe, state.dietPreference));
    if (collection.id === "protein-variety") return cooked.filter((recipe) => recipe.protein >= 15).length;
    if (collection.tag === "world") {
      return new Set(cooked.filter((recipe) => recipe.country && recipe.country !== "India").map((recipe) => recipe.country)).size;
    }
    if (collection.tag === "south-tiffin") {
      return cooked.filter((recipe) => recipe.region === "South India" && recipe.tags?.includes("breakfast")).length;
    }
    return cooked.filter((recipe) => recipe.tags?.includes(collection.tag)).length;
  }

  function eligibleMapItems(items) {
    return items.filter((item) => {
      const recipe = getRecipe(item.dishId);
      return recipe && dietMatches(recipe, state.dietPreference);
    });
  }

  function renderMapMarkers(items, type) {
    return items.map((item) => {
      const recipe = getRecipe(item.dishId);
      const complete = Boolean(state.cooks[item.dishId]?.count);
      return `
        <button class="map-marker ${complete ? "is-complete" : ""}" type="button" data-open-recipe="${item.dishId}" style="left:${item.x}%;top:${item.y}%" aria-label="${escapeHtml(item.name)}: ${escapeHtml(recipe?.name || "dish")}, ${complete ? "collected" : "not collected"}" title="${escapeHtml(item.name)} · ${escapeHtml(recipe?.name || "")}">
          <span>${complete ? "✓" : recipe?.emoji || (type === "india" ? "●" : "◆")}</span>
        </button>`;
    }).join("");
  }

  function renderMapChecklist(items) {
    return items.map((item) => {
      const recipe = getRecipe(item.dishId);
      const complete = Boolean(state.cooks[item.dishId]?.count);
      return `
        <button class="map-check-item ${complete ? "is-complete" : ""}" type="button" data-open-recipe="${item.dishId}">
          <span class="map-check-thumb">${recipe?.photo ? `<img src="${recipe.photo.url}" alt="" loading="lazy" referrerpolicy="no-referrer">` : recipe?.emoji || "○"}${complete ? "<i>✓</i>" : ""}</span>
          <span><strong>${escapeHtml(item.name)}</strong><small>${escapeHtml(recipe?.name || "Dish coming soon")}</small></span>
        </button>`;
    }).join("");
  }

  function filteredTitles() {
    const search = titleFilters.search.trim().toLowerCase();
    return titleCatalog.filter((title) => {
      const matchesCategory = titleFilters.category === "all" || title.category === titleFilters.category;
      const matchesSearch = !search || [title.name, title.description, title.requirement, title.category].join(" ").toLowerCase().includes(search);
      return matchesCategory && matchesSearch;
    });
  }

  function renderTitleCards() {
    const equipped = equippedTitle();
    return filteredTitles().map((title) => {
      const progress = titleProgress(title);
      const isEquipped = equipped.id === title.id;
      const progressLabel = title.condition.target === 0 ? "Unlocked from the start" : `${progress.value} / ${progress.total}`;
      return `
        <article class="title-card ${progress.complete ? "is-unlocked" : "is-locked"} ${isEquipped ? "is-equipped" : ""}">
          <div class="title-card-top"><span class="title-card-icon">${title.icon}</span><span class="title-state">${isEquipped ? "Equipped" : progress.complete ? "Unlocked" : "Discoverable"}</span></div>
          <p class="eyebrow">${escapeHtml(title.category)}</p>
          <h3>${escapeHtml(title.name)}</h3>
          <p class="title-joke">${escapeHtml(title.description)}</p>
          <p class="title-requirement"><strong>Unlock:</strong> ${escapeHtml(title.requirement)}</p>
          <div class="title-progress" role="progressbar" aria-label="Progress toward ${escapeHtml(title.name)}" aria-valuenow="${progress.percent}" aria-valuemin="0" aria-valuemax="100"><span style="width:${progress.percent}%"></span></div>
          <div class="title-card-foot"><strong>${progressLabel}</strong>${progress.complete ? `<button class="title-equip-button" type="button" data-equip-title="${title.id}" ${isEquipped ? "disabled" : ""}>${isEquipped ? "Using title" : "Equip"}</button>` : "<span>🔒</span>"}</div>
        </article>`;
    }).join("") || `<div class="empty-state title-empty"><span>🔎</span><strong>No titles match that search.</strong></div>`;
  }

  function renderTitleVault() {
    const earned = unlockedTitles().length;
    const equipped = equippedTitle();
    const categories = [...new Set(titleCatalog.map((title) => title.category))];
    if (earned <= 1 && !titleVaultExpanded) {
      const nextTitles = titleCatalog.filter((title) => !titleProgress(title).complete).slice(0, 3);
      return `
        <section class="title-vault title-vault--preview">
          <div class="title-vault-head"><div><p class="eyebrow">Your next rewards</p><h2>Title Vault</h2><p>Unlock a title by cooking. Your next three are enough to aim at today.</p></div><div class="equipped-title-card"><span>${equipped.icon}</span><div><small>Equipped title</small><strong>${escapeHtml(equipped.name)}</strong></div></div></div>
          <div class="title-preview-grid">${nextTitles.map((title) => { const progress = titleProgress(title); return `<article class="title-preview-card"><span>${title.icon}</span><div><strong>${escapeHtml(title.name)}</strong><small>${escapeHtml(title.requirement)}</small><b>${progress.value}/${progress.total}</b></div></article>`; }).join("")}</div>
          <button class="text-button" type="button" data-open-title-vault>Browse all ${titleCatalog.length} titles</button>
        </section>`;
    }
    return `
      <section class="title-vault">
        <div class="title-vault-head">
          <div><p class="eyebrow">100 ways to name your cooking style</p><h2>Title Vault</h2><p>Every title is visible from day one. Cook, practise, explore, or grow a streak to unlock one, then equip it beside your name.</p></div>
          <div class="equipped-title-card"><span>${equipped.icon}</span><div><small>Equipped title</small><strong>${escapeHtml(equipped.name)}</strong></div></div>
        </div>
        <div class="title-toolbar">
          <label class="search-field"><span aria-hidden="true">⌕</span><input id="title-search" type="search" value="${escapeHtml(titleFilters.search)}" placeholder="Search all 100 titles" aria-label="Search titles"></label>
          <div class="title-category-tabs" aria-label="Title category">
            <button class="title-category-button ${titleFilters.category === "all" ? "is-active" : ""}" type="button" data-title-category="all">All</button>
            ${categories.map((category) => `<button class="title-category-button ${titleFilters.category === category ? "is-active" : ""}" type="button" data-title-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join("")}
          </div>
        </div>
        <div class="title-results-line"><strong id="title-result-count">${filteredTitles().length} shown</strong><span>${earned}/${titleCatalog.length} earned</span></div>
        <div class="title-grid" id="title-grid">${renderTitleCards()}</div>
      </section>`;
  }

  function renderCollections() {
    const container = document.querySelector("#view-collections");
    const indiaItems = eligibleMapItems(collectionConfig.indiaStates);
    const worldItems = eligibleMapItems(collectionConfig.worldCountries);
    const indiaComplete = indiaItems.filter((item) => state.cooks[item.dishId]?.count).length;
    const worldComplete = worldItems.filter((item) => state.cooks[item.dishId]?.count).length;
    const themedComplete = collectionConfig.themed.filter((item) => themedCollectionProgress(item) >= item.target).length;
    const titleComplete = unlockedTitles().length;

    container.innerHTML = `
      <header class="page-head collections-head">
        <div><p class="eyebrow">Every cook leaves a mark</p><h1 id="collections-heading">Your collection</h1><p>See what you have earned, then choose one reachable reward to chase next.</p></div>
        <div class="summary-chip"><strong>${indiaComplete + worldComplete}</strong><span>map stamps found</span></div>
      </header>

      ${renderTitleVault()}

      <section class="collection-overview">
        <div><span>🇮🇳</span><strong>${indiaComplete}/${indiaItems.length}</strong><small>Indian states</small></div>
        <div><span>🌍</span><strong>${worldComplete}/${worldItems.length}</strong><small>World passport</small></div>
        <div><span>🏅</span><strong>${themedComplete}/${collectionConfig.themed.length}</strong><small>Sets completed</small></div>
        <div><span>🍽️</span><strong>${completedRecipeIds().length}/${recipes.length}</strong><small>Dish cards</small></div>
        <div><span>👑</span><strong>${titleComplete}/${titleCatalog.length}</strong><small>Titles earned</small></div>
      </section>

      <section class="map-collection map-collection--india">
        <div class="map-collection-heading">
          <div><p class="eyebrow">Grand collection 01</p><h2>India State Plate</h2><p>Cook one compatible associated dish from every state. Labels indicate association, not exclusive ownership.</p></div>
          <div class="map-collection-score"><strong>${indiaComplete}/${indiaItems.length}</strong><span>states tasted</span></div>
        </div>
        <div class="map-layout">
          <div class="map-visual map-visual--india">
            <img src="${collectionConfig.maps.india.url}" alt="Outline map of India" loading="lazy" referrerpolicy="no-referrer">
            ${renderMapMarkers(indiaItems, "india")}
            <a class="map-credit" href="${collectionConfig.maps.india.page}" target="_blank" rel="noreferrer">${escapeHtml(collectionConfig.maps.india.credit)} ↗</a>
          </div>
          <div class="map-checklist" aria-label="Indian state dishes">${renderMapChecklist(indiaItems)}</div>
        </div>
      </section>

      <section class="map-collection map-collection--world">
        <div class="map-collection-heading">
          <div><p class="eyebrow">Grand collection 02</p><h2>World Kitchen Passport</h2><p>Start with accessible compatible dishes, then unlock more ambitious international recipes.</p></div>
          <div class="map-collection-score"><strong>${worldComplete}/${worldItems.length}</strong><span>passport stamps</span></div>
        </div>
        <div class="world-map-stack">
          <div class="map-visual map-visual--world">
            <img src="${collectionConfig.maps.world.url}" alt="Blank world map with country borders" loading="lazy" referrerpolicy="no-referrer">
            ${renderMapMarkers(worldItems, "world")}
            <a class="map-credit" href="${collectionConfig.maps.world.page}" target="_blank" rel="noreferrer">${escapeHtml(collectionConfig.maps.world.credit)} ↗</a>
          </div>
          <div class="passport-strip" aria-label="World cuisine dishes">${renderMapChecklist(worldItems)}</div>
        </div>
      </section>

      <section class="themed-collections">
        <div class="section-heading"><div><p class="eyebrow">Specialist sets</p><h2>Build titles through variety</h2></div></div>
        <div class="collectible-grid">
          ${collectionConfig.themed.map((collection) => {
            const value = themedCollectionProgress(collection);
            const complete = value >= collection.target;
            const percent = Math.min(100, Math.round((value / collection.target) * 100));
            return `
              <article class="collectible-card ${complete ? "is-complete" : ""}">
                <div class="collectible-medal"><span>${collection.icon}</span></div>
                <div><p class="eyebrow">${complete ? "Collection complete" : "In progress"}</p><h3>${escapeHtml(collection.name)}</h3><p>${escapeHtml(collection.description)}</p></div>
                <div class="collectible-progress"><span style="width:${percent}%"></span></div>
                <strong>${Math.min(value, collection.target)} / ${collection.target}</strong>
              </article>`;
          }).join("")}
        </div>
      </section>`;
  }

  function matchesRoadmapTrack(recipe, trackId) {
    if (trackId === "all") return true;
    if (trackId === "morning") return recipe.stage <= 2 && (recipe.tags?.includes("breakfast") || recipe.tags?.includes("drink") || /tea|coffee|water|juice|milk|toast|egg|poha|upma|oats|smoothie|sandwich/i.test(recipe.name));
    if (trackId === "dal-legume") return recipe.country === "India" && recipe.stage >= 2 && recipe.stage <= 5 && (recipe.tags?.includes("legumes") || /dal|chana|rajma|sambar|rasam/i.test(recipe.name));
    if (trackId === "veg-curry") return recipe.country === "India" && recipe.stage >= 2 && recipe.stage <= 5 && (recipe.tags?.includes("vegetable") || recipe.tags?.includes("curry") || /sabzi|curry/i.test(recipe.name));
    if (trackId === "rice-onepot") return recipe.country === "India" && recipe.stage >= 2 && recipe.stage <= 5 && (recipe.tags?.includes("rice") || recipe.tags?.includes("one-pot") || /khichdi|pulao|rice/i.test(recipe.name));
    if (trackId === "family-meals") return recipe.tags?.includes("full-meal") || (recipe.country === "India" && recipe.stage === 7);
    if (trackId === "plant-protein-fast") return (recipe.protein >= 15 || recipe.tags?.includes("protein")) && recipe.minutes <= 20 && ["Vegetarian", "Vegan"].includes(recipe.diet);
    if (trackId === "plant-protein-meals") return (recipe.protein >= 15 || recipe.tags?.includes("protein")) && recipe.minutes > 20 && recipe.minutes <= 35 && ["Vegetarian", "Vegan"].includes(recipe.diet);
    if (trackId === "egg-meat-protein") return (recipe.protein >= 15 || recipe.tags?.includes("protein")) && recipe.minutes <= 35 && ["Egg", "Non-vegetarian"].includes(recipe.diet);
    if (trackId === "one-pot") return recipe.tags?.includes("one-pot");
    if (trackId === "dough") return recipe.tags?.some((tag) => ["dough", "bread"].includes(tag)) || /roti|paratha|naan|puri|bhatura|bread|focaccia|pizza dough/i.test(recipe.name);
    if (trackId === "south-tiffin") return recipe.region === "South India" && (recipe.tags?.includes("breakfast") || recipe.tags?.includes("batter") || /idli|dosa|uttapam|upma|pongal|chutney|appam|puttu/i.test(recipe.name));
    if (trackId === "south-meals") return recipe.region === "South India" && !matchesRoadmapTrack(recipe, "south-tiffin");
    if (trackId === "north") return recipe.region === "North India";
    if (trackId === "west") return recipe.region === "West India";
    if (trackId === "east-ne") return ["East India", "Northeast India", "Central India"].includes(recipe.region);
    if (trackId === "sweet") return recipe.tags?.includes("dessert") || recipe.tags?.includes("pastry");
    if (trackId === "pan-asian") return ["China", "Japan", "South Korea", "Thailand", "Vietnam", "Indonesia", "Philippines", "Malaysia", "Singapore"].includes(recipe.country);
    if (trackId === "italian") return recipe.country === "Italy" || recipe.tags?.includes("italian") || /italian|pasta|pizza|risotto|spaghetti|gnocchi|focaccia/i.test(`${recipe.name} ${recipe.cuisine}`);
    if (trackId === "world-foundations") return recipe.country && recipe.country !== "India" && recipe.stage <= 3;
    if (trackId === "world-showpieces") return recipe.country && recipe.country !== "India" && recipe.stage >= 4;
    return false;
  }

  function trackRecipes(trackId, applyDiet = false) {
    return recipes.filter((recipe) => matchesRoadmapTrack(recipe, trackId) && (!applyDiet || dietMatches(recipe, state.dietPreference)));
  }

  function renderRoadmapTrackPicker() {
    const isFirstChoice = completedRecipeIds().length < 3 && !roadmapCatalogueExpanded;
    const starterTrackIds = ["morning", "plant-protein-fast", "one-pot"];
    const visibleTracks = isFirstChoice ? roadmapTracks.filter((track) => starterTrackIds.includes(track.id)) : roadmapTracks;
    return `${visibleTracks.map((track) => {
      const matching = trackRecipes(track.id, true);
      const complete = matching.filter((recipe) => state.cooks[recipe.id]?.count).length;
      const active = track.id === roadmapFilters.track;
      return `
        <button class="roadmap-track-card ${active ? "is-active" : ""}" type="button" data-roadmap-track="${track.id}" aria-pressed="${active}" style="--track-colour:${track.colour}">
          <span class="roadmap-track-icon">${track.icon}</span>
          <span><strong>${escapeHtml(track.name)}</strong><small>${escapeHtml(track.description)}</small></span>
          <span class="roadmap-track-progress">${complete}/${matching.length}</span>
        </button>`;
    }).join("")}${isFirstChoice ? `<button class="roadmap-track-card roadmap-track-card--more" type="button" data-expand-roadmap-catalogue><span class="roadmap-track-icon">🗺️</span><span><strong>Explore every path</strong><small>Open the full set of ${roadmapTracks.length - 1} guided cooking paths when you are ready.</small></span></button>` : ""}`;
  }

  function renderRoadmap() {
    const container = document.querySelector("#view-roadmap");
    const selectedTrack = roadmapTracks.find((track) => track.id === roadmapFilters.track) || roadmapTracks[0];
    const selectedRecipes = trackRecipes(selectedTrack.id, true);
    const selectedComplete = selectedRecipes.filter((recipe) => state.cooks[recipe.id]?.count).length;
    container.innerHTML = `
      <header class="page-head roadmap-head">
        <div><p class="eyebrow">${completedRecipeIds().length < 3 && !roadmapCatalogueExpanded ? "Start with one easy route" : `Choose a speciality · ${roadmapTracks.length - 1} guided paths + open catalogue`}</p><h1 id="roadmap-heading">Choose your cooking path</h1><p>${completedRecipeIds().length < 3 && !roadmapCatalogueExpanded ? "Follow one beginner-friendly route, or switch paths whenever your mood changes." : "Pick a focused path. Open Catalogue always keeps the complete library available."}</p></div>
        <div class="summary-chip"><strong>${selectedComplete} / ${selectedRecipes.length}</strong><span>${escapeHtml(selectedTrack.name)} missions</span></div>
      </header>

      <p class="roadmap-swipe-hint">Swipe to compare paths →</p>
      <section class="roadmap-track-picker" aria-label="Choose a chef roadmap">${renderRoadmapTrackPicker()}</section>

      <section class="selected-roadmap-banner" style="--track-colour:${selectedTrack.colour}">
        <span>${selectedTrack.icon}</span>
        <div><p class="eyebrow">Active roadmap</p><h2>${escapeHtml(selectedTrack.name)}</h2><p>${escapeHtml(selectedTrack.description)}</p></div>
      </section>

      <section class="filter-bar" aria-label="Roadmap filters">
        <label class="search-field"><span aria-hidden="true">⌕</span><input id="roadmap-search" type="search" value="${escapeHtml(roadmapFilters.search)}" placeholder="Search dish or cuisine" aria-label="Search dish or cuisine"></label>
        <select id="region-filter" aria-label="Filter by region">
          <option value="all">All regions</option>
          <option value="South India" ${roadmapFilters.region === "South India" ? "selected" : ""}>South Indian</option>
          <option value="North India" ${roadmapFilters.region === "North India" ? "selected" : ""}>North Indian</option>
          <option value="East India" ${roadmapFilters.region === "East India" ? "selected" : ""}>East Indian</option>
          <option value="West India" ${roadmapFilters.region === "West India" ? "selected" : ""}>West Indian</option>
          <option value="Central India" ${roadmapFilters.region === "Central India" ? "selected" : ""}>Central Indian</option>
          <option value="Northeast India" ${roadmapFilters.region === "Northeast India" ? "selected" : ""}>Northeast Indian</option>
          <option value="Pan-Indian" ${roadmapFilters.region === "Pan-Indian" ? "selected" : ""}>Pan-Indian</option>
          <option value="International" ${roadmapFilters.region === "International" ? "selected" : ""}>International</option>
          <option value="Everywhere" ${roadmapFilters.region === "Everywhere" ? "selected" : ""}>Everyday basics</option>
        </select>
      </section>

      <div class="roadmap-path" id="roadmap-path">${renderRoadmapStages()}</div>

      <aside class="research-note">
        <span aria-hidden="true">📚</span>
        <div><strong>Why this order?</strong><p>It adapts standard culinary foundations, safety, measuring, knife work, dry and moist heat, eggs, grains, legumes, dough, and meal planning into a beginner Indian home kitchen.</p></div>
        <a href="CURRICULUM.md" target="_blank">Read curriculum notes →</a>
      </aside>`;
  }

  function filteredRecipes() {
    const search = roadmapFilters.search.trim().toLowerCase();
    return recipes.filter((recipe) => {
      const matchesTrack = matchesRoadmapTrack(recipe, roadmapFilters.track);
      const matchesSearch = !search || [recipe.name, recipe.cuisine, recipe.region, recipe.diet, recipe.description].join(" ").toLowerCase().includes(search);
      const matchesRegion = roadmapFilters.region === "all" || recipe.region === roadmapFilters.region;
      const matchesDiet = dietMatches(recipe, roadmapFilters.diet);
      return matchesTrack && matchesSearch && matchesRegion && matchesDiet;
    });
  }

  function renderRoadmapStages() {
    const visibleRecipes = filteredRecipes();
    return stages.map((stage) => {
      const stageRecipes = visibleRecipes.filter((recipe) => recipe.stage === stage.id);
      if (!stageRecipes.length) return "";
      const progress = stageProgress(stage.id, visibleRecipes);
      const recommended = stage.id <= levelInfo().unlockedStage;
      const filtersActive = Boolean(roadmapFilters.search.trim()) || roadmapFilters.region !== "all" || roadmapFilters.diet !== "Veg";
      const showAll = filtersActive || expandedRoadmapStages.has(stage.id);
      const displayedRecipes = showAll ? stageRecipes : stageRecipes.slice(0, 12);
      return `
        <section class="roadmap-stage roadmap-stage--${stage.colour}">
          <div class="stage-rail"><div class="stage-node">${stage.icon}</div><div class="stage-line"></div></div>
          <div class="stage-body">
            <div class="stage-heading">
              <div><p class="eyebrow">Packet ${stage.id} · ${escapeHtml(stage.kicker)}</p><h2>${escapeHtml(stage.name)}</h2><p>${escapeHtml(stage.description)}</p></div>
              <div class="stage-progress"><strong>${progress.complete}/${progress.total}</strong><span>complete</span><div class="mini-progress"><i style="width:${progress.percent}%"></i></div></div>
            </div>
            ${recommended ? '<span class="recommended-flag">IN YOUR RECOMMENDATION RANGE</span>' : ""}
            <div class="roadmap-recipe-grid">
              ${displayedRecipes.map((recipe) => `
                <button class="roadmap-recipe ${state.cooks[recipe.id]?.count ? "is-complete" : ""}" type="button" data-open-recipe="${recipe.id}">
                  <span class="roadmap-recipe-icon">${recipe.emoji}</span>
                  <span class="roadmap-recipe-main"><strong>${escapeHtml(recipe.name)}</strong><small>${escapeHtml(recipe.description)}</small><small>${escapeHtml(recipe.cuisine)} · ${recipe.minutes} min${isReviewedGuide(recipe) ? ` · ~${recipe.protein} g protein / serving` : recipe.protein >= 15 ? " · Protein-focused" : ""}</small></span>
                  <span class="roadmap-recipe-xp">${state.cooks[recipe.id]?.count ? "✓ Cooked" : `+${recipe.xp} XP`}</span>
                </button>`).join("")}
            </div>
            ${!showAll && stageRecipes.length > displayedRecipes.length ? `<button class="stage-expand-button" type="button" data-expand-stage="${stage.id}">Show all ${stageRecipes.length} missions in ${escapeHtml(stage.name)} ↓</button>` : ""}
          </div>
        </section>`;
    }).join("") || `<section class="empty-state compact-empty"><div class="empty-art">🔎</div><h2>No dishes match those filters.</h2><button class="button button-secondary" type="button" id="clear-roadmap-filters">Clear filters</button></section>`;
  }

  function checkpointXpCap(recipe) {
    return Math.max(1, Math.floor(recipe.xp * 0.3));
  }

  function checkpointXpForStep(recipe, index) {
    const cap = checkpointXpCap(recipe);
    const base = Math.floor(cap / recipe.steps.length);
    return base + (index < cap % recipe.steps.length ? 1 : 0);
  }

  function recipeReadinessPanel(recipe) {
    if (!isReviewedGuide(recipe)) return `
      <section class="recipe-readiness recipe-readiness--limited">
        <div><p class="eyebrow">Draft guide · review before cooking</p><h3>Use a trusted recipe for exact amounts</h3><p>${escapeHtml(recipe.guide.reviewNote)}</p></div>
        <div class="recipe-readiness-grid"><div><strong>Draft ingredients</strong><ul>${recipe.guide.ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div><div><strong>Equipment</strong><ul>${recipe.guide.equipment.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div></div>
      </section>`;
    return `
      <details class="recipe-readiness" open>
        <summary><span><small class="eyebrow">Before you cook</small><strong id="recipe-readiness-heading">Check what you need</strong></span><span class="recipe-serves">${escapeHtml(recipe.guide.serves)}</span></summary>
        <div class="recipe-readiness-content">
          <div class="recipe-readiness-grid">
            <div><strong>Ingredients</strong><ul>${recipe.guide.ingredients.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
            <div><strong>Equipment</strong><ul>${recipe.guide.equipment.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
          </div>
          <p class="recipe-readiness-swap"><strong>Easy swap:</strong> ${escapeHtml(recipe.guide.swaps)}</p>
        </div>
      </details>`;
  }

  function openRecipe(recipeId) {
    const recipe = getRecipe(recipeId);
    if (!recipe) return;
    cookDialog.classList.remove("is-complete");
    cookDialog.setAttribute("aria-labelledby", "cook-dialog-title");
    const learnedSkillNames = recipe.skillIds.map((id) => skills.find((skill) => skill.id === id)).filter(Boolean);
    const stepKey = activeStepKey(recipe);
    const checked = new Set(state.completedSteps[stepKey] || []);
    const claimed = new Set(state.checkpointClaims[stepKey] || []);
    const bankedXp = state.checkpointXp[stepKey] || 0;
    const xpCap = checkpointXpCap(recipe);
    const allStepsComplete = checked.size === recipe.steps.length;

    cookDialogContent.innerHTML = `
      <div class="sheet-head">
        <div><p class="eyebrow">${isReviewedGuide(recipe) ? "Reviewed guide" : "Draft guide"} · Stage ${recipe.stage}</p><h2 id="cook-dialog-title">${escapeHtml(recipe.name)}</h2></div>
        <button class="icon-button" type="button" data-close-dialog aria-label="Close recipe">×</button>
      </div>
      <div class="recipe-sheet-grid">
        <div>${picture(recipe, "sheet")}</div>
        <div class="recipe-sheet-info">
          <p class="recipe-description">${escapeHtml(recipe.description)}</p>
          ${recipeMeta(recipe)}
          <div class="skill-chip-row">${learnedSkillNames.slice(0, 10).map((skill) => `<span>${skill.icon} ${escapeHtml(skill.name)}</span>`).join("")}${learnedSkillNames.length > 10 ? `<span>+${learnedSkillNames.length - 10} more micro-skills</span>` : ""}</div>
          <div class="safety-callout"><strong>Safety check</strong><span>${escapeHtml(recipe.safety)}</span></div>
        </div>
      </div>
      ${recipeReadinessPanel(recipe)}
      <div class="mission-steps">
        <div class="checkpoint-reward-callout">
          <div><strong>Earn XP as you cook</strong><span>Check off each completed step. Your checkpoint XP stays saved if you pause.</span></div>
          <div><strong id="checkpoint-xp-count">+${bankedXp}/${xpCap} XP</strong><span>banked</span></div>
        </div>
        <div class="checkpoint-progress"><span id="checkpoint-progress-fill" style="width:${Math.round((checked.size / recipe.steps.length) * 100)}%"></span></div>
        <div class="mission-heading"><div><p class="eyebrow">Cooking checklist</p><h3>Follow one step at a time.</h3></div><span id="step-count">${checked.size}/${recipe.steps.length}</span></div>
        ${recipe.steps.map((step, index) => `
          <button class="mission-step ${checked.has(index) ? "is-done" : ""}" type="button" data-toggle-step="${index}" data-recipe-id="${recipe.id}" data-attempt-key="${stepKey}">
            <span>${checked.has(index) ? "✓" : index + 1}</span><strong>${escapeHtml(step)}</strong><small>${claimed.has(index) ? "XP banked" : `+${checkpointXpForStep(recipe, index)} XP`}</small>
          </button>`).join("")}
      </div>
      <div class="sheet-actions">
        <div class="sheet-action-buttons">
          <button class="button button-primary button-large" type="button" data-complete-recipe="${recipe.id}" ${allStepsComplete ? "" : "disabled"}>${allStepsComplete ? (state.cooks[recipe.id]?.count ? "Log another cook" : "Finish dish · claim reward") : `Finish after ${recipe.steps.length - checked.size} ${recipe.steps.length - checked.size === 1 ? "step" : "steps"}`}</button>
          <button class="text-button" type="button" data-close-dialog>Pause, progress is saved</button>
        </div>
        <small>Protein values are approximate per serving. Food photos and nutrition are not proof of food safety.</small>
      </div>`;

    if (typeof cookDialog.showModal === "function") cookDialog.showModal();
    else cookDialog.setAttribute("open", "");
    wireImageFallbacks(cookDialogContent);
  }

  function toggleMissionStep(button) {
    const recipeId = button.dataset.recipeId;
    const recipe = getRecipe(recipeId);
    const index = Number(button.dataset.toggleStep);
    const key = button.dataset.attemptKey || activeStepKey(recipe);
    const completed = new Set(state.completedSteps[key] || []);
    const claimed = new Set(state.checkpointClaims[key] || []);
    let reward = 0;
    if (completed.has(index)) completed.delete(index);
    else {
      completed.add(index);
      if (!claimed.has(index)) {
        reward = checkpointXpForStep(recipe, index);
        claimed.add(index);
        state.xp += reward;
        state.checkpointXp[key] = (state.checkpointXp[key] || 0) + reward;
      }
    }
    state.completedSteps[key] = [...completed];
    state.checkpointClaims[key] = [...claimed];
    saveState();
    button.classList.toggle("is-done", completed.has(index));
    button.querySelector("span").textContent = completed.has(index) ? "✓" : String(index + 1);
    button.querySelector("small").textContent = claimed.has(index) ? "XP banked" : `+${checkpointXpForStep(recipe, index)} XP`;
    cookDialog.querySelector("#step-count").textContent = `${completed.size}/${recipe.steps.length}`;
    cookDialog.querySelector("#checkpoint-xp-count").textContent = `+${state.checkpointXp[key] || 0}/${checkpointXpCap(recipe)} XP`;
    cookDialog.querySelector("#checkpoint-progress-fill").style.width = `${Math.round((completed.size / recipe.steps.length) * 100)}%`;
    const shipButton = cookDialog.querySelector("[data-complete-recipe]");
    const allStepsComplete = completed.size === recipe.steps.length;
    shipButton.disabled = !allStepsComplete;
    shipButton.textContent = allStepsComplete
      ? (state.cooks[recipe.id]?.count ? "Log another cook" : "Finish dish · claim reward")
      : `Finish after ${recipe.steps.length - completed.size} ${recipe.steps.length - completed.size === 1 ? "step" : "steps"}`;
    if (reward) showToast(`Checkpoint cleared · +${reward} XP banked`);
  }

  function renderCookCompletion(recipe, reward) {
    const badge = nextBadge();
    const badgeStatus = badgeProgress(badge);
    const unlocks = [
      ...reward.badges.map((item) => `${item.icon} ${item.name}`),
      ...reward.titles.slice(0, 2).map((item) => `${item.icon} ${item.name}`)
    ];
    cookDialog.classList.add("is-complete");
    cookDialog.setAttribute("aria-labelledby", "cook-complete-heading");
    cookDialogContent.innerHTML = `
      <section class="cook-complete" aria-labelledby="cook-complete-heading">
        <button class="icon-button cook-complete-close" type="button" data-close-dialog aria-label="Close celebration">×</button>
        <div class="cook-complete-art"><img src="assets/aanya/variations/proud-plating.jpg?v=3" alt="Aanya proudly presenting your finished dish"></div>
        <div class="cook-complete-copy">
          <p class="eyebrow">Dish complete</p>
          <h2 id="cook-complete-heading" tabindex="-1">You cooked ${escapeHtml(recipe.name)}!</h2>
          <p>Aanya says: that counts. Your practice, rewards, and dish card are saved.</p>
          <div class="cook-reward-grid" aria-label="Rewards earned">
            <div><span aria-hidden="true">⚡</span><strong>+${reward.totalXp} XP</strong><small>this cook</small></div>
            <div><span aria-hidden="true">🌱</span><strong>${recipe.skillIds.length} skills</strong><small>${reward.newSkills} newly discovered</small></div>
            <div><span aria-hidden="true">🔥</span><strong>${state.streak} day</strong><small>current streak</small></div>
          </div>
          ${unlocks.length ? `<p class="cook-unlocks"><strong>Unlocked:</strong> ${escapeHtml(unlocks.join(" · "))}</p>` : `<p class="cook-unlocks"><strong>${reward.isFirst ? "First-cook stamp added." : "Cook count increased."}</strong></p>`}
          <div class="cook-next-target">
            <span>${badge.icon}</span>
            <div><small>Next reward</small><strong>${escapeHtml(badge.name)}</strong><div class="mini-progress"><i style="width:${Math.min(100, (badgeStatus.value / badge.target) * 100)}%"></i></div><small>${badgeStatus.value}/${badge.target}</small></div>
          </div>
          <div class="cook-complete-actions">
            <button class="button button-primary button-large" type="button" data-route="home" data-close-dialog>Back to Today</button>
            <button class="button button-secondary" type="button" data-route="dishes" data-close-dialog>Choose another dish</button>
          </div>
          <p class="cook-return-cue">Come back tomorrow for a fresh idea from Aanya.</p>
        </div>
      </section>`;
    wireImageFallbacks(cookDialogContent);
    window.setTimeout(() => {
      const heading = cookDialogContent.querySelector("#cook-complete-heading");
      cookDialogContent.scrollTop = 0;
      heading?.focus({ preventScroll: true });
    }, 0);
  }

  function completeRecipe(recipeId) {
    const recipe = getRecipe(recipeId);
    if (!recipe) return;
    const today = localDateKey();
    const stepKey = activeStepKey(recipe);
    const checked = new Set(state.completedSteps[stepKey] || []);
    if (checked.size !== recipe.steps.length) {
      showToast(`Complete all ${recipe.steps.length} safe checkpoints to unlock the dish card.`);
      return;
    }
    const previousBadges = new Set(badges.filter((badge) => badgeProgress(badge).complete).map((badge) => badge.id));
    const previousTitles = new Set(unlockedTitles().map((title) => title.id));
    const newlyDiscoveredSkills = recipe.skillIds.filter((skillId) => (state.skillXp[skillId] || 0) === 0);
    const isFirst = !state.cooks[recipeId]?.count;
    const checkpointXp = state.checkpointXp[stepKey] || 0;
    const earnedXp = Math.max(0, recipe.xp - checkpointXp) + (isFirst ? 20 : 0);
    const totalXp = recipe.xp + (isFirst ? 20 : 0);

    if (!state.lastCookDate) state.streak = 1;
    else {
      const difference = dayDifference(state.lastCookDate, today);
      if (difference === 1) state.streak += 1;
      if (difference > 1) state.streak = 1;
    }
    state.lastCookDate = today;
    state.xp += earnedXp;
    state.cooks[recipeId] = {
      count: (state.cooks[recipeId]?.count || 0) + 1,
      firstCooked: state.cooks[recipeId]?.firstCooked || today,
      lastCooked: today
    };
    recipe.skillIds.forEach((skillId) => {
      state.skillXp[skillId] = (state.skillXp[skillId] || 0) + 18 + recipe.stage * 2;
    });
    state.completedSteps[stepKey] = [];
    state.checkpointXp[stepKey] = 0;
    saveState();

    const unlocked = badges.filter((badge) => badgeProgress(badge).complete && !previousBadges.has(badge.id));
    const newTitles = unlockedTitles().filter((title) => !previousTitles.has(title.id));
    renderAll();
    renderCookCompletion(recipe, {
      totalXp,
      newSkills: newlyDiscoveredSkills.length,
      badges: unlocked,
      titles: newTitles,
      isFirst
    });
  }

  function showSkillDishes(skillId) {
    roadmapFilters = { search: "", region: "all", diet: state.dietPreference, track: "all" };
    const skill = skills.find((item) => item.id === skillId);
    routeTo("roadmap");
    const path = document.querySelector("#roadmap-path");
    const matching = recipes.filter((recipe) => dietMatches(recipe, state.dietPreference) && recipe.skillIds.includes(skillId));
    path.innerHTML = `
      <section class="practice-results">
        <div class="section-heading"><div><p class="eyebrow">Recipes that teach this skill</p><h2>${skill.icon} ${escapeHtml(skill.name)}</h2><p>${escapeHtml(skill.description)}</p></div><button class="text-button" id="show-all-roadmap" type="button">Show full roadmap →</button></div>
        <div class="compact-card-grid">${matching.slice(0, 8).map(compactRecipeCard).join("")}</div>
      </section>`;
  }

  function routeTo(route) {
    const validRoute = ["home", "skills", "dishes", "collections", "roadmap"].includes(route) ? route : "home";
    const previousRoute = activeRoute;
    if (location.hash !== `#${validRoute}`) history.pushState(null, "", `#${validRoute}`);
    activeRoute = validRoute;
    markRouteSeen(validRoute);
    if (validRoute === "home" && previousRoute !== "home") renderHome();
    views.forEach((view) => { view.hidden = view.dataset.view !== validRoute; });
    navItems.forEach((item) => {
      const active = item.dataset.route === validRoute;
      item.classList.toggle("is-active", active);
      if (active) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
    updateNavNotifications();
    window.scrollTo({ top: 0, behavior: "smooth" });
    document.title = `${validRoute[0].toUpperCase()}${validRoute.slice(1)} · Cheffu`;
  }

  function closeDialog(dialog) {
    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
  }

  function openNameDialog() {
    nameInput.value = state.playerName || "";
    renderOnboardingDietFilter();
    if (typeof nameDialog.showModal === "function") nameDialog.showModal();
    else nameDialog.setAttribute("open", "");
    window.setTimeout(() => nameInput.focus(), 0);
  }

  function showToast(message, achievement = false, label = "Update", tone = "status") {
    toastRegion.replaceChildren();
    const toast = document.createElement("div");
    toast.className = `toast ${achievement ? "toast--achievement" : tone === "suggestion" ? "toast--suggestion" : ""}`;
    toast.innerHTML = `<strong>${achievement ? "Achievement!" : escapeHtml(label)}</strong><span>${escapeHtml(message)}</span>`;
    toastRegion.append(toast);
    window.setTimeout(() => toast.remove(), 5200);
  }

  function wireImageFallbacks(root = document) {
    root.querySelectorAll(".dish-picture img:not([data-wired])").forEach((image) => {
      image.dataset.wired = "true";
      const showFallback = () => {
        const figure = image.closest(".dish-picture");
        if (!figure || !image.isConnected) return;
        figure.classList.add("dish-picture--illustrated");
        image.replaceWith(Object.assign(document.createElement("span"), { textContent: "🍲" }));
      };
      image.addEventListener("error", showFallback, { once: true });
      if (image.complete && image.naturalWidth === 0) showFallback();
    });
  }

  function renderAll() {
    renderGlobalDietFilter();
    renderHome();
    renderSkills();
    renderDishes();
    renderCollections();
    renderRoadmap();
    document.querySelector("#top-streak").textContent = state.streak;
    wireImageFallbacks();
    routeTo(activeRoute);
  }

  document.addEventListener("click", (event) => {
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) routeTo(routeButton.dataset.route);

    const dietButton = event.target.closest("[data-diet-scope]");
    if (dietButton && ["global", "onboarding"].includes(dietButton.dataset.dietScope)) {
      const dietChanged = state.dietPreference !== dietButton.dataset.dietValue;
      state.dietPreference = dietButton.dataset.dietValue;
      if (dietChanged) state.dailyQuest = {};
      if (dietChanged) dishResultLimit = 12;
      roadmapFilters.diet = state.dietPreference;
      saveState();
      renderHome();
      renderSkills();
      renderDishes();
      renderCollections();
      renderRoadmap();
      renderGlobalDietFilter();
      renderOnboardingDietFilter();
    }

    const questTimeButton = event.target.closest("[data-quest-time]");
    if (questTimeButton) updateQuestPreference("time", questTimeButton.dataset.questTime);

    const questGoalButton = event.target.closest("[data-quest-goal]");
    if (questGoalButton) updateQuestPreference("goal", questGoalButton.dataset.questGoal);

    const passQuestButton = event.target.closest("[data-pass-daily-quest]");
    if (passQuestButton) animateQuestChoice(document.querySelector("[data-quest-swipe-card]"), "pass");

    const acceptQuestButton = event.target.closest("[data-accept-daily-quest]");
    if (acceptQuestButton) animateQuestChoice(document.querySelector("[data-quest-swipe-card]"), "accept");

    const dishGoalButton = event.target.closest("[data-dish-goal]");
    if (dishGoalButton) {
      dishFilters.goal = dishGoalButton.dataset.dishGoal;
      dishResultLimit = 12;
      renderDishes();
      document.querySelector("#dishes-search")?.focus({ preventScroll: true });
    }

    if (event.target.closest("[data-focus-dish-search]")) {
      document.querySelector("#dishes-search")?.scrollIntoView({ behavior: "smooth", block: "center" });
      window.setTimeout(() => document.querySelector("#dishes-search")?.focus(), 300);
    }

    const trackButton = event.target.closest("[data-roadmap-track]");
    if (trackButton) {
      roadmapFilters = { search: "", region: "all", diet: state.dietPreference, track: trackButton.dataset.roadmapTrack };
      renderRoadmap();
    }

    const titleCategoryButton = event.target.closest("[data-title-category]");
    if (titleCategoryButton) {
      titleFilters.category = titleCategoryButton.dataset.titleCategory;
      renderCollections();
    }

    const equipTitleButton = event.target.closest("[data-equip-title]");
    if (equipTitleButton) {
      const title = titleCatalog.find((item) => item.id === equipTitleButton.dataset.equipTitle);
      if (title && titleProgress(title).complete) {
        state.equippedTitleId = title.id;
        saveState();
        renderHome();
        renderCollections();
        showToast(`${title.icon} ${title.name} equipped.`);
      }
    }

    const recipeButton = event.target.closest("[data-open-recipe]");
    if (recipeButton) openRecipe(recipeButton.dataset.openRecipe);

    const closeButton = event.target.closest("[data-close-dialog]");
    if (closeButton) {
      closeDialog(cookDialog);
      renderAll();
    }

    const stepButton = event.target.closest("[data-toggle-step]");
    if (stepButton) toggleMissionStep(stepButton);

    const completeButton = event.target.closest("[data-complete-recipe]");
    if (completeButton) completeRecipe(completeButton.dataset.completeRecipe);

    const skillViewButton = event.target.closest("[data-skill-view]");
    if (skillViewButton) {
      skillView = skillViewButton.dataset.skillView;
      renderSkills();
    }

    if (event.target.closest("[data-open-title-vault]")) {
      titleVaultExpanded = true;
      renderCollections();
    }

    if (event.target.closest("[data-expand-roadmap-catalogue]")) {
      roadmapCatalogueExpanded = true;
      renderRoadmap();
    }

    const graphClusterButton = event.target.closest("[data-graph-cluster]");
    if (graphClusterButton) {
      selectedSkillCluster = graphClusterButton.dataset.graphCluster;
      renderSkills();
      document.querySelector("#selected-skill-branch")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    const skillButton = event.target.closest("[data-skill-dishes]");
    if (skillButton) showSkillDishes(skillButton.dataset.skillDishes);

    if (event.target.closest("#show-all-roadmap")) renderRoadmap();

    const expandStageButton = event.target.closest("[data-expand-stage]");
    if (expandStageButton) {
      expandedRoadmapStages.add(Number(expandStageButton.dataset.expandStage));
      document.querySelector("#roadmap-path").innerHTML = renderRoadmapStages();
    }

    if (event.target.closest("#clear-roadmap-filters")) {
      roadmapFilters = { search: "", region: "all", diet: state.dietPreference, track: roadmapFilters.track };
      renderRoadmap();
    }

    if (event.target.closest("#clear-skill-filters")) {
      skillFilters = { search: "", status: "all" };
      renderSkills();
    }
  });

  document.addEventListener("input", (event) => {
    if (event.target.matches("#roadmap-search")) {
      roadmapFilters.search = event.target.value;
      document.querySelector("#roadmap-path").innerHTML = renderRoadmapStages();
    }
    if (event.target.matches("#skills-search")) {
      skillFilters.search = event.target.value;
      document.querySelector("#skill-cluster-list").innerHTML = renderSkillClusters();
      document.querySelector("#skill-result-count").textContent = `${filteredSkills().length} shown`;
    }
    if (event.target.matches("#dishes-search")) {
      dishFilters.search = event.target.value;
      dishResultLimit = 12;
      updateDishLibraryResults();
    }
    if (event.target.matches("#title-search")) {
      titleFilters.search = event.target.value;
      document.querySelector("#title-grid").innerHTML = renderTitleCards();
      document.querySelector("#title-result-count").textContent = `${filteredTitles().length} shown`;
    }
  });

  document.addEventListener("change", (event) => {
    if (event.target.matches("#region-filter")) roadmapFilters.region = event.target.value;
    if (event.target.matches("#region-filter")) document.querySelector("#roadmap-path").innerHTML = renderRoadmapStages();
    if (event.target.matches("#skill-status-filter")) {
      skillFilters.status = event.target.value;
      document.querySelector("#skill-cluster-list").innerHTML = renderSkillClusters();
      document.querySelector("#skill-result-count").textContent = `${filteredSkills().length} shown`;
    }
  });

  document.querySelector("#settings-button").addEventListener("click", () => {
    if (typeof settingsDialog.showModal === "function") settingsDialog.showModal();
    else settingsDialog.setAttribute("open", "");
  });

  document.querySelector("#change-name").addEventListener("click", () => {
    closeDialog(settingsDialog);
    openNameDialog();
  });

  document.querySelector("#export-progress").addEventListener("click", downloadProgressBackup);

  document.querySelector("#import-progress").addEventListener("change", async (event) => {
    const input = event.currentTarget;
    try {
      await restoreProgressBackup(input.files?.[0]);
    } catch (error) {
      showToast(error.message || "Could not restore that backup.");
    } finally {
      input.value = "";
    }
  });

  document.querySelector("#skip-name").addEventListener("click", () => {
    state.hasSeenNamePrompt = true;
    saveState();
    closeDialog(nameDialog);
  });

  nameForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const playerName = nameInput.value.trim().replace(/\s+/g, " ");
    if (!playerName) {
      state.hasSeenNamePrompt = true;
      saveState();
      closeDialog(nameDialog);
      return;
    }
    state.playerName = playerName;
    state.hasSeenNamePrompt = true;
    saveState();
    closeDialog(nameDialog);
    renderHome();
  });

  document.querySelector("#reset-progress").addEventListener("click", () => {
    if (!window.confirm("Reset every cook, skill, badge, and streak on this browser?")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = { ...defaultState, cooks: {}, skillXp: {}, completedSteps: {} };
    closeDialog(settingsDialog);
    renderAll();
    showToast("Local progress reset.");
    openNameDialog();
  });

  [cookDialog, settingsDialog].forEach((dialog) => {
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        closeDialog(dialog);
        if (dialog === cookDialog) renderAll();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey || event.repeat) return;
    const target = event.target;
    if (target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName))) return;
    if (cookDialog.open || settingsDialog.open || nameDialog.open) return;
    const routesByKey = { "1": "dishes", "2": "skills", "3": "home", "4": "collections", "5": "roadmap" };
    const route = routesByKey[event.key];
    if (!route) return;
    event.preventDefault();
    routeTo(route);
  });

  window.addEventListener("popstate", () => routeTo(location.hash.slice(1) || "home"));
  window.addEventListener("scroll", loadDishesNearBottom, { passive: true });
  window.addEventListener("scroll", handleTopbarScroll, { passive: true });
  if ("serviceWorker" in navigator && location.protocol === "https:") {
    window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
  }
  activeRoute = location.hash.slice(1) || "home";
  renderAll();
  if (!state.hasSeenNamePrompt) openNameDialog();
})();
