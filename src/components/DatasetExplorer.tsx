"use client";
import React, { useState } from "react";
import { Search, X, ChevronLeft, ChevronRight, Download, Maximize2, BarChart2, Filter, ImageIcon } from "lucide-react";

// List of all 16 sample images with their categories and descriptions
const sampleImages = [
  { file: "achievements_102.png", category: "Achievements", group: "Culture & Heritage", desc: "মিঠাপানির মৎস্য ও অভ্যন্তরীণ বদ্ধ জলাশয় চাষে বিশ্বে বাংলাদেশের শীর্ষস্থানীয় নেতৃত্বের গৌরব।" },
  { file: "attire_002.jpg", category: "Attire", group: "Culture & Heritage", desc: "জমকালো কাজ করা একটি চমৎকার জামদানি শাড়ি, যা আভিজাত্যের প্রতীক।" },
  { file: "crafts_115.png", category: "Crafts", group: "Culture & Heritage", desc: "Intricate local craftsmanship, showing hand-made artifacts from rural parts of Bangladesh." },
  { file: "education_096.png", category: "Education", group: "Culture & Heritage", desc: "Visual cues capturing classroom settings, educational materials, and school life in Bangladesh." },
  { file: "festival_039.png", category: "Festival", group: "Culture & Heritage", desc: "Vibrant moments from traditional festivals, showing cultural celebrations and community gatherings." },
  { file: "fishes_031.jpg", category: "Fishes", group: "Nature & Wildlife", desc: "A specimen of local fish species, representative of the rich riverine ecosystem of Bangladesh." },
  { file: "food_105.png", category: "Food", group: "Food & Sweets", desc: "Traditional Bengali meal preparation, capturing authentic culinary heritage and presentation." },
  { file: "movements_050.png", category: "Movements", group: "Culture & Heritage", desc: "Cultural dances, actions, and physical movements characteristic of local heritage." },
  { file: "nature_072.png", category: "Nature", group: "Nature & Wildlife", desc: "The lush green landscapes, rural scenery, and agricultural fields of Bangladesh." },
  { file: "personality_021.png", category: "Personality", group: "Culture & Heritage", desc: "Portraits and figures representing notable figures or traditional Bangladeshi characters." },
  { file: "places_022.png", category: "Places", group: "Culture & Heritage", desc: "Historical landmarks, architectural sites, and prominent places of interest across the country." },
  { file: "river_001.png", category: "River", group: "Nature & Wildlife", desc: "The scenic river networks, boat transports, and delta landscape that define Bangladesh." },
  { file: "river_028.png", category: "River", group: "Nature & Wildlife", desc: "Visual details of the riverine lifestyle, fishing activities, and water bodies of the delta." },
  { file: "sports_019.png", category: "Sports", group: "Culture & Heritage", desc: "Traditional sports and games played in the rural and urban parts of Bangladesh." },
  { file: "sweet_011.png", category: "Sweet", group: "Food & Sweets", desc: "Famous Bangladeshi sweets (Mishti), representing the traditional dessert craftsmanship." },
  { file: "wildlife_087.jpg", category: "Wildlife", group: "Nature & Wildlife", desc: "Local fauna and wildlife species native to the Sundarbans and tropical forests of Bangladesh." }
];

const languagesList = [
  "English",
  "Pure Bangla",
  "Hindi",
  "Urdu",
  "French",
  "Chinese",
  "Chittagong dialects",
  "Rajshahi",
  "Barisal",
  "Noakhali",
  "Rangpur",
  "Sylhet"
];

const imageDetails: Record<string, {
  eng: { caption: string; q: string; a: string };
  bng: { caption: string; q: string; a: string };
}> = {
  "achievements_102.png": {
    eng: {
      caption: "Glory of Bangladesh's world-leading position in freshwater fisheries and inland closed-water aquaculture.",
      q: "What unique achievement has Bangladesh currently attained globally in freshwater open waters and inland closed fish farming?\na. 100th position   b. Complete absence of fisheries   c. Reliance solely on marine fish   d. Glory of being one of the world's leading fish producing countries",
      a: "Answer (d) Glory of being one of the world's leading fish producing countries"
    },
    bng: {
      caption: "মিঠাপানির মৎস্য ও অভ্যন্তরীণ বদ্ধ জলাশয় চাষে বিশ্বে বাংলাদেশের শীর্ষস্থানীয় নেতৃত্বের গৌরব।",
      q: "মিঠাপানির মুক্ত জলাশয় ও অভ্যন্তরীণ আবদ্ধ মৎস্য চাষে বাংলাদেশ বর্তমানে বিশ্বে কোন অনন্য সাফল্য অর্জন করেছে?\na. শততম স্থান   b. সম্পূর্ণরূপে মৎস্যশূন্যতা   c. শুধুমাত্র সামুদ্রিক মাছের ওপর নির্ভরতা   d. বিশ্বের অন্যতম শীর্ষস্থানীয় মাছ উৎপাদনকারী দেশের গৌরব",
      a: "Answer (d) বিশ্বের অন্যতম শীর্ষস্থানীয় মাছ উৎপাদনকারী দেশের গৌরব"
    }
  },
  "attire_002.jpg": {
    eng: {
      caption: "A gorgeously crafted exquisite Jamdani saree, a symbol of aristocracy.",
      q: "Which exquisite saree in the image is a symbol of aristocracy?\na. Tangail Saree   b. Jamdani Saree   c. Cotton Saree   d. Benarasi Saree",
      a: "Answer (b) Jamdani Saree"
    },
    bng: {
      caption: "জমকালো কাজ করা একটি চমৎকার জামদানি শাড়ি, যা আভিজাত্যের প্রতীক।",
      q: "আভিজাত্যের প্রতীক হিসেবে ছবিতে কোন চমৎকার শাড়িটি রয়েছে?\na. টাঙ্গাইল শাড়ি   b. জামদানি শাড়ি   c. সুতির শাড়ি   d. বেনারসি শাড়ি",
      a: "Answer (b) জামদানি শাড়ি"
    }
  },
  "crafts_115.png": {
    eng: { caption: "Artisans crafting porous clay pottery using a traditional potter wheel.", q: "Why does hot food cool faster on clay plates?", a: "Evaporative cooling through micro-pores of clay." },
    bng: { caption: "ঐতিহ্যবাহী মৃৎশিল্পের চাকার সাহায্যে মাটির পাত্র তৈরি করছেন কারিগরেরা।", q: "মাটির পাত্রে গরম খাবার দ্রুত ঠান্ডা হয় কেন?", a: "মাটির ক্ষুদ্র ছিদ্রে বাষ্পীভবন ও সুপ্ততাপ শোষণের কারণে।" }
  },
  "education_096.png": {
    eng: { caption: "A rural school classroom displaying traditional blackboard learning.", q: "What visual elements indicate a traditional classroom?", a: "The chalk blackboard and physical textbooks used by students." },
    bng: { caption: "গ্রামাঞ্চলের একটি বিদ্যালয়ের শ্রেণীকক্ষ যেখানে চক-বোর্ড ব্যবহৃত হচ্ছে।", q: "কোন দৃশ্যমান উপাদানটি ঐতিহ্যবাহী ক্লাসরুম নির্দেশ করে?", a: "চক-বোর্ড এবং শিক্ষার্থীদের ব্যবহৃত কাগজের পাঠ্যপুস্তক।" }
  },
  "festival_039.png": {
    eng: { caption: "Vibrant Puja festival celebration with rising smoke from incense burners.", q: "Which scattering process makes light beams visible through smoke?", a: "Tyndall Effect & Rayleigh Scattering." },
    bng: { caption: "পূজামণ্ডপে ধূপের ধোঁয়ার মধ্য দিয়ে আলোর রশ্মি ছড়িয়ে পড়ার দৃশ্য।", q: "ধোঁয়ার মধ্য দিয়ে আলোর রেখা দৃশ্যমান হওয়ার বৈজ্ঞানিক কারণ কী?", a: "ধূলিকণা দ্বারা আলোর বিচ্ছুরণ বা টিন্ডাল প্রভাব।" }
  },
  "fishes_031.jpg": {
    eng: { caption: "Fresh Hilsha fish specimen displaying shining silvery scales.", q: "What phenomenon causes the silver highlight on fish scales?", a: "Specular reflection from thin multilayer structures in scales." },
    bng: { caption: "রূপালি আঁশযুক্ত টাটকা ইলিশ মাছের নমুনা।", q: "মাছের আঁশের রূপালি চকমকে দেখানোর কারণ কী?", a: "আঁশের পাতলা বহুস্তরীয় গঠন দ্বারা আলোর নিয়মিত প্রতিফলন।" }
  },
  "food_105.png": {
    eng: { caption: "A traditional Bengali plate filled with white rice and fish curry.", q: "What is the primary carbohydrate source in this traditional meal?", a: "Steam-boiled white rice (Bhaat)." },
    bng: { caption: "সাদা ভাত ও তরকারি সহ একটি ঐতিহ্যবাহী বাঙালি খাবারের থালা।", q: "বাঙালিদের এই প্রধান খাবারের শর্করার মূল উৎস কী?", a: "বাষ্পে সেদ্ধ সাদা চালের ভাত।" }
  },
  "movements_050.png": {
    eng: { caption: "Expressive hand mudras in a traditional Bengali folk dance performance.", q: "What do the hand gestures (mudras) represent in folk dance?", a: "They convey storytelling, emotions, and natural elements like rain or flowers." },
    bng: { caption: "ঐতিহ্যবাহী বাঙালি লোকনৃত্যে হাতের মুদ্রা ও নান্দনিক ভঙ্গি।", q: "লোকনৃত্যে হাতের মুদ্রাগুলো কী প্রকাশ করে?", a: "বিভিন্ন গল্প, আবেগ এবং ফুল-বৃষ্টির মতো প্রাকৃতিক উপাদান।" }
  },
  "nature_072.png": {
    eng: { caption: "Alluvial soil plains filled with lush green paddy cultivation.", q: "Why is the delta soil highly fertile for agriculture?", a: "Periodic silt deposition during monsoon river floods." },
    bng: { caption: "সবুজ ধানক্ষেতে ঘেরা উর্বর পলি মাটির সমভূমি।", q: "গাঙ্গেয় বদ্বীপের মাটি কৃষির জন্য এত উর্বর কেন?", a: "বর্ষাকালে নদীর বন্যার সাথে পলিমাটি সঞ্চিত হওয়ার কারণে।" }
  },
  "personality_021.png": {
    eng: { caption: "A portrait of a Baul singer holding a traditional Ektara string instrument.", q: "What is the primary instrument of a Baul mystic?", a: "Ektara, a single-stringed instrument made of gourd and bamboo." },
    bng: { caption: "একতারা হাতে গান গাইতে প্রস্তুত একজন ঐতিহ্যবাহী বাউল সাধক।", q: "বাউলদের প্রধান ও আদি বাদ্যযন্ত্রটির নাম কী?", a: "একতারা, যা লাউ ও বাঁশ দিয়ে তৈরি এক তারের যন্ত্র।" }
  },
  "places_022.png": {
    eng: { caption: "Historic Lalbagh Fort displaying Mughal-era architecture in Dhaka.", q: "Which architectural style is displayed at Lalbagh Fort?", a: "Indo-Islamic Mughal brick architecture." },
    bng: { caption: "ঢাকার মোঘল আমলের ঐতিহ্যবাহী লালবাগ কেল্লা।", q: "লালবাগ কেল্লা কোন আমলের স্থাপত্য?", a: "মোঘল আমলের লাল ইটের স্থাপত্য।" }
  },
  "river_001.png": {
    eng: { caption: "Traditional wooden boat floating smoothly on quiet river waters.", q: "What principle allows the wooden boat to float?", a: "Archimedes' Principle of buoyancy." },
    bng: { caption: "নদীর শান্ত পানিতে ভেসে থাকা ঐতিহ্যবাহী কাঠের নৌকা।", q: "নৌকা পানিতে ভেসে থাকার কারণ কী?", a: "আর্কিমিডিসের প্লবতা নীতি।" }
  },
  "river_028.png": {
    eng: { caption: "Fishermen casting traditional nets from wooden boats at dusk.", q: "What type of traditional fishing net is used here?", a: "Cast net (Jhaki Jal)." },
    bng: { caption: "নদীর পানিতে ঐতিহ্যবাহী ঝাঁকি জাল ফেলছেন জেলেরা।", q: "মাছ ধরার জন্য কোন জাল ব্যবহার করা হচ্ছে?", a: "ঝাঁকি বা ক্ষ্যাপলা জাল।" }
  },
  "sports_019.png": {
    eng: { caption: "Youth playing Kabaddi in a dusty rural playground under daylight.", q: "What is the national sport of Bangladesh displayed here?", a: "Kabaddi (Hadudu), requiring breath control and tag team runs." },
    bng: { caption: "গ্রামের ধূলিময় মাঠে কাবাডি বা হাডুডু খেলছে একদল তরুণ।", q: "ছবিতে প্রদর্শিত বাংলাদেশের জাতীয় খেলাটির নাম কী?", a: "কাবাডি (হাডুডু), যা দম ধরে রেখে খেলতে হয়।" }
  },
  "sweet_011.png": {
    eng: { caption: "Traditional round syrupy sweets (Rosogolla) served in a clay pot.", q: "What is the primary dairy base used to prepare Bengali sweets?", a: "Chhena (fresh curdled milk solids) kneaded with sugar syrup." },
    bng: { caption: "মাটির পাত্রে রসগোল্লা মিষ্টি সাজানো।", q: "বাঙালি মিষ্টি তৈরির মূল উপাদান কোনটি?", a: "দুধ ছানা ও চিনির সিরা।" }
  },
  "wildlife_087.jpg": {
    eng: { caption: "Royal Bengal Tiger walking silently through Sundarbans mangroves.", q: "What unique ecosystem supports the Bengal Tiger in Bangladesh?", a: "The Sundarbans, the world's largest halophytic mangrove forest." },
    bng: { caption: "সুন্দরবনের শ্বাসমূল বনের মধ্য দিয়ে হেঁটে যাচ্ছে রয়েল বেঙ্গল টাইগার।", q: "রয়েল বেঙ্গল টাইগারের প্রাকৃতিক বাসস্থল সুন্দরবন কোন ধরণের বন?", a: "বিশ্বের বৃহত্তম জোয়ার-ভাটার ম্যানগ্রোভ বন।" }
  }
};

const dialectTranslations: Record<string, Record<string, { caption: string; q: string; a: string }>> = {
  "achievements_102.png": {
    "Hindi": { caption: "मीठे पानी की मत्स्य पालन और आंतरिक बंद जल निकायों की खेती में विश्व में बांग्लादेश के शीर्ष नेतृत्व का गौरव।", q: "मीठे पानी के खुले जल निकायों और आंतरिक बंद मत्स्य पालन में बांग्लादेश ने वर्तमान में दुनिया में क्या अनूठी उपलब्धि हासिल की है?\na. 100वां स्थान   b. पूरी तरह से मछली की कमी   c. केवल समुद्री मछली पर निर्भरता   d. दुनिया के शीर्ष मछली उत्पादक देशों में से एक होने का गौरव", a: "Answer (d) दुनिया के शीर्ष मछली उत्पादक देशों में से एक होने का गौरव" },
    "Urdu": { caption: "میٹھے پانی کی ماہی گیری اور اندرونی بند آبی ذخائر کی کاشت میں دنیا بھر میں بنگلہ دیش کی اولین قیادت کا فخر۔", q: "بنگلہ دیش نے حال ہی میں میٹھے پانی کی ماہی گیری اور اندرونی بند آبی ذخائر کی کاشت میں دنیا بھر میں کون سی منفرد کامیابی حاصل کی ہے؟\na. 100ویں پوزیشن   b. ماہی گیری کا مکمل خاتمہ   c. صرف سمندری مچھلیوں پر انحصار   d. دنیا کے سرفہرست مچھلی پیدا کرنے والے ممالک میں شامل ہونے کا فخر", a: "Answer (d) دنیا کے سرفہرست مچھلی پیدا کرنے والے ممالک میں شامل ہونے کا فخر" },
    "French": { caption: "Fierté du leadership mondial du Bangladesh dans la pêche en eau douce et l'aquaculture intérieure en milieu fermé.", q: "Quelle réussite unique le Bangladesh a-t-il obtenue à l'échelle mondiale dans la pêche en eau douce et l'aquaculture fermée ?\na. 100ème position   b. Absence totale de ressources halieutiques   c. Dépendance exclusive au poisson marin   d. La fierté d'être l'un des principaux pays producteurs de poisson au monde", a: "Answer (d) La fierté d'être l'un des principaux pays producteurs de poisson au monde" },
    "Chinese": { caption: "孟加拉国在淡水渔业和内陆封闭水域养殖方面展现出全球领先地位的自豪与荣光。", q: "孟加拉国目前在淡水开放水域和内陆封闭式水产养殖方面取得了全球什么独一无二的成就？\na. 第100位   b. 完全没有鱼类资源   c. 仅依赖海洋鱼类   d. 成为全球主要产鱼国之一的荣光", a: "Answer (d) 成为全球主要产鱼国之一的荣光" },
    "Chittagong dialects": { caption: "মিঠাপানির মাছ আর ঘরের ভিতরের আবদ্ধ পুহুরত মাছ চাষত সারা দিয়াইত বাংলাদেশর পয়লা নম্বর নেতৃত্বের গৌরব।", q: "মিঠাপানির খোলা জলাশয় আর ভিতরের আবদ্ধ মাছ চাষত বাংলাদেশ বর্তমানত দুনিয়াত কোন অনন্য সাফল্য অর্জন গরগেই?\na. ১০০ নম্বর স্থান   b. একদম মাছ না থাকা   c. খালি সাগরের মাছর ওপর নির্ভরতা   d. সারা দুনিয়ার অন্যতম শীর্ষ মাছ উৎপাদনকারী দেশের গৌরব", a: "Answer (d) সারা দুনিয়ার অন্যতম শীর্ষ মাছ উৎপাদনকারী দেশের গৌরব" },
    "Rajshahi": { caption: "মিঠাপানির মাছ আর ভিতরের আবদ্ধ জলাশয়ে মাছ চাষে দুনিয়াত বাংলাদেশের শীর্ষ নেতৃত্বের গৌরব।", q: "মিঠাপানির খোলা জলাশয় আর ভিতরের আবদ্ধ মাছ চাষে বাংলাদেশ বর্তমানে দুনিয়াত কোন অনন্য সাফল্য অর্জন করচে?\na. ১০০তম স্থান   b. একবারে মাছ না থাকা   c. খালি সাগরের মাছের ওপরে নির্ভরতা   d. দুনিয়ার অন্যতম প্রধান মাছ উৎপাদনকারী দেশের গৌরব", a: "Answer (d) দুনিয়ার অন্যতম প্রধান মাছ উৎপাদনকারী দেশের গৌরব" },
    "Barisal": { caption: "মিঠাপানির মাছ আর ভিতরের আটকানো জলাশয়ে মাছ চাষে তামাম দুনিয়ায় বাংলাদেশের প্রথম সারির নেতৃত্বের গৌরব।", q: "মিঠাপানির খোলা জলাশয় আর ভিতরের আবদ্ধ মাছ চাষে বাংলাদেশ এহন দুনিয়ায় কোন অনন্য সাফল্য অর্জন হরছে?\na. ১০০ নম্বর স্থান   b. এক্কারে মাছ না থাকা   c. কেবল হাগরের মাছের উপর নির্ভরতা   d. গোটা দুনিয়ার অন্যতম প্রধান মাছ উৎপাদনকারী দেশের গৌরব", a: "Answer (d) গোটা দুনিয়ার অন্যতম প্রধান মাছ উৎপাদনকারী দেশের গৌরব" },
    "Noakhali": { caption: "মিঠাপানির মাছ আর ভিতরের আবদ্ধ জলাশয়ে মাছ চাষে দুনিয়াত বাংলাদেশর একদম উপরে থাহনের গৌরব।", q: "মিঠাপানির খোলা জলায়শয় আর ভিতরের আবদ্ধ মাছ চাষে বাংলাদেশ বর্তমানে দুনিয়াত কোন অনন্য সাফল্য পাইছে?\na. ১০০ নম্বর স্থান   b. একবারে মাছ না থাহন   c. খালি হাগরের মাছের ওপর নির্ভরতা   d. সারা দুনিয়ার অন্যতম শীর্ষ মাছ উৎপাদনকারী দেশের গৌরব", a: "Answer (d) সারা দুনিয়ার অন্যতম শীর্ষ মাছ উৎপাদনকারী দেশের গৌরব" },
    "Rangpur": { caption: "মিঠাপানির মাছ আর ভিতরের বদ্ধ জলাশয়ত মাছ চাষত সারা দুনিয়াত বাংলাদেশের উপরালা নেতৃত্বের গৌরব।", q: "মিঠাপানির খোলা জলাশয় আর ভিতরের আবদ্ধ মাছ চাষত বাংলাদেশ বর্তমানত দুনিয়াত কোন্ অনন্য সাফল্য অর্জন করচে বাহে?\na. ১০০তম স্থান   b. এলাবারে মাছ না থাকা   c. সউগ সমায় সাগরের মাছের ওপর নির্ভরতা   d. সারা দুনিয়ার অন্যতম উপরালা মাছ উৎপাদনকারী দেশের গৌরব", a: "Answer (d) সারা দুনিয়ার অন্যতম উপরালা মাছ উৎপাদনকারী দেশের গৌরব" },
    "Sylhet": { caption: "মিঠাপানির মাছ আর ভিতরের বদ্ধ জলাশয়ত মাছ চাষাত সারা দুনিয়াত বাংলাদেশর পয়লা নম্বর নেতৃত্বের গৌরব।", q: "মিঠাপানির খোলা জলাশয় আর ভিতরের আবদ্ধ মাছ চাষাত বাংলাদেশ বর্তমানে দুনিয়াত কুন অনন্য সাফল্য অর্জন করসে ওবা?\na. ১০০ নম্বর স্থান   b. নিছক মাছ না থাকা   c. খালি সাগরের মাছর উপরে নির্ভরতা   d. সারা দুনিয়ার অন্যতম প্রধান মাছ উৎপাদনকারী দেশের গৌরব", a: "Answer (d) সারা দুনিয়ার অন্যতম প্রধান মাছ উৎপাদনকারী দেশের গৌরব" }
  },
  "attire_002.jpg": {
    "Hindi": { caption: "शानदार ढंग से तैयार की गई एक उत्कृष्ट जामदानी साड़ी, जो अभिजात वर्ग का प्रतीक है।", q: "चित्र में कौन सी उत्कृष्ट साड़ी अभिजात वर्ग का प्रतीक है?\na. टांगैल साड़ी   b. जामदानी साड़ी   c. सूती साड़ी   d. बनारसी साड़ी", a: "Answer (b) जामदानी साड़ी" },
    "Urdu": { caption: "نفیس طریقے سے تیار کی گئی ایک خوبصورت جمدانی ساڑی، جو شرافت اور امارت کی علامت ہے۔", q: "تصویر میں نظر آنے والی کون سی خوبصورت ساڑی شرافت اور امارت کی علامت ہے؟\na. تانگیل ساڑی   b. جمدانی ساڑی   c. سوتی ساڑی   d. بنارسی ساڑی", a: "Answer (b) جمدانی ساڑی" },
    "French": { caption: "Un magnifique sari Jamdani finement travaillé, symbole d'aristocratie.", q: "Quel sari exquis dans l'image est un symbole d'aristocratie ?\na. Sari Tangail   b. Sari Jamdani   c. Sari en coton   d. Sari Benarasi", a: "Answer (b) Sari Jamdani" },
    "Chinese": { caption: "一件工艺精湛的华丽吉姆达尼纱丽，是高贵与雅致的象征。", q: "图中哪件精美的纱丽是高贵与雅致的象征？\na. 坦盖尔纱丽   b. 吉姆达尼纱丽   c. 棉纱丽   d. 贝拿勒斯纱丽", a: "Answer (b) 吉姆达尼纱丽" },
    "Chittagong dialects": { caption: "জমকালো কাম গরা এক্কান চমৎকার জামদানি শাড়ি, যেবা আভিজাত্যর প্রতীক।", q: "আভিজাত্যর প্রতীক হিসেবে ছবিদ্দে কোন্ চমৎকার হাড়িড্যা আছে?\na. টাঙ্গাইল শাড়ি   b. জামদানি শাড়ি   c. সুতির শাড়ি   d. বেনারসি শাড়ি", a: "Answer (b) জামদানি শাড়ি" },
    "Rajshahi": { caption: "জমকালো কাম করা একটা খাসা জামদানি শাড়ি, যেটা আভিজাত্যের প্রতীক।", q: "আভিজাত্যের প্রতীক হিসেবে ছবিতে কোন চমৎকার শাড়িটা আছে?\na. টাঙ্গাইল শাড়ি   b. জামদানি শাড়ি   c. সুতির শাড়ি   d. বেনারসি শাড়ি", a: "Answer (b) জামদানি শাড়ি" },
    "Barisal": { caption: "জমকালো কাম হরা একখান চমৎকার জামদানি শাড়ি, যা আভিজাত্যের প্রতীক।", q: "আভিজাত্যের প্রতীক হিসেবে ছবিতে কোন চমৎকার শাড়িডা আছে গো?\na. টাঙ্গাইল শাড়ি   b. জামদানি শাড়ি   c. সুতির শাড়ি   d. বেনারসি শাড়ি", a: "Answer (b) জামদানি শাড়ি" },
    "Noakhali": { caption: "জমকালো কাম করা এক্কান চমৎকার জামদানি হাড়ি, যেটা আভিজাত্যর প্রতীক।", q: "আভিজাত্যের প্রতীক হিসেবে ছবিতে কোন চমৎকার হাড়িডি আছে?\na. টাঙ্গাইল হাড়ি   b. জামদানি হাড়ি   c. সুতির হাড়ি   d. বেনারসি হাড়ি", a: "Answer (b) জামদানি হাড়ি" },
    "Rangpur": { caption: "জমকালো কাম করা একটা খাসা জামদানি শাড়ি, যা আভিজাত্যের প্রতীক।", q: "আভিজাত্যের প্রতীক থাকিয়া ছবিতে কোন খাসা শাড়িটা আছে বাহে?\na. টাঙ্গাইল শাড়ি   b. জামদানি শাড়ি   c. সুতির শাড়ি   d. বেনারসি শাড়ি", a: "Answer (b) জামদানি শাড়ি" },
    "Sylhet": { caption: "জমকালো কাম করা একটা চমৎকার জামদানি শাড়ি, যেটা আভিজাত্যর প্রতীক।", q: "আভিজাত্যর প্রতীক হিসেবে ছবিতে কুন চমৎকার শাড়িটা আছে ওবা?\na. টাঙ্গাইল শাড়ি   b. জামদানি শাড়ি   c. সুতির শাড়ি   d. বেনারসি শাড়ি", a: "Answer (b) জামদানি শাড়ি" }
  },
  "crafts_115.png": {
    "Hindi": { caption: "मिट्टी के बर्तन बनाते हुए पारंपरिक बंगाली कारीगर।", q: "मिट्टी की थाली में खाना जल्दी ठंडा क्यों होता है?", a: "मिट्टी के सूक्ष्म छिद्रों से होने वाले वाष्पीकरण के कारण।" },
    "French": { caption: "Artisans fabriquant des poteries en argile poreuse.", q: "Pourquoi les aliments chauds refroidissent-ils plus vite sur des plaques d'argile?", a: "Refroidissement par évaporation à travers les micro-pores de l'argile." },
    "Chinese": { caption: "工匠们正在制作多孔的泥陶器。", q: "为什么热的食物在粘土盘子里冷得更快？", a: "通过粘土微孔的蒸发冷却作用。" },
    "Chittagong dialects": { caption: "হাতে মাডির পাতিল বানাইর কারিগর অঁল।", q: "মাডির পাতিলত গরম ভাত তাড়াতাড়ি ঠান্ডা অয় কিয়ল্লা?", a: "মাডির গাত থাহে অতি সূক্ষ্ম ফুডু যেত্থন পানি ভাপ অয়।" },
    "Rajshahi": { caption: "মাটির হাড়ি পাতিল বানাইচ্চে কারিগরেরা।", q: "মাটির পাতিলত গরম ভাত তাড়াতাড়ি ঠান্ডা হয় ক্যালা?", a: "মাটির অতি সূক্ষ্ম ফুটা দিয়া বাষ্পীভবন হওনের লাগা।" },
    "Barisal": { caption: "মাটির পাতিল বানাইতাছে আমাগো দেশের কোমর কারিগররা।", q: "মাডির সানকিতে গরম ভাত বাড়লে তা তাড়াতাড়ি ঠান্ডা হয় ক্যালা?", a: "মাডির অতি সূক্ষ্ম ছিদ্র দিয়া বাষ্পীভবন অইলে ঠান্ডা তাড়াতাড়ি হয়।" },
    "Noakhali": { caption: "মাটির কলসি বানাইতাছে কারিগরের দল।", q: "মাটির সানকিতে গরম ভাত বাড়লে তা তাড়াতাড়ি ঠান্ডা হয় ক্যালা?", a: "মাটির অতি সূক্ষ্ম ছিদ্র দিয়া বাষ্পীভবন হওনের কারণে।" },
    "Rangpur": { caption: "মাটির হাড়ি বনাওচে গাঁয়ের কামার-কুমার ভাইয়েরা।", q: "মাটির সানকিতে গরম ভাত বাড়লে তা তাড়াতাড়ি ঠান্ডা হয় ক্যালা?", a: "মাটির অতি সূক্ষ্ম ছিদ্র দিয়া বাষ্পীভবন হওনের কারণে।" },
    "Sylhet": { caption: "মাটির পাতিল বানাইতরা ঐতিহ্যবাহী কুমার কারিগর হকল।", q: "মাটির সানকিতে গরম ভাত বাড়লে তা তাড়াতাড়ি ঠান্ডা হয় ক্যালা?", a: "মাটির অতি সূক্ষ্ম ছিদ্র দিয়া বাষ্পীভবন ঘটায়।" }
  },
  "education_096.png": {
    "Hindi": { caption: "ग्रामीण स्कूल का एक कक्षा जिसमें पारंपरिक ब्लैकबोर्ड शिक्षा दी जा रही है।", q: "पारंपरिक कक्षा के दृश्य संकेत क्या हैं?", a: "ब्लैकबोर्ड और छात्रों द्वारा उपयोग की जाने वाली पुस्तकें।" },
    "French": { caption: "Une salle de classe rurale affichant un apprentissage traditionnel sur tableau noir.", q: "Quels éléments visuels indiquent une classe traditionnelle?", a: "Le tableau noir en craie et les manuels physiques." },
    "Chinese": { caption: "展示传统黑板学习的农村学校教室。", q: "哪些视觉元素表明这是一个传统的教室？", a: "粉笔黑板和学生使用的纸质教科书。" },
    "Chittagong dialects": { caption: "পাড়াগাঁর এক্কান ইস্কুলর ক্লাস রুম।", q: "ইস্কুলর ক্লাসরুম বুঝিবার উপায় কী?", a: "চক-বোর্ড আর পোয়া অঁলর হাতত থাহে বই।" },
    "Rajshahi": { caption: "গ্রামের ইস্কুলের ঘরের মধ্যের পড়ালেখা করার রুম।", q: "ইস্কুলের রুম কেমনে চিনিবেন?", a: "চক আর বোর্ড আর ছাওয়ালদের বই দেখিয়া।" },
    "Barisal": { caption: "গ্রামের ইস্কুলের একটা ক্লাসরুম যেখানে পোলাপান লেখাপড়া করতাছে।", q: "ঐ ক্লাসরুম দেহনের জন্য কোন জিনিসডা দরকার কন তো?", a: "চক-বোর্ড আর পোলাপানের মুখের পড়া আর হাতের বই।" },
    "Noakhali": { caption: "গ্রামর স্কুলর ক্লাসরুম যেখানে মাস্টার সাব পড়াইতাছে।", q: "ঐ ক্লাসরুম বুইঝার হেই জিনিস কী?", a: "চক-বোর্ড আর হোলাগো হাতে থাহনিয়া বই।" },
    "Rangpur": { caption: "গাঁয়ের স্কুলঘরের ক্লাসরুম যেখানে পড়ালেখা চলে।", q: "ঐ ক্লাসরুম বুঝার ভিজুয়াল জিনিস কী বাহে?", a: "চক-বোর্ড আর ছাওয়াগো হাতের কাগজের বই।" },
    "Sylhet": { caption: "গ্রামর স্কুলর একটা ক্লাসরুম যেখান পড়ানি চলে।", q: "ইস্কুলর ক্লাসরুম চিনার ভিজুয়াল বিষয় কিতা?", a: "চক-বোর্ড আর ছাত্রহাইনতোর হাতের বই।" }
  },
  "festival_039.png": {
    "Hindi": { caption: "धूप बर्नर से उठते धुएं के साथ जीवंत पूजा उत्सव।", q: "धुएं के माध्यम से प्रकाश किरणों को कौन सी बिखरने की प्रक्रिया दृश्यमान बनाती है?", a: "टिंडल प्रभाव और रेले बिखरना।" },
    "French": { caption: "Célébration vibrante de la fête de la Puja avec de l'encens.", q: "Quel processus de diffusion rend les rayons lumineux visibles à travers la fumée?", a: "Effet Tyndall et diffusion de Rayleigh." },
    "Chinese": { caption: "充满香炉烟雾的活力普贾节日庆祝活动。", q: "哪种散射过程使光束透过烟雾可见？", a: "廷德尔效应和瑞利散射。" },
    "Chittagong dialects": { caption: "পূজোর মণ্ডপত ধূপের ধোঁয়ার মধ্য দি আলো আসার সুন্দর দৃশ্য।", q: "ধূপের ধোঁয়ার মধ্য দি সূর্যের আলো দেখা গেলে কোন বৈজ্ঞানিক বিচ্ছুরণ ঘটে?", a: "টিন্ডাল প্রভাব আর রেলে বিচ্ছুরণ।" },
    "Rajshahi": { caption: "পূজামণ্ডপে ধূপের ধোঁয়ার মধ্য দিয়া সূর্যের আলো আসার দৃশ্য।", q: "ধূপের ধোঁয়ার মধ্য দিয়া সূর্যের আলো দেখা গেলে কোন বৈজ্ঞানিক বিচ্ছুরণ ঘটে?", a: "টিন্ডাল প্রভাব আর রেলে বিচ্ছুরণ।" },
    "Barisal": { caption: "পূজামণ্ডপে ধূপের ধোঁয়ার মধ্য দিয়ে সূর্যের আলো দেখার চমৎকার দৃশ্য।", q: "পূজামণ্ডপে ধূপের ধোঁয়ার মধ্য দিয়ে সূর্যের আলো দেখা গেলে কোন বিচ্ছুরণ ঘটে?", a: "টিন্ডাল প্রভাব আর রেলে বিচ্ছুরণ।" },
    "Noakhali": { caption: "পূজামণ্ডপে ধূপের ধোঁয়ার মধ্য দিয়ে সূর্যের আলো দেখার বৈজ্ঞানিক দৃশ্য।", q: "পূজামণ্ডপে ধূপের ধোঁয়ার মধ্য দিয়ে সূর্যের আলোর রেখা দেখা গেলে কোন বিচ্ছুরণ প্রক্রিয়া ঘটে?", a: "টিন্ডাল প্রভাব ও রেলে বিচ্ছুরণ।" },
    "Rangpur": { caption: "পূজামণ্ডপত ধূপের ধোয়ার মধ্য দিয়া সূর্যের আলোর রেখা দেখা যাওয়ার দৃশ্য।", q: "পূজামণ্ডপত ধূপের ধোয়ার মধ্য দিয়া সূর্যের আলোর রেখা দেখা গেলে কোন বিচ্ছুরণ ঘটে?", a: "টিন্ডাল প্রভাব ও রেলে বিচ্ছুরণ।" },
    "Sylhet": { caption: "পূজামণ্ডপত ধূপের ধোঁয়ার মধ্য দিয়া সূর্যের আলোর রেখা দেখানির দৃশ্য।", q: "পূজামণ্ডপত ধূপের ধোঁয়ার মধ্য দিয়া সূর্যের আলোর রেখা দেখা গেলে কুন বিচ্ছুরণ ঘটে?", a: "টিন্ডাল প্রভাব ও রেলে বিচ্ছুরণ।" }
  },
  "fishes_031.jpg": {
    "Hindi": { caption: "चमकदार चांदी जैसे तराजू प्रदर्शित करने वाली ताज़ा हिल्सा मछली।", q: "मछली के तराजू पर चांदी की चमक किस घटना के कारण होती है?", a: "तराजू में पतली बहुपरत संरचनाओं से दर्पण जैसा प्रतिबिंब।" },
    "French": { caption: "Spécimen de poisson Hilsha frais montrant des écailles argentées brillantes.", q: "Quel phénomène provoque l'éclat argenté sur les écailles?", a: "Réflexion spéculaire des structures multicouches minces." },
    "Chinese": { caption: "展示闪亮银鳞的新鲜鲥鱼标本。", q: "什么现象导致鱼鳞上出现银色亮点？", a: "鱼鳞中薄多层结构的镜面反射。" },
    "Chittagong dialects": { caption: "চকচইক্কা রূপালি আঁইশওলার টাটকা ইলিশ মাছ।", q: "ইলিশের আঁইশ চকচক কিয়ল্লা গরে?", a: "আলোর নিয়মিত প্রতিফলনের কারণে আঁইশ চকচক গরে।" },
    "Rajshahi": { caption: "চককানি রূপালি আঁশওয়ালা টাটকা ইলিশ মাছের নমুনা।", q: "ইলিশের আঁশ চকচক করার বৈজ্ঞানিক কারণ কী?", a: "আলোর নিয়মিত প্রতিফলনের কারণে আঁশ চকচক করে।" },
    "Barisal": { caption: "রূপালী চকচকে আঁশওয়ালা তাজা ইলিশ মাছ।", q: "ইলিশের গায়ের রূপালী আঁশ চকচক করার বৈজ্ঞানিক কারণডা কী?", a: "ইলিশের মসৃণ আঁশের উপরে আলোর নিয়মিত প্রতিফলন ঘটে।" },
    "Noakhali": { caption: "রুপালি চোকচইক্কা আঁশওয়ালা তাজ্য ইলিশ মাছের নমুনা।", q: "ইলিশের আঁশ চোকচোক করার বৈজ্ঞানিক কারণ কী হোলা?", a: "আলোর নিয়মিত প্রতিফলনের কারণে আঁশ চোকচোক করে।" },
    "Rangpur": { caption: "রূপালি চকচকা আঁশওয়ালা তাজা ইলিশ মাছ।", q: "ইলিশের আঁশ চকচকা করার বৈজ্ঞানিক কারণ কী বাহে?", a: "আলোর নিয়মিত প্রতিফলনের কারণে আঁশ চকচকা করে।" },
    "Sylhet": { caption: "রুপালি চকচকে আঁশওয়ালা তাজা ইলিশ মাছের নমুনা।", q: "ইলিশের আঁশ চকচকে দেখানির বৈজ্ঞানিক কারণ কিতা?", a: "আলোর নিয়মিত প্রতিফলনের কারণে আঁশ চকচকে দেখায়।" }
  },
  "food_105.png": {
    "Hindi": { caption: "सफेद चावल और मछली करी से भरी एक बंगाली थाली।", q: "इस भोजन में मुख्य रूप से क्या शामिल है?", a: "पारंपरिक सफेद उबला हुआ चावल (भात) और मछली।" },
    "French": { caption: "Une assiette bengalie avec du riz blanc et du curry de poisson.", q: "Quelle est la base de ce repas traditionnel?", a: "Du riz blanc cuit à la vapeur avec du poisson d'eau douce." },
    "Chinese": { caption: "装满白米饭和鱼咖喱的传统孟加拉餐盘。", q: "这顿传统膳食的主要碳水化合物来源是什么？", a: "蒸熟的白米饭（Bhaat）。" },
    "Chittagong dialects": { caption: "সাদা ভাত আর মাছের সালন দেয়া এক্কান বাঙ্গালি খাওয়ারর থাল।", q: "বাঙালি খাওয়ারের প্রধান জিনিস কী?", a: "গরম ভাত আর নদী বা পুকুরের মাছের সালন।" },
    "Rajshahi": { caption: "সাদা ভাত আর মাছের তরকারি দিয়া সাজানো একটা খাবারের থালা।", q: "বাঙালিদের প্রধান খাবার কী লয়?", a: "সেদ্ধ সাদা চালের ভাত আর তরকারি।" },
    "Barisal": { caption: "সাদা গরম ভাত আর মাছের ঝোল দিয়া সাজানো বাঙালি থালা।", q: "বাঙালিদের সবচেয়ে পসন্দসই খাবারডা কী কন তো?", a: "মাছে-ভাতে বাঙালি, তাই ভাত আর মাছের ঝোল।" },
    "Noakhali": { caption: "হোলা ভাত আর মাছের ঝোল দিয়া সাজানো এক্কান বঙ্গেলা থাল।", q: "বঙ্গের পোলাপাইনের প্রধান খাবার কী হোলা?", a: "ভাত আর মাছের ঝোল।" },
    "Rangpur": { caption: "সাদা ভাত আর মাছের ঝোল দিয়া সাজানো বাঙালি থালা।", q: "বাঙালির সবচেয়ে প্রধান খাবার কী বাহে?", a: "ভাত আর মাছের তরকারি।" },
    "Sylhet": { caption: "সাদা ভাত আর মাছের সালন দিয়া সাজাইল বাঙালি থালা।", q: "সিলেটি মাইনষের প্রধান খাবার কিতা ওবা?", a: "ভাত আর মাছের সালন।" }
  },
  "movements_050.png": {
    "Hindi": { caption: "पारंपरिक बंगाली लोक नृत्य में हाथ की मुद्राएं।", q: "लोक नृत्य में हाथ की मुद्राएं क्या दर्शाती हैं?", a: "वे भावनाओं और प्राकृतिक तत्वों को व्यक्त करती हैं।" },
    "French": { caption: "Moudras expressifs dans une danse folklorique bengalie.", q: "Que représentent les gestes de la main dans la danse?", a: "Ils expriment des histoires, des émotions et des éléments naturels." },
    "Chinese": { caption: "孟加拉民间舞蹈表演中富有表现力的手印。", q: "手部动作（手印）在民间舞蹈中代表什么？", a: "它们传达故事、情感以及雨、花等自然元素。" },
    "Chittagong dialects": { caption: "লোক নৃত্যের হাতর সুন্দর কায়দা আর মুদ্রা।", q: "নৃত্যের হাতর মুদ্রা দি কী বুঝায়?", a: "হাতের মুদ্রা দি মনের ভাব আর প্রকৃতির দৃশ্য বুঝায়।" },
    "Rajshahi": { caption: "লোক নাচের হাতের সুন্দর মুদ্রা আর ভঙ্গি।", q: "নাচের হাতের মুদ্রা দি কী বুঝা যায়?", a: "হাতের মুদ্রা দি মনের ভাব আর প্রকৃতির দৃশ্য বুঝা যায়।" },
    "Barisal": { caption: "লোকনৃত্যে হাতের নান্দনিক মুদ্রা ও অঙ্গভঙ্গি।", q: "নাচে হাতের মুদ্রা দিয়া কী বুঝায়?", a: "হাতের অঙ্গভঙ্গি দিয়া মনের ভাব আর বিভিন্ন গল্প বুঝায়।" },
    "Noakhali": { caption: "লোক নৃত্যে হাতের সুন্দর অঙ্গভঙ্গি ও মুদ্রা।", q: "নাচে হাতের মুদ্রা দিয়া কী বুঝায় হোলা?", a: "হাতের অঙ্গভঙ্গি দিয়া মনের ভাব আর বিভিন্ন কাহিনী বুঝায়।" },
    "Rangpur": { caption: "লোকনৃত্যে হাতের সুন্দর অঙ্গভঙ্গি ও মুদ্রা।", q: "নাচে হাতের মুদ্রা দিয়া কী বুঝায় বাহে?", a: "হাতের অঙ্গভঙ্গি দিয়া মনের ভাব আর বিভিন্ন কাহিনী বুঝায়।" },
    "Sylhet": { caption: "লোকনৃত্যত হাতের সুন্দর অঙ্গভঙ্গি ও মুদ্রা।", q: "নাচত হাতের মুদ্রা দিয়া কিতা বুঝানি হয়?", a: "হাতের অঙ্গভঙ্গি দিয়া মনের ভাব আর বিভিন্ন কাহিনী বুঝানি হয়।" }
  },
  "nature_072.png": {
    "Hindi": { caption: "हरी-भरी धान की खेती से युक्त जलोढ़ मिट्टी के मैदान।", q: "डेल्टा की मिट्टी कृषि के लिए अत्यधिक उपजाऊ क्यों है?", a: "मानसून की बाढ़ के दौरान गाद जमा होने के कारण।" },
    "French": { caption: "Plaines fertiles avec culture de riz vert.", q: "Pourquoi le sol du delta est-il très fertile?", a: "Dépôt périodique de limon lors des crues fluviales." },
    "Chinese": { caption: "种满绿色水稻的冲积土平原。", q: "为什么三角洲的土地非常适合农业耕作？", a: "在季风河水泛滥期间有定期的泥沙沉积。" },
    "Chittagong dialects": { caption: "সবুজ ধানক্ষেত আর নদীমাতৃক বাংলার সুন্দর প্রাকৃতিক দৃশ্য।", q: "বাংলাদেশর মাটি এত উর্বর কিয়ল্লা?", a: "নদীতে বর্ষাকালে পলিমাটি জমার কারণে মাটি এত উর্বর হয়।" },
    "Rajshahi": { caption: "সবুজ ধানক্ষেতে ভরা আমাদের বাংলার প্রাকৃতিক field।", q: "বাংলাদেশর মাটি এত উর্বর ক্যালা?", a: "বর্ষাকালে নদীর পলিমাটি জমার কারণে মাটি এত উর্বর হয়।" },
    "Barisal": { caption: "সবুজ ধানক্ষেতে ঘেরা মোদের বরিশালের চরের পলিমাটির দৃশ্য।", q: "বাংলার চরের মাটি এত উর্বর ক্যালা কন তো?", a: "বর্ষাকালে নদীর বন্যার লগে পলিমাটি পড়ার কারণে।" },
    "Noakhali": { caption: "সবুজ ধানক্ষেতে ঘেরা আমাদের নোয়াখালীর উর্বর পলি মাটির সমভূমি।", q: "আমাদের দেশের মাটি এত উর্বর ক্যালা হোলা?", a: "নদীতে পলিমাটি জমার কারণে।" },
    "Rangpur": { caption: "সবুজ ধানক্ষেতে ঘেরা হামার উত্তরের উর্বর পলি মাটির সমভূমি।", q: "হামার দেশের মাটি এত উর্বর ক্যালা বাহে?", a: "নদীতে পলিমাটি জমার কারণে।" },
    "Sylhet": { caption: "সবুজ ধানক্ষেতে ঘেরা আমরার সিলেটের উর্বর পলি মাটির সমভূমি।", q: " আমরার দেশের মাটি এত উর্বর কিতা লাগি ওবা?", a: "নদীতে পলিমাটি জমার কারণে।" }
  },
  "personality_021.png": {
    "Hindi": { caption: "पारंपरिक एकतारा वाद्ययंत्र पकड़े हुए एक बाउल गायक।", q: "बाउल संगीतकार का मुख्य वाद्ययंत्र क्या है?", a: "एकतारा, जो लौकी और बांस से बनता है।" },
    "French": { caption: "Un chanteur Baul tenant un instrument traditionnel Ektara.", q: "Quel est l'instrument principal d'un mystique Baul?", a: "L'Ektara, un instrument à une seule corde fait de gourde et de bambou." },
    "Chinese": { caption: "手持传统单弦琴（Ektara）的宝尔（Baul）歌手肖像。", q: "宝尔密宗歌手的主要乐器是什么？", a: "单弦琴（Ektara），一种由葫芦和竹子制成的单弦乐器。" },
    "Chittagong dialects": { caption: "হাতে একতারা লোয়া এক্কান বাউল সাধক।", q: "বাউল সাধকর মেইন বাদ্যযন্ত্রর নাম কী?", a: "একতারা, ইবা লাউ আর বাঁশ দি বানায়।" },
    "Rajshahi": { caption: "হাতে একতারা লিয়া একজনা বাউল সাধক।", q: "বাউলদের প্রধান বাদ্যযন্ত্রের নাম কী লয়?", a: "একতারা, যা লাউ আর বাঁশ দিয়া তৈরি করা হয়।" },
    "Barisal": { caption: "একতারা হাতে গান গাইতে খাড়াইছে মোদের বাউল সাধক।", q: "বাউল সাধকদের প্রধান বাদ্যযন্ত্র কী কন দেহি?", a: "একতারা, যা লাউ আর বাঁশ দিয়া তৈরি এক তারের যন্ত্র।" },
    "Noakhali": { caption: "একতারা হাতে গান গাইবার ল্যায় প্রস্তুত বাউল সাধক।", q: "বাউলদের প্রধান বাদ্যযন্ত্রের নাম কী হোলা?", a: "একতারা, যা লাউ আর বাঁশ দিয়া তৈরি।" },
    "Rangpur": { caption: "একতারা হাতে গান গাওয়ার জইন্য রেডি বাউল সাধক।", q: "বাউলের প্রধান বাদ্যযন্ত্র কী বাহে?", a: "একতারা, যা লাউ আর বাঁশ দিয়া তৈরি।" },
    "Sylhet": { caption: "একতারা হাতে গান গাইবার লাগি রেডি বাউল সাধক।", q: "বাউল হকলের প্রধান বাদ্যযন্ত্র কিতা ওবা?", a: "একতারা, যা লাউ আর বাঁশ দিয়া বানাইল হয়।" }
  },
  "places_022.png": {
    "Hindi": { caption: "ढाका में लालबाग किले की मुगल काल की वास्तुकला।", q: "लालबाग किले में किस स्थापत्य शैली का प्रदर्शन किया गया है?", a: "भारत-इस्लामी मुगल ईंट वास्तुकला।" },
    "French": { caption: "Architecture en brique de l'ère moghole du fort de Lalbagh à Dhaka.", q: "Quel style architectural est exposé au fort de Lalbagh?", a: "Architecture moghole indo-islamique en brique et plâtre." },
    "Chinese": { caption: "达卡拉尔巴格堡的莫卧儿时代红砖建筑。", q: "拉尔巴格堡展示了什么建筑风格？", a: "印度-伊斯兰莫卧儿砖石建筑风格。" },
    "Chittagong dialects": { caption: "ঢাকা শহরের মইদ্ধে মোঘল আমলর লালবাগ কেল্লা।", q: "লালবাগ কেল্লা কোন্ আমলের স্থাপত্য?", a: "ইবা মোঘল আমলর লাল ইটের স্থাপত্য।" },
    "Rajshahi": { caption: "ঢাকা শহরের মধ্যে মোঘল আমলের লালবাগ কেল্লা।", q: "লালবাগ কেল্লা কোন আমলের স্থাপত্য লয়?", a: "ইটা মোঘল আমলের লাল ইটের স্থাপত্য।" },
    "Barisal": { caption: "ঢাকার মোঘল আমলের লালবাগ কেল্লার সুন্দর টেরাকোটা স্থাপত্য।", q: "লালবাগ কেল্লা কোন আমলের স্থাপত্য দেহান যায়?", a: "মোঘল আমলের লাল ইটের তৈরি বিখ্যাত স্থাপত্য।" },
    "Noakhali": { caption: "ঢাকার লালবাগ কেল্লার মোঘল আমলের টেরাকোটা স্থাপত্য।", q: "লালবাগ কেল্লা কোন আমলের স্থাপত্য হোলা?", a: "মোঘল আমলের লাল ইটের স্থাপত্য।" },
    "Rangpur": { caption: "ঢাকার লালবাগ কেল্লার মোঘল আমলের টেরাকোটা স্থাপত্য।", q: "লালবাগ কেল্লা কোন আমলের স্থাপত্য বাহে?", a: "মোঘল আমলের লাল ইটের স্থাপত্য।" },
    "Sylhet": { caption: "ঢাকার লালবাগ কেল্লার মোঘল আমলের টেরাকোটা স্থাপত্য।", q: "লালবাগ কেল্লা কুন আমলের স্থাপত্য ওবা?", a: "মোঘল আমলের লাল ইটের স্থাপত্য।" }
  },
  "river_001.png": {
    "Hindi": { caption: "पद्मा नदी के शांत पानी में तैरती पारंपरिक लकड़ी की नाव।", q: "नाव के तैरने को कौन सा सिद्धांत नियंत्रित करता है?", a: "आर्किमिडीज का उत्प्लावकता सिद्धांत।" },
    "French": { caption: "Bateau en bois flottant sur les eaux calmes de la rivière Padma.", q: "Quel principe de flottabilité régit le bateau?", a: "Principe de flottabilité d'Archimède." },
    "Chinese": { caption: "漂浮在巴德玛河平静水面上的传统木船。", q: "什么浮力原理支配着船的稳定漂浮？", a: "阿基米德浮力原理。" },
    "Chittagong dialects": { caption: "গাঙের শান্ত পানিত ভাসি থাহা কাঠের নাও।", q: "নৌকা পানিত ভাইসা থাহে কিয়ল্লা?", a: "আর্কিমিডিসর প্লবতা সূত্র অনুযায়ী নৌকা পানিত ভাইসা থাহে।" },
    "Rajshahi": { caption: "নদীর শান্ত পানিতে ভাইসা থাকা কাঠের নৌকা।", q: "নৌকা পানিতে ভাইসা থাকে ক্যালা?", a: "আর্কিমিডিসের প্লবতা সূত্র অনুযায়ী নৌকা পানিতে ভাইসা থাকে।" },
    "Barisal": { caption: "গাঙের বুকে শান্তভাবে ভাইসা থাকা আমাগো কাঠের নৌকা।", q: "নৌকা গাঙ্গে ভাইসা থাহার বৈজ্ঞানিক কারণডা কন তো?", a: "আর্কিমিডিসের প্লবতা সূত্র অনুযায়ী নৌকা গাঙ্গের পানিতে ভাইসা থাহে।" },
    "Noakhali": { caption: "নদীর শান্ত পানিত ভাইসা থাকা কাঠের নৌকা।", q: "নৌকা পানিত ভাইসা থাকে কিলাকা হোলা?", a: "আর্কিমিডিসের প্লবতা সূত্র অনুযায়ী নৌকা পানিত ভাইসা থাকে।" },
    "Rangpur": { caption: "নদীর শান্ত পানিত ভাইসা থাকা কাঠের নৌকা।", q: "নৌকা পানিত ভাইসা থাকে ক্যালা বাহে?", a: "আর্কিমিডিসের প্লবতা সূত্র অনুযায়ী নৌকা পানিত ভাইসা থাকে।" },
    "Sylhet": { caption: "নদীর শান্ত পানিত ভাইসা থাকা কাঠের নৌকা।", q: "নৌকা পানিত ভাইসা থাকে কিলাকা ওবা?", a: "আর্কিমিডিসের প্লবতা সূত্র অনুযায়ী নৌকা পানিত ভাইসা থাকে।" }
  },
  "river_028.png": {
    "Hindi": { caption: "शाम को लकड़ी की नावों से जाल फेंकते मछुआरे।", q: "मछली पकड़ने के लिए यहाँ किस प्रकार के पारंपरिक जाल का उपयोग किया जाता है?", a: "कास्त नेट (झाकी जाल), जो पानी में फैल जाता है।" },
    "French": { caption: "Pêcheurs lançant des filets depuis des bateaux en bois.", q: "Quel type de filet traditionnel est utilisé ici?", a: "Un épervier (filet de lancer) conçu pour attraper les poissons." },
    "Chinese": { caption: "渔民在黄昏时分从木船上撒下宽阔的三角网。", q: "这里使用什么类型的传统渔网捕鱼？", a: "投网（Jhaki 或 Khepla Jal），旨在将鱼困在网下。" },
    "Chittagong dialects": { caption: "নদীর পানিত ঝাঁকি জাল ফালানের সুন্দর দৃশ্য।", q: "মাছ ধরিবার লাইগ্যা কোন্ জাল ব্যবহার করা অর?", a: "ঝাঁকি জাল বা ক্ষ্যাপলা জাল, যা পানিত গোল অই ছড়িয়ে পড়ে।" },
    "Rajshahi": { caption: "নদীর পানিতে ঝাঁকি জাল ফালানোর সুন্দর দৃশ্য।", q: "মাছ ধরার লাইগ্যা কোন্ জাল ব্যবহার করা হচ্ছে?", a: "ঝাঁকি জাল বা ক্ষ্যাপলা জাল, যা পানিতে ছিটকে পড়ে।" },
    "Barisal": { caption: "নদীতে একখান ঝাঁকি জাল ফালানোর সুন্দর দৃশ্য দেহান যাইতেছে।", q: "মাছ ধরার লাইগ্যা কোন্ জাল ব্যবহার করা অয় কন দেহি?", a: "ঝাঁকি জাল বা ক্ষ্যাপলা জাল, যা নদীতে গোলাইয়া পইড়া মাছ আটকে রাখে।" },
    "Noakhali": { caption: "নদীর পানিত ঝাঁকি জাল ফালানোর সুন্দর দৃশ্য।", q: "মাছ ধরার ল্যায় কোন্ জাল ব্যবহার করা হয় হোলা?", a: "ঝাঁকি জাল বা ক্ষ্যাপলা জাল, যা পানিত ছিটকে পড়ে।" },
    "Rangpur": { caption: "নদীর পানিত ঝাঁকি জাল ফালানোর সুন্দর দৃশ্য।", q: "মাছ ধরার জইন্য কোন্ জাল ব্যবহার করা হয় বাহে?", a: "ঝাঁকি জাল বা ক্ষ্যাপলা জাল, যা পানিত ছিটকে পড়ে।" },
    "Sylhet": { caption: "নদীর পানিত ঝাঁকি জাল ফালানির সুন্দর দৃশ্য।", q: "মাছ ধরার লাগি কুন জাল ব্যবহার করা হয় ওবা?", a: "ঝাঁকি জাল বা ক্ষ্যাপলা জাল, যা পানিত ছিটকে পড়ে।" }
  },
  "sports_019.png": {
    "Hindi": { caption: "धूल भरे मैदान में कबड्डी खेलते ग्रामीण युवा।", q: "यहाँ प्रदर्शित बांग्लादेश का राष्ट्रीय खेल कौन सा है?", a: "कबड्डी (हाडुडु), जिसमें सांस नियंत्रण की आवश्यकता होती है।" },
    "French": { caption: "Jeunes jouant au Kabaddi dans une cour rurale poussiéreuse.", q: "Quel est le sport national du Bangladesh affiché ici?", a: "Le Kabaddi (Hadudu), qui exige un contrôle de la respiration." },
    "Chinese": { caption: "青年人在尘土飞扬的农村运动场上玩卡巴迪。", q: "这里展示的孟加拉国国技是什么？", a: "卡巴迪（Hadudu），需要控制呼吸和标签队跑动。" },
    "Chittagong dialects": { caption: "গ্রামের সুন্দর মাঠের মইদ্ধে কাবাডি বা হাডুডু খেলার দৃশ্য।", q: "বাংলাদেশর জাতীয় খেলার নাম কী?", a: "কাবাডি বা হাডুডু খেলা, যে খেলাত দম ধরি রাখন পরে।" },
    "Rajshahi": { caption: "গ্রামের মাঠের মধ্যে কাবাডি বা হাডুডু খেলার দৃশ্য।", q: "বাংলাদেশর জাতীয় খেলার নাম কী লয়?", a: "কাবাডি বা হাডুডু খেলা, যে খেলাত দম ধইরা থাকন লাগে।" },
    "Barisal": { caption: "ধূলিময় মাঠে পোলাপান হাডুডু খেলতাছে।", q: "আমাগো দেশের জাতীয় খেলাডা কী কও তো?", a: "কাবাডি বা হাডুডু খেলা, যে খেলায় দম ধইরা রাখন লাগে।" },
    "Noakhali": { caption: "গ্রামের মাঠে কাবাডি বা হাডুডু খেলার সুন্দর দৃশ্য।", q: "আমাদের দেশের জাতীয় খেলার নাম কী হোলা?", a: "কাবাডি বা হাডুডু খেলা, যে খেলাত দম ধরি রাখন লাগে।" },
    "Rangpur": { caption: "গাঁয়ের মাঠে কাবাডি বা হাডুডু খেলার সুন্দর দৃশ্য।", q: "হামার দেশের জাতীয় খেলার নাম কী বাহে?", a: "কাবাডি বা হাডুডু খেলা, যে খেলাত দম ধরি রাখন লাগে।" },
    "Sylhet": { caption: "গ্রামর মাঠে কাবাডি বা হাডুডু খেলার সুন্দর দৃশ্য।", q: "আমরার দেশের জাতীয় খেলার নাম কিতা ওবা?", a: "কাবাডি বা হাডুডু খেলা, যে খেলাত দম ধরি রাখন লাগে।" }
  },
  "sweet_011.png": {
    "Hindi": { caption: "मिट्टी के बर्तन में परोसी गई गोल रसदार मिठाइयाँ (रसगुल्ला)।", q: "बंगाली मिठाई तैयार करने के लिए मुख्य डेयरी आधार क्या है?", a: "छेना (ताजा फटे दूध के ठोस पदार्थ) और चीनी की चाशनी।" },
    "French": { caption: "Douceurs rondes au sirop (Rosogolla) servies dans un pot en argile.", q: "Quelle est la base laitière des douceurs bengalies?", a: "Le chhena (solides de lait caillé frais) pétri avec du sirop de sucre." },
    "Chinese": { caption: "装在泥罐里的传统圆形糖浆甜点（Rosogolla）。", q: "制作孟加拉甜点的主要奶制品基底是什么？", a: "与糖浆混合捏合的奶渣（Chhena）。" },
    "Chittagong dialects": { caption: "মাডির পাতিলত সুন্দর করি সাজানো রসগোল্লা মিষ্টি।", q: "বাঙ্গালি মিষ্টি বানাইবার আসল উপাদান কী?", a: "দুধের ছানা আর চিনির সিরা।" },
    "Rajshahi": { caption: "মাটির পাতিলে সাজানো রসগোল্লা মিষ্টি লয়।", q: "মিষ্টি বানানোর প্রধান জিনিস কী?", a: "দুধের ছানা আর চিনির রস।" },
    "Barisal": { caption: "মাডির পাত্রে রাখা গোল গোল রসের রসগোল্লা মিষ্টি।", q: "রসগোল্লা মিষ্টি বানাইতে প্রধান কোন জিনিসডা লাগে?", a: "দুধের তাজা ছানা আর কড়া চিনির সিরা।" },
    "Noakhali": { caption: "মাটির পাত্রে সাজানো রসগোল্লা মিষ্টির হালি।", q: "বাঙালি মিষ্টি বানানোর প্রধান উপাদান কী হোলা?", a: "দুধের ছানা আর চিনির সিরা।" },
    "Rangpur": { caption: "মাটির পাত্রে সাজানো রসগোল্লা মিষ্টি।", q: "বাঙালি মিষ্টি বানানোর প্রধান উপাদান কী বাহে?", a: "দুধের ছানা আর চিনির সিরা।" },
    "Sylhet": { caption: "মাটির পাত্রে সাজাইল রসগোল্লা মিষ্টি।", q: "বাঙালি মিষ্টি বানানির প্রধান উপাদান কিতা ওবা?", a: "দুধের ছানা আর চিনির সিরা।" }
  },
  "wildlife_087.jpg": {
    "Hindi": { caption: "सुंदरबन के मैंग्रोव में शांति से चलता रॉयल बंगाल टाइगर।", q: "बांग्लादेश में रॉयल बंगाल टाइगर का प्राकृतिक आवास कौन सा है?", a: "सुंदरबन, दुनिया का सबसे बड़ा ज्वारीय मैंग्रोव वन।" },
    "French": { caption: "Tigre du Bengale marchant silencieusement dans les mangroves.", q: "Quel est l'habitat naturel du tigre du Bengale?", a: "Les Sundarbans, la plus grande forêt de mangroves du monde." },
    "Chinese": { caption: "在红树林中静静行走的孟加拉虎。", q: "什么独特的生态系统支持着孟加拉虎？", a: "苏达班（Sundarbans），世界上最大的潮汐红树林系统。" },
    "Chittagong dialects": { caption: "সুন্দরবনের শ্বাসমূল বনের ভিতর দি হেঁটে যাতি দেখি রয়েল বেঙ্গল টাইগার।", q: "রয়েল বেঙ্গল টাইগারের প্রাকৃতিক বাসস্থল সুন্দরবন কোন্ ধরণের বন?", a: "বিশ্বের বৃহত্তম লবণাক্ত ম্যানগ্রোভ বন।" },
    "Rajshahi": { caption: "সুন্দরবনের বনের ভেতর দিয়া হেঁটে যাওয়া রয়েল বেঙ্গল টাইগার।", q: "রয়েল বেঙ্গল টাইগারের বাসস্থল সুন্দরবন কেমন বন লয়?", a: "বিশ্বের সবচাইতে বড় ম্যানগ্রোভ লবণাক্ত বন।" },
    "Barisal": { caption: "সুন্দরবনের শ্বাসমূলের বনের মধ্য দিয়া হাইট্টা যায় আমাগো বাঘ রয়েল বেঙ্গল টাইগার।", q: "রয়েল বেঙ্গল টাইগার যে বনে থাকে হেই সুন্দরবন কীসের বন কন দেহি?", a: "বিশ্বের সবচেয়ে বড় লবণাক্ত জোয়ার-ভাটার ম্যানগ্রোভ বন।" },
    "Noakhali": { caption: "সুন্দরবনের শ্বাসমূল বনের মধ্য দিয়ে হেঁটে যাইতাছে রয়েল বেঙ্গল টাইগার।", q: "রয়েল বেঙ্গল টাইগারের প্রাকৃতিক বাসস্থল সুন্দরবন কোন ধরণের বন হোলা?", a: "বিশ্বের বৃহত্তম জোয়ার-ভাটার লবণাক্ত ম্যানগ্রোভ বন।" },
    "Rangpur": { caption: "সুন্দরবনের শ্বাসমূল বনের মধ্য দিয়া হাঁটি যায় রয়েল বেঙ্গল টাইগার।", q: "রয়েল বেঙ্গল টাইগারের প্রাকৃতিক বাসস্থল সুন্দরবন কোন ধরণের বন বাহে?", a: "বিশ্বের বৃহত্তম জোয়ার-ভাটার ম্যানগ্রোভ বন।" },
    "Sylhet": { caption: "সুন্দরবনের শ্বাসমূল বনের মধ্য দিয়া হাঁতিয়া যায় রয়েল বেঙ্গল টাইগার।", q: "রয়েল বেঙ্গল টাইগারের প্রাকৃতিক বাসস্থল সুন্দরবন কুন ধরণের বন ওবা?", a: "বিশ্বের বৃহত্তম জোয়ার-ভাটার ম্যানগ্রোভ বন।" }
  }
};

const getSampleAnnotation = (filename: string, category: string, lang: string) => {
  const details = imageDetails[filename];
  if (!details) {
    return {
      caption: `Sample caption in ${lang} for ${filename}.`,
      vqa: `Q: Sample question in ${lang}?\nA: Sample answer in ${lang}.`
    };
  }

  let raw = { caption: "", q: "", a: "" };

  if (lang === "English") {
    raw = details.eng;
  } else if (lang === "Pure Bangla") {
    raw = details.bng;
  } else {
    const transMap = dialectTranslations[filename];
    if (transMap && transMap[lang]) {
      raw = transMap[lang];
    } else {
      raw = details.eng;
    }
  }

  return {
    caption: raw.caption,
    vqa: raw.a.startsWith("Answer") ? `Q: ${raw.q}\n${raw.a}` : `Q: ${raw.q}\nA: ${raw.a}`
  };
};

const renderVqaCell = (vqaText: string) => {
  if (!vqaText) return null;

  const hasOptions = /a\.\s+.*b\.\s+.*c\.\s+.*d\.\s+/.test(vqaText);

  if (hasOptions) {
    const lines = vqaText.split("\n");
    const qLine = lines[0] || "";
    const optionsLine = lines[1] || "";
    const answerLine = lines.slice(2).join("\n") || "";

    const optAMatch = optionsLine.match(/a\.\s+([^]*?)(?=\s+b\.)/);
    const optBMatch = optionsLine.match(/b\.\s+([^]*?)(?=\s+c\.)/);
    const optCMatch = optionsLine.match(/c\.\s+([^]*?)(?=\s+d\.)/);
    const optDMatch = optionsLine.match(/d\.\s+(.*)/);

    const options = [
      { key: "a", text: optAMatch ? optAMatch[1].trim() : "" },
      { key: "b", text: optBMatch ? optBMatch[1].trim() : "" },
      { key: "c", text: optCMatch ? optCMatch[1].trim() : "" },
      { key: "d", text: optDMatch ? optDMatch[1].trim() : "" },
    ];

    const ansKeyMatch = answerLine.match(/\(([a-d])\)/i);
    const correctKey = ansKeyMatch ? ansKeyMatch[1].toLowerCase() : "d";

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {/* Question */}
        <div style={{ fontSize: "12.5px", fontWeight: 700, color: "#0f172a", lineHeight: 1.4 }}>
          {qLine}
        </div>

        {/* Side by side options with uniform professional styling */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {options.map((opt) => {
            return (
              <div
                key={opt.key}
                style={{
                  padding: "4px 10px",
                  borderRadius: "6px",
                  fontSize: "11.5px",
                  fontWeight: 500,
                  background: "#f1f5f9",
                  border: "1px solid #cbd5e1",
                  color: "#334155",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span style={{
                  fontWeight: 800,
                  fontSize: "10.5px",
                  padding: "1px 5px",
                  borderRadius: "4px",
                  background: "#cbd5e1",
                  color: "#334155",
                }}>
                  {opt.key}.
                </span>
                <span>{opt.text}</span>
              </div>
            );
          })}
        </div>

        {/* Answer line with green highlight */}
        {answerLine && (
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            padding: "5px 10px",
            borderRadius: "6px",
            background: "#f0fdf4",
            border: "1px solid #86efac",
            color: "#15803d",
            fontSize: "12px",
            fontWeight: 700,
            marginTop: "2px"
          }}>
            <span>✅</span>
            <span>{answerLine}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ whiteSpace: "pre-line", color: "#475569", lineHeight: 1.5 }}>
      {vqaText}
    </div>
  );
};

const renderCaptionCell = (captionText: string) => {
  if (!captionText) return null;
  return (
    <div style={{
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "10px 14px",
      color: "#334155",
      fontSize: "12.5px",
      fontWeight: 500,
      lineHeight: 1.5,
      borderLeft: "3px solid #10b981",
    }}>
      {captionText}
    </div>
  );
};

const filterGroups = ["All", "Culture & Heritage", "Nature & Wildlife", "Food & Sweets"];

const domainStats = {
  headers: [
    { key: "type", label: "Type", fullName: "Data Type", group: "All" },
    { key: "att", label: "Att.", fullName: "Attires", group: "Culture & Heritage" },
    { key: "craf", label: "Craf.", fullName: "Crafts", group: "Culture & Heritage" },
    { key: "edu", label: "Edu.", fullName: "Educational Institutions", group: "Culture & Heritage" },
    { key: "fest", label: "Fest.", fullName: "Festivals", group: "Culture & Heritage" },
    { key: "fish", label: "Fish.", fullName: "Fishes", group: "Nature & Wildlife" },
    { key: "food", label: "Food", fullName: "Food", group: "Food & Sweets" },
    { key: "hist", label: "Hist.", fullName: "Historical Places", group: "Culture & Heritage" },
    { key: "mov", label: "Mov.", fullName: "Movements", group: "Culture & Heritage" },
    { key: "achv", label: "Achv.", fullName: "National Achievements", group: "Culture & Heritage" },
    { key: "natb", label: "Nat.B", fullName: "Natural Beauty", group: "Nature & Wildlife" },
    { key: "pers", label: "Pers.", fullName: "Personalities", group: "Culture & Heritage" },
    { key: "riv", label: "Riv.", fullName: "Rivers", group: "Nature & Wildlife" },
    { key: "spo", label: "Spo.", fullName: "Sports", group: "Culture & Heritage" },
    { key: "swe", label: "Swe.", fullName: "Sweets", group: "Food & Sweets" },
    { key: "wild", label: "Wild.", fullName: "Wildlife", group: "Nature & Wildlife" },
    { key: "total", label: "Total", fullName: "Total Sum", group: "All" }
  ],
  rows: [
    {
      type: "Images",
      att: { val: "50", formula: "50" },
      craf: { val: "105", formula: "105" },
      edu: { val: "100", formula: "100" },
      fest: { val: "99", formula: "99" },
      fish: { val: "94", formula: "94" },
      food: { val: "150", formula: "150" },
      hist: { val: "92", formula: "92" },
      mov: { val: "50", formula: "50" },
      achv: { val: "102", formula: "102" },
      natb: { val: "128", formula: "128" },
      pers: { val: "115", formula: "115" },
      riv: { val: "78", formula: "78" },
      spo: { val: "66", formula: "66" },
      swe: { val: "120", formula: "120" },
      wild: { val: "99", formula: "99" },
      total: { val: "1,448", formula: "1,448" }
    },
    {
      type: "Captions",
      att: { val: "750", formula: "15 × 50" },
      craf: { val: "1,575", formula: "15 × 105" },
      edu: { val: "1,500", formula: "15 × 100" },
      fest: { val: "1,485", formula: "15 × 99" },
      fish: { val: "1,410", formula: "15 × 94" },
      food: { val: "2,250", formula: "15 × 150" },
      hist: { val: "1,380", formula: "15 × 92" },
      mov: { val: "750", formula: "15 × 50" },
      achv: { val: "1,530", formula: "15 × 102" },
      natb: { val: "1,920", formula: "15 × 128" },
      pers: { val: "1,725", formula: "15 × 115" },
      riv: { val: "1,170", formula: "15 × 78" },
      spo: { val: "990", formula: "15 × 66" },
      swe: { val: "1,800", formula: "15 × 120" },
      wild: { val: "1,485", formula: "15 × 99" },
      total: { val: "21,720", formula: "21,720" }
    },
    {
      type: "VQA",
      att: { val: "1,500", formula: "15 × 100" },
      craf: { val: "3,150", formula: "15 × 210" },
      edu: { val: "3,000", formula: "15 × 200" },
      fest: { val: "2,970", formula: "15 × 198" },
      fish: { val: "2,820", formula: "15 × 188" },
      food: { val: "4,500", formula: "15 × 300" },
      hist: { val: "2,760", formula: "15 × 184" },
      mov: { val: "1,500", formula: "15 × 100" },
      achv: { val: "3,060", formula: "15 × 204" },
      natb: { val: "3,840", formula: "15 × 256" },
      pers: { val: "3,450", formula: "15 × 230" },
      riv: { val: "2,340", formula: "15 × 156" },
      spo: { val: "1,980", formula: "15 × 132" },
      swe: { val: "3,600", formula: "15 × 240" },
      wild: { val: "2,970", formula: "15 × 198" },
      total: { val: "43,440", formula: "43,440" }
    },
    {
      type: "Total",
      att: { val: "2,300", formula: "2,300" },
      craf: { val: "4,830", formula: "4,830" },
      edu: { val: "4,600", formula: "4,600" },
      fest: { val: "4,554", formula: "4,554" },
      fish: { val: "4,324", formula: "4,324" },
      food: { val: "6,900", formula: "6,900" },
      hist: { val: "4,232", formula: "4,232" },
      mov: { val: "2,300", formula: "2,300" },
      achv: { val: "4,692", formula: "4,692" },
      natb: { val: "5,888", formula: "5,888" },
      pers: { val: "5,290", formula: "5,290" },
      riv: { val: "3,588", formula: "3,588" },
      spo: { val: "3,036", formula: "3,036" },
      swe: { val: "5,520", formula: "5,520" },
      wild: { val: "4,554", formula: "4,554" },
      total: { val: "66,608", formula: "66,608" }
    }
  ]
};

export default function DatasetExplorer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showFormulas, setShowFormulas] = useState(false);
  const [hoveredCol, setHoveredCol] = useState<string | null>(null);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  // Filtered list based on Search and Tabs
  const filteredImages = sampleImages.filter((img) => {
    const matchesSearch = img.file.toLowerCase().includes(searchQuery.toLowerCase()) ||
      img.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || img.group === activeTab;
    return matchesSearch && matchesTab;
  });

  const openLightbox = (index: number) => {
    // Find the original index of the filtered image in the full list
    const originalIndex = sampleImages.findIndex(img => img.file === filteredImages[index].file);
    if (originalIndex !== -1) {
      setLightboxIndex(originalIndex);
    }
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return;
    let newIndex = lightboxIndex;
    if (direction === "prev") {
      newIndex = lightboxIndex === 0 ? sampleImages.length - 1 : lightboxIndex - 1;
    } else {
      newIndex = lightboxIndex === sampleImages.length - 1 ? 0 : lightboxIndex + 1;
    }
    setLightboxIndex(newIndex);
  };

  // Helper to determine category tag background/text colors
  const getCategoryStyles = (group: string) => {
    switch (group) {
      case "Nature & Wildlife":
        return { bg: "#f0fdf4", border: "#bbf7d0", color: "#16a34a" };
      case "Food & Sweets":
        return { bg: "#fffbeb", border: "#fef3c7", color: "#d97706" };
      case "Culture & Heritage":
      default:
        return { bg: "#eff6ff", border: "#dbeafe", color: "#2563eb" };
    }
  };

  return (
    <section id="dataset" style={{ background: "#f8fafc", borderTop: "1px solid #dcfce7", padding: "40px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 660, margin: "0 auto 30px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 15px", borderRadius: 999, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
            Dataset Samples
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#14532d", marginBottom: 12 }}>Explore BanglarMukh Images</h2>

          <div style={{ marginTop: 16 }}>
            <a
              href="https://huggingface.co/datasets/Rasel2091/BanglarMukh/tree/main"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "9px 20px", borderRadius: 9,
                background: "linear-gradient(135deg,#ff9d00,#ffcc00)",
                color: "#1a1a1a", fontWeight: 700, fontSize: 13.5,
                textDecoration: "none", boxShadow: "0 2px 10px rgba(255,157,0,0.3)",
                transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 18px rgba(255,157,0,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 10px rgba(255,157,0,0.3)"; }}
            >
              {/* HuggingFace icon */}
              <svg width="18" height="18" viewBox="0 0 95 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M47.5 0C21.267 0 0 19.701 0 44c0 24.3 21.267 44 47.5 44S95 68.3 95 44C95 19.701 73.733 0 47.5 0Z" fill="#FFD21E" />
                <path d="M30 34c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
                <path d="M49 34c0-4.418 3.582-8 8-8s8 3.582 8 8" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
                <path d="M24 52c4.5 10 42.5 10 47 0" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
              </svg>
              View Full Dataset on HuggingFace
            </a>
          </div>
        </div>

        {/* Search and Filters panel */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 14, padding: "16px", marginBottom: 24, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center" }}>

            {/* Filter Tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {filterGroups.map((group) => {
                const isActive = activeTab === group;
                return (
                  <button
                    key={group}
                    onClick={() => setActiveTab(group)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      border: isActive ? "1px solid #22c55e" : "1px solid #e2e8f0",
                      background: isActive ? "#f0fdf4" : "#fff",
                      color: isActive ? "#15803d" : "#475569",
                    }}
                  >
                    {group}
                  </button>
                );
              })}
            </div>



          </div>
        </div>

        {/* Grid Display */}
        {filteredImages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 20px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#f1f5f9", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12, color: "#64748b" }}>
              <ImageIcon size={22} />
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>No images found</h3>
            <p style={{ fontSize: "13px", color: "#64748b" }}>Try adjusting your search query or switching category filters.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
            {filteredImages.map((img, index) => {
              const isHovered = hoveredIndex === index;
              const catStyle = getCategoryStyles(img.group);

              return (
                <div
                  key={img.file}
                  onClick={() => openLightbox(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    background: "#fff",
                    border: isHovered ? "1px solid #86efac" : "1px solid #e2e8f0",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: isHovered ? "0 12px 24px -8px rgba(22,163,74,0.18)" : "0 4px 6px -1px rgba(0,0,0,0.03)",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {/* Image container */}
                  <div style={{ height: "180px", overflow: "hidden", position: "relative", background: "#f8fafc" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/Dataset_images/${img.file}`}
                      alt={img.file}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                        transition: "transform 0.35s ease",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    {/* Dark gradient overlay on hover */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(20, 83, 45, 0.4)",
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.25s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ background: "#fff", color: "#15803d", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.15)", transform: isHovered ? "scale(1)" : "scale(0.8)", transition: "transform 0.25s ease" }}>
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Details section */}
                  <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ padding: "3px 10px", borderRadius: 999, background: catStyle.bg, border: `1px solid ${catStyle.border}`, color: catStyle.color, fontSize: 10, fontWeight: 700 }}>
                        {img.category}
                      </span>
                      <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>
                        {img.file.endsWith(".png") ? "PNG" : "JPG"}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        color: isHovered ? "#15803d" : "#334155",
                        wordBreak: "break-all",
                        lineHeight: 1.4,
                      }}
                    >
                      {img.file}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats section — premium conference design */}
        <div style={{ marginTop: 72 }}>

          {/* ── SECTION HEADER ── */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              fontSize: 11, fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", color: "#15803d",
              background: "#f0fdf4", border: "1px solid #bbf7d0",
              borderRadius: 999, padding: "4px 14px", marginBottom: 12
            }}>
              Corpus Overview
            </div>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", margin: 0 }}>
              Dataset Partition Statistics
            </h2>
            <p style={{ fontSize: 14, color: "#64748b", marginTop: 8, lineHeight: 1.6 }}>
              15 fine-grained cultural domains · 6 standard languages · 6 native dialects · 4 data types
            </p>
          </div>

          {/* ── KPI STRIP ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
            gap: 16,
            marginBottom: 36
          }}>
            {[
              { value: "1,448", label: "Expert Images", icon: "🖼️", color: "#6366f1", bg: "#f5f3ff", border: "#e0e7ff" },
              { value: "21,720", label: "Captions", icon: "💬", color: "#0ea5e9", bg: "#f0f9ff", border: "#bae6fd" },
              { value: "43,440", label: "VQA Pairs", icon: "❓", color: "#10b981", bg: "#ecfdf5", border: "#a7f3d0" },
              { value: "66,608", label: "Total Artifacts", icon: "📦", color: "#f59e0b", bg: "#fffbeb", border: "#fde68a" },
              { value: "15", label: "Domains", icon: "🗂️", color: "#ef4444", bg: "#fef2f2", border: "#fecaca" },
              { value: "15×", label: "Lang. Expansion", icon: "🌐", color: "#8b5cf6", bg: "#faf5ff", border: "#ddd6fe" },
            ].map(k => (
              <div
                key={k.label}
                style={{
                  background: k.bg,
                  border: `1px solid ${k.border}`,
                  borderRadius: 14,
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 4
                }}
              >
                <span style={{ fontSize: 22 }}>{k.icon}</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: k.color, lineHeight: 1.1 }}>{k.value}</span>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{k.label}</span>
              </div>
            ))}
          </div>


          {/* ── FULL DATA TABLE ── */}
          <div style={{
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)"
          }}>
            {/* Table header bar */}
            <div style={{
              padding: "16px 24px",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 10
            }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                Complete Partition Breakdown
              </span>
              <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer", fontSize: 12, fontWeight: 500, color: "#64748b" }}>
                <input
                  type="checkbox"
                  checked={showFormulas}
                  onChange={() => setShowFormulas(!showFormulas)}
                  style={{ width: 14, height: 14, accentColor: "#16a34a", cursor: "pointer" }}
                />
                Show 15× expansion formulas
              </label>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5, minWidth: 1020 }}>
                <thead>
                  <tr style={{ background: "#f8fafc" }}>
                    {domainStats.headers.map((h, i) => {
                      const isTotalCol = h.key === "total";
                      let thColor = "#6366f1";
                      if (h.group === "Nature & Wildlife") thColor = "#10b981";
                      if (h.group === "Food & Sweets") thColor = "#f59e0b";

                      return (
                        <th
                          key={h.key}
                          title={h.fullName}
                          style={{
                            padding: i === 0 ? "11px 20px" : "11px 8px",
                            fontWeight: 700,
                            fontSize: i === 0 ? 11 : 11,
                            color: i === 0 ? "#64748b" : (isTotalCol ? "#0f172a" : thColor),
                            textAlign: i === 0 ? "left" : "center",
                            letterSpacing: i === 0 ? "0.06em" : "normal",
                            textTransform: i === 0 ? "uppercase" : "none",
                            borderBottom: `2px solid ${isTotalCol ? "#0f172a" : "#e2e8f0"}`,
                            borderLeft: isTotalCol ? "2px solid #e2e8f0" : "none",
                            background: isTotalCol ? "#f1f5f9" : "transparent",
                            whiteSpace: "nowrap"
                          }}
                        >
                          {h.label}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {domainStats.rows.map((row) => {
                    const isTotalRow = row.type === "Total";

                    const rowConfig: Record<string, { pill: string; pillBg: string; pillColor: string; icon: string }> = {
                      Images: { pill: "Images", pillBg: "#eff6ff", pillColor: "#3b82f6", icon: "🖼️" },
                      Captions: { pill: "Captions", pillBg: "#f5f3ff", pillColor: "#8b5cf6", icon: "💬" },
                      VQA: { pill: "VQA", pillBg: "#ecfdf5", pillColor: "#10b981", icon: "❓" },
                      Total: { pill: "Total", pillBg: "#fef3c7", pillColor: "#d97706", icon: "📦" },
                    };
                    const cfg = rowConfig[row.type] || rowConfig.Images;

                    return (
                      <tr
                        key={row.type}
                        style={{
                          borderBottom: isTotalRow ? "none" : "1px solid #f1f5f9",
                          borderTop: isTotalRow ? "2px solid #e2e8f0" : "none",
                          background: isTotalRow ? "#fafafa" : "transparent",
                          transition: "background 0.15s"
                        }}
                        onMouseEnter={e => { if (!isTotalRow) e.currentTarget.style.background = "#f8fafc"; }}
                        onMouseLeave={e => { if (!isTotalRow) e.currentTarget.style.background = "transparent"; }}
                      >
                        {domainStats.headers.map((h, cIdx) => {
                          const cellData = row[h.key as keyof typeof row];
                          const displayVal = h.key === "type"
                            ? row.type
                            : (showFormulas
                              ? (cellData as { formula: string }).formula
                              : (cellData as { val: string }).val);
                          const isTotalCol = h.key === "total";

                          if (cIdx === 0) {
                            return (
                              <td key={h.key} style={{ padding: "11px 20px", whiteSpace: "nowrap" }}>
                                <span style={{
                                  display: "inline-flex", alignItems: "center", gap: 5,
                                  fontSize: 11.5, fontWeight: 700,
                                  color: cfg.pillColor,
                                  background: cfg.pillBg,
                                  borderRadius: 999,
                                  padding: "3px 10px 3px 6px",
                                }}>
                                  <span style={{ fontSize: 13 }}>{cfg.icon}</span>
                                  {cfg.pill}
                                </span>
                              </td>
                            );
                          }

                          return (
                            <td
                              key={h.key}
                              style={{
                                padding: "11px 8px",
                                textAlign: "center",
                                fontFamily: "monospace",
                                fontWeight: isTotalRow || isTotalCol ? 700 : 400,
                                color: isTotalCol ? "#0f172a" : (isTotalRow ? "#374151" : "#64748b"),
                                fontSize: 12,
                                borderLeft: isTotalCol ? "2px solid #e2e8f0" : "none",
                                background: isTotalCol ? "#f9fafb" : "transparent",
                              }}
                            >
                              {displayVal}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Footer note */}
            <div style={{ padding: "14px 24px", borderTop: "1px solid #f1f5f9", background: "#f8fafc" }}>
              <p style={{ fontSize: 11.5, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>
                <strong style={{ color: "#64748b" }}>Note:</strong> The 15× notation indicates expansion across 15 language/dialect classes per base image.
                {" "}<strong style={{ color: "#64748b" }}>Abbrev.:</strong> Att.=Attires, Craf.=Crafts, Edu.=Educational Inst., Fest.=Festivals, Fish.=Fishes,
                Hist.=Historical Places, Mov.=Movements, Achv.=Nat. Achievements, Nat.B=Natural Beauty, Pers.=Personalities, Riv.=Rivers, Spo.=Sports, Swe.=Sweets, Wild.=Wildlife.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes modalScale { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            .lightbox-card { animation: modalScale 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
          `}</style>

          {/* Lightbox container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="lightbox-card"
            style={{
              background: "#fff",
              borderRadius: "24px",
              border: "1px solid #bbf7d0",
              maxWidth: "960px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* Responsive grid for large screens */}
            <div className="lightbox-grid" style={{ display: "grid", gridTemplateColumns: "1fr" }}>
              <style>{`
                @media(min-width:768px){
                  .lightbox-grid { grid-template-columns: 1.2fr 0.8fr !important; }
                }
              `}</style>

              {/* Left pane: Image viewer */}
              <div style={{ background: "#0f172a", position: "relative", height: "450px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/Dataset_images/${sampleImages[lightboxIndex].file}`}
                  alt={sampleImages[lightboxIndex].file}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    padding: "16px",
                  }}
                />

                {/* Left/Right Floating navigation buttons inside image pane */}
                <button
                  onClick={() => navigateLightbox("prev")}
                  style={{
                    position: "absolute",
                    left: "16px",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(4px)",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.borderColor = "#22c55e"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={() => navigateLightbox("next")}
                  style={{
                    position: "absolute",
                    right: "16px",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(4px)",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.borderColor = "#22c55e"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Right pane: Metadata & controls */}
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#fff" }}>
                <div>
                  {/* Close and category */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ padding: "4px 12px", borderRadius: 999, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
                      {sampleImages[lightboxIndex].category}
                    </span>
                    <button
                      onClick={() => setLightboxIndex(null)}
                      style={{
                        background: "#f1f5f9",
                        border: "none",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#475569",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#475569"; }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Title / Filename */}
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", marginBottom: "8px", fontFamily: "monospace", wordBreak: "break-all" }}>
                    {sampleImages[lightboxIndex].file}
                  </h3>
                  <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500, marginBottom: "20px" }}>
                    Path: <span style={{ fontFamily: "monospace" }}>/Dataset_images/{sampleImages[lightboxIndex].file}</span>
                  </div>


                </div>

                {/* Bottom actions: download */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <a
                    href={`/Dataset_images/${sampleImages[lightboxIndex].file}`}
                    download={sampleImages[lightboxIndex].file}
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: "#15803d",
                      color: "#fff",
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      textDecoration: "none",
                      boxShadow: "0 4px 12px rgba(22,163,74,0.2)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#166534"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#15803d"; }}
                  >
                    <Download size={16} /> Download Image
                  </a>
                </div>
              </div>

            </div>

            {/* Multilingual Grounding Data Table */}
            <div style={{ borderTop: "1px solid #e2e8f0", background: "#f8fafc", padding: "24px 32px 32px 32px" }}>
              <h4 style={{ fontSize: "15px", fontWeight: 800, color: "#1e293b", marginBottom: "4px" }}>
                Multilingual Grounding Data
              </h4>
              <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "16px" }}>
                Evaluation text assets across standard languages and regional dialects for the selected sample image.
              </p>

              <div style={{ overflowX: "auto", background: "#fff", borderRadius: "12px", border: "1px solid #cbd5e1" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", textAlign: "left" }}>
                  <thead>
                    <tr style={{ background: "#f1f5f9", borderBottom: "1px solid #cbd5e1" }}>
                      <th style={{ padding: "12px 16px", fontWeight: 700, color: "#334155", width: "18%" }}>Language</th>
                      <th style={{ padding: "12px 16px", fontWeight: 700, color: "#334155", width: "41%" }}>Caption</th>
                      <th style={{ padding: "12px 16px", fontWeight: 700, color: "#334155", width: "41%" }}>VQA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {languagesList.filter(lang => {
                      if (lang === "Urdu") {
                        const currentFile = sampleImages[lightboxIndex].file;
                        return currentFile === "achievements_102.png" || currentFile === "attire_002.jpg";
                      }
                      return true;
                    }).map((lang, index, arr) => {
                      const annot = getSampleAnnotation(sampleImages[lightboxIndex].file, sampleImages[lightboxIndex].category, lang);
                      return (
                        <tr key={lang} style={{ borderBottom: index === arr.length - 1 ? "none" : "1px solid #e2e8f0" }}>
                          <td style={{ padding: "12px 16px", fontWeight: 600, color: "#0f172a" }}>{lang}</td>
                          <td style={{ padding: "12px 16px", color: "#475569" }}>{renderCaptionCell(annot.caption)}</td>
                          <td style={{ padding: "12px 16px", color: "#475569" }}>{renderVqaCell(annot.vqa)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}

