(function () {
  const photos = {
    lemonade: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Lemonade_-_27682817724.jpg/960px-Lemonade_-_27682817724.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Lemonade_-_27682817724.jpg"
    },
    milk: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Glass_of_Milk_%2833657535532%29.jpg/960px-Glass_of_Milk_%2833657535532%29.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Glass_of_Milk_(33657535532).jpg"
    },
    yogurt: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Joghurt.jpg/960px-Joghurt.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Joghurt.jpg"
    },
    peanut: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Peanut_Salad.jpg/960px-Peanut_Salad.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Peanut_Salad.jpg"
    },
    chai: {
      url: "https://upload.wikimedia.org/wikipedia/commons/8/89/Chai_In_Sakora.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Chai_In_Sakora.jpg"
    },
    boiledEgg: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Soft-boiled-egg.jpg/960px-Soft-boiled-egg.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Soft-boiled-egg.jpg"
    },
    oatmeal: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Oatmeal.jpg/960px-Oatmeal.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Oatmeal.jpg"
    },
    friedEgg: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Fried_Egg_2.jpg/960px-Fried_Egg_2.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Fried_Egg_2.jpg"
    },
    omelette: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Gorgonzola_%2B_Bacon_Omelette_%40_Omelegg_%40_Amsterdam_%2816600947041%29.jpg/960px-Gorgonzola_%2B_Bacon_Omelette_%40_Omelegg_%40_Amsterdam_%2816600947041%29.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Gorgonzola_%2B_Bacon_Omelette_%40_Omelegg_%40_Amsterdam_(16600947041).jpg"
    },
    eggBhurji: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Spicy_egg_bhurji_%40_the_eggfactory.jpg/960px-Spicy_egg_bhurji_%40_the_eggfactory.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Spicy_egg_bhurji_%40_the_eggfactory.jpg"
    },
    paneerBhurji: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Homemade_Paneer_Bhurji_cooked_in_pan_India.jpg/960px-Homemade_Paneer_Bhurji_cooked_in_pan_India.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Homemade_Paneer_Bhurji_cooked_in_pan_India.jpg"
    },
    poha: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Poha%2C_a_snack_made_of_flattened_rice.jpg/960px-Poha%2C_a_snack_made_of_flattened_rice.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Poha,_a_snack_made_of_flattened_rice.jpg"
    },
    upma: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/A_photo_of_Upma.jpg/960px-A_photo_of_Upma.jpg",
      page: "https://commons.wikimedia.org/wiki/File:A_photo_of_Upma.jpg"
    },
    dal: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/3_types_of_lentil.png/960px-3_types_of_lentil.png",
      page: "https://commons.wikimedia.org/wiki/File:3_types_of_lentil.png"
    },
    lemonRice: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Picture_of_Lemon_rice_dish.JPG/960px-Picture_of_Lemon_rice_dish.JPG",
      page: "https://commons.wikimedia.org/wiki/File:Picture_of_Lemon_rice_dish.JPG"
    },
    curdRice: {
      url: "https://upload.wikimedia.org/wikipedia/commons/5/58/Curd_Rice.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Curd_Rice.jpg"
    },
    rasam: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Rasam.JPG/960px-Rasam.JPG",
      page: "https://commons.wikimedia.org/wiki/File:Rasam.JPG"
    },
    sambar: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Pumpkin_sambar.JPG/960px-Pumpkin_sambar.JPG",
      page: "https://commons.wikimedia.org/wiki/File:Pumpkin_sambar.JPG"
    },
    poriyal: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Poriyal.jpg/960px-Poriyal.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Poriyal.jpg"
    },
    khichdi: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/63/Dall_Khichdi.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Dall_Khichdi.jpg"
    },
    pongal: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Ven_pongal_with_sambar_and_chutney.jpg/960px-Ven_pongal_with_sambar_and_chutney.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Ven_pongal_with_sambar_and_chutney.jpg"
    },
    chana: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Chana_masala.jpg/960px-Chana_masala.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Chana_masala.jpg"
    },
    rajma: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Rajma_Masala_%2832081557778%29.jpg/960px-Rajma_Masala_%2832081557778%29.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Rajma_Masala_(32081557778).jpg"
    },
    pulao: {
      url: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Afghan_Palo.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Afghan_Palo.jpg"
    },
    palakPaneer: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Palakpaneer_Rayagada_Odisha_0009.jpg/960px-Palakpaneer_Rayagada_Odisha_0009.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Palakpaneer_Rayagada_Odisha_0009.jpg"
    },
    paneerCurry: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Day_96_Melting_Pot.jpg/960px-Day_96_Melting_Pot.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Day_96_Melting_Pot.jpg"
    },
    chicken: {
      url: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Chickentandoori.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Chickentandoori.jpg"
    },
    roti: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/2020-05-08_19_34_28_Chapati_being_made_in_a_pan_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg/960px-2020-05-08_19_34_28_Chapati_being_made_in_a_pan_in_the_Franklin_Farm_section_of_Oak_Hill%2C_Fairfax_County%2C_Virginia.jpg",
      page: "https://commons.wikimedia.org/wiki/File:2020-05-08_19_34_28_Chapati_being_made_in_a_pan_in_the_Franklin_Farm_section_of_Oak_Hill,_Fairfax_County,_Virginia.jpg"
    },
    paratha: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Triangle_paratha_%28cropped%29.JPG/960px-Triangle_paratha_%28cropped%29.JPG",
      page: "https://commons.wikimedia.org/wiki/File:Triangle_paratha_(cropped).JPG"
    },
    idli: {
      url: "https://upload.wikimedia.org/wikipedia/commons/1/11/Idli_Sambar.JPG",
      page: "https://commons.wikimedia.org/wiki/File:Idli_Sambar.JPG"
    },
    dosa: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Masala_dosa_01.jpg/960px-Masala_dosa_01.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Masala_dosa_01.jpg"
    },
    uttapam: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Mini_Uttappam.jpg/960px-Mini_Uttappam.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Mini_Uttappam.jpg"
    },
    pesarattu: {
      url: "https://upload.wikimedia.org/wikipedia/commons/6/6c/Pesarattu.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Pesarattu.jpg"
    },
    appam: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Appam_-_%E0%AE%85%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AE%AE%E0%AF%8D.jpg/960px-Appam_-_%E0%AE%85%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AE%AE%E0%AF%8D.jpg",
      page: "https://commons.wikimedia.org/wiki/File:Appam_-_%E0%AE%85%E0%AE%AA%E0%AF%8D%E0%AE%AA%E0%AE%AE%E0%AF%8D.jpg"
    },
    ragi: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/RAGI_MUDDE.JPG/960px-RAGI_MUDDE.JPG",
      page: "https://commons.wikimedia.org/wiki/File:RAGI_MUDDE.JPG"
    },
    biryani: {
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg/960px-%22Hyderabadi_Dum_Biryani%22.jpg",
      page: "https://commons.wikimedia.org/wiki/File:%22Hyderabadi_Dum_Biryani%22.jpg"
    }
  };

  const stages = [
    { id: 0, name: "Kitchen First Steps", kicker: "Get comfortable in the kitchen", icon: "🔌", colour: "lime", description: "No flame, no knife pressure. Learn the room, the tools, measuring, mixing, and cleanup." },
    { id: 1, name: "Heat Handshake", kicker: "Boil without panic", icon: "♨️", colour: "yellow", description: "Meet the stove, saucepan, timer, and visual cues through forgiving boiling jobs." },
    { id: 2, name: "Pan Driver", kicker: "Control one pan", icon: "🍳", colour: "orange", description: "Learn pan heat, stirring, sautéing, and simple timing with breakfasts and protein." },
    { id: 3, name: "Tadka & Seasoning", kicker: "Build Indian flavour", icon: "🌶️", colour: "red", description: "Practise tempering, seasoning, dal, rice finishing, and South Indian flavour patterns." },
    { id: 4, name: "One-Pot Confidence", kicker: "Let the cooker help", icon: "🫕", colour: "purple", description: "Use ratios and pressure safely to turn grains and legumes into useful meals." },
    { id: 5, name: "Layered Curries", kicker: "Layer flavour", icon: "🥘", colour: "pink", description: "Combine aromatics, masala, protein, vegetables, and doneness cues into reliable curries." },
    { id: 6, name: "Dough & Fermentation", kicker: "Work with living batters", icon: "🫓", colour: "blue", description: "Build touch, consistency, fermentation judgement, rolling, steaming, and griddle control." },
    { id: 7, name: "Complete Meals", kicker: "Run the whole kitchen", icon: "🏆", colour: "teal", description: "Coordinate components, timing, cleanup, nutrition, and serving as one confident cook." }
  ];

  const s = (id, name, cluster, icon, description) => ({ id, name, cluster, icon, description });

  const skills = [
    s("recipe-scan", "Scan the whole recipe", "Kitchen Readiness", "📋", "Read every step before touching an ingredient."),
    s("clear-counter", "Clear a workstation", "Kitchen Readiness", "🧹", "Make one clean, empty area for the mission."),
    s("tool-identification", "Identify basic tools", "Kitchen Readiness", "🧰", "Recognise pans, bowls, ladles, spatulas, and common utensils."),
    s("mise-en-place", "Set up mise en place", "Kitchen Readiness", "🗂️", "Collect, measure, and arrange ingredients before heat starts."),
    s("waste-bowl", "Use a waste bowl", "Kitchen Readiness", "🗑️", "Keep peels and wrappers contained while working."),
    s("handle-inward", "Turn handles inward", "Kitchen Readiness", "↩️", "Keep pan handles away from edges and passing hands."),
    s("stove-shutdown", "Final stove shutdown", "Kitchen Readiness", "🔌", "Check every burner and appliance before leaving."),

    s("hand-wash", "Wash hands correctly", "Clean & Safe", "🫧", "Wash before cooking and after contamination risks."),
    s("surface-clean", "Clean a work surface", "Clean & Safe", "✨", "Clean the counter before and after food preparation."),
    s("produce-rinse", "Rinse produce", "Clean & Safe", "🚿", "Wash fruit, herbs, and vegetables under safe running water."),
    s("clean-as-you-go", "Clean as you go", "Clean & Safe", "🧽", "Use waiting time to prevent a chaotic sink and counter."),
    s("raw-separation", "Separate raw protein", "Clean & Safe", "🚧", "Keep raw meat, fish, eggs, and their tools away from ready food."),
    s("board-sanitise", "Reset a cutting board", "Clean & Safe", "🧼", "Wash and sanitise after contamination or ingredient changes."),
    s("dry-before-oil", "Dry before hot oil", "Clean & Safe", "💧", "Remove surface water to reduce violent oil spitting."),
    s("allergen-check", "Check common allergens", "Clean & Safe", "⚠️", "Notice dairy, egg, nut, gluten, and other declared risks."),
    s("thermometer-use", "Use a food thermometer", "Clean & Safe", "🌡️", "Measure the thickest part without touching bone or pan."),

    s("teaspoon-measure", "Measure teaspoons", "Measuring & Tools", "🥄", "Level small spoon measures instead of guessing."),
    s("tablespoon-measure", "Measure tablespoons", "Measuring & Tools", "🥄", "Use a standard tablespoon consistently."),
    s("dry-cup-measure", "Measure dry cups", "Measuring & Tools", "🥣", "Fill and level grains, flour, or oats."),
    s("liquid-cup-measure", "Measure liquid volume", "Measuring & Tools", "🧪", "Read liquid at eye level on a flat surface."),
    s("weigh-scale", "Use a kitchen scale", "Measuring & Tools", "⚖️", "Tare a container and weigh ingredients in grams."),
    s("ratio-calculate", "Follow a cooking ratio", "Measuring & Tools", "➗", "Keep ingredient and water ratios consistent when scaling."),
    s("pinch-measure", "Measure a real pinch", "Measuring & Tools", "🤏", "Use a small repeatable pinch instead of a random pour."),
    s("colander-drain", "Drain with a colander", "Measuring & Tools", "🕳️", "Drain rinsed ingredients without losing them or splashing."),
    s("sieve-strain", "Strain through a sieve", "Measuring & Tools", "🫖", "Hold and pour through a fine strainer safely."),
    s("portion-serving", "Measure one serving", "Measuring & Tools", "🍽️", "Choose a repeatable amount before cooking a batch."),

    s("stir-combine", "Stir to combine", "Mixing & Texture", "🥄", "Move through the bottom and edges until even."),
    s("dissolve", "Dissolve a powder", "Mixing & Texture", "💧", "Mix until salt, sugar, or powder is evenly dispersed."),
    s("whisk", "Whisk smoothly", "Mixing & Texture", "🌀", "Use fast small circles to combine and add air."),
    s("salad-toss", "Toss a salad", "Mixing & Texture", "🥗", "Lift and turn ingredients without crushing them."),
    s("fold-gently", "Fold gently", "Mixing & Texture", "↪️", "Combine delicate grains or batter without breaking structure."),
    s("mash", "Mash to texture", "Mixing & Texture", "🥔", "Stop at smooth, coarse, or partly mashed as required."),
    s("beat-mixture", "Beat a mixture", "Mixing & Texture", "💨", "Mix firmly until texture becomes uniform."),
    s("blend-load", "Load a mixer safely", "Mixing & Texture", "⚙️", "Load while unplugged and stay below the fill limit."),
    s("pulse-blend", "Pulse a mixer", "Mixing & Texture", "🔘", "Use short bursts and check texture between pulses."),
    s("adjust-consistency", "Adjust consistency", "Mixing & Texture", "🎚️", "Add liquid or solids gradually to reach the target texture."),

    s("board-stability", "Stabilise a cutting board", "Knife & Prep", "🧻", "Stop board movement with a damp cloth underneath."),
    s("claw-grip", "Use the claw grip", "Knife & Prep", "✋", "Curl fingertips away while guiding the knife."),
    s("slice-onion", "Slice an onion", "Knife & Prep", "🧅", "Make safe, even onion slices."),
    s("dice-onion", "Dice an onion", "Knife & Prep", "🧅", "Turn an onion into even small pieces."),
    s("dice-tomato", "Dice a tomato", "Knife & Prep", "🍅", "Cut a soft tomato without crushing it."),
    s("chop-chilli", "Chop chilli safely", "Knife & Prep", "🌶️", "Cut chilli and avoid touching eyes or face."),
    s("chop-herbs", "Chop fresh herbs", "Knife & Prep", "🌿", "Gather and cut herbs without bruising them heavily."),
    s("even-veg-cuts", "Cut vegetables evenly", "Knife & Prep", "🥕", "Match size so pieces finish together."),
    s("peel-vegetable", "Peel a vegetable", "Knife & Prep", "🥔", "Use a peeler away from fingers with minimal waste."),
    s("grate-ingredient", "Use a grater", "Knife & Prep", "🧀", "Keep knuckles clear and stop before the final small piece."),

    s("ignite-stove", "Ignite the stove", "Stove & Heat", "🔥", "Light the correct burner and confirm a stable flame."),
    s("low-medium-high", "Choose a flame level", "Stove & Heat", "🎚️", "Translate low, medium, and high into a visible flame."),
    s("pan-preheat", "Preheat a pan", "Stove & Heat", "🍳", "Warm the pan before food without overheating it."),
    s("oil-readiness", "Read hot oil", "Stove & Heat", "✨", "Recognise flowing or shimmering oil before smoke."),
    s("simmer-recognition", "Recognise a simmer", "Stove & Heat", "🫧", "Identify gentle, steady bubbles below a full boil."),
    s("rolling-boil", "Recognise a rolling boil", "Stove & Heat", "♨️", "Identify vigorous bubbles that continue while stirred."),
    s("boil-over-control", "Stop a boil-over", "Stove & Heat", "🥛", "Lower heat early when milk or starch begins rising."),
    s("heat-recovery", "Recover pan heat", "Stove & Heat", "📈", "Adjust after cold ingredients cool the pan."),
    s("saute-stir", "Stir while sautéing", "Stove & Heat", "🥘", "Move food enough for even cooking without constant fussing."),
    s("soften-aromatics", "Soften aromatics", "Stove & Heat", "🧅", "Cook onion or ginger until the required soft stage."),
    s("brown-without-burn", "Brown without burning", "Stove & Heat", "🟤", "Build colour while controlling flame and movement."),
    s("lid-steam-safety", "Open a hot lid safely", "Stove & Heat", "☁️", "Tilt the lid so steam escapes away from face and hands."),
    s("residual-heat", "Use residual heat", "Stove & Heat", "⏹️", "Finish gently after reducing or switching off heat."),

    s("salt-in-stages", "Salt in stages", "Flavour Building", "🧂", "Add controlled salt during cooking instead of one final dump."),
    s("taste-adjust", "Taste and adjust", "Flavour Building", "👅", "Taste safely, name the problem, and change one thing."),
    s("bloom-mustard", "Bloom mustard seeds", "Flavour Building", "⚫", "Wait for popping without scorching the seeds."),
    s("bloom-cumin", "Bloom cumin seeds", "Flavour Building", "🌰", "Release aroma and stop before cumin turns black."),
    s("curry-leaf-tadka", "Add curry leaves safely", "Flavour Building", "🌿", "Dry leaves first and add them while protecting from spits."),
    s("tadka-sequence", "Sequence a tadka", "Flavour Building", "🌶️", "Add whole spices, dals, aromatics, and leaves in the right order."),
    s("powdered-spice-cook", "Cook powdered spices", "Flavour Building", "✨", "Cook briefly with moisture or fat without scorching."),
    s("masala-cohesion", "Read a cooked masala", "Flavour Building", "🥘", "Recognise when aromatics, tomato, spice, and fat become cohesive."),
    s("sour-balance", "Balance sourness", "Flavour Building", "🍋", "Use lemon, tomato, curd, or tamarind without overpowering."),
    s("finish-fresh-herbs", "Finish with fresh herbs", "Flavour Building", "🌿", "Add herbs late to protect fresh aroma and colour."),

    s("rinse-rice", "Rinse rice", "Grains & Legumes", "🍚", "Wash gently until loose surface starch reduces."),
    s("soak-rice", "Soak rice", "Grains & Legumes", "⏳", "Time a soak and drain without losing grains."),
    s("rice-water-ratio", "Set a rice-water ratio", "Grains & Legumes", "💧", "Match water to grain and cooking method."),
    s("absorption-cook", "Use absorption cooking", "Grains & Legumes", "🍚", "Cook covered until water is absorbed."),
    s("rest-fluff-rice", "Rest and fluff rice", "Grains & Legumes", "🍴", "Rest covered, then separate grains gently."),
    s("cool-cooked-rice", "Cool cooked rice", "Grains & Legumes", "❄️", "Spread or portion rice so it cools quickly and safely."),
    s("rinse-legumes", "Rinse legumes", "Grains & Legumes", "🫘", "Check, wash, and drain dal or beans."),
    s("soak-legumes", "Soak legumes", "Grains & Legumes", "🫘", "Use enough water and the correct soak time."),
    s("legume-tenderness", "Test legume tenderness", "Grains & Legumes", "🤏", "Press or bite only after safe cooling to judge the centre."),
    s("thicken-with-mash", "Thicken by mashing", "Grains & Legumes", "🥄", "Mash a small portion to give body without flour or cream."),

    s("crack-egg", "Crack an egg cleanly", "Eggs & Protein", "🥚", "Open into a separate bowl without shell fragments."),
    s("whisk-eggs", "Whisk eggs evenly", "Eggs & Protein", "🌀", "Combine white and yolk without excessive foam."),
    s("boil-egg-timing", "Time boiled eggs", "Eggs & Protein", "⏱️", "Start and stop timing from a consistent heat cue."),
    s("cool-peel-eggs", "Cool and peel eggs", "Eggs & Protein", "🧊", "Stop carryover cooking and remove shell cleanly."),
    s("egg-set-cue", "Read egg set", "Eggs & Protein", "👀", "Recognise raw, softly set, and fully set egg."),
    s("scramble-control", "Control a scramble", "Eggs & Protein", "🥄", "Move and stop eggs before they become dry."),
    s("paneer-gentle-heat", "Heat paneer gently", "Eggs & Protein", "🧀", "Warm paneer without making it rubbery."),
    s("protein-portion", "Plan a protein portion", "Eggs & Protein", "💪", "Choose a practical serving of pulses, eggs, dairy, soy, fish, or meat."),
    s("raw-chicken-workflow", "Handle raw chicken", "Eggs & Protein", "🍗", "Separate, cook, and reset tools without cross-contamination."),
    s("fish-doneness", "Read fish doneness", "Eggs & Protein", "🐟", "Judge opacity and flaking, supported by safe temperature."),

    s("cooker-inspection", "Inspect a pressure cooker", "Pressure & Steam", "🔍", "Check gasket, valve, vent, body, and fill level."),
    s("cooker-load", "Load a pressure cooker", "Pressure & Steam", "🫕", "Use enough liquid and stay below safe fill limits."),
    s("cooker-seal", "Seal a pressure cooker", "Pressure & Steam", "🔒", "Lock the lid and confirm the regulator setup."),
    s("pressure-regulate", "Regulate pressure", "Pressure & Steam", "🎚️", "Reduce heat after pressure is reached."),
    s("natural-release", "Use natural pressure release", "Pressure & Steam", "⏳", "Wait until pressure falls fully without forcing the lid."),
    s("steamer-setup", "Set up a steamer", "Pressure & Steam", "☁️", "Add enough water and keep food above it."),
    s("steam-load", "Load hot steam safely", "Pressure & Steam", "🧤", "Place and remove trays while protecting hands and face."),
    s("steam-doneness", "Test steamed doneness", "Pressure & Steam", "✅", "Use a clean tester and texture cues without repeated lid opening."),

    s("gradual-hydration", "Hydrate flour gradually", "Dough & Batter", "💧", "Add water in stages so dough stays controllable."),
    s("knead-dough", "Knead dough", "Dough & Batter", "✊", "Press, fold, and turn until the dough changes texture."),
    s("rest-dough", "Rest dough", "Dough & Batter", "⏳", "Cover and wait so moisture distributes and gluten relaxes."),
    s("portion-dough", "Portion dough evenly", "Dough & Batter", "⚪", "Divide into similar pieces for even cooking."),
    s("roll-evenly", "Roll dough evenly", "Dough & Batter", "🫓", "Use light dusting and balanced pressure."),
    s("soak-batter-grains", "Soak batter grains", "Dough & Batter", "🌾", "Soak rice and dal for the right duration."),
    s("grind-batter", "Grind batter", "Dough & Batter", "⚙️", "Blend in batches to the intended smoothness."),
    s("read-fermentation", "Read fermentation", "Dough & Batter", "🫧", "Judge rise, bubbles, aroma, and warmth."),
    s("batter-consistency", "Adjust batter consistency", "Dough & Batter", "🥣", "Thin or thicken gradually for the chosen dish."),
    s("spread-dosa", "Spread a dosa", "Dough & Batter", "◯", "Use light outward circles before the batter sets."),
    s("swirl-appam", "Swirl an appam", "Dough & Batter", "🌀", "Coat the pan wall once while keeping a thick centre."),

    s("timer-start", "Start a timer", "Timing & Planning", "⏱️", "Start timing from the recipe's stated visual event."),
    s("visual-checkpoint", "Use a visual checkpoint", "Timing & Planning", "👀", "Pair time with colour, bubbles, softness, or release."),
    s("task-sequence", "Sequence cooking tasks", "Timing & Planning", "1️⃣", "Order work by duration, dependency, and safety."),
    s("use-wait-time", "Use waiting time", "Timing & Planning", "⏳", "Prep or clean while a stable step runs."),
    s("two-burner-sync", "Synchronise two burners", "Timing & Planning", "🔥", "Start the second component only when the first is stable."),
    s("hold-food-safely", "Hold food safely", "Timing & Planning", "🛡️", "Avoid leaving cooked food lukewarm for long periods."),
    s("batch-plan", "Plan a batch", "Timing & Planning", "📦", "Choose quantities that can be cooled, stored, and reused safely."),
    s("kitchen-reset", "Reset the kitchen", "Timing & Planning", "✅", "Finish with clean tools, a clear counter, and switched-off heat."),

    s("cool-food-fast", "Cool food quickly", "Storage & Serving", "❄️", "Move food into shallow portions before refrigeration."),
    s("label-leftovers", "Label leftovers", "Storage & Serving", "🏷️", "Record what it is and when it was cooked."),
    s("refrigerate-promptly", "Refrigerate promptly", "Storage & Serving", "🧊", "Move perishables to the refrigerator without avoidable delay."),
    s("reheat-thoroughly", "Reheat thoroughly", "Storage & Serving", "♨️", "Heat leftovers evenly until properly hot."),
    s("portion-a-plate", "Portion a plate", "Storage & Serving", "🍽️", "Serve intentional amounts instead of eating from the pan."),
    s("balanced-plate", "Build a balanced plate", "Storage & Serving", "🍱", "Combine protein, grain, vegetables, and accompaniments."),
    s("garnish-purposefully", "Garnish purposefully", "Storage & Serving", "🌿", "Add a finish that improves flavour, texture, or clarity."),
    s("serve-together", "Serve components together", "Storage & Serving", "🏁", "Coordinate final checks so the meal arrives at once.")
  ];

  const r = (id, name, stage, cuisine, region, diet, minutes, protein, xp, difficulty, skillIds, photo, emoji, summary, steps, safety) => ({
    id, name, stage, cuisine, region, diet, minutes, protein, xp, difficulty, skillIds, photo, emoji, summary, steps, safety
  });

  const recipes = [
    r("nimbu-pani", "Nimbu pani", 0, "Indian everyday", "Pan-Indian", "Vegan", 5, 0, 35, "Zero heat", ["setup", "measuring", "mixing", "hygiene"], photos.lemonade, "🍋", "Your tutorial mission: measure lemon, water, salt, and sugar, then reset the counter.", ["Wash and dry your hands, then rinse the lemon.", "Measure safe drinking water into a clean glass.", "Squeeze in lemon, add a small pinch of salt and sugar, then stir until dissolved.", "Taste, adjust gently, and wash the glass and spoon."], "Use clean drinking water and a stable knife or citrus squeezer."),
    r("lemon-water", "Nimbu water", 0, "Indian everyday", "Pan-Indian", "Vegan", 4, 0, 40, "Zero heat", ["setup", "measuring", "mixing", "hygiene"], photos.lemonade, "🍋", "Learn measuring, dissolving, tasting, and a complete cleanup in four minutes.", ["Wash the lemon and your hands.", "Add water, lemon juice, and a small pinch of salt.", "Stir, taste, and adjust once.", "Wash the glass and spoon."], "Use clean drinking water and a clean knife or lemon squeezer."),
    r("banana-badam-milkshake", "Banana badam milkshake", 0, "Indian everyday", "Pan-Indian", "Vegetarian", 7, 10, 55, "Appliance", ["setup", "measuring", "mixing", "protein", "hygiene"], photos.milk, "🥤", "A first appliance win with milk, banana, soaked almonds, and cardamom.", ["Check the mixer jar is clean and unplugged while loading.", "Add milk, banana, soaked almonds, and a pinch of cardamom.", "Close fully, blend in short pulses, then unplug.", "Pour, rinse the jar immediately, and wash it safely."], "Never put hands or tools in a plugged-in blender jar. Check for nut allergies."),
    r("curd-peanut-bowl", "Curd peanut bowl", 0, "Protein snack", "Pan-Indian", "Vegetarian", 6, 15, 55, "No heat", ["measuring", "mixing", "seasoning", "protein", "hygiene"], photos.peanut, "🥜", "Curd, roasted peanuts, cucumber, salt, and chilli become a real high-protein snack.", ["Wash the cucumber and your hands.", "Measure curd and roasted peanuts into a bowl.", "Add chopped or grated cucumber, salt, and chilli.", "Mix, taste once, and refrigerate leftovers promptly."], "Use ready-roasted peanuts and check for peanut or dairy allergies."),

    r("masala-chai", "Masala chai", 1, "Indian everyday", "Pan-Indian", "Vegetarian", 8, 3, 60, "Boil", ["boiling", "measuring", "timing", "doneness", "hygiene"], photos.chai, "☕", "Practise watching a saucepan and stopping milk before it escapes.", ["Measure water, milk, tea, and spice before lighting the stove.", "Simmer water with tea and spice.", "Add milk, watch continuously, and lower heat as it rises.", "Switch off, strain away from your body, and clean spills after the stove cools."], "Milk can boil over fast. Stay beside the pan and keep the handle turned inward."),
    r("boiled-eggs", "Boiled eggs", 1, "Protein basic", "Pan-Indian", "Egg", 12, 13, 70, "Boil", ["boiling", "timing", "eggs", "doneness", "protein"], photos.boiledEgg, "🥚", "One pot, one timer, and a dependable protein you can reuse all week.", ["Place eggs in a pan and cover with cool water.", "Bring to a boil, lower the heat, and start a timer.", "Cook to your preferred set, then transfer with a spoon to cool water.", "Peel, check the white and yolk are set, and refrigerate extras."], "Discard cracked, bad-smelling, or long-unrefrigerated eggs. Keep pan handles inward."),
    r("milk-oats", "Milk oats", 1, "Everyday breakfast", "Pan-Indian", "Vegetarian", 10, 13, 70, "Simmer", ["boiling", "measuring", "timing", "doneness", "protein"], photos.oatmeal, "🥣", "Learn a gentle simmer and thickness control with a forgiving breakfast.", ["Measure oats and milk before heating.", "Warm on low to medium heat and stir the bottom often.", "Stop when creamy but slightly looser than you want.", "Add fruit or nuts after switching off."], "Stay at the stove. Milk can foam and overflow quickly."),
    r("plain-rice", "Plain rice", 1, "Indian foundation", "Pan-Indian", "Vegan", 25, 4, 75, "Ratio", ["rice", "measuring", "boiling", "timing", "doneness"], null, "🍚", "The core grain skill: wash, measure water, simmer, rest, and fluff.", ["Measure rice, rinse until the water is less cloudy, and drain.", "Add the recipe's water ratio and bring to a boil.", "Cover, lower the heat, and cook without repeatedly opening.", "Switch off, rest covered, then fluff with a fork."], "Steam burns. Open lids away from your face."),

    r("fried-egg", "Fried egg", 2, "Protein basic", "Pan-Indian", "Egg", 7, 7, 75, "Pan", ["panHeat", "timing", "eggs", "doneness", "protein"], photos.friedEgg, "🍳", "Meet oil, a frying pan, and heat adjustment without juggling ingredients.", ["Crack the egg into a small bowl and check it.", "Warm the pan on medium-low and add a little oil.", "Slide in the egg, lower heat, and cover briefly if needed.", "Cook until white and yolk reach your preferred safe set."], "Keep water away from hot oil. Cook eggs until set if serving someone at higher food-safety risk."),
    r("masala-omelette", "Masala omelette", 2, "Indian breakfast", "Pan-Indian", "Egg", 12, 15, 90, "Pan", ["knife", "mixing", "panHeat", "eggs", "seasoning", "protein"], photos.omelette, "🍳", "Add whisking, a few beginner cuts, and one confident flip or fold.", ["Finely chop a small amount of onion, tomato, chilli, and coriander.", "Whisk eggs with the vegetables and salt.", "Warm an oiled pan on medium-low and add the mixture.", "When mostly set, fold or flip, then cook through."], "Use a stable board and claw grip. Keep the pan handle inward."),
    r("egg-bhurji", "Egg bhurji", 2, "Indian breakfast", "Pan-Indian", "Egg", 15, 18, 95, "Pan", ["knife", "saute", "panHeat", "eggs", "seasoning", "protein"], photos.eggBhurji, "🥚", "Cook onion and tomato first, then learn when to stop scrambling eggs.", ["Chop onion, tomato, chilli, and coriander before heating.", "Sauté onion, then tomato and spices until softened.", "Add beaten eggs and move them gently across the pan.", "Stop while moist but fully set; finish with coriander."], "Wash hands and the egg-contact bowl promptly. Do not taste uncooked egg."),
    r("paneer-bhurji", "Paneer bhurji", 2, "North Indian", "North India", "Vegetarian", 18, 24, 100, "Pan", ["knife", "saute", "panHeat", "seasoning", "protein"], photos.paneerBhurji, "🧀", "A forgiving scramble that teaches onion-tomato masala and protein timing.", ["Crumble paneer and chop onion and tomato before heating.", "Sauté onion until soft, then add tomato and spice.", "Add paneer and stir only until hot and coated.", "Taste, correct salt, and finish with coriander."], "Keep paneer refrigerated until needed and chill leftovers promptly."),
    r("poha", "Kanda poha", 2, "Maharashtrian", "West India", "Vegan", 20, 7, 95, "Pan", ["knife", "measuring", "saute", "tadka", "timing", "seasoning"], photos.poha, "🌾", "Practise rinsing without turning poha mushy, plus a gentle mustard-seed tadka.", ["Rinse poha briefly, drain, salt lightly, and let it soften.", "Prepare onion, chilli, curry leaves, peanuts, and lemon.", "Temper mustard and peanuts, then soften onion.", "Fold in poha, cover briefly, switch off, and add lemon."], "Dry curry leaves before adding to oil because water can spit."),
    r("upma", "Vegetable upma", 2, "South Indian", "South India", "Vegetarian", 25, 9, 105, "Pan", ["knife", "tadka", "boiling", "timing", "seasoning"], photos.upma, "🥣", "Learn roasting, a South Indian tempering, and adding liquid without lumps.", ["Dry-roast rava lightly and move it to a bowl.", "Temper mustard, dal, chilli, and dry curry leaves.", "Soften onion and vegetables, then add measured water.", "When boiling, rain in rava while stirring; cover and finish on low."], "Add rava slowly to reduce splashing and steam exposure."),

    r("tadka-dal", "Simple tadka dal", 3, "North Indian", "North India", "Vegan", 30, 15, 115, "Tadka", ["legumes", "boiling", "tadka", "seasoning", "protein"], photos.dal, "🫘", "Cook dal soft, then add a controlled cumin-garlic tadka.", ["Rinse dal, measure water, and cook until fully soft.", "Whisk lightly and season the dal at a simmer.", "Heat a small tadka pan; add cumin, garlic, and chilli in sequence.", "Switch off and pour carefully over the dal."], "Keep the dal pot stable and never add wet ingredients abruptly to hot oil."),
    r("lemon-rice", "Chitranna lemon rice", 3, "Karnataka", "South India", "Vegan", 20, 7, 105, "Tadka", ["rice", "tadka", "seasoning", "timing", "storage"], photos.lemonRice, "🍋", "Transform cooled rice with mustard, peanuts, curry leaves, turmeric, and lemon.", ["Cool cooked rice so the grains stay separate.", "Prepare peanuts, mustard, dal, chilli, turmeric, and dry curry leaves.", "Build the tadka and switch off the heat.", "Fold through rice and add lemon only after cooling slightly."], "Cool cooked rice quickly and refrigerate promptly if not eating immediately."),
    r("curd-rice", "Curd rice", 3, "Tamil", "South India", "Vegetarian", 15, 10, 100, "Tadka", ["rice", "mixing", "tadka", "seasoning", "storage"], photos.curdRice, "🥣", "Use leftover rice safely, learn texture adjustment, and add a tiny tadka.", ["Use freshly cooled or safely refrigerated rice.", "Mash lightly with curd, salt, and a splash of milk or water.", "Temper mustard, chilli, ginger, and dry curry leaves.", "Cool the tadka briefly, mix, garnish, and refrigerate leftovers."], "Do not use rice left at room temperature for long. Keep curd rice chilled."),
    r("rasam", "Tomato rasam", 3, "Tamil", "South India", "Vegan", 25, 6, 110, "Simmer", ["knife", "boiling", "tadka", "seasoning", "doneness"], photos.rasam, "🍅", "Learn sour-salt-heat balance and the cue for stopping before rasam hard-boils.", ["Crush tomato with rasam powder, tamarind water, and salt.", "Simmer until the raw tamarind smell softens.", "Add dal water or plain water and stop as foam rises.", "Finish with a mustard-cumin tadka and coriander."], "Steam and hot tamarind liquid can burn. Keep the pot handle inward."),
    r("sambar", "Everyday sambar", 3, "South Indian", "South India", "Vegan", 40, 14, 130, "Multi-step", ["legumes", "pressure", "knife", "tadka", "spice", "seasoning"], photos.sambar, "🥕", "Combine cooked dal, vegetables, tamarind, spice, and tadka into one reusable template.", ["Cook rinsed toor dal until soft and depressurise fully.", "Simmer evenly cut vegetables with tamarind and sambar powder.", "Mash in dal and adjust thickness, salt, and sourness.", "Finish with a mustard and curry-leaf tadka."], "Open a pressure cooker only after all pressure has released. Dry curry leaves before frying."),
    r("beans-poriyal", "Beans poriyal", 3, "Tamil", "South India", "Vegan", 20, 5, 105, "Pan", ["knife", "tadka", "saute", "doneness", "seasoning"], photos.poriyal, "🥬", "Use even cuts, a compact tadka, steam, and coconut to finish a dry vegetable side.", ["Wash, dry, and cut beans evenly.", "Temper mustard, urad dal, chilli, and dry curry leaves.", "Add beans and salt; sprinkle water and cover briefly.", "Cook until tender with bite, then finish with coconut."], "Cut on a dry stable board. Open the lid away from your face."),

    r("moong-khichdi", "Moong dal khichdi", 4, "North Indian", "North India", "Vegan", 30, 15, 130, "One pot", ["rice", "legumes", "pressure", "measuring", "protein", "storage"], photos.khichdi, "🫕", "A forgiving rice-dal method that teaches cooker ratios and a complete meal base.", ["Rinse measured rice and moong dal together.", "Add water, turmeric, salt, and optional vegetables.", "Pressure-cook on controlled heat, then switch off.", "Wait for full natural pressure release, open away, and stir."], "Never force a pressure cooker open. Check its vent, gasket, and fill limit before use."),
    r("ven-pongal", "Ven pongal", 4, "Tamil", "South India", "Vegetarian", 35, 16, 140, "One pot", ["rice", "legumes", "pressure", "tadka", "protein", "seasoning"], photos.pongal, "🌾", "Cook rice and moong soft, then finish with pepper, cumin, ginger, and cashew.", ["Lightly roast moong dal, then rinse with rice.", "Pressure-cook with measured water until very soft.", "Mash to a loose texture and season.", "Make a cumin-pepper-ginger tadka and fold it through."], "Release cooker pressure completely. Add dry aromatics carefully to hot fat."),
    r("chana-masala", "Chana masala", 4, "North Indian", "North India", "Vegan", 45, 18, 145, "Cooker", ["legumes", "pressure", "saute", "spice", "protein", "doneness"], photos.chana, "🫘", "Turn soaked chickpeas and onion-tomato masala into a batch-friendly protein meal.", ["Soak chickpeas, drain, add fresh water, and pressure-cook until tender.", "Sauté onion, ginger, garlic, tomato, and spices until cohesive.", "Add chickpeas with cooking liquid and simmer.", "Mash a spoonful for body, then balance salt and sourness."], "Undercooked beans are unpleasant and unsafe. Depressurise fully before opening."),
    r("rajma", "Rajma masala", 4, "North Indian", "North India", "Vegan", 50, 19, 150, "Cooker", ["legumes", "pressure", "saute", "spice", "protein", "doneness"], photos.rajma, "🫘", "Master thorough bean cooking, a patient masala, and a creamy finish without cream.", ["Soak rajma, discard soaking water, and pressure-cook in fresh water until very soft.", "Cook onion-tomato masala until the raw smell is gone.", "Combine, simmer, and mash a few beans for body.", "Taste for tenderness first, then correct salt and spice."], "Kidney beans must be boiled and cooked thoroughly. Never use a slow cooker from raw or soaked beans."),
    r("veg-pulao", "Vegetable pulao", 4, "North Indian", "North India", "Vegan", 35, 8, 135, "One pot", ["knife", "rice", "measuring", "spice", "timing", "doneness"], photos.pulao, "🍚", "Practise whole spices, even vegetable cuts, rice ratios, and resting for separate grains.", ["Rinse and soak rice while cutting vegetables evenly.", "Bloom whole spices, then sauté onion and vegetables.", "Drain rice, fold gently, and add measured water and salt.", "Cook covered, rest off heat, and fluff gently."], "Steam burns. Open the lid away from your face and cool leftovers quickly."),

    r("aloo-gobi", "Aloo gobi", 5, "North Indian", "North India", "Vegan", 30, 7, 135, "Curry", ["knife", "saute", "spice", "doneness", "seasoning"], photos.paneerCurry, "🥔", "Learn even cuts, spice blooming, covered cooking, and two vegetables finishing together.", ["Cut potato and cauliflower into similar bite-sized pieces.", "Bloom cumin, soften aromatics, and cook powdered spices briefly.", "Add vegetables and salt, cover on low, and stir occasionally.", "Stop when both are tender but still hold shape."], "Keep cuts stable and avoid breathing steam when opening the lid."),
    r("bhindi-masala", "Bhindi masala", 5, "North Indian", "North India", "Vegan", 30, 5, 135, "Curry", ["knife", "panHeat", "saute", "spice", "doneness"], photos.poriyal, "🌿", "Learn why dry okra, enough pan space, and late salt help control slime.", ["Wash okra, dry it completely, then cut on a dry board.", "Sauté in a wide pan until less sticky and lightly browned.", "Add cooked onion-spice masala and salt.", "Finish uncovered until tender and separate."], "Dry produce and tools before adding to hot oil to reduce spitting."),
    r("palak-paneer", "Palak paneer", 5, "North Indian", "North India", "Vegetarian", 40, 24, 155, "Curry", ["knife", "boiling", "saute", "spice", "protein", "doneness"], photos.palakPaneer, "🥬", "Blanch or wilt greens, blend safely, cook masala, and finish paneer gently.", ["Wash spinach thoroughly and wilt or blanch until just tender.", "Cool before blending; never seal very hot liquid in a mixer.", "Cook onion-tomato masala, then add spinach purée.", "Add paneer and simmer gently only until hot."], "Cool hot ingredients before blending. Keep paneer chilled before use."),
    r("egg-curry", "Home-style egg curry", 5, "Indian everyday", "Pan-Indian", "Egg", 35, 19, 150, "Curry", ["boiling", "eggs", "saute", "spice", "protein", "doneness"], photos.boiledEgg, "🥚", "Combine boiled eggs with a fully cooked onion-tomato gravy.", ["Boil, cool, peel, and lightly score the eggs.", "Cook onion, ginger-garlic, tomato, and spices until cohesive.", "Add measured water and simmer the gravy.", "Add eggs, cover briefly, and finish with coriander."], "Cook eggs until set and refrigerate leftovers promptly."),
    r("chicken-curry", "South Indian chicken curry", 5, "South Indian", "South India", "Non-vegetarian", 50, 35, 165, "Curry", ["knife", "saute", "spice", "doneness", "protein", "hygiene"], photos.chicken, "🍗", "Practise raw-meat separation, masala layering, simmering, and reliable doneness.", ["Keep raw chicken separate; prepare vegetables first with a clean board and knife.", "Cook onion, aromatics, tomato, and spice thoroughly.", "Add chicken and cook until the outside changes colour, then add liquid.", "Simmer until the thickest pieces reach a safe internal temperature."], "Use a food thermometer. Prevent raw chicken and its juices from touching ready-to-eat food."),
    r("fish-curry", "Kerala-style fish curry", 5, "Kerala", "South India", "Non-vegetarian", 40, 30, 165, "Curry", ["knife", "spice", "boiling", "doneness", "protein", "hygiene"], photos.rasam, "🐟", "Build a sour coconut or chilli gravy, then poach fish gently without breaking it.", ["Keep fish chilled; prep aromatics and gravy ingredients first.", "Cook the spice and souring base until its raw smell fades.", "Add liquid and bring the gravy to a controlled simmer.", "Slide in fish and cook until opaque and safely done; avoid rough stirring."], "Keep raw fish separate and cook it thoroughly. Refrigerate leftovers promptly."),

    r("roti", "Soft roti", 6, "North Indian", "North India", "Vegan", 40, 5, 150, "Dough", ["measuring", "dough", "panHeat", "timing", "doneness"], photos.roti, "🫓", "Hydrate atta, knead, rest, roll, and coordinate tawa heat.", ["Measure atta and add water gradually while mixing.", "Knead until smooth, cover, and rest.", "Divide, dust lightly, and roll evenly.", "Cook on a hot tawa, turning when bubbles and brown spots appear."], "Keep loose flour away from the flame and use tongs for puffing."),
    r("paratha", "Basic paratha", 6, "North Indian", "North India", "Vegetarian", 45, 7, 160, "Dough", ["dough", "panHeat", "timing", "doneness", "seasoning"], photos.paratha, "🫓", "Add layering, controlled fat, and gentler tawa timing to your roti base.", ["Make and rest a soft atta dough.", "Roll, add a thin layer of oil or ghee, fold, and roll again.", "Cook on a medium-hot tawa until spots appear.", "Add a little fat and turn until both sides are cooked."], "Use tongs or a spatula and keep the tawa handle stable."),
    r("idli", "Idli from batter", 6, "Tamil / Karnataka", "South India", "Vegan", 25, 8, 160, "Steam", ["ferment", "measuring", "steam", "timing", "doneness"], photos.idli, "⚪", "Read fermented batter, prepare a steamer, and judge a soft steamed finish.", ["Use well-risen, pleasantly sour batter and stir it gently.", "Grease idli moulds and fill them without overfilling.", "Steam with enough water for the full cook.", "Switch off, wait briefly, open away from your face, and unmould."], "Never let the steamer run dry. Steam burns, open the lid away from you."),
    r("dosa", "Crisp dosa", 6, "South Indian", "South India", "Vegan", 25, 7, 170, "Griddle", ["ferment", "mixing", "panHeat", "timing", "doneness"], photos.dosa, "◯", "Adjust batter, spread from the centre, control tawa heat, and release cleanly.", ["Bring fermented batter to a pourable consistency and salt it.", "Heat the tawa, test it, and wipe a very thin film of oil.", "Pour in the centre and spread outward with light circles.", "Drizzle a little oil, wait for browning and edge release, then fold."], "Keep water splashes away from hot oil. Use a long spatula."),
    r("uttapam", "Vegetable uttapam", 6, "South Indian", "South India", "Vegan", 25, 9, 170, "Griddle", ["ferment", "knife", "panHeat", "timing", "doneness"], photos.uttapam, "🥞", "Use thicker batter, even toppings, a covered cook, and a confident turn.", ["Prepare thick fermented batter and finely chopped toppings.", "Pour a small thick circle on a medium-hot tawa.", "Add toppings, press lightly, cover, and cook until mostly set.", "Turn carefully and cook the topped side through."], "Use a stable board and keep steam away when lifting the lid."),
    r("pesarattu", "Pesarattu", 6, "Andhra", "South India", "Vegan", 35, 16, 180, "Griddle", ["legumes", "ferment", "mixing", "panHeat", "protein"], photos.pesarattu, "🟢", "Turn soaked whole moong into a fresh protein-rich batter and griddle it like dosa.", ["Soak whole moong, drain, and blend with ginger and chilli.", "Adjust to a spreadable batter and season.", "Spread on a medium-hot tawa and add a little oil.", "Cook until crisp and released; turn briefly if thick."], "Unplug the mixer before scraping the jar. Keep fingers away from blades."),
    r("appam", "Appam from batter", 6, "Kerala", "South India", "Vegan", 30, 6, 180, "Fermented", ["ferment", "mixing", "panHeat", "timing", "doneness"], photos.appam, "🥞", "Judge a fermented rice batter and use one swirl to make crisp edges and a soft centre.", ["Check the fermented batter and adjust salt and pouring consistency.", "Heat an appam pan and lightly grease if needed.", "Pour, lift and swirl once, then cover.", "Cook without flipping until the centre is set and edges release."], "Open the lid away from your face and steady the pan while swirling."),

    r("balanced-thali", "Balanced Indian thali", 7, "Indian everyday", "Pan-Indian", "Vegetarian", 55, 32, 210, "Full meal", ["multitask", "protein", "rice", "legumes", "plating", "storage"], photos.palakPaneer, "🍱", "Coordinate dal, rice or roti, quick sabzi, curd, and salad into one repeatable weekday meal.", ["Choose one dal, one grain, one quick vegetable, curd, and raw salad.", "Start the longest item first and write the remaining sequence.", "Use waiting time for cutting, cleanup, and the next component.", "Taste each component, plate by food group, and store leftovers safely."], "Keep raw produce separate from dirty tools and refrigerate perishable leftovers promptly."),
    r("sambar-meal", "Sambar rice + poriyal", 7, "South Indian", "South India", "Vegan", 60, 22, 215, "Full meal", ["multitask", "pressure", "tadka", "rice", "legumes", "plating"], photos.sambar, "🍛", "Run rice, dal, vegetables, and a dry side as one calm South Indian lunch.", ["Read all components and start rice and dal first.", "Cut vegetables once, grouping them by component.", "Build sambar while poriyal cooks on a second burner only if comfortable.", "Taste, finish both tadkas safely, plate, and reset the kitchen."], "Do not add a second live pan until the first is stable. Fully release cooker pressure."),
    r("appam-egg-curry", "Appam + egg curry", 7, "Kerala", "South India", "Egg", 60, 25, 220, "Full meal", ["multitask", "ferment", "eggs", "spice", "panHeat", "plating"], photos.appam, "🥚", "Coordinate a fermented griddle bread with a protein curry and serve both hot.", ["Make egg curry first and hold it at a safe gentle heat.", "Adjust appam batter and set up the pan.", "Cook appams one at a time while checking the curry between batches.", "Taste the curry, plate, switch everything off, and clean."], "Avoid leaving egg curry lukewarm for long. Refrigerate leftovers promptly."),
    r("ragi-meal", "Ragi mudde + sambar", 7, "Karnataka", "South India", "Vegan", 60, 20, 225, "Full meal", ["multitask", "measuring", "mixing", "legumes", "tadka", "plating"], photos.ragi, "🟤", "Use strength, timing, and texture judgement to pair ragi mudde with a complete lentil stew.", ["Start the sambar dal and vegetables first.", "Measure ragi flour and water exactly for the chosen method.", "Cook and beat the ragi mixture until smooth and fully cooked.", "Shape safely with wet tools, finish sambar, and serve together."], "Hot ragi is sticky and can burn. Shape with tools or wet hands only after safe cooling."),
    r("chicken-biryani", "Hyderabadi-style chicken biryani", 7, "Hyderabadi", "South India", "Non-vegetarian", 90, 38, 250, "Showpiece", ["multitask", "rice", "spice", "doneness", "protein", "storage"], photos.biryani, "🏆", "Your capstone: marination, par-cooked rice, layering, sealed cooking, doneness, and service.", ["Read the whole recipe, marinate chicken in the refrigerator, and prepare every component.", "Cook the masala and chicken using separate clean tools for raw contact.", "Par-cook rice, layer with the chicken, and seal for dum cooking.", "Verify chicken temperature, rest, open away from your face, and fluff gently."], "Use a food thermometer for chicken. Prevent cross-contamination and refrigerate leftovers promptly.")
  ].filter(Boolean);

  const starterRecipeGuides = {
    "nimbu-pani": {
      serves: "1 glass",
      equipment: ["1 tall glass", "teaspoon", "citrus squeezer or small knife"],
      ingredients: ["250 ml safe drinking water", "½ lemon", "1 tsp sugar", "1 small pinch salt"],
      swaps: "Use lime instead of lemon. Leave out sugar for a sharper drink."
    },
    "lemon-water": {
      serves: "1 glass",
      equipment: ["1 tall glass", "teaspoon", "citrus squeezer or small knife"],
      ingredients: ["250 ml safe drinking water", "½ lemon", "1 small pinch salt"],
      swaps: "Use lime instead of lemon. Add a little sugar only if you want a sweeter drink."
    },
    "banana-badam-milkshake": {
      serves: "1 large glass",
      equipment: ["mixer or blender", "1 glass", "measuring cup"],
      ingredients: ["1 medium banana", "250 ml milk or unsweetened soy milk", "6 soaked almonds", "1 pinch cardamom, optional"],
      swaps: "Use any unsweetened plant milk. Skip almonds for a nut-free version."
    },
    "curd-peanut-bowl": {
      serves: "1 bowl",
      equipment: ["mixing bowl", "spoon", "small knife and board"],
      ingredients: ["200 g plain curd or unsweetened plant yoghurt", "2 tbsp roasted peanuts", "½ small cucumber", "1 small pinch chilli powder", "1 pinch salt", "½ tsp roasted cumin powder, optional"],
      swaps: "Use sunflower or pumpkin seeds for a peanut-free bowl."
    },
    "masala-chai": {
      serves: "1 cup",
      equipment: ["small saucepan", "strainer", "measuring cup"],
      ingredients: ["180 ml water", "120 ml milk or soy milk", "1 tsp tea leaves", "1 to 2 tsp sugar", "1 small piece ginger or 1 pinch cardamom"],
      swaps: "Use cardamom if you do not have ginger. Keep the milk and water ratio the same."
    },
    "boiled-eggs": {
      serves: "1 person",
      equipment: ["small saucepan with lid", "slotted spoon", "bowl of cool water"],
      ingredients: ["2 eggs", "enough water to cover the eggs by 2 cm", "salt and pepper, optional"],
      swaps: "No egg substitute applies here. Choose a plant-based starter mission if you avoid eggs."
    },
    "milk-oats": {
      serves: "1 bowl",
      equipment: ["small saucepan", "measuring cup", "spoon"],
      ingredients: ["½ cup rolled oats", "250 ml milk or unsweetened soy milk", "1 pinch salt", "1 tsp sugar or honey, optional", "fruit or nuts, optional"],
      swaps: "Use water for half the milk if you want a lighter bowl. Use seeds for a nut-free topping."
    },
    "plain-rice": {
      serves: "2 small portions",
      equipment: ["small saucepan with tight lid", "measuring cup", "fine sieve or bowl"],
      ingredients: ["½ cup regular white rice", "1 cup water", "1 small pinch salt, optional"],
      swaps: "This ratio is for regular white rice on the stovetop. Use the packet ratio for brown, basmati, or parboiled rice."
    }
  };

  recipes.forEach((recipe) => {
    if (starterRecipeGuides[recipe.id]) recipe.guide = starterRecipeGuides[recipe.id];
  });

  const skillExpansion = {
    setup: ["recipe-scan", "clear-counter", "tool-identification", "mise-en-place", "handle-inward", "stove-shutdown"],
    hygiene: ["hand-wash", "surface-clean", "produce-rinse", "clean-as-you-go", "kitchen-reset"],
    measuring: ["teaspoon-measure", "tablespoon-measure", "dry-cup-measure", "liquid-cup-measure", "ratio-calculate"],
    mixing: ["stir-combine", "dissolve", "fold-gently", "adjust-consistency"],
    boiling: ["ignite-stove", "low-medium-high", "simmer-recognition", "rolling-boil", "lid-steam-safety"],
    timing: ["timer-start", "visual-checkpoint", "residual-heat"],
    rice: ["rinse-rice", "rice-water-ratio", "absorption-cook", "rest-fluff-rice", "cool-cooked-rice"],
    panHeat: ["ignite-stove", "low-medium-high", "pan-preheat", "oil-readiness", "heat-recovery"],
    saute: ["saute-stir", "soften-aromatics", "brown-without-burn", "residual-heat"],
    knife: ["board-stability", "claw-grip", "even-veg-cuts", "waste-bowl"],
    seasoning: ["pinch-measure", "salt-in-stages", "taste-adjust", "finish-fresh-herbs"],
    tadka: ["oil-readiness", "bloom-mustard", "bloom-cumin", "curry-leaf-tadka", "tadka-sequence", "dry-before-oil"],
    pressure: ["cooker-inspection", "cooker-load", "cooker-seal", "pressure-regulate", "natural-release"],
    legumes: ["rinse-legumes", "soak-legumes", "legume-tenderness", "thicken-with-mash"],
    eggs: ["crack-egg", "whisk-eggs", "egg-set-cue", "scramble-control"],
    protein: ["protein-portion", "portion-serving", "allergen-check"],
    spice: ["powdered-spice-cook", "masala-cohesion", "sour-balance", "taste-adjust"],
    doneness: ["visual-checkpoint", "taste-adjust", "residual-heat"],
    dough: ["gradual-hydration", "knead-dough", "rest-dough", "portion-dough", "roll-evenly"],
    ferment: ["soak-batter-grains", "grind-batter", "read-fermentation", "batter-consistency", "refrigerate-promptly"],
    steam: ["steamer-setup", "steam-load", "steam-doneness", "lid-steam-safety"],
    multitask: ["task-sequence", "use-wait-time", "two-burner-sync", "hold-food-safely", "serve-together"],
    storage: ["cool-food-fast", "label-leftovers", "refrigerate-promptly", "reheat-thoroughly"],
    plating: ["portion-a-plate", "balanced-plate", "garnish-purposefully", "serve-together"]
  };

  const recipeSpecificSkills = {
    "nimbu-pani": ["teaspoon-measure", "dissolve", "taste-adjust"],
    "lemon-water": ["sieve-strain", "sour-balance"],
    "banana-badam-milkshake": ["blend-load", "pulse-blend", "allergen-check"],
    "curd-peanut-bowl": ["salad-toss", "dice-tomato", "chop-chilli", "allergen-check", "balanced-plate"],
    "masala-chai": ["sieve-strain", "boil-over-control", "tablespoon-measure"],
    "boiled-eggs": ["boil-egg-timing", "cool-peel-eggs", "refrigerate-promptly"],
    "milk-oats": ["boil-over-control", "weigh-scale", "adjust-consistency"],
    "plain-rice": ["colander-drain", "portion-serving"],
    "fried-egg": ["crack-egg", "egg-set-cue", "handle-inward"],
    "masala-omelette": ["slice-onion", "dice-onion", "dice-tomato", "chop-chilli", "chop-herbs", "whisk", "whisk-eggs"],
    "egg-bhurji": ["dice-onion", "dice-tomato", "chop-chilli", "scramble-control", "board-sanitise"],
    "paneer-bhurji": ["dice-onion", "dice-tomato", "paneer-gentle-heat", "grate-ingredient"],
    "poha": ["colander-drain", "fold-gently", "dice-onion", "chop-chilli", "sour-balance"],
    "upma": ["dry-cup-measure", "adjust-consistency", "dice-onion", "even-veg-cuts"],
    "tadka-dal": ["thicken-with-mash", "adjust-consistency", "tadka-sequence"],
    "lemon-rice": ["fold-gently", "cool-cooked-rice", "sour-balance", "refrigerate-promptly"],
    "curd-rice": ["mash", "fold-gently", "cool-cooked-rice", "allergen-check"],
    "rasam": ["dice-tomato", "sour-balance", "adjust-consistency", "residual-heat"],
    "sambar": ["even-veg-cuts", "thicken-with-mash", "sour-balance", "cooker-inspection"],
    "beans-poriyal": ["even-veg-cuts", "dry-before-oil", "grate-ingredient"],
    "moong-khichdi": ["balanced-plate", "batch-plan", "cool-food-fast"],
    "ven-pongal": ["dry-cup-measure", "thicken-with-mash", "adjust-consistency"],
    "chana-masala": ["batch-plan", "cool-food-fast", "masala-cohesion"],
    "rajma": ["batch-plan", "cool-food-fast", "masala-cohesion", "thermometer-use"],
    "veg-pulao": ["soak-rice", "even-veg-cuts", "fold-gently"],
    "aloo-gobi": ["peel-vegetable", "even-veg-cuts", "brown-without-burn"],
    "bhindi-masala": ["dry-before-oil", "even-veg-cuts", "heat-recovery"],
    "palak-paneer": ["produce-rinse", "blend-load", "pulse-blend", "paneer-gentle-heat"],
    "egg-curry": ["boil-egg-timing", "cool-peel-eggs", "masala-cohesion"],
    "chicken-curry": ["raw-separation", "board-sanitise", "raw-chicken-workflow", "thermometer-use"],
    "fish-curry": ["raw-separation", "board-sanitise", "fish-doneness", "thermometer-use"],
    "roti": ["dry-cup-measure", "pan-preheat", "residual-heat"],
    "paratha": ["dry-cup-measure", "pan-preheat", "oil-readiness"],
    "idli": ["steamer-setup", "steam-load", "steam-doneness"],
    "dosa": ["spread-dosa", "pan-preheat", "oil-readiness"],
    "uttapam": ["dice-onion", "dice-tomato", "spread-dosa", "lid-steam-safety"],
    "pesarattu": ["soak-legumes", "blend-load", "pulse-blend", "spread-dosa"],
    "appam": ["swirl-appam", "lid-steam-safety", "residual-heat"],
    "balanced-thali": ["batch-plan", "salad-toss", "portion-a-plate", "balanced-plate", "kitchen-reset"],
    "sambar-meal": ["two-burner-sync", "task-sequence", "serve-together", "kitchen-reset"],
    "appam-egg-curry": ["swirl-appam", "boil-egg-timing", "two-burner-sync", "serve-together"],
    "ragi-meal": ["beat-mixture", "adjust-consistency", "two-burner-sync", "serve-together"],
    "chicken-biryani": ["raw-separation", "raw-chicken-workflow", "thermometer-use", "soak-rice", "hold-food-safely", "serve-together"]
  };

  recipes.forEach((recipe) => {
    const legacySkillIds = [...recipe.skillIds];
    recipe.skillGroups = legacySkillIds;
    recipe.skillIds = [...new Set([
      ...legacySkillIds.flatMap((skillId) => skillExpansion[skillId] || []),
      ...(recipeSpecificSkills[recipe.id] || [])
    ])];
  });

  const badges = [
    { id: "first-cook", name: "Baby Steps", icon: "✅", description: "Cook any one dish.", target: 1, type: "cooks" },
    { id: "no-longer-noob", name: "No Longer Noob", icon: "🧢", description: "Complete 3 different dishes.", target: 3, type: "cooks" },
    { id: "protein-starter", name: "Protein Starter", icon: "💪", description: "Cook 3 dishes with at least 15 g protein.", target: 3, type: "protein" },
    { id: "heat-tamer", name: "Heat Tamer", icon: "🔥", description: "Practise heat skills in 5 cooks.", target: 5, type: "heat" },
    { id: "south-table", name: "South Table", icon: "🌴", description: "Cook 5 South Indian dishes.", target: 5, type: "south" },
    { id: "complete-meal-cook", name: "Complete Meal Cook", icon: "🏆", description: "Complete any full meal mission.", target: 1, type: "stage7" }
  ];

  window.CHEFFU_DATA = { stages, skills, recipes, badges };
})();
