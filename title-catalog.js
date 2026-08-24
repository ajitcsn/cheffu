(function () {
  function title(name, description, category, icon, type, target, value, requirement) {
    return {
      id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      name, description, category, icon, condition: { type, target, value }, requirement
    };
  }

  window.CHEFFU_TITLE_CATALOG = [
    // Confidence and beginner identity.
    title("Kitchen Visitor", "You are expected to have a net-zero impact in the kitchen.", "Confidence", "🚪", "uniqueCooks", 0, null, "Arrive with good intentions."),
    title("Counter Cadet", "One dish down. The counter has accepted your application.", "Confidence", "🫡", "uniqueCooks", 1, null, "Cook 1 distinct dish."),
    title("Sink Diplomat", "Relations with the washing-up department remain cautiously positive.", "Confidence", "🤝", "uniqueCooks", 2, null, "Cook 2 distinct dishes."),
    title("Utensil Acquaintance", "You can identify several metal objects without calling home.", "Confidence", "🥄", "skillCount", 3, null, "Practise 3 micro-skills."),
    title("Recipe Reader", "You read the instructions before creating smoke. Revolutionary.", "Confidence", "📖", "skillXp", 1, "recipe-scan", "Practise Recipe Scan."),
    title("First Flame", "The stove switched on and nobody filed an incident report.", "Confidence", "🔥", "skillXp", 1, "ignite-stove", "Practise Ignite the Stove."),
    title("Heat Rookie", "You now understand that high heat is not a personality trait.", "Confidence", "🌡️", "stageCooks", 2, 1, "Cook 2 Stage 1 dishes."),
    title("Pan Driver", "Licensed to operate one pan under mostly normal conditions.", "Confidence", "🍳", "stageCooks", 3, 2, "Cook 3 Stage 2 dishes."),
    title("Tiny Win Collector", "Your portfolio contains five edible arguments against takeaway.", "Confidence", "✨", "uniqueCooks", 5, null, "Cook 5 distinct dishes."),
    title("Kitchen Tenant", "You have stopped asking where the salt lives.", "Confidence", "🔑", "uniqueCooks", 8, null, "Cook 8 distinct dishes."),
    title("Kitchen Local", "The kitchen recognises your footsteps and lowers its guard.", "Confidence", "🏡", "uniqueCooks", 12, null, "Cook 12 distinct dishes."),
    title("Counter Commander", "Mise en place now happens before the emergency.", "Confidence", "🎖️", "uniqueCooks", 18, null, "Cook 18 distinct dishes."),
    title("Meal Maker", "You no longer describe cereal as meal preparation.", "Confidence", "🍽️", "uniqueCooks", 25, null, "Cook 25 distinct dishes."),
    title("Kitchen Natural", "Forty dishes in, the counter finally relaxes when you arrive.", "Confidence", "✨", "uniqueCooks", 40, null, "Cook 40 distinct dishes."),
    title("Complete Meal Cook", "You coordinate plating, pressure cookers, and timing with confidence.", "Confidence", "🍽️", "uniqueCooks", 75, null, "Cook 75 distinct dishes."),

    // Techniques and micro-skills.
    title("Measuring Mortal", "You have accepted that eyeballing is not a recognised unit.", "Skills", "🥄", "clusterSkills", 2, "Measuring & Tools", "Practise 2 Measuring & Tools skills."),
    title("Scale Whisperer", "The tare button obeys you, but only after coffee.", "Skills", "⚖️", "skillXp", 45, "weigh-scale", "Reach 45 XP in kitchen-scale use."),
    title("Whisk Taker", "You took a whisk and somehow it paid off.", "Skills", "🌀", "skillXp", 45, "whisk", "Reach 45 XP in whisking."),
    title("Knife Introductions", "You and the knife are on a first-name, fingers-intact basis.", "Skills", "🔪", "clusterSkills", 2, "Knife & Prep", "Practise 2 Knife & Prep skills."),
    title("Onion Diplomat", "You negotiate with onions through tears and tiny cubes.", "Skills", "🧅", "skillXp", 45, "dice-onion", "Reach 45 XP in dicing onions."),
    title("Tomato Negotiator", "Firm grip, sharp knife, considerably less tomato weather.", "Skills", "🍅", "skillXp", 45, "dice-tomato", "Reach 45 XP in dicing tomatoes."),
    title("Claw & Order", "The claw grip protects the city, particularly your fingertips.", "Skills", "🦞", "skillXp", 45, "claw-grip", "Reach 45 XP with the claw grip."),
    title("Boil Order", "Bubbles now arrive according to procedure.", "Skills", "🫧", "clusterSkills", 3, "Stove & Heat", "Practise 3 Stove & Heat skills."),
    title("Tadka Trainee", "Spices enter hot fat in an increasingly intentional sequence.", "Skills", "🌶️", "skillXp", 45, "tadka-sequence", "Reach 45 XP in tadka sequencing."),
    title("Heat Tamer", "Your pan has stopped interpreting every meal as a fire drill.", "Skills", "🔥", "clusterSkills", 7, "Stove & Heat", "Practise 7 Stove & Heat skills."),
    title("Simmer Down", "You can keep things bubbling without escalating the situation.", "Skills", "♨️", "skillXp", 45, "simmer-recognition", "Reach 45 XP in recognising a simmer."),
    title("Pinch Hitter", "Salt arrives in stages instead of one career-ending avalanche.", "Skills", "🧂", "skillXp", 45, "salt-in-stages", "Reach 45 XP in staged salting."),
    title("Flavour Fixer", "You spot what a dish needs before it reaches the table.", "Skills", "👅", "skillXp", 90, "taste-adjust", "Reach 90 XP in tasting and adjustment."),
    title("Pressure Intern", "You may observe the cooker from a respectful distance.", "Skills", "☁️", "clusterSkills", 2, "Pressure & Steam", "Practise 2 Pressure & Steam skills."),
    title("Steam Punk", "Protective of eyebrows, suspicious of premature pressure release.", "Skills", "🚂", "clusterSkills", 5, "Pressure & Steam", "Practise 5 Pressure & Steam skills."),
    title("Dough Reader", "Sticky, dry, elastic: every dough now tells you what it needs.", "Skills", "🫓", "clusterSkills", 5, "Dough & Batter", "Practise 5 Dough & Batter skills."),
    title("Fermentation Station", "You maintain tiny microbial employees without holding meetings.", "Skills", "🦠", "skillXp", 45, "read-fermentation", "Reach 45 XP in reading fermentation."),
    title("Timing Pro", "Three burners stay calm under your watch.", "Skills", "⏱️", "clusterSkills", 5, "Timing & Planning", "Practise 5 Timing & Planning skills."),
    title("Calm Cook, Clean Counter", "Your workspace stays tidy even when dinner gets busy.", "Skills", "🫧", "clusterSkills", 5, "Clean & Safe", "Practise 5 Clean & Safe skills."),
    title("Kitchen Skill Master", "Ten dependable skills and a confident rhythm to match.", "Skills", "🏅", "skillMastery", 10, null, "Make 10 micro-skills Reliable."),

    // Health, protein, and practical nutrition.
    title("Hydration Hero", "Five drinks made, zero bottles dramatically shaken open.", "Health", "💧", "tagCooks", 5, "drink", "Cook 5 distinct drink missions."),
    title("Protein Curious", "You have begun reading the small number next to the flexing arm.", "Health", "🔎", "proteinCooks", 3, null, "Cook 3 protein-forward dishes."),
    title("Protein Explorer", "Lentils, eggs, paneer, fish, and meat all have a place at your table.", "Health", "💪", "proteinCooks", 10, null, "Cook 10 protein-forward dishes."),
    title("Balanced Plate Pro", "You make curd, chickpeas, grains, and vegetables work well together.", "Health", "🍱", "proteinCooks", 20, null, "Cook 20 protein-forward dishes."),
    title("Gym Rat", "Your meal prep owns more containers than your wardrobe.", "Health", "🐀", "proteinCooks", 30, null, "Cook 30 protein-forward dishes."),
    title("Recovery Chef", "Tomorrow's soreness has been served with a side of rice.", "Health", "🛌", "proteinCooks", 45, null, "Cook 45 protein-forward dishes."),
    title("Veg Powerhouse", "Powered by plants and an unreasonable quantity of pressure-cooked dal.", "Health", "🌱", "dietCooks", 20, "Veg", "Cook 20 distinct Veg dishes."),
    title("Eggsecutive Decision Maker", "Every difficult choice now comes sunny-side up.", "Health", "🥚", "dietCooks", 10, "Egg", "Cook 10 distinct Egg dishes."),
    title("Protein Without Feathers", "You handled non-veg protein without turning the counter into evidence.", "Health", "🍗", "dietCooks", 10, "Non-vegetarian", "Cook 10 distinct Non-veg dishes."),
    title("Pulse Patrol", "Beans and lentils remain tender under your jurisdiction.", "Health", "🫘", "keywordCooks", 10, ["dal", "chana", "rajma", "bean", "legume"], "Cook 10 pulse-based dishes."),
    title("Paneer Pro", "Eight paneer dishes, each with its own texture and flavour.", "Health", "🧀", "keywordCooks", 8, ["paneer"], "Cook 8 paneer dishes."),
    title("Soy Sage", "Tofu listens when you speak about seasoning.", "Health", "⬜", "keywordCooks", 8, ["tofu", "soy", "soya", "tempeh"], "Cook 8 soy-based dishes."),
    title("Quick Cook", "Fifteen meals completed before the delivery app loaded.", "Health", "⚡", "quickCooks", 15, null, "Cook 15 dishes in 15 minutes or less."),
    title("One-Pot Nutrition", "One vessel, several macros, suspiciously manageable washing up.", "Health", "🫕", "tagCooks", 12, "one-pot", "Cook 12 one-pot dishes."),
    title("Balanced Table", "Veg, egg, and non-veg dishes have all found a place at your table.", "Health", "⚖️", "dietVariety", 3, null, "Cook from all 3 diet lanes."),

    // Indian regional exploration.
    title("South Indian Regular", "Your breakfast rotation now has idli, dosa, pongal, and more.", "India", "🌴", "regionCooks", 5, "South India", "Cook 5 South Indian dishes."),
    title("Tamil Table", "Rasam is no longer classified as spicy water.", "India", "🥣", "stateCooks", 8, "Tamil Nadu", "Cook 8 Tamil Nadu-associated dishes."),
    title("Karnataka Explorer", "You can discuss bath, bele, and batter without changing subjects.", "India", "🟡", "stateCooks", 8, "Karnataka", "Cook 8 Karnataka-associated dishes."),
    title("Kerala Coconut Cook", "You know how coconut changes a stew, curry, chutney, and dessert.", "India", "🥥", "stateCooks", 8, "Kerala", "Cook 8 Kerala-associated dishes."),
    title("Andhra Heat Seeker", "Your chilli tolerance has earned its own glass of buttermilk.", "India", "🌶️", "stateCooks", 2, "Andhra Pradesh", "Cook 2 Andhra Pradesh-associated dishes."),
    title("Telangana Tiffin Scout", "You found breakfast beyond the nearest cereal packet.", "India", "🫓", "stateCooks", 1, "Telangana", "Cook 1 Telangana-associated dish."),
    title("North Star Cook", "Your gravies can now locate butter in complete darkness.", "India", "⭐", "regionCooks", 10, "North India", "Cook 10 North Indian dishes."),
    title("Punjab Powerhouse", "The meal has protein, confidence, and possibly extra ghee.", "India", "💥", "stateCooks", 7, "Punjab", "Cook 7 Punjab-associated dishes."),
    title("Rajasthan Desert Plate", "You found abundance where the humidity refused to participate.", "India", "🏜️", "stateCooks", 5, "Rajasthan", "Cook 5 Rajasthan-associated dishes."),
    title("Maharashtra Snack Scout", "Pav is now the beginning of several excellent plans.", "India", "🍞", "stateCooks", 7, "Maharashtra", "Cook 7 Maharashtra-associated dishes."),
    title("Gujarat Steam Team", "Fermented batter rises when your squad enters the room.", "India", "🟨", "stateCooks", 6, "Gujarat", "Cook 6 Gujarat-associated dishes."),
    title("Bengal Bowl Boss", "Mustard oil and fish now report directly to you.", "India", "🐟", "stateCooks", 6, "West Bengal", "Cook 6 West Bengal-associated dishes."),
    title("Eastern Plate Mapper", "You know the route from dalma to litti without navigation.", "India", "🧭", "regionCooks", 10, "East India", "Cook 10 East Indian dishes."),
    title("Northeast Trail Cook", "Bamboo shoots and regional greens are no longer strangers.", "India", "🎋", "regionCooks", 8, "Northeast India", "Cook 8 Northeast Indian dishes."),
    title("West Coast Cook", "Coconut, kokum, and coastal flavours are now familiar friends.", "India", "🌊", "regionCooks", 10, "West India", "Cook 10 West Indian dishes."),
    title("Pan-Indian Generalist", "Your spice box has become a national transport hub.", "India", "🇮🇳", "regionCooks", 15, "Pan-Indian", "Cook 15 Pan-Indian dishes."),
    title("State Plate Starter", "Five state stamps collected; geography is becoming edible.", "India", "📍", "indiaMap", 5, null, "Collect dishes from 5 states."),
    title("State Plate Ranger", "Twelve states down, several pressure whistles later.", "India", "🗺️", "indiaMap", 12, null, "Collect dishes from 12 states."),
    title("State Plate Cartographer", "Twenty states mapped using the ancient science of lunch.", "India", "🧭", "indiaMap", 20, null, "Collect dishes from 20 states."),
    title("India Plate Master", "All 28 states collected. Your map is now mostly crumbs.", "India", "🏵️", "indiaMap", 28, null, "Collect all 28 state dishes."),

    // International cuisines.
    title("Passport Applicant", "Two countries have reviewed and accepted your saucepan.", "World", "🛂", "countryCount", 2, null, "Cook dishes from 2 countries outside India."),
    title("World Passport", "Five cuisine stamps and no airport security queue.", "World", "🌍", "countryCount", 5, null, "Cook dishes from 5 countries outside India."),
    title("Global Pan Traveller", "Your pan has acquired international roaming.", "World", "🌍", "countryCount", 10, null, "Cook dishes from 10 countries outside India."),
    title("Wok Wanderer", "Your stir-fry travels faster than your actual passport.", "World", "🥢", "roadmapCooks", 5, "pan-asian", "Cook 5 Wok & Bowl missions."),
    title("Pan-Asian Explorer", "Noodles, rice, tofu, and timing now share one itinerary.", "World", "🏮", "roadmapCooks", 15, "pan-asian", "Cook 15 Wok & Bowl missions."),
    title("Pasta Initiate", "The pasta water is salted and the sauce is mildly impressed.", "World", "🍝", "roadmapCooks", 3, "italian", "Cook 3 Italian Workshop missions."),
    title("Sauce & Circumstance", "Eight Italian dishes completed with unnecessary ceremony.", "World", "🍅", "roadmapCooks", 8, "italian", "Cook 8 Italian Workshop missions."),
    title("Italian Workshop Foreman", "Pasta, risotto, and dough now clock in on time.", "World", "🛠️", "roadmapCooks", 15, "italian", "Cook 15 Italian Workshop missions."),
    title("Mediterranean-ish", "The olive oil is authentic; your pronunciation remains under review.", "World", "🫒", "countryGroupCooks", 5, ["Italy", "Greece", "Türkiye", "Lebanon", "Morocco"], "Cook 5 dishes from Mediterranean-associated countries."),
    title("World Kitchen Master", "Twenty countries, one kitchen, several opinions about rice.", "World", "🌐", "countryCount", 20, null, "Cook dishes from 20 countries outside India."),

    // Habit and complete-meal titles.
    title("Two-Day Simmer", "You returned before the coriander could become archaeology.", "Consistency", "2️⃣", "streak", 2, null, "Reach a 2-day streak."),
    title("Three-Day Tadka", "Three consecutive cooks. This is becoming suspiciously habitual.", "Consistency", "3️⃣", "streak", 3, null, "Reach a 3-day streak."),
    title("Weeklong Whisk", "Seven days, seven cooks, one increasingly confident wrist.", "Consistency", "7️⃣", "streak", 7, null, "Reach a 7-day streak."),
    title("Fortnight Fry", "Fourteen days without outsourcing every edible decision.", "Consistency", "📆", "streak", 14, null, "Reach a 14-day streak."),
    title("Monthly Mise", "Thirty days of preparation, practice, and finding the peeler.", "Consistency", "🗓️", "streak", 30, null, "Reach a 30-day streak."),
    title("Repeat Customer", "You came back to your own restaurant and the chef remembered you.", "Consistency", "🔁", "repeatCooks", 5, null, "Log 5 repeat cooks."),
    title("Batch Cook", "Twenty-five total cooks and several future lunches secured.", "Consistency", "📦", "totalCooks", 25, null, "Complete 25 total cooks."),
    title("Family Table Hero", "Twenty home-meal missions; the family group chat has noticed.", "Consistency", "🏠", "roadmapCooks", 20, "family-meals", "Cook 20 Family Meal missions."),
    title("Meal Coordinator", "Ten complete meals reached the table together and hot.", "Consistency", "🍱", "tagCooks", 10, "full-meal", "Cook 10 complete-meal dishes."),
    title("Kitchen Regular", "Fifty cooks completed. The kitchen no longer asks for identification.", "Consistency", "🪪", "totalCooks", 50, null, "Complete 50 total cooks."),

    // Desserts and pastry.
    title("Sugar Curious", "One dessert completed; the measuring scale wonders what comes next.", "Sweets", "🍬", "roadmapCooks", 1, "sweet", "Cook 1 Sweet Studio mission."),
    title("Dessert Fixer", "Three sweet dishes completed with excellent crumb judgement.", "Sweets", "🍮", "roadmapCooks", 3, "sweet", "Cook 3 Sweet Studio missions."),
    title("Halwa Hand", "You persuaded grain, ghee, and sugar to come together smoothly.", "Sweets", "🥣", "tagCooks", 3, "halwa", "Cook 3 halwa dishes."),
    title("Custard Custodian", "Eggs and milk remain smooth under your supervision.", "Sweets", "🍮", "tagCooks", 3, "custard", "Cook 3 custard dishes."),
    title("Cookie Crafter", "Three baking missions became three trays of biscuits.", "Sweets", "🍪", "tagCooks", 3, "baking", "Cook 3 baking missions."),
    title("Cake Decorator", "Eight bakes completed; frosting now behaves under pressure.", "Sweets", "🍰", "tagCooks", 8, "baking", "Cook 8 baking missions."),
    title("Pastry Initiate", "Butter and flour have entered a fragile but productive alliance.", "Sweets", "🥐", "tagCooks", 3, "pastry", "Cook 3 pastry missions."),
    title("Sweet Specialist", "Fifteen desserts tasted, adjusted, and happily shared.", "Sweets", "🧁", "roadmapCooks", 15, "sweet", "Cook 15 Sweet Studio missions."),
    title("Celebration Cake Boss", "The layered cake remained vertical long enough for evidence.", "Sweets", "🎂", "recipeCooks", 1, "catalog-layered-celebration-cake", "Cook the Layered Celebration Cake."),
    title("Dessert Master", "Thirty sweet missions completed; the ganache holds beautifully.", "Sweets", "🏰", "roadmapCooks", 30, "sweet", "Cook 30 Sweet Studio missions.")
  ];
})();
