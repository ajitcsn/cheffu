(function () {
  const data = window.CHEFFU_DATA;

  const rows = [
    // Absolute beginner, no-heat, assembly, and appliance wins.
    "Salted buttermilk|0|Indian everyday|Pan-Indian|Vegetarian|5|4||India|🥛|drink,quick",
    "Mint chaas|0|Indian everyday|Pan-Indian|Vegetarian|6|4||India|🌿|drink,quick",
    "Plain sweet lassi|0|Punjabi|North India|Vegetarian|6|8|Punjab|India|🥛|drink,protein",
    "Banana lassi|0|Indian everyday|Pan-Indian|Vegetarian|7|11||India|🍌|drink,protein",
    "Sattu cooler|0|Bihari|East India|Vegan|7|10|Bihar|India|🥤|drink,protein",
    "Ragi malt|0|Karnataka|South India|Vegetarian|8|8|Karnataka|India|🥛|drink,millet",
    "Cold coffee|0|Cafe|Pan-Indian|Vegetarian|6|8||India|☕|drink",
    "Cocoa milk|0|Engineer fuel|Pan-Indian|Vegetarian|5|9||India|🍫|drink,protein",
    "Sprouted moong chaat|0|Indian everyday|Pan-Indian|Vegan|10|13||India|🌱|snack,protein",
    "Masala corn cup|0|Indian everyday|Pan-Indian|Vegetarian|8|6||India|🌽|snack,quick",
    "Kala chana salad|0|Indian everyday|Pan-Indian|Vegan|10|15||India|🥗|salad,protein",
    "Cucumber paneer bowl|0|Engineer fuel|Pan-Indian|Vegetarian|10|24||India|🥒|salad,protein",
    "Fruit curd bowl|0|Indian everyday|Pan-Indian|Vegetarian|7|11||India|🍓|breakfast,protein",
    "Overnight oats|0|Engineer fuel|International|Vegetarian|7|16||United States|🥣|breakfast,protein",
    "Peanut butter banana toast|0|Engineer fuel|International|Vegan|6|12||United States|🍞|breakfast,protein",
    "Cheese cucumber sandwich|0|Indian cafe|Pan-Indian|Vegetarian|8|14||India|🥪|snack,protein",
    "Tomato cheese sandwich|0|Indian cafe|Pan-Indian|Vegetarian|9|15||India|🥪|snack,protein",
    "Hung curd sandwich|0|Indian cafe|Pan-Indian|Vegetarian|12|17||India|🥪|snack,protein",
    "Microwave sweet potato chaat|0|Engineer fuel|Pan-Indian|Vegan|10|4||India|🍠|snack,microwave",
    "Boiled potato chaat|0|Indian street food|Pan-Indian|Vegan|10|5||India|🥔|snack",

    // One representative cooking quest for every Indian state.
    "Andhra pesarattu-upma plate|5|Andhra|South India|Vegan|45|21|Andhra Pradesh|India|🟢|state,protein",
    "Arunachal vegetable thukpa|4|Arunachali|Northeast India|Vegan|40|12|Arunachal Pradesh|India|🍜|state,one-pot",
    "Assamese masor tenga|5|Assamese|Northeast India|Non-vegetarian|45|29|Assam|India|🐟|state,protein",
    "Bihari litti chokha|6|Bihari|East India|Vegan|65|17|Bihar|India|🔥|state,dough",
    "Chhattisgarhi chila|2|Chhattisgarhi|Central India|Vegan|25|12|Chhattisgarh|India|🥞|state,protein",
    "Goan fish curry rice|7|Goan|West India|Non-vegetarian|55|34|Goa|India|🐟|state,full-meal",
    "Gujarati handvo|6|Gujarati|West India|Vegetarian|55|17|Gujarat|India|🍰|state,protein",
    "Haryanvi bajra khichdi|4|Haryanvi|North India|Vegetarian|40|14|Haryana|India|🌾|state,one-pot",
    "Himachali chana madra|5|Himachali|North India|Vegetarian|50|19|Himachal Pradesh|India|🫘|state,protein",
    "Jharkhand dhuska with ghugni|7|Jharkhandi|East India|Vegan|65|20|Jharkhand|India|🫘|state,full-meal",
    "Karnataka bisi bele bath|4|Karnataka|South India|Vegetarian|50|17|Karnataka|India|🍛|state,one-pot",
    "Kerala appam vegetable stew|7|Kerala|South India|Vegetarian|60|15|Kerala|India|🥞|state,full-meal",
    "Malwa bhutte ka kees|3|Madhya Pradesh|Central India|Vegetarian|30|10|Madhya Pradesh|India|🌽|state",
    "Maharashtrian misal pav|7|Maharashtrian|West India|Vegetarian|60|22|Maharashtra|India|🥘|state,protein",
    "Manipuri eromba|3|Manipuri|Northeast India|Vegan|35|8|Manipur|India|🥔|state",
    "Meghalaya jadoh|4|Meghalayan|Northeast India|Non-vegetarian|45|25|Meghalaya|India|🍚|state,one-pot",
    "Mizo vegetable bai|4|Mizo|Northeast India|Vegan|35|10|Mizoram|India|🥬|state,one-pot",
    "Naga smoked pork with axone|5|Naga|Northeast India|Non-vegetarian|60|32|Nagaland|India|🥩|state,protein",
    "Odia dalma|4|Odia|East India|Vegan|45|16|Odisha|India|🥣|state,protein",
    "Punjabi sarson saag|5|Punjabi|North India|Vegetarian|50|13|Punjab|India|🥬|state",
    "Rajasthani panchmel dal|4|Rajasthani|West India|Vegan|45|19|Rajasthan|India|🫘|state,protein",
    "Sikkim vegetable momos|6|Sikkimese|Northeast India|Vegan|60|12|Sikkim|India|🥟|state,dough",
    "Tamil ven pongal bowl|4|Tamil|South India|Vegetarian|40|16|Tamil Nadu|India|🌾|state,one-pot",
    "Telangana sarva pindi|6|Telangana|South India|Vegan|45|13|Telangana|India|🫓|state,dough",
    "Tripura chakhwi|5|Tripuri|Northeast India|Non-vegetarian|55|27|Tripura|India|🥘|state,protein",
    "UP vegetable tehri|4|Awadhi|North India|Vegan|40|11|Uttar Pradesh|India|🍚|state,one-pot",
    "Uttarakhand kafuli|5|Garhwali|North India|Vegetarian|45|15|Uttarakhand|India|🥬|state,protein",
    "Bengali macher jhol|5|Bengali|East India|Non-vegetarian|45|31|West Bengal|India|🐟|state,protein",

    // South Indian tiffin, rice, vegetables, lentils, chutneys, and meal components.
    "Rava idli|6|Karnataka|South India|Vegetarian|35|10|Karnataka|India|⚪|breakfast,steam",
    "Ragi idli|6|Karnataka|South India|Vegan|35|11|Karnataka|India|🟤|breakfast,millet",
    "Oats idli|6|South Indian|South India|Vegetarian|35|12||India|⚪|breakfast,protein",
    "Thatte idli|6|Karnataka|South India|Vegan|35|8|Karnataka|India|⚪|breakfast,steam",
    "Neer dosa|6|Karnataka|South India|Vegan|35|5|Karnataka|India|🥞|breakfast",
    "Ragi dosa|6|Karnataka|South India|Vegan|35|8|Karnataka|India|🟤|breakfast,millet",
    "Set dosa|6|Karnataka|South India|Vegan|40|8|Karnataka|India|🥞|breakfast",
    "Onion uttapam|6|South Indian|South India|Vegan|30|10||India|🧅|breakfast",
    "Rava dosa|6|South Indian|South India|Vegan|35|7||India|🥞|breakfast",
    "Adai dosa|6|Tamil|South India|Vegan|40|18|Tamil Nadu|India|🫘|breakfast,protein",
    "Kambu dosa|6|Tamil|South India|Vegan|40|9|Tamil Nadu|India|🌾|breakfast,millet",
    "Akki roti|6|Karnataka|South India|Vegan|40|7|Karnataka|India|🫓|breakfast,dough",
    "Ragi rotti|6|Karnataka|South India|Vegan|40|9|Karnataka|India|🟤|breakfast,millet",
    "Aval upma|2|South Indian|South India|Vegan|20|7||India|🥣|breakfast,quick",
    "Semiya upma|2|South Indian|South India|Vegetarian|25|8||India|🍜|breakfast",
    "Khara bath|2|Karnataka|South India|Vegetarian|30|9|Karnataka|India|🥣|breakfast",
    "Puliyogare|3|Karnataka|South India|Vegan|25|8|Karnataka|India|🍚|rice,tadka",
    "Coconut rice|3|Tamil|South India|Vegan|25|8|Tamil Nadu|India|🥥|rice,tadka",
    "Tomato rice|4|South Indian|South India|Vegan|35|9||India|🍅|rice,one-pot",
    "Mint pulao|4|South Indian|South India|Vegan|35|9||India|🌿|rice,one-pot",
    "Karnataka vangi bath|3|Karnataka|South India|Vegan|35|8|Karnataka|India|🍆|rice",
    "Tamarind sevai|3|Tamil|South India|Vegan|30|7|Tamil Nadu|India|🍜|tiffin",
    "Coconut sevai|3|Tamil|South India|Vegan|30|7|Tamil Nadu|India|🥥|tiffin",
    "Arisi paruppu sadam|4|Kongunadu|South India|Vegan|40|15|Tamil Nadu|India|🍚|one-pot,protein",
    "Kootu|4|Tamil|South India|Vegan|40|14|Tamil Nadu|India|🥬|protein",
    "Avial|5|Kerala|South India|Vegetarian|45|10|Kerala|India|🥥|vegetable",
    "Theeyal|5|Kerala|South India|Vegan|45|9|Kerala|India|🥥|curry",
    "Mor kuzhambu|5|Tamil|South India|Vegetarian|40|11|Tamil Nadu|India|🥣|curry",
    "Vatha kuzhambu|5|Tamil|South India|Vegan|40|7|Tamil Nadu|India|🌶️|curry",
    "Keerai masiyal|3|Tamil|South India|Vegan|25|9|Tamil Nadu|India|🥬|vegetable",
    "Cabbage poriyal|3|Tamil|South India|Vegan|20|5|Tamil Nadu|India|🥬|vegetable",
    "Beetroot poriyal|3|Tamil|South India|Vegan|25|5|Tamil Nadu|India|🟣|vegetable",
    "South Indian potato roast|3|Tamil|South India|Vegan|30|5|Tamil Nadu|India|🥔|vegetable",
    "Raw banana fry|3|Kerala|South India|Vegan|30|5|Kerala|India|🍌|vegetable",
    "Chow chow kootu|4|Tamil|South India|Vegan|35|12|Tamil Nadu|India|🥣|protein",
    "Drumstick sambar|4|South Indian|South India|Vegan|45|15||India|🥣|protein",
    "Keerai sambar|4|Tamil|South India|Vegan|45|16|Tamil Nadu|India|🥬|protein",
    "Paruppu rasam|3|Tamil|South India|Vegan|30|10|Tamil Nadu|India|🥣|protein",
    "Pepper rasam|3|Tamil|South India|Vegan|25|5|Tamil Nadu|India|🌶️|quick",
    "Coconut chutney|2|South Indian|South India|Vegan|15|4||India|🥥|chutney",
    "Tomato chutney|2|South Indian|South India|Vegan|20|4||India|🍅|chutney",
    "Peanut chutney|2|Andhra|South India|Vegan|15|9|Andhra Pradesh|India|🥜|chutney,protein",
    "Mint chutney|2|Indian everyday|Pan-Indian|Vegan|12|3||India|🌿|chutney,quick",
    "Milagai podi|3|Tamil|South India|Vegan|20|8|Tamil Nadu|India|🌶️|condiment,protein",
    "Koshambari|0|Karnataka|South India|Vegan|12|9|Karnataka|India|🥗|salad,protein",
    "Green gram sundal|3|Tamil|South India|Vegan|25|14|Tamil Nadu|India|🫘|snack,protein",
    "Kala chana sundal|3|Tamil|South India|Vegan|30|15|Tamil Nadu|India|🫘|snack,protein",
    "Medu vada|6|South Indian|South India|Vegan|55|13||India|🍩|snack,protein",
    "Kuzhi paniyaram|6|Tamil|South India|Vegan|35|9|Tamil Nadu|India|⚪|breakfast",
    "Kerala puttu|6|Kerala|South India|Vegan|45|7|Kerala|India|🥥|breakfast,steam",
    "Kadala curry|5|Kerala|South India|Vegan|50|18|Kerala|India|🫘|protein,curry",
    "Idiyappam|6|Kerala|South India|Vegan|50|5|Kerala|India|🍜|dough,steam",
    "Kerala vegetable stew|5|Kerala|South India|Vegetarian|40|8|Kerala|India|🥥|curry",
    "Ragi mudde meal|7|Karnataka|South India|Vegan|60|20|Karnataka|India|🟤|full-meal,millet",

    // North, west, central, east, and everyday Indian cooking.
    "Masoor dal|4|North Indian|North India|Vegan|35|16||India|🫘|dal,protein",
    "Yellow moong dal|4|North Indian|North India|Vegan|35|16||India|🫘|dal,protein",
    "Toor dal fry|4|Indian everyday|Pan-Indian|Vegan|40|16||India|🫘|dal,protein",
    "Dal palak|5|North Indian|North India|Vegan|40|18||India|🥬|dal,protein",
    "Dhaba dal fry|5|Punjabi|North India|Vegetarian|45|18|Punjab|India|🫘|dal,protein",
    "Black urad dal|5|Punjabi|North India|Vegan|55|18|Punjab|India|⚫|dal,protein",
    "Gujarati dal|4|Gujarati|West India|Vegan|40|15|Gujarat|India|🥣|dal,protein",
    "Sindhi dal pakwan|7|Sindhi|West India|Vegan|65|18||India|🫘|full-meal,protein",
    "Lauki chana dal|4|North Indian|North India|Vegan|40|17||India|🥒|dal,protein",
    "Aloo matar|5|North Indian|North India|Vegan|35|9||India|🥔|curry",
    "Jeera aloo|3|North Indian|North India|Vegan|25|6||India|🥔|vegetable,quick",
    "Aloo capsicum|3|North Indian|North India|Vegan|30|7||India|🫑|vegetable",
    "Bhindi do pyaza|5|North Indian|North India|Vegan|35|7||India|🌿|vegetable",
    "Lauki tomato sabzi|3|North Indian|North India|Vegan|30|5||India|🥒|vegetable",
    "Tinda masala|3|North Indian|North India|Vegan|30|5||India|🟢|vegetable",
    "Cabbage peas sabzi|3|North Indian|North India|Vegan|25|7||India|🥬|vegetable",
    "Carrot beans sabzi|3|Indian everyday|Pan-Indian|Vegan|25|5||India|🥕|vegetable",
    "Baingan bharta|5|Punjabi|North India|Vegan|50|7|Punjab|India|🍆|curry",
    "Bharwa capsicum|5|North Indian|North India|Vegetarian|45|14||India|🫑|protein",
    "Methi aloo|3|North Indian|North India|Vegan|30|6||India|🌿|vegetable",
    "Matar paneer|5|North Indian|North India|Vegetarian|40|23||India|🧀|protein,curry",
    "Kadai paneer|5|North Indian|North India|Vegetarian|45|25||India|🧀|protein,curry",
    "Paneer butter masala|5|North Indian|North India|Vegetarian|50|24||India|🧀|protein,curry",
    "Stovetop paneer tikka|5|North Indian|North India|Vegetarian|40|27||India|🧀|protein,pan",
    "Chilli paneer|5|Indo-Chinese|Pan-Indian|Vegetarian|40|24||India|🌶️|protein,pan",
    "Soya granule bhurji|2|Engineer fuel|Pan-Indian|Vegan|20|25||India|🫘|protein,quick",
    "Soya chunk curry|5|Indian everyday|Pan-Indian|Vegan|40|28||India|🫘|protein,curry",
    "Tofu bhurji|2|Engineer fuel|Pan-Indian|Vegan|20|23||India|⬜|protein,quick",
    "Palak tofu|5|Indian everyday|Pan-Indian|Vegan|40|22||India|🥬|protein,curry",
    "Soya vegetable pulao|4|Engineer fuel|Pan-Indian|Vegan|40|22||India|🍚|protein,one-pot",
    "Rajma rice bowl|7|North Indian|North India|Vegan|55|23||India|🍛|full-meal,protein",
    "Chole rice bowl|7|North Indian|North India|Vegan|55|22||India|🍛|full-meal,protein",
    "Dal chawal plate|7|Indian everyday|Pan-Indian|Vegan|45|19||India|🍛|full-meal,protein",
    "Kadhi chawal|7|North Indian|North India|Vegetarian|55|16||India|🥣|full-meal",
    "Masala vegetable khichdi|4|Indian everyday|Pan-Indian|Vegan|35|16||India|🫕|one-pot,protein",
    "Bajra moong khichdi|4|Rajasthani|West India|Vegan|40|18|Rajasthan|India|🌾|one-pot,protein",
    "Dalia vegetable khichdi|4|North Indian|North India|Vegan|35|13||India|🥣|one-pot",
    "Dalia upma|2|Indian everyday|Pan-Indian|Vegan|25|10||India|🥣|breakfast",
    "Phulka|6|North Indian|North India|Vegan|35|5||India|🫓|bread,dough",
    "Missi roti|6|Punjabi|North India|Vegan|40|11|Punjab|India|🫓|bread,protein",
    "Besan chilla|2|North Indian|North India|Vegan|20|12||India|🥞|breakfast,protein",
    "Moong dal chilla|6|North Indian|North India|Vegan|35|17||India|🥞|breakfast,protein",
    "Aloo paratha|6|Punjabi|North India|Vegetarian|50|10|Punjab|India|🫓|bread",
    "Paneer paratha|6|Punjabi|North India|Vegetarian|50|23|Punjab|India|🫓|bread,protein",
    "Methi paratha|6|North Indian|North India|Vegetarian|45|9||India|🌿|bread",
    "Gujarati thepla|6|Gujarati|West India|Vegetarian|45|9|Gujarat|India|🫓|bread",
    "Instant dhokla|6|Gujarati|West India|Vegan|45|11|Gujarat|India|🟨|snack,steam",
    "Khaman|6|Gujarati|West India|Vegan|45|12|Gujarat|India|🟨|snack,protein",
    "Pav bhaji|7|Maharashtrian|West India|Vegetarian|55|13|Maharashtra|India|🍞|full-meal",
    "Homemade vada pav|7|Maharashtrian|West India|Vegan|60|11|Maharashtra|India|🍔|snack",
    "Sabudana khichdi|3|Maharashtrian|West India|Vegan|30|7|Maharashtra|India|⚪|breakfast",
    "Kanda batata poha|2|Maharashtrian|West India|Vegan|25|8|Maharashtra|India|🌾|breakfast",
    "Usal|5|Maharashtrian|West India|Vegan|45|17|Maharashtra|India|🫘|protein,curry",
    "Matki usal|5|Maharashtrian|West India|Vegan|45|18|Maharashtra|India|🌱|protein,curry",
    "Gujarati kadhi|5|Gujarati|West India|Vegetarian|40|12|Gujarat|India|🥣|curry",
    "Undhiyu|7|Gujarati|West India|Vegan|80|12|Gujarat|India|🥘|showpiece",
    "Gatte ki sabzi|5|Rajasthani|West India|Vegetarian|50|16|Rajasthan|India|🥘|protein,curry",
    "Ker sangri|5|Rajasthani|West India|Vegan|45|9|Rajasthan|India|🌿|curry",
    "Dal baati|7|Rajasthani|West India|Vegetarian|75|21|Rajasthan|India|🟤|full-meal,protein",
    "Chana ghugni|4|Bihari|East India|Vegan|35|17|Bihar|India|🫘|protein,one-pot",
    "Bengali cholar dal|4|Bengali|East India|Vegan|40|16|West Bengal|India|🟡|dal,protein",
    "Aloo posto|5|Bengali|East India|Vegan|40|7|West Bengal|India|🥔|curry",
    "Shukto|5|Bengali|East India|Vegetarian|50|8|West Bengal|India|🥬|curry",
    "Odia santula|3|Odia|East India|Vegan|30|7|Odisha|India|🥬|vegetable",
    "Assamese khar|5|Assamese|Northeast India|Vegan|40|7|Assam|India|🥣|regional",
    "Bamboo shoot stir-fry|3|Northeast Indian|Northeast India|Vegan|30|6||India|🎋|vegetable",
    "Vegetable momos|6|Himalayan|Northeast India|Vegan|60|11||India|🥟|dough,steam",
    "Paneer momos|6|Himalayan|Northeast India|Vegetarian|60|19||India|🥟|dough,protein",

    // Eggs, dairy, chicken, fish, and high-protein everyday missions.
    "French-style omelette|2|French|International|Egg|12|15||France|🍳|breakfast,protein",
    "Cheese omelette|2|Engineer fuel|Pan-Indian|Egg|12|22||India|🧀|breakfast,protein",
    "Spinach omelette|2|Engineer fuel|Pan-Indian|Egg|15|18||India|🥬|breakfast,protein",
    "Egg fried rice|4|Indo-Chinese|Pan-Indian|Egg|25|18||India|🍚|one-pan,protein",
    "Egg pulao|4|Indian everyday|Pan-Indian|Egg|35|20||India|🍚|one-pot,protein",
    "Kerala egg roast|5|Kerala|South India|Egg|40|20|Kerala|India|🥚|protein,curry",
    "Egg pepper fry|3|South Indian|South India|Egg|25|19||India|🌶️|protein,pan",
    "Egg dosa|6|South Indian|South India|Egg|25|16||India|🥞|breakfast,protein",
    "Paneer rice bowl|4|Engineer fuel|Pan-Indian|Vegetarian|30|28||India|🍚|one-pot,protein",
    "Paneer tikka wrap|5|Indian cafe|Pan-Indian|Vegetarian|35|29||India|🌯|protein,handheld",
    "High-protein curd rice|3|Engineer fuel|South India|Vegetarian|20|18||India|🥣|protein,quick",
    "Soy keema pav|5|Engineer fuel|Pan-Indian|Vegan|35|27||India|🍞|protein",
    "Tofu pepper fry|3|South Indian|South India|Vegan|25|25||India|⬜|protein,pan",
    "Chickpea paneer salad|0|Engineer fuel|Pan-Indian|Vegetarian|12|27||India|🥗|salad,protein",
    "Chicken breast masala|5|Engineer fuel|Pan-Indian|Non-vegetarian|35|42||India|🍗|protein,pan",
    "Pepper chicken|5|South Indian|South India|Non-vegetarian|40|39||India|🌶️|protein,pan",
    "Kerala chicken stew|5|Kerala|South India|Non-vegetarian|50|34|Kerala|India|🥥|protein,curry",
    "One-pot chicken pulao|4|Indian everyday|Pan-Indian|Non-vegetarian|45|36||India|🍚|one-pot,protein",
    "Chicken keema matar|5|North Indian|North India|Non-vegetarian|40|38||India|🥘|protein,curry",
    "Tawa chicken tikka|5|North Indian|North India|Non-vegetarian|40|42||India|🍗|protein,pan",
    "Chicken saag|5|North Indian|North India|Non-vegetarian|50|39||India|🥬|protein,curry",
    "Chicken dal khichdi|4|Engineer fuel|Pan-Indian|Non-vegetarian|45|35||India|🫕|one-pot,protein",
    "Chicken lemon rice bowl|7|Engineer fuel|South India|Non-vegetarian|45|38||India|🍋|full-meal,protein",
    "Mangalorean chicken sukka|5|Karnataka|South India|Non-vegetarian|50|38|Karnataka|India|🥥|protein,curry",
    "Chettinad chicken|5|Tamil|South India|Non-vegetarian|55|40|Tamil Nadu|India|🌶️|protein,curry",
    "Simple fish fry|3|Indian everyday|Pan-Indian|Non-vegetarian|25|32||India|🐟|protein,pan",
    "Kerala fish moilee|5|Kerala|South India|Non-vegetarian|45|31|Kerala|India|🥥|protein,curry",
    "Mangalorean fish curry|5|Karnataka|South India|Non-vegetarian|45|31|Karnataka|India|🐟|protein,curry",
    "Bengali mustard fish|5|Bengali|East India|Non-vegetarian|45|32|West Bengal|India|🐟|protein,curry",
    "Fish rice bowl|7|Engineer fuel|Pan-Indian|Non-vegetarian|40|35||India|🍚|full-meal,protein",
    "Prawn pepper fry|3|South Indian|South India|Non-vegetarian|25|30||India|🍤|protein,pan",
    "Prawn coconut curry|5|Goan|West India|Non-vegetarian|45|29|Goa|India|🍤|protein,curry",
    "Tuna curd sandwich|0|Engineer fuel|International|Non-vegetarian|10|30||United States|🥪|protein,quick",
    "Chicken curd sandwich|0|Engineer fuel|International|Non-vegetarian|12|32||United States|🥪|protein,quick",
    "Chicken vegetable soup|4|Engineer fuel|International|Non-vegetarian|40|33||United States|🍲|one-pot,protein",

    // Approachable world-cuisine passport dishes using common equipment.
    "Spaghetti aglio e olio|2|Italian|International|Vegan|25|10||Italy|🍝|world,pasta",
    "Tomato basil pasta|3|Italian|International|Vegetarian|30|14||Italy|🍝|world,pasta",
    "Tuna tomato pasta|3|Italian|International|Non-vegetarian|30|29||Italy|🍝|world,protein",
    "One-pan chicken pasta|4|Italian|International|Non-vegetarian|40|38||Italy|🍝|world,one-pot",
    "Stovetop margherita pizza|6|Italian|International|Vegetarian|55|21||Italy|🍕|world,dough",
    "Bean quesadilla|2|Mexican|International|Vegetarian|20|18||Mexico|🌮|world,protein",
    "Chicken quesadilla|2|Mexican|International|Non-vegetarian|25|32||Mexico|🌮|world,protein",
    "Black bean rice bowl|4|Mexican|International|Vegan|35|18||Mexico|🍚|world,protein",
    "Breakfast burrito|5|Mexican|International|Egg|35|25||Mexico|🌯|world,protein",
    "Shakshuka|5|North African|International|Egg|35|20||Tunisia|🍳|world,protein",
    "Chickpea shakshuka|5|North African|International|Vegan|35|18||Tunisia|🥘|world,protein",
    "Moroccan chickpea tagine|4|Moroccan|International|Vegan|45|17||Morocco|🫕|world,one-pot",
    "Ful medames|4|Egyptian|International|Vegan|35|18||Egypt|🫘|world,protein",
    "Misir wot|5|Ethiopian|International|Vegan|45|18||Ethiopia|🫘|world,protein",
    "Chakalaka beans|4|South African|International|Vegan|35|17||South Africa|🫘|world,protein",
    "Hummus plate|2|Levantine|International|Vegan|20|15||Lebanon|🧆|world,protein",
    "Falafel bowl|6|Levantine|International|Vegan|55|20||Lebanon|🧆|world,protein",
    "Menemen|2|Turkish|International|Egg|20|18||Türkiye|🍳|world,protein",
    "Red lentil soup|4|Turkish|International|Vegan|35|17||Türkiye|🍲|world,protein",
    "Greek yogurt cucumber bowl|0|Greek|International|Vegetarian|10|18||Greece|🥒|world,protein",
    "Greek chickpea salad|0|Greek|International|Vegan|12|15||Greece|🥗|world,protein",
    "Spanish tortilla|5|Spanish|International|Egg|40|20||Spain|🥔|world,protein",
    "Garlic mushroom toast|2|Spanish|International|Vegetarian|20|12||Spain|🍄|world,quick",
    "Beans on toast|1|British|International|Vegan|12|14||United Kingdom|🍞|world,quick",
    "Jacket potato with beans|1|British|International|Vegan|20|15||United Kingdom|🥔|world,protein",
    "Grilled cheese|2|American|International|Vegetarian|15|17||United States|🥪|world,quick",
    "Three-bean chilli|4|American|International|Vegan|40|22||United States|🫘|world,protein",
    "Chicken rice skillet|4|American|International|Non-vegetarian|40|39||United States|🍗|world,one-pot",
    "Avocado egg toast|1|Australian|International|Egg|15|16||Australia|🥑|world,protein",
    "Nasi goreng|3|Indonesian|International|Egg|30|18||Indonesia|🍚|world,one-pan",
    "Tempeh rice bowl|3|Indonesian|International|Vegan|30|24||Indonesia|🍚|world,protein",
    "Thai basil chicken|3|Thai|International|Non-vegetarian|30|38||Thailand|🌿|world,protein",
    "Thai basil tofu|3|Thai|International|Vegan|30|23||Thailand|⬜|world,protein",
    "Coconut chickpea curry|5|Thai-inspired|International|Vegan|40|18||Thailand|🥥|world,protein",
    "Vietnamese noodle bowl|4|Vietnamese|International|Non-vegetarian|35|28||Vietnam|🍜|world,protein",
    "Vegetable pho-inspired soup|4|Vietnamese|International|Vegan|45|12||Vietnam|🍜|world,one-pot",
    "Chinese tomato eggs|2|Chinese|International|Egg|20|19||China|🍅|world,protein",
    "Vegetable fried rice|3|Chinese|International|Vegan|25|10||China|🍚|world,one-pan",
    "Chicken stir-fry|3|Chinese|International|Non-vegetarian|30|39||China|🥡|world,protein",
    "Mapo tofu-inspired bowl|5|Chinese|International|Vegan|35|23||China|⬜|world,protein",
    "Japanese oyakodon|4|Japanese|International|Non-vegetarian|35|32||Japan|🍚|world,protein",
    "Miso tofu soup|4|Japanese|International|Vegan|30|16||Japan|🍲|world,protein",
    "Tamago rice bowl|3|Japanese|International|Egg|25|18||Japan|🍚|world,protein",
    "Korean bibimbap|7|Korean|International|Egg|55|22||South Korea|🍚|world,full-meal",
    "Korean tofu rice bowl|4|Korean|International|Vegan|35|24||South Korea|⬜|world,protein",
    "Sri Lankan parippu|4|Sri Lankan|International|Vegan|35|17||Sri Lanka|🫘|world,protein",
    "Sri Lankan coconut sambol|2|Sri Lankan|International|Vegan|15|4||Sri Lanka|🥥|world,condiment",
    "Nepali dal bhat|7|Nepali|International|Vegan|55|21||Nepal|🍛|world,full-meal",
    "Nepali chicken momos|6|Nepali|International|Non-vegetarian|65|28||Nepal|🥟|world,protein",
    "Bangladeshi masoor bhuna|5|Bangladeshi|International|Vegan|40|17||Bangladesh|🫘|world,protein",
    "Pakistani chicken karahi|5|Pakistani|International|Non-vegetarian|45|40||Pakistan|🍗|world,protein",
    "Afghan kabuli pulao|7|Afghan|International|Non-vegetarian|75|32||Afghanistan|🍚|world,showpiece",
    "Brazilian black bean stew|4|Brazilian|International|Vegan|45|20||Brazil|🫘|world,protein",
    "Peruvian chicken rice|4|Peruvian|International|Non-vegetarian|45|38||Peru|🍚|world,one-pot",
    "Jamaican rice and peas|4|Jamaican|International|Vegan|40|14||Jamaica|🍚|world,one-pot",
    "Russian buckwheat bowl|4|Russian|International|Vegetarian|35|15||Russia|🥣|world,protein",
    "German potato egg skillet|3|German|International|Egg|30|20||Germany|🥔|world,protein",
    "Canadian lentil soup|4|Canadian|International|Vegan|40|18||Canada|🍲|world,protein",
    "Filipino chicken adobo|5|Filipino|International|Non-vegetarian|45|39||Philippines|🍗|world,protein",
    "Malaysian tofu laksa|5|Malaysian|International|Vegan|45|20||Malaysia|🍜|world,protein",
    "Singapore egg fried rice|3|Singaporean|International|Egg|25|18||Singapore|🍚|world,protein",

    // A complete sweets, pastry, and baking path from no-heat assembly to showpieces.
    "Fruit and yogurt parfait|0|Beginner desserts|International|Vegetarian|8|10||France|🍓|dessert,no-heat",
    "Date and nut bites|0|Indian everyday|Pan-Indian|Vegan|12|5||India|🟤|dessert,no-heat",
    "Mango cream cups|0|Indian cafe|Pan-Indian|Vegetarian|10|4||India|🥭|dessert,no-heat",
    "No-bake cocoa oat bites|0|Engineer sweets|International|Vegan|12|6||United States|🍫|dessert,no-heat",
    "Shrikhand shortcut|0|Maharashtrian|West India|Vegetarian|10|9|Maharashtra|India|🟡|dessert,no-heat",
    "Caramelised bananas|1|Beginner desserts|International|Vegetarian|12|2||France|🍌|dessert,pan",
    "Stovetop vanilla custard|1|British-inspired|International|Vegetarian|18|6||United Kingdom|🍮|dessert,custard",
    "Berry fruit compote|1|European|International|Vegan|15|1||France|🫐|dessert,sauce",
    "Silky chocolate sauce|1|Beginner desserts|International|Vegetarian|12|3||France|🍫|dessert,sauce",
    "Sweet cinnamon toast|1|Beginner desserts|International|Vegetarian|10|5||United States|🍞|dessert,quick",
    "Fluffy breakfast pancakes|2|American|International|Egg|25|9||United States|🥞|dessert,batter",
    "Eggless chocolate mug cake|2|Engineer sweets|International|Vegetarian|8|6||United States|🍫|dessert,baking,microwave",
    "Shahi tukda shortcut|2|Mughlai|North India|Vegetarian|25|8||India|🍞|dessert,pan",
    "Sooji sheera|2|Maharashtrian|West India|Vegetarian|25|5|Maharashtra|India|🟡|dessert,halwa",
    "Semiya payasam|2|South Indian|South India|Vegetarian|30|7||India|🥛|dessert,payasam",
    "Classic rice kheer|3|North Indian|North India|Vegetarian|45|8||India|🥣|dessert,kheer",
    "Sabudana kheer|3|Indian festive|Pan-Indian|Vegetarian|40|5||India|⚪|dessert,kheer",
    "Gajar ka halwa|3|North Indian|North India|Vegetarian|55|6||India|🥕|dessert,halwa",
    "Atta halwa|3|North Indian|North India|Vegetarian|35|5||India|🟤|dessert,halwa",
    "Stovetop chocolate pudding|3|International|International|Vegetarian|30|7||United States|🍫|dessert,custard",
    "Eggless banana bread|4|Home baking|International|Vegetarian|65|6||United States|🍌|dessert,baking",
    "Blueberry breakfast muffins|4|American|International|Egg|45|7||United States|🧁|dessert,baking",
    "Fudgy cocoa brownies|4|American|International|Egg|50|6||United States|🍫|dessert,baking",
    "Chocolate chip cookies|4|American|International|Egg|45|5||United States|🍪|dessert,baking",
    "Apple oat crumble|4|British|International|Vegetarian|50|4||United Kingdom|🍎|dessert,baking",
    "Gulab jamun from khoya|5|North Indian|North India|Vegetarian|60|8||India|🟤|dessert,festive",
    "Rasmalai|5|Bengali|East India|Vegetarian|75|10|West Bengal|India|🥛|dessert,festive",
    "Set cheesecake jars|5|International|International|Vegetarian|35|8||United States|🍰|dessert,custard",
    "Panna cotta|5|Italian|International|Vegetarian|35|5||Italy|🍮|dessert,italian",
    "Crème caramel|5|French|International|Egg|60|7||France|🍮|dessert,custard",
    "Nankhatai|6|Indian bakery|Pan-Indian|Vegetarian|50|5||India|🍪|dessert,baking,pastry",
    "Vanilla cupcakes|6|Home baking|International|Egg|55|6||United Kingdom|🧁|dessert,baking,pastry",
    "Basic sponge cake|6|Home baking|International|Egg|60|7||United Kingdom|🍰|dessert,baking,pastry",
    "Shortcrust tart shells|6|French|International|Vegetarian|70|6||France|🥧|dessert,baking,pastry",
    "Cinnamon rolls|6|American|International|Egg|120|8||United States|🌀|dessert,baking,pastry",
    "Baked cheesecake|7|American|International|Egg|120|9||United States|🍰|dessert,baking,showpiece",
    "Layered celebration cake|7|Home baking|International|Egg|150|8||United Kingdom|🎂|dessert,baking,showpiece",
    "Fresh fruit custard tart|7|French|International|Egg|120|7||France|🥧|dessert,pastry,showpiece",
    "Tiramisu|7|Italian|International|Egg|90|8||Italy|☕|dessert,italian,showpiece",
    "Chocolate choux buns|7|French|International|Egg|120|7||France|🍫|dessert,pastry,showpiece",
    "Eggless chocolate layer cake|7|Home baking|International|Vegetarian|140|7||India|🎂|dessert,baking,showpiece",

    // An Italian path with assembly, sauces, pasta, dough, and coordinated meals.
    "Tomato basil bruschetta|0|Italian|International|Vegan|12|4||Italy|🍅|italian,assembly",
    "Caprese salad|0|Italian|International|Vegetarian|10|13||Italy|🍅|italian,salad,protein",
    "Skillet garlic bread|1|Italian-inspired|International|Vegetarian|15|7||Italy|🥖|italian,bread",
    "Tomato basil pasta|2|Italian|International|Vegan|30|11||Italy|🍝|italian,pasta",
    "Spaghetti aglio e olio|3|Italian|International|Vegan|25|10||Italy|🍝|italian,pasta",
    "Penne arrabbiata|3|Italian|International|Vegan|30|11||Italy|🍝|italian,pasta",
    "Pesto pasta|3|Italian|International|Vegetarian|30|14||Italy|🌿|italian,pasta",
    "Minestrone soup|4|Italian|International|Vegan|45|14||Italy|🍲|italian,one-pot",
    "Mushroom risotto|4|Italian|International|Vegetarian|50|12||Italy|🍚|italian,rice",
    "Skillet vegetable lasagna|5|Italian|International|Vegetarian|55|20||Italy|🧀|italian,pasta,protein",
    "Baked penne|5|Italian|International|Vegetarian|55|18||Italy|🍝|italian,pasta,baking",
    "Potato gnocchi|6|Italian|International|Vegetarian|75|12||Italy|🥔|italian,dough",
    "Rosemary focaccia|6|Italian|International|Vegan|120|9||Italy|🥖|italian,dough,baking",
    "Margherita pizza from scratch|7|Italian|International|Vegetarian|120|18||Italy|🍕|italian,dough,baking,showpiece",
    "Eggplant parmigiana meal|7|Italian|International|Vegetarian|90|22||Italy|🍆|italian,full-meal,protein",

    // Early and dough-stage bridges for the Pan-Asian roadmap.
    "Chinese sesame cucumber salad|0|Chinese|International|Vegan|12|3||China|🥒|world,pan-asian,salad,no-heat",
    "Vietnamese summer rolls|0|Vietnamese|International|Vegan|25|8||Vietnam|🥬|world,pan-asian,assembly",
    "Simple miso broth|1|Japanese|International|Vegan|15|7||Japan|🍵|world,pan-asian,soup",
    "Korean vegetable pancakes|2|Korean|International|Vegan|30|8||South Korea|🥞|world,pan-asian,pan",
    "Chinese scallion pancakes|6|Chinese|International|Vegan|60|8||China|🥞|world,pan-asian,dough",
    "Steamed vegetable bao|6|Chinese|International|Vegan|100|10||China|🥟|world,pan-asian,dough,steam",
    "Vegan bibimbap table|7|Korean|International|Vegan|60|17||South Korea|🍚|world,pan-asian,full-meal,protein"
  ];

  const stageSkills = {
    0: ["recipe-scan", "clear-counter", "hand-wash", "portion-serving", "stir-combine", "kitchen-reset"],
    1: ["recipe-scan", "ignite-stove", "low-medium-high", "timer-start", "visual-checkpoint", "stove-shutdown"],
    2: ["mise-en-place", "board-stability", "pan-preheat", "oil-readiness", "saute-stir", "visual-checkpoint", "kitchen-reset"],
    3: ["mise-en-place", "claw-grip", "even-veg-cuts", "low-medium-high", "saute-stir", "salt-in-stages", "taste-adjust"],
    4: ["recipe-scan", "ratio-calculate", "task-sequence", "simmer-recognition", "visual-checkpoint", "hold-food-safely", "kitchen-reset"],
    5: ["mise-en-place", "even-veg-cuts", "soften-aromatics", "powdered-spice-cook", "masala-cohesion", "taste-adjust", "visual-checkpoint"],
    6: ["recipe-scan", "gradual-hydration", "adjust-consistency", "timer-start", "visual-checkpoint", "residual-heat", "kitchen-reset"],
    7: ["recipe-scan", "mise-en-place", "task-sequence", "use-wait-time", "two-burner-sync", "serve-together", "kitchen-reset"]
  };

  const stageSteps = {
    0: ["Clear one work area, wash your hands, and read the full mission.", "Measure and prepare every component before combining.", "Mix or assemble until the target texture looks even.", "Taste only with a clean spoon, serve, and reset the counter."],
    1: ["Measure ingredients and choose the correct saucepan or heat-safe vessel.", "Start on controlled heat and stay beside the vessel.", "Use the stated timer together with bubbles, aroma, and texture cues.", "Switch off fully, handle steam safely, and serve or store promptly."],
    2: ["Prepare every ingredient before turning on the pan.", "Preheat on controlled heat and add the cooking fat carefully.", "Cook in sequence, adjusting heat when the pan changes temperature.", "Check doneness, switch off, taste safely, and clean the cooled pan."],
    3: ["Wash, dry, and cut ingredients into even pieces.", "Build the flavour base or tadka in the stated order.", "Add the main ingredients and cook with deliberate heat changes.", "Taste, adjust one variable, finish, and switch the stove off."],
    4: ["Rinse or soak the grain or legume and measure the liquid ratio.", "Prepare the flavour base, then combine ingredients in the correct order.", "Cook covered or under pressure without forcing the vessel open.", "Check texture, adjust consistency, portion, and cool leftovers quickly."],
    5: ["Complete all cutting and separate any raw animal protein before heat starts.", "Cook aromatics and spices until the masala loses its raw character.", "Add the main ingredient and simmer until properly cooked and seasoned.", "Verify doneness, finish the sauce, serve, and store leftovers promptly."],
    6: ["Read the full method and measure flour, grain, or batter components.", "Hydrate, grind, rest, or ferment to the recipe's texture cues.", "Portion and cook with controlled pan heat or steam.", "Check the centre, cool safely, and reset all equipment."],
    7: ["Read every component and write the order from longest to shortest.", "Prepare shared ingredients once and start the longest component first.", "Use waiting time to cook the next stable component and clean safely.", "Run final doneness checks, serve together, and cool leftovers promptly."]
  };

  const dessertSteps = {
    0: ["Clear the counter, wash your hands, and measure every component.", "Prepare fruit, dairy, nuts, or flavourings in separate bowls.", "Fold or layer gently until the portions look even.", "Chill if required, garnish, and refrigerate leftovers promptly."],
    1: ["Measure everything before turning on the heat.", "Warm on low heat and stir continuously around the base and corners.", "Stop at the stated colour, coating, or thickness cue.", "Switch off, cool safely, and transfer before the residual heat overcooks it."],
    2: ["Measure the wet and dry ingredients separately.", "Mix only until the target batter or crumb texture appears.", "Cook with controlled pan or microwave timing, checking only at safe pauses.", "Rest briefly, check the centre, and serve at a safe temperature."],
    3: ["Prepare every ingredient and choose a heavy-bottomed vessel.", "Cook on controlled heat while scraping the base and watching reduction cues.", "Add sweetener and flavourings in sequence without rushing the finish.", "Stop at the target texture, cool safely, and portion cleanly."],
    4: ["Preheat the oven or appliance and weigh every ingredient accurately.", "Combine wet and dry mixtures without overmixing.", "Portion evenly and bake without repeatedly opening the door.", "Check the centre, cool fully on a rack, and store correctly."],
    5: ["Measure precisely and prepare the moulds, syrup, or setting vessels first.", "Control heat carefully while building the custard, syrup, or milk base.", "Use the recipe's temperature and texture cues before setting or chilling.", "Cool in stages, portion cleanly, and refrigerate promptly."],
    6: ["Weigh flour, fat, liquid, and leavening before beginning.", "Mix, knead, cream, or fold only to the specified texture.", "Shape evenly, then bake with a timer and visual doneness cues.", "Cool completely before filling, icing, or storing."],
    7: ["Write the order for every base, filling, bake, chill, and decoration.", "Complete stable components first and keep temperature-sensitive ones safe.", "Assemble only after every layer reaches the required temperature and texture.", "Finish the presentation, photograph the showpiece, and store it safely."]
  };

  const stageDifficulty = ["No heat", "Basic heat", "One pan", "Technique", "One pot", "Curry", "Dough / batter", "Full meal"];

  function slugify(value) {
    return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  function dishDescription(name, cuisine, diet, tags) {
    const lower = name.toLowerCase();
    const cuisineLabel = cuisine === "Indian everyday" ? "everyday Indian" : cuisine;
    const dietLabel = diet === "Non-vegetarian" ? "non-vegetarian" : diet.toLowerCase();
    let kind = "dish";
    let detail = "a practical combination of staple ingredients, seasoning, and repeatable kitchen technique";

    if (/chaas|buttermilk/.test(lower)) {
      kind = "savoury yoghurt drink";
      detail = "cool curd, water, salt, and simple spices whisked until light";
    } else if (/lassi/.test(lower)) {
      kind = "yoghurt drink";
      detail = "curd blended into a cool, creamy drink";
    } else if (/sattu/.test(lower)) {
      kind = "roasted gram drink";
      detail = "protein-rich sattu stirred with water and bright seasoning";
    } else if (/coffee|cocoa|shake|malt|cooler|juice|water|milk$/.test(lower) || tags.includes("drink")) {
      kind = "quick drink";
      detail = "a low-pressure lesson in measuring, mixing, and balancing flavour";
    } else if (/sandwich|toast|bruschetta/.test(lower)) {
      kind = "assembled snack";
      detail = "bread layered with a simple filling for a fast, filling meal";
    } else if (/chaat|salad|sundal|kosambari|bowl/.test(lower) || tags.includes("salad")) {
      kind = "fresh bowl";
      detail = "contrasting textures tossed with bright, savoury seasoning";
    } else if (tags.includes("snack")) {
      kind = "quick snack";
      detail = "a compact, approachable bite made for practising basic preparation and seasoning";
    } else if (/idli|dhokla|puttu|idiyappam/.test(lower) || tags.includes("steam")) {
      kind = "steamed speciality";
      detail = "a soft, gently cooked dish that teaches batter or dough consistency";
    } else if (/dosa|uttapam|chila|chilla|pancake|crepe|pesarattu|adai/.test(lower)) {
      kind = "griddle-cooked speciality";
      detail = "a pourable batter cooked until set, browned, and ready for chutney or a side";
    } else if (/upma|poha|kees/.test(lower)) {
      kind = "savoury breakfast";
      detail = "a comforting grain-based dish finished with aromatics and seasoning";
    } else if (/biryani/.test(lower)) {
      kind = "layered rice dish";
      detail = "fragrant rice, spices, and hearty components cooked for bold flavour";
    } else if (/pulao|pilaf|rice|tehri|bath|bhat|jollof|nasi goreng/.test(lower)) {
      kind = "seasoned rice dish";
      detail = "rice cooked or tossed with aromatics, seasoning, and complementary ingredients";
    } else if (/khichdi|pongal/.test(lower)) {
      kind = "soft one-pot grain meal";
      detail = "grain and lentils cooked together into a comforting, dependable bowl";
    } else if (/dal|rajma|chana|chickpea|bean|lentil|ghugni|misir|ful /.test(lower) || tags.includes("dal")) {
      kind = "lentil or bean dish";
      detail = "slow-cooked pulses seasoned into an affordable, satisfying source of protein";
    } else if (/pasta|spaghetti|lasagna|gnocchi|macaroni/.test(lower) || tags.includes("pasta")) {
      kind = "Italian-style comfort dish";
      detail = "a pasta-centred meal that rewards sauce control and careful timing";
    } else if (/noodle|ramen|thukpa|pad thai|chow mein/.test(lower)) {
      kind = "noodle dish";
      detail = "noodles paired with a seasoned sauce, broth, vegetables, or protein";
    } else if (/soup|stew|shorba|rasam/.test(lower) || tags.includes("soup")) {
      kind = "warming soup or stew";
      detail = "a spoonable dish built by balancing liquid, aromatics, and seasoning";
    } else if (/roti|paratha|naan|puri|bhatura|bread|focaccia|pizza|litti|momo/.test(lower) || tags.includes("bread") || tags.includes("dough")) {
      kind = "dough-based speciality";
      detail = "a hands-on dish for learning hydration, shaping, and controlled cooking";
    } else if (/egg|omelette|shakshuka|tamago/.test(lower)) {
      kind = "egg dish";
      detail = "a protein-forward meal that teaches heat control and clear doneness cues";
    } else if (/fish|prawn|shrimp|salmon|tuna|masor|macher/.test(lower)) {
      kind = "seafood dish";
      detail = "fish or shellfish cooked with careful timing so it stays tender and well seasoned";
    } else if (/chicken|pork|mutton|lamb|keema|kebab/.test(lower)) {
      kind = "protein-rich main";
      detail = "meat cooked with aromatics and seasoning until safely done and flavourful";
    } else if (/curry|masala|korma|vindaloo|jhol|tenga|kuzhambu|theeyal|madra|saag|kafuli/.test(lower) || tags.includes("curry")) {
      kind = "saucy main or side";
      detail = "ingredients simmered in a seasoned base until the flavours come together";
    } else if (/poriyal|sabzi|bhaji|roast|avial|kootu|eromba|bai|dalma/.test(lower) || tags.includes("vegetable")) {
      kind = "vegetable-forward side";
      detail = "vegetables cooked with regional seasoning while keeping their best texture";
    } else if (/chutney|podi|pickle|raita|sauce/.test(lower) || tags.includes("chutney") || tags.includes("condiment") || tags.includes("sauce")) {
      kind = "flavour-packed accompaniment";
      detail = "a small side that adds freshness, heat, tang, or texture to a meal";
    } else if (tags.includes("dessert") || tags.includes("pastry") || tags.includes("halwa") || tags.includes("kheer") || tags.includes("payasam")) {
      kind = "sweet treat";
      detail = "a dessert that develops precision, texture judgement, and patient finishing";
    } else if (tags.includes("full-meal")) {
      kind = "complete meal";
      detail = "several complementary components coordinated into one satisfying plate";
    }

    return `${name} is a ${dietLabel} ${cuisineLabel} ${kind}: ${detail}.`;
  }

  function parseRow(row) {
    const [name, stageRaw, cuisine, region, diet, minutesRaw, proteinRaw, state, country, emoji, tagText] = row.split("|");
    const stage = Number(stageRaw);
    const tags = (tagText || "").split(",").filter(Boolean);
    const skillIds = [...stageSkills[stage]];
    if (/egg|omelette|shakshuka|tamago/i.test(name)) skillIds.push("crack-egg", "egg-set-cue", "protein-portion");
    if (/dal|chana|chickpea|bean|rajma|legume|sundal|usal|misir|ful /i.test(name)) skillIds.push("rinse-legumes", "legume-tenderness", "protein-portion");
    if (/rice|pulao|biryani|tehri|bath|bhat|khichdi|pongal/i.test(name)) skillIds.push("rinse-rice", "rice-water-ratio", "rest-fluff-rice");
    if (/dosa|idli|uttapam|appam|adai|chilla|handvo|dhokla|paniyaram/i.test(name)) skillIds.push("batter-consistency", "pan-preheat");
    if (/roti|paratha|thepla|momo|pizza|litti|idiyappam|puttu/i.test(name)) skillIds.push("gradual-hydration", "portion-dough");
    if (/chicken|fish|prawn|pork|tuna/i.test(name)) skillIds.push("raw-separation", "thermometer-use", "refrigerate-promptly");
    if (/paneer|tofu|soy|soya|curd|yogurt|lassi/i.test(name)) skillIds.push("protein-portion", "allergen-check");
    if (tags.includes("dessert")) skillIds.push("weigh-scale", "whisk", "fold-gently", "adjust-consistency", "timer-start", "visual-checkpoint");
    if (tags.includes("baking") || tags.includes("pastry")) skillIds.push("gradual-hydration", "portion-dough");

    const description = dishDescription(name, cuisine, diet, tags);
    return {
      id: `catalog-${slugify(name)}`,
      name,
      stage,
      cuisine,
      region,
      diet,
      minutes: Number(minutesRaw),
      protein: Number(proteinRaw),
      xp: 45 + stage * 25,
      difficulty: stageDifficulty[stage],
      skillIds: [...new Set(skillIds)],
      skillGroups: [],
      photo: null,
      emoji,
      description,
      summary: description,
      steps: tags.includes("dessert") ? dessertSteps[stage] : stageSteps[stage],
      safety: diet === "Non-vegetarian"
        ? "Keep raw animal protein separate from ready-to-eat food and verify safe doneness with a thermometer."
        : diet === "Egg"
          ? "Keep raw egg contact contained, wash affected tools, and cook to the required set."
          : "Use clean water, stable tools, controlled heat, and prompt refrigeration for perishables.",
      state: state || null,
      country: country || "India",
      tags
    };
  }

  const knownIds = new Set(data.recipes.map((recipe) => recipe.id));
  rows.map(parseRow).forEach((recipe) => {
    if (!knownIds.has(recipe.id)) {
      knownIds.add(recipe.id);
      data.recipes.push(recipe);
    }
  });

  data.recipes.forEach((recipe) => {
    recipe.description ||= `${recipe.name}: ${recipe.summary}`;
    recipe.summary ||= recipe.description;
    recipe.country ||= "India";
    recipe.state ||= null;
    recipe.tags ||= [];
    if (recipe.protein >= 15 && !recipe.tags.includes("protein")) recipe.tags.push("protein");
    if (recipe.stage === 7 && !recipe.tags.includes("full-meal")) recipe.tags.push("full-meal");
    if (/breakfast|chai|oats|egg|poha|upma|idli|dosa|uttapam|pongal/i.test(recipe.name) && !recipe.tags.includes("breakfast")) recipe.tags.push("breakfast");
    if (recipe.stage === 4 && !recipe.tags.includes("one-pot")) recipe.tags.push("one-pot");
  });

  const indiaStates = [
    ["Andhra Pradesh", "catalog-andhra-pesarattu-upma-plate", 57, 72], ["Arunachal Pradesh", "catalog-arunachal-vegetable-thukpa", 86, 24],
    ["Assam", "catalog-assamese-masor-tenga", 84, 34], ["Bihar", "catalog-bihari-litti-chokha", 64, 39],
    ["Chhattisgarh", "catalog-chhattisgarhi-chila", 51, 54], ["Goa", "catalog-goan-fish-curry-rice", 34, 70],
    ["Gujarat", "catalog-gujarati-handvo", 23, 47], ["Haryana", "catalog-haryanvi-bajra-khichdi", 39, 28],
    ["Himachal Pradesh", "catalog-himachali-chana-madra", 40, 18], ["Jharkhand", "catalog-jharkhand-dhuska-with-ghugni", 62, 47],
    ["Karnataka", "catalog-karnataka-bisi-bele-bath", 39, 70], ["Kerala", "catalog-kerala-appam-vegetable-stew", 42, 88],
    ["Madhya Pradesh", "catalog-malwa-bhutte-ka-kees", 43, 47], ["Maharashtra", "catalog-maharashtrian-misal-pav", 38, 58],
    ["Manipur", "catalog-manipuri-eromba", 90, 39], ["Meghalaya", "catalog-meghalaya-jadoh", 80, 37],
    ["Mizoram", "catalog-mizo-vegetable-bai", 88, 46], ["Nagaland", "catalog-naga-smoked-pork-with-axone", 90, 33],
    ["Odisha", "catalog-odia-dalma", 60, 56], ["Punjab", "catalog-punjabi-sarson-saag", 33, 23],
    ["Rajasthan", "catalog-rajasthani-panchmel-dal", 29, 39], ["Sikkim", "catalog-sikkim-vegetable-momos", 72, 30],
    ["Tamil Nadu", "catalog-tamil-ven-pongal-bowl", 49, 84], ["Telangana", "catalog-telangana-sarva-pindi", 50, 65],
    ["Tripura", "catalog-tripura-chakhwi", 84, 44], ["Uttar Pradesh", "catalog-up-vegetable-tehri", 51, 34],
    ["Uttarakhand", "catalog-uttarakhand-kafuli", 45, 23], ["West Bengal", "catalog-bengali-macher-jhol", 68, 48]
  ].map(([name, dishId, x, y]) => ({ name, dishId, x, y }));

  const worldCountries = [
    ["Italy", "catalog-spaghetti-aglio-e-olio", 51, 30], ["Mexico", "catalog-bean-quesadilla", 18, 47],
    ["Tunisia", "catalog-shakshuka", 48, 41], ["Morocco", "catalog-moroccan-chickpea-tagine", 44, 42],
    ["Egypt", "catalog-ful-medames", 53, 43], ["Ethiopia", "catalog-misir-wot", 57, 55],
    ["South Africa", "catalog-chakalaka-beans", 54, 76], ["Lebanon", "catalog-hummus-plate", 56, 39],
    ["Türkiye", "catalog-menemen", 55, 33], ["Greece", "catalog-greek-chickpea-salad", 53, 34],
    ["Spain", "catalog-spanish-tortilla", 46, 32], ["United Kingdom", "catalog-beans-on-toast", 47, 24],
    ["United States", "catalog-three-bean-chilli", 18, 36], ["Australia", "catalog-avocado-egg-toast", 86, 72],
    ["Indonesia", "catalog-nasi-goreng", 78, 66], ["Thailand", "catalog-thai-basil-tofu", 76, 50],
    ["Vietnam", "catalog-vietnamese-noodle-bowl", 79, 49], ["China", "catalog-chinese-tomato-eggs", 77, 36],
    ["Japan", "catalog-japanese-oyakodon", 87, 36], ["South Korea", "catalog-korean-bibimbap", 84, 34],
    ["Sri Lanka", "catalog-sri-lankan-parippu", 69, 60], ["Nepal", "catalog-nepali-dal-bhat", 70, 40],
    ["Brazil", "catalog-brazilian-black-bean-stew", 32, 67], ["Philippines", "catalog-filipino-chicken-adobo", 84, 55]
  ].map(([name, dishId, x, y]) => ({ name, dishId, x, y }));

  data.collectionConfig = {
    indiaStates,
    worldCountries,
    maps: {
      india: {
        url: "https://upload.wikimedia.org/wikipedia/commons/6/69/India_states_and_union_territories_map.svg",
        page: "https://commons.wikimedia.org/wiki/File:India_states_and_union_territories_map.svg",
        credit: "India states and union territories map, Planemad and contributors, CC BY-SA 3.0"
      },
      world: {
        url: "https://upload.wikimedia.org/wikipedia/commons/8/84/World_map_configurable.svg",
        page: "https://commons.wikimedia.org/wiki/File:World_map_configurable.svg",
        credit: "World map configurable, Heitordp, CC0"
      }
    },
    themed: [
      { id: "protein-protocol", name: "Protein Protocol", icon: "💪", description: "Cook 20 dishes with approximately 15 g or more protein.", target: 20, tag: "protein" },
      { id: "breakfast-stack", name: "Breakfast Stack", icon: "🌅", description: "Ship 15 different breakfasts.", target: 15, tag: "breakfast" },
      { id: "one-pot-operator", name: "One-Pot Operator", icon: "🫕", description: "Complete 12 one-pot missions.", target: 12, tag: "one-pot" },
      { id: "full-meal-architect", name: "Meal Architect", icon: "🍱", description: "Coordinate 8 complete meals.", target: 8, tag: "full-meal" },
      { id: "south-tiffin", name: "South Tiffin Set", icon: "🥞", description: "Cook 12 South Indian breakfast or tiffin dishes.", target: 12, tag: "south-tiffin" },
      { id: "world-passport", name: "World Passport", icon: "🌍", description: "Cook dishes associated with 10 different countries.", target: 10, tag: "world" }
    ]
  };
})();
