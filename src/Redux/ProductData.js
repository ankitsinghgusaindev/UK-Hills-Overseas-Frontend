import Mango from "../assets/Mango.png"
import Amla from "../assets/Amla.png"
import Ginger from "../assets/Ginger.png"
import Garlic from "../assets/Garlic.png"
import GreenBarwa from "../assets/Greenbarwamirch.png"
import RedStuffedChilli from "../assets/Redchilli.png";
import GreenChilli from "../assets/Greenchili.png";
import Jackfruit from "../assets/Jackfruit.png";
import KachiHaldi from "../assets/Haldi.png";
import LemonSour from "../assets/Lemonsour.png";
import LemonSweet from "../assets/Lemonsweet.png";
import MangoMixed from "../assets/MangoMixed.png";

import RockSalt from "../assets/Rock_salt.png";
import HaldiPowder from "../assets/Haldi_powder.png";
import LalMirch from "../assets/Red_chilli_powder.png";
import GingerPowder from "../assets/Ginger_powder.png";
import BhangSeeds from "../assets/Bhangseeds.png";
import Bhangjeera from "../assets/Bhangzeer.png";
import Jhakya from "../assets/Jhakya.png";

import Naurangi from "../assets/Naurangi.png";
import ToarDal from "../assets/Toar.png";
import KalaBhat from "../assets/Kala_bhat.png";
import SafedBhat from "../assets/Safed_bhat.png";
import Rajma from "../assets/Rajma.png";
import Gaath from "../assets/Gahat.png";

import KodaAtta from "../assets/Koda.png";
import Jhangora from "../assets/Jhangora.png";
import LalBhat from "../assets/Lal_bhat.png";

import AwalaMurabba from "../assets/Amla_murabba.png";
import GajarMurabba from "../assets/Gajar_murabba.png";

import AwalaLaddo from "../assets/Amla_laddo.png";
import AamLaddo from "../assets/Aam_laddo.png";

import AwalaJam from "../assets/Awla_jam.png";
import AwalaCandy from "../assets/Awla_candy.png";

export const products = [

  // PICKLES

{
  id: 1,
  name: "Mango Pickle",
  category: "Pickles",

  image: Mango,

 description:
  "Authentic Himalayan Mango Pickle made with handpicked raw mangoes, traditional spices, and cold-pressed mustard oil.",

  prices: {
    "250g": 149,
    "500g": 249,
    "1kg": 449
  },

  benefits: [
    "Made from premium quality raw mangoes",
    "Prepared using traditional Himalayan recipes",
    "Rich in natural antioxidants",
    "Enhances the taste of meals and snacks",
    "No artificial colors or preservatives",
    "Authentic homemade flavor"
  ],

  ingredients:
    "Raw Mango, Mustard Oil, Salt, Fennel Seeds, Fenugreek Seeds, Turmeric Powder, Red Chilli Powder, Asafoetida (Hing), Mustard Seeds, Traditional Himalayan Spices.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Always use a dry spoon. Refrigerate after opening for longer freshness.",

  nutrition: {
    servingSize: "100g",
    energy: "180 kcal",
    carbohydrates: "18g",
    protein: "2g",
    fat: "10g",
    fiber: "4g"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 156,

  tags: [
    "Best Seller",
    "Traditional",
    "Homemade",
    "Authentic Himalayan"
  ]
},

 {
  id: 2,
  name: "Amla Pickle",
  category: "Pickles",

  image: Amla,

  description:
  "Authentic Himalayan Amla Pickle with fresh gooseberries, traditional spices, and rich mustard oil.",

  prices: {
    "250g": 149,
    "500g": 249,
    "1kg": 449
  },

  benefits: [
    "Rich source of Vitamin C",
    "Supports immunity and overall wellness",
    "Helps maintain healthy digestion",
    "Prepared using traditional Himalayan recipes",
    "Made with natural ingredients",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Fresh Amla (Indian Gooseberry), Mustard Oil, Salt, Red Chilli Powder, Turmeric Powder, Fenugreek Seeds, Fennel Seeds, Mustard Seeds, Asafoetida (Hing), Traditional Himalayan Spices.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Always use a clean and dry spoon. Refrigerate after opening for extended freshness.",

  nutrition: {
    servingSize: "100g",
    energy: "165 kcal",
    carbohydrates: "20g",
    protein: "2g",
    fat: "8g",
    fiber: "5g",
    vitaminC: "High"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.7,

  reviews: 142,

  tags: [
    "Healthy Choice",
    "Rich In Vitamin C",
    "Traditional",
    "Authentic Himalayan"
  ]
},

 {
  id: 3,
  name: "Ginger Pickle",
  category: "Pickles",

  image: Ginger,

  description:
  "Authentic Himalayan Ginger Pickle crafted from fresh ginger, traditional spices, and premium mustard oil for a bold and tangy flavor.",

  prices: {
    "250g": 149,
    "500g": 249,
    "1kg": 449
  },

  benefits: [
    "Supports healthy digestion",
    "Made from fresh ginger roots",
    "Rich in natural antioxidants",
    "Traditional Himalayan recipe",
    "Enhances the flavor of everyday meals",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Fresh Ginger, Mustard Oil, Salt, Red Chilli Powder, Turmeric Powder, Fenugreek Seeds, Fennel Seeds, Mustard Seeds, Asafoetida (Hing), Traditional Himalayan Spices.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Always use a clean and dry spoon. Refrigerate after opening for prolonged freshness.",

  nutrition: {
    servingSize: "100g",
    energy: "175 kcal",
    carbohydrates: "16g",
    protein: "2g",
    fat: "10g",
    fiber: "4g",
    gingerols: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 128,

  tags: [
    "Digestive Friendly",
    "Traditional",
    "Homemade Style",
    "Authentic Himalayan"
  ]
},

 {
  id: 4,
  name: "Garlic Pickle",
  category: "Pickles",

  image: Garlic,

 description:
  "Traditional Uttarakhand Garlic Pickle prepared with premium garlic, signature spices, and cold-pressed mustard oil.",

  prices: {
    "250g": 149,
    "500g": 249,
    "1kg": 449
  },

  benefits: [
    "Made from premium garlic cloves",
    "Rich in natural antioxidants",
    "Supports overall wellness",
    "Enhances the taste of everyday meals",
    "Prepared using traditional Himalayan recipes",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Fresh Garlic Cloves, Mustard Oil, Salt, Red Chilli Powder, Turmeric Powder, Fenugreek Seeds, Fennel Seeds, Mustard Seeds, Asafoetida (Hing), Traditional Himalayan Spices.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Always use a clean and dry spoon. Refrigerate after opening to maintain freshness and flavor.",

  nutrition: {
    servingSize: "100g",
    energy: "185 kcal",
    carbohydrates: "15g",
    protein: "4g",
    fat: "11g",
    fiber: "3g",
    antioxidants: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 137,

  tags: [
    "Best Seller",
    "Garlic Rich",
    "Traditional",
    "Authentic Himalayan"
  ]
},

  {
  id: 5,
  name: "Green Stuffed Chilli Pickle",
  category: "Pickles",

  image: GreenBarwa,

 description:
  "Handcrafted Green Stuffed Chilli Pickle made with premium chillies, aromatic Himalayan spices, and mustard oil for an authentic mountain taste.",

  prices: {
    "250g": 149,
    "500g": 249,
    "1kg": 449
  },

  benefits: [
    "Made from fresh handpicked green chillies",
    "Stuffed with authentic Himalayan spices",
    "Rich in flavor and aroma",
    "Enhances the taste of everyday meals",
    "Prepared using traditional Uttarakhand recipes",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Fresh Green Chillies, Mustard Oil, Salt, Fennel Seeds, Fenugreek Seeds, Coriander Seeds, Mustard Seeds, Turmeric Powder, Red Chilli Powder, Asafoetida (Hing), Traditional Himalayan Spices.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Always use a clean and dry spoon. Refrigerate after opening to preserve freshness and flavor.",

  nutrition: {
    servingSize: "100g",
    energy: "190 kcal",
    carbohydrates: "18g",
    protein: "3g",
    fat: "11g",
    fiber: "5g",
    vitaminC: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 174,

  tags: [
    "Best Seller",
    "Spicy",
    "Stuffed Pickle",
    "Authentic Himalayan"
  ]
},

 {
  id: 6,
  name: "Red Stuffed Chilli Pickle",
  category: "Pickles",

  image: RedStuffedChilli,

  description:
  "Premium Red Stuffed Chilli Pickle filled with traditional spices and preserved in mustard oil for a bold and tangy flavor.",

  prices: {
    "250g": 149,
    "500g": 249,
    "1kg": 449
  },

  benefits: [
    "Made from carefully selected premium red chillies",
    "Stuffed with traditional Himalayan spice blend",
    "Rich in flavor and natural aroma",
    "Perfect accompaniment for Indian meals",
    "Prepared using authentic Uttarakhand recipes",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Red Chillies, Mustard Oil, Salt, Fennel Seeds, Fenugreek Seeds, Coriander Seeds, Mustard Seeds, Turmeric Powder, Red Chilli Powder, Asafoetida (Hing), Traditional Himalayan Spices.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Always use a clean and dry spoon. Refrigerate after opening to maintain freshness, flavor, and shelf life.",

  nutrition: {
    servingSize: "100g",
    energy: "195 kcal",
    carbohydrates: "19g",
    protein: "3g",
    fat: "12g",
    fiber: "5g",
    vitaminC: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 168,

  tags: [
    "Best Seller",
    "Spicy",
    "Stuffed Pickle",
    "Traditional Himalayan"
  ]
},

 {
  id: 7,
  name: "Green Chilli Pickle",
  category: "Pickles",

  image: GreenChilli,

  description:
  "Premium Green Chilli Pickle made with fresh chillies and traditional spices, delivering a spicy and flavorful taste.",

  prices: {
    "250g": 149,
    "500g": 249,
    "1kg": 449
  },

  benefits: [
    "Made from fresh Himalayan green chillies",
    "Rich in natural flavor and aroma",
    "Adds a spicy kick to meals",
    "Prepared using traditional Uttarakhand recipes",
    "Crafted with premium mustard oil and spices",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Fresh Green Chillies, Mustard Oil, Salt, Mustard Seeds, Fenugreek Seeds, Fennel Seeds, Coriander Seeds, Turmeric Powder, Red Chilli Powder, Asafoetida (Hing), Traditional Himalayan Spices.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Use a clean and dry spoon every time. Refrigerate after opening for longer freshness and flavor retention.",

  nutrition: {
    servingSize: "100g",
    energy: "185 kcal",
    carbohydrates: "17g",
    protein: "3g",
    fat: "11g",
    fiber: "5g",
    vitaminC: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 152,

  tags: [
    "Spicy",
    "Traditional",
    "Hot & Tangy",
    "Authentic Himalayan"
  ]
},

 {
  id: 8,
  name: "Jackfruit Pickle",
  category: "Pickles",

  image: Jackfruit,

  description:
  "Authentic Himalayan Jackfruit Pickle crafted from tender raw jackfruit, traditional spices, and mustard oil for a rich and tangy flavor.",

  prices: {
    "250g": 149,
    "500g": 249,
    "1kg": 449
  },

  benefits: [
    "Made from fresh and tender raw jackfruit",
    "Rich in dietary fiber",
    "Prepared using traditional Himalayan recipes",
    "Enhances the flavor of meals and snacks",
    "Crafted with premium mustard oil and spices",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Raw Jackfruit, Mustard Oil, Salt, Mustard Seeds, Fenugreek Seeds, Fennel Seeds, Coriander Seeds, Turmeric Powder, Red Chilli Powder, Asafoetida (Hing), Traditional Himalayan Spices.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Always use a clean and dry spoon. Refrigerate after opening to maintain freshness and flavor.",

  nutrition: {
    servingSize: "100g",
    energy: "190 kcal",
    carbohydrates: "22g",
    protein: "3g",
    fat: "10g",
    fiber: "6g",
    potassium: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 146,

  tags: [
    "Traditional",
    "High Fiber",
    "Homestyle",
    "Authentic Himalayan"
  ]
},

  {
  id: 9,
  name: "Kachi Haldi Pickle",
  category: "Pickles",

  image: KachiHaldi,

  description:
  "Premium Raw Turmeric Pickle made with fresh turmeric and traditional spices, delivering a bold and flavorful taste.",

  prices: {
    "250g": 149,
    "500g": 249,
    "1kg": 449
  },

  benefits: [
    "Made from fresh raw turmeric roots",
    "Rich in natural antioxidants",
    "Prepared using traditional Himalayan recipes",
    "Enhances the flavor of meals and snacks",
    "Crafted with premium mustard oil and spices",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Fresh Raw Turmeric (Kachi Haldi), Mustard Oil, Lemon Juice, Salt, Mustard Seeds, Fenugreek Seeds, Fennel Seeds, Turmeric Powder, Red Chilli Powder, Asafoetida (Hing), Traditional Himalayan Spices.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Use a clean and dry spoon every time. Refrigerate after opening to preserve freshness, flavor, and quality.",

  nutrition: {
    servingSize: "100g",
    energy: "170 kcal",
    carbohydrates: "18g",
    protein: "2g",
    fat: "9g",
    fiber: "4g",
    curcumin: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 163,

  tags: [
    "Healthy Choice",
    "Raw Turmeric",
    "Traditional",
    "Authentic Himalayan"
  ]
},

{
  id: 10,
  name: "Lemon Sour Pickle",
  category: "Pickles",

  image: LemonSour,

  description:
  "Premium Lemon Sour Pickle made with juicy lemons and traditional spices, delivering a rich tangy and flavorful taste.",

  prices: {
    "250g": 149,
    "500g": 249,
    "1kg": 449
  },

  benefits: [
    "Made from fresh handpicked lemons",
    "Naturally tangy and flavorful",
    "Prepared using traditional Himalayan recipes",
    "Enhances the taste of meals and snacks",
    "Crafted with premium mustard oil and spices",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Fresh Lemons, Mustard Oil, Salt, Mustard Seeds, Fenugreek Seeds, Fennel Seeds, Turmeric Powder, Red Chilli Powder, Asafoetida (Hing), Traditional Himalayan Spices.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Always use a clean and dry spoon. Refrigerate after opening to maintain freshness, flavor, and shelf life.",

  nutrition: {
    servingSize: "100g",
    energy: "165 kcal",
    carbohydrates: "16g",
    protein: "2g",
    fat: "9g",
    fiber: "3g",
    vitaminC: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 158,

  tags: [
    "Tangy",
    "Traditional",
    "Best Seller",
    "Authentic Himalayan"
  ]
},

 {
  id: 11,
  name: "Lemon Sweet Pickle",
  category: "Pickles",

  image: LemonSweet,

  description:
  "Premium Lemon Sweet Pickle made with juicy lemons and traditional spices, offering a perfect sweet and tangy taste.",

  prices: {
    "250g": 149,
    "500g": 249,
    "1kg": 449
  },

  benefits: [
    "Made from fresh handpicked lemons",
    "Perfect balance of sweet and tangy flavors",
    "Prepared using traditional Himalayan recipes",
    "Rich in natural citrus goodness",
    "Enhances the taste of meals and snacks",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Fresh Lemons, Sugar, Mustard Oil, Salt, Fennel Seeds, Fenugreek Seeds, Cardamom, Cinnamon, Clove, Turmeric Powder, Traditional Himalayan Spices.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Always use a clean and dry spoon. Refrigerate after opening to maintain freshness and flavor for a longer duration.",

  nutrition: {
    servingSize: "100g",
    energy: "210 kcal",
    carbohydrates: "38g",
    protein: "1g",
    fat: "6g",
    fiber: "3g",
    vitaminC: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 151,

  tags: [
    "Sweet & Tangy",
    "Family Favorite",
    "Traditional",
    "Authentic Himalayan"
  ]
},

 {
  id: 12,
  name: "Mango Mixed Pickle",
  category: "Pickles",

  image: MangoMixed,

 description:
  "Premium Mango Mixed Pickle made with raw mangoes and traditional spices, delivering a rich, tangy, and flavorful taste.",

  prices: {
    "250g": 149,
    "500g": 249,
    "1kg": 449
  },

  benefits: [
    "Made from premium quality raw mangoes",
    "Rich blend of traditional Himalayan spices",
    "Prepared using authentic Uttarakhand recipes",
    "Enhances the flavor of everyday meals",
    "Crafted with premium mustard oil",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Raw Mango, Mixed Seasonal Vegetables, Mustard Oil, Salt, Mustard Seeds, Fenugreek Seeds, Fennel Seeds, Coriander Seeds, Turmeric Powder, Red Chilli Powder, Asafoetida (Hing), Traditional Himalayan Spices.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Always use a clean and dry spoon. Refrigerate after opening to maintain freshness, flavor, and shelf life.",

  nutrition: {
    servingSize: "100g",
    energy: "185 kcal",
    carbohydrates: "19g",
    protein: "2g",
    fat: "10g",
    fiber: "4g",
    vitaminC: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 182,

  tags: [
    "Best Seller",
    "Mixed Pickle",
    "Traditional",
    "Authentic Himalayan"
  ]
},

  // SPICES

{
  id: 13,
  name: "Rock Salt",
  category: "Spices",

  image: RockSalt,

  description:
  "Premium Rock Salt sourced from the Himalayas, perfect for cooking, seasoning, and traditional recipes.",

  prices: {
    "250g": 99,
    "500g": 179,
    "1kg": 349
  },

  benefits: [
    "Naturally rich in essential minerals",
    "Enhances the taste of food naturally",
    "Less processed than refined table salt",
    "Ideal for fasting and traditional recipes",
    "Suitable for daily cooking and seasoning",
    "Pure Himalayan origin"
  ],

  ingredients:
    "100% Natural Himalayan Rock Salt.",

  storage:
    "Store in a cool, dry place away from moisture. Keep the container tightly sealed after use to maintain freshness and purity.",

  nutrition: {
    servingSize: "100g",
    energy: "0 kcal",
    carbohydrates: "0g",
    protein: "0g",
    fat: "0g",
    sodium: "38g",
    minerals: "Natural Source"
  },

  shelfLife: "24 Months",

  origin: "Himalayan Region, Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 214,

  tags: [
    "Best Seller",
    "Pure Himalayan",
    "Mineral Rich",
    "Natural"
  ]
},

 {
  id: 14,
  name: "Haldi Powder",
  category: "Spices",

  image: HaldiPowder,

 description:
  "Authentic Himalayan Haldi Powder with rich color, natural aroma, and pure turmeric goodness.",

  prices: {
    "250g": 99,
    "500g": 179,
    "1kg": 349
  },

  benefits: [
    "Made from premium quality turmeric roots",
    "Naturally rich in curcumin",
    "Adds vibrant color and flavor to dishes",
    "Finely ground for superior texture",
    "Suitable for everyday cooking",
    "No artificial colors, additives, or preservatives"
  ],

  ingredients:
    "100% Pure Turmeric (Curcuma Longa) Powder.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Keep the container tightly sealed after every use to retain freshness, aroma, and color.",

  nutrition: {
    servingSize: "100g",
    energy: "354 kcal",
    carbohydrates: "65g",
    protein: "8g",
    fat: "10g",
    fiber: "21g",
    curcumin: "Natural Source"
  },

  shelfLife: "24 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 198,

  tags: [
    "Organic",
    "Curcumin Rich",
    "Pure Spice",
    "Himalayan Quality"
  ]
},

 {
  id: 15,
  name: "Laal Mirch",
  category: "Spices",

  image: LalMirch,

 description:
  "Authentic Himalayan Laal Mirch Powder with rich color, bold flavor, and natural chilli goodness.",

  prices: {
    "250g": 99,
    "500g": 179,
    "1kg": 349
  },

  benefits: [
    "Made from premium quality red chillies",
    "Rich natural color and aroma",
    "Enhances flavor and appearance of dishes",
    "Finely ground for superior texture",
    "Suitable for everyday cooking",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "100% Pure Red Chilli Powder.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Keep the container tightly closed after use to retain freshness, color, and aroma.",

  nutrition: {
    servingSize: "100g",
    energy: "282 kcal",
    carbohydrates: "50g",
    protein: "12g",
    fat: "14g",
    fiber: "27g",
    capsaicin: "Natural Source"
  },

  shelfLife: "24 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 186,

  tags: [
    "Premium Quality",
    "Rich Color",
    "Pure Spice",
    "Himalayan Quality"
  ]
},

 {
  id: 16,
  name: "Ginger Powder",
  category: "Spices",

  image: GingerPowder,

  description:
  "Authentic Himalayan Ginger Powder with rich aroma, bold flavor, and natural ginger goodness.",
  prices: {
    "250g": 99,
    "500g": 179,
    "1kg": 349
  },

  benefits: [
    "Made from premium quality ginger roots",
    "Rich natural aroma and flavor",
    "Finely ground for easy use",
    "Ideal for cooking and beverages",
    "Versatile ingredient for daily kitchen use",
    "No artificial colors, additives, or preservatives"
  ],

  ingredients:
    "100% Pure Dried Ginger Powder.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Keep the container tightly sealed after use to preserve freshness, flavor, and aroma.",

  nutrition: {
    servingSize: "100g",
    energy: "335 kcal",
    carbohydrates: "72g",
    protein: "9g",
    fat: "4g",
    fiber: "14g",
    gingerol: "Natural Source"
  },

  shelfLife: "24 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 172,

  tags: [
    "Pure Spice",
    "Natural Ginger",
    "Premium Quality",
    "Himalayan Product"
  ]
},

{
  id: 17,
  name: "Bhang Seeds",
  category: "Spices",

  image: BhangSeeds,

 description:
  "Authentic Himalayan Bhang Seeds with rich flavor, natural aroma, and traditional mountain goodness.",

  prices: {
    "250g": 99,
    "500g": 179,
    "1kg": 349
  },

  benefits: [
    "Traditional ingredient of Uttarakhand cuisine",
    "Rich nutty flavor and aroma",
    "Ideal for preparing authentic chutneys",
    "Carefully cleaned and hygienically packed",
    "Versatile ingredient for traditional recipes",
    "No artificial additives or preservatives"
  ],

  ingredients:
    "100% Natural Bhang (Hemp) Seeds.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Keep the pack tightly sealed after opening to maintain freshness, aroma, and flavor.",

  nutrition: {
    servingSize: "100g",
    energy: "553 kcal",
    carbohydrates: "8g",
    protein: "31g",
    fat: "49g",
    fiber: "4g",
    omegaFattyAcids: "Natural Source"
  },

  shelfLife: "18 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 143,

  tags: [
    "Traditional Uttarakhand",
    "Authentic Himalayan",
    "Premium Quality",
    "Nutty Flavor"
  ]
},

  {
  id: 18,
  name: "Bhangjeera",
  category: "Spices",

  image: Bhangjeera,

  description:
  "Authentic Himalayan Bhangjeera with earthy aroma, smoky flavor, and traditional mountain goodness.",

  prices: {
    "250g": 99,
    "500g": 179,
    "1kg": 349
  },

  benefits: [
    "Authentic Himalayan specialty spice",
    "Rich earthy aroma and unique flavor",
    "Ideal for traditional Uttarakhand recipes",
    "Perfect for chutneys and spice blends",
    "Carefully sourced and hygienically packed",
    "No artificial additives or preservatives"
  ],

  ingredients:
    "100% Natural Bhangjeera Seeds (Perilla Seeds).",

  storage:
    "Store in a cool and dry place away from direct sunlight. Keep the pack tightly sealed after use to preserve freshness, aroma, and flavor.",

  nutrition: {
    servingSize: "100g",
    energy: "520 kcal",
    carbohydrates: "12g",
    protein: "20g",
    fat: "42g",
    fiber: "10g",
    omegaFattyAcids: "Natural Source"
  },

  shelfLife: "18 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 138,

  tags: [
    "Traditional Uttarakhand",
    "Authentic Himalayan",
    "Premium Quality",
    "Regional Specialty"
  ]
},

  {
  id: 19,
  name: "Jhakya",
  category: "Spices",

  image: Jhakya,
description:
  "Premium Himalayan Jhakya selected for its unique flavor, natural purity, and authentic mountain heritage.",

  prices: {
    "250g": 99,
    "500g": 179,
    "1kg": 349
  },

  benefits: [
    "Authentic Himalayan culinary ingredient",
    "Unique aroma and flavor profile",
    "Traditionally used in Uttarakhand cuisine",
    "Perfect for tempering and seasoning",
    "Premium quality hand-selected seeds",
    "No artificial additives or preservatives"
  ],

  ingredients:
    "100% Natural Jhakya Seeds (Cleome Viscosa Seeds).",

  storage:
    "Store in a cool and dry place away from direct sunlight. Keep the container tightly sealed after opening to preserve its natural aroma and freshness.",

  nutrition: {
    servingSize: "100g",
    energy: "485 kcal",
    carbohydrates: "28g",
    protein: "18g",
    fat: "32g",
    fiber: "12g",
    minerals: "Natural Source"
  },

  shelfLife: "24 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 126,

  tags: [
    "Traditional Uttarakhand",
    "Authentic Himalayan",
    "Premium Quality",
    "Rare Himalayan Spice"
  ]
},

  // DAALS

  {
  id: 20,
  name: "Naurangi Dal",
  category: "Daals",

  image: Naurangi,

 description:
  "Authentic Himalayan Naurangi Dal with rich flavor, wholesome nutrition, and traditional mountain goodness.",

  prices: {
    "250g": 120,
    "500g": 220,
    "1kg": 399
  },

  benefits: [
    "Rich source of plant-based protein",
    "Naturally high in dietary fiber",
    "Traditional Uttarakhand specialty",
    "Supports a balanced and nutritious diet",
    "Easy to cook and digest",
    "No artificial additives or preservatives"
  ],

  ingredients:
    "A traditional blend of Himalayan lentils and pulses including Rajma, Gahat, Urad, Moong, and other regional legumes.",

  storage:
    "Store in a cool, dry place away from moisture and direct sunlight. Keep the pack sealed after opening to maintain freshness and quality.",

  nutrition: {
    servingSize: "100g",
    energy: "345 kcal",
    carbohydrates: "60g",
    protein: "22g",
    fat: "2g",
    fiber: "14g",
    iron: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 187,

  tags: [
    "Traditional Uttarakhand",
    "Protein Rich",
    "Healthy Choice",
    "Authentic Himalayan"
  ]
},

 {
  id: 21,
  name: "Toar Dal",
  category: "Daals",

  image: ToarDal,

  description:
  "Traditional Toar Dal known for its mild flavor, soft texture, and place in wholesome Indian meals.",

  prices: {
    "250g": 120,
    "500g": 220,
    "1kg": 399
  },

  benefits: [
    "Excellent source of plant-based protein",
    "Rich in dietary fiber",
    "Supports a balanced daily diet",
    "Easy to cook and digest",
    "Naturally nutritious and wholesome",
    "No artificial additives or preservatives"
  ],

  ingredients:
    "100% Premium Toar Dal (Pigeon Pea Lentils).",

  storage:
    "Store in a cool and dry place away from moisture and direct sunlight. Keep the pack sealed after opening to preserve freshness and quality.",

  nutrition: {
    servingSize: "100g",
    energy: "343 kcal",
    carbohydrates: "63g",
    protein: "22g",
    fat: "1.7g",
    fiber: "15g",
    iron: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 174,

  tags: [
    "Protein Rich",
    "Daily Essential",
    "Premium Quality",
    "Healthy Choice"
  ]
},

  {
  id: 22,
  name: "Kala Bhat",
  category: "Daals",

  image: KalaBhat,

  description:
  "Premium Black Soybean from the Himalayas, rich in protein and perfect for authentic Pahadi meals.",

  prices: {
    "250g": 120,
    "500g": 220,
    "1kg": 399
  },

  benefits: [
    "Excellent source of plant-based protein",
    "Rich in dietary fiber",
    "Naturally packed with essential nutrients",
    "Traditional Himalayan superfood",
    "Supports a balanced and nutritious diet",
    "No artificial additives or preservatives"
  ],

  ingredients:
    "100% Natural Kala Bhat (Black Soybean).",

  storage:
    "Store in a cool and dry place away from moisture and direct sunlight. Keep the package tightly sealed after opening to maintain freshness and quality.",

  nutrition: {
    servingSize: "100g",
    energy: "446 kcal",
    carbohydrates: "30g",
    protein: "36g",
    fat: "20g",
    fiber: "9g",
    iron: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 168,

  tags: [
    "Traditional Uttarakhand",
    "Protein Rich",
    "Himalayan Superfood",
    "Authentic Pahadi"
  ]
},

{
  id: 23,
  name: "Safed Bhat",
  category: "Daals",

  image: SafedBhat,

 description:
  "Authentic Himalayan Safed Bhat carefully sourced for its mild flavor, wholesome nutrition, and traditional Uttarakhand heritage.",

  prices: {
    "250g": 120,
    "500g": 220,
    "1kg": 399
  },

  benefits: [
    "Excellent source of plant-based protein",
    "Rich in dietary fiber and essential nutrients",
    "Traditional Himalayan food staple",
    "Naturally wholesome and nutritious",
    "Supports a balanced vegetarian diet",
    "No artificial additives or preservatives"
  ],

  ingredients:
    "100% Natural Safed Bhat (White Soybean).",

  storage:
    "Store in a cool and dry place away from moisture and direct sunlight. Keep the package tightly sealed after opening to preserve freshness and quality.",

  nutrition: {
    servingSize: "100g",
    energy: "440 kcal",
    carbohydrates: "30g",
    protein: "36g",
    fat: "19g",
    fiber: "9g",
    calcium: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 154,

  tags: [
    "Traditional Uttarakhand",
    "Protein Rich",
    "Himalayan Superfood",
    "Authentic Pahadi"
  ]
},

 {
  id: 24,
  name: "Rajma",
  category: "Daals",

  image: Rajma,

  description:
  "Premium Hill Rajma from the Himalayas, rich in flavor and perfect for wholesome family meals.",

  prices: {
    "250g": 120,
    "500g": 220,
    "1kg": 399
  },

  benefits: [
    "Excellent source of plant-based protein",
    "Rich in dietary fiber",
    "Premium hill-grown quality",
    "Naturally nutritious and wholesome",
    "Ideal for traditional Indian meals",
    "No artificial additives or preservatives"
  ],

  ingredients:
    "100% Natural Himalayan Rajma (Kidney Beans).",

  storage:
    "Store in a cool and dry place away from moisture and direct sunlight. Keep the package tightly sealed after opening to maintain freshness and quality.",

  nutrition: {
    servingSize: "100g",
    energy: "333 kcal",
    carbohydrates: "60g",
    protein: "24g",
    fat: "1g",
    fiber: "15g",
    iron: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 212,

  tags: [
    "Best Seller",
    "Hill Grown",
    "Protein Rich",
    "Authentic Himalayan"
  ]
},

{
  id: 25,
  name: "Gaath",
  category: "Daals",

  image: Gaath,

  description:
  "Authentic Himalayan Gaath carefully sourced for its rich earthy flavor, wholesome nutrition, and traditional Uttarakhand heritage.",

  prices: {
    "250g": 120,
    "500g": 220,
    "1kg": 399
  },

  benefits: [
    "Excellent source of plant-based protein",
    "Rich in dietary fiber",
    "Traditional Himalayan superfood",
    "Naturally nutritious and wholesome",
    "Supports a balanced vegetarian diet",
    "No artificial additives or preservatives"
  ],

  ingredients:
    "100% Natural Gaath (Horse Gram / Kulath Dal).",

  storage:
    "Store in a cool and dry place away from moisture and direct sunlight. Keep the package tightly sealed after opening to preserve freshness and quality.",

  nutrition: {
    servingSize: "100g",
    energy: "321 kcal",
    carbohydrates: "57g",
    protein: "22g",
    fat: "1.5g",
    fiber: "13g",
    iron: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 145,

  tags: [
    "Traditional Uttarakhand",
    "Horse Gram",
    "Protein Rich",
    "Authentic Himalayan"
  ]
},

   {
  id: 26,
  name: "Laal Bhat",
  category: "Daals",

  image: LalBhat,

  description:
  "Premium Himalayan Red Rice with rich flavor and wholesome nutrition, perfect for traditional mountain meals.",

  prices: {
    "250g": 120,
    "500g": 220,
    "1kg": 399
  },

  benefits: [
    "Naturally rich in dietary fiber",
    "Traditional Himalayan heritage grain",
    "Contains essential minerals and nutrients",
    "Wholesome alternative to regular rice",
    "Naturally grown in Himalayan regions",
    "No artificial additives or preservatives"
  ],

  ingredients:
    "100% Natural Himalayan Red Rice (Laal Bhat).",

  storage:
    "Store in a cool and dry place away from moisture and direct sunlight. Keep the package tightly sealed after opening to maintain freshness and quality.",

  nutrition: {
    servingSize: "100g",
    energy: "360 kcal",
    carbohydrates: "77g",
    protein: "8g",
    fat: "2g",
    fiber: "4g",
    iron: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 163,

  tags: [
    "Traditional Uttarakhand",
    "Red Rice",
    "Heritage Grain",
    "Authentic Himalayan"
  ]
},

  // CEREALS

  {
  id: 27,
  name: "Koda Atta",
  category: "Cereals",

  image: KodaAtta,

  description:
  "Premium Finger Millet Flour rich in nutrition, perfect for rotis, porridge, and traditional Himalayan recipes.",

  prices: {
    "250g": 99,
    "500g": 179,
    "1kg": 329
  },

  benefits: [
    "Naturally rich in dietary fiber",
    "Excellent source of calcium",
    "Traditional Himalayan superfood",
    "Supports a balanced and healthy diet",
    "Finely milled for versatile cooking",
    "No artificial additives or preservatives"
  ],

  ingredients:
    "100% Natural Finger Millet (Mandua / Ragi) Flour.",

  storage:
    "Store in a cool and dry place away from moisture and direct sunlight. Keep the package tightly sealed after opening to preserve freshness and nutritional quality.",

  nutrition: {
    servingSize: "100g",
    energy: "336 kcal",
    carbohydrates: "72g",
    protein: "7g",
    fat: "1.5g",
    fiber: "11g",
    calcium: "344mg"
  },

  shelfLife: "9 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 198,

  tags: [
    "Himalayan Superfood",
    "Mandua Atta",
    "Calcium Rich",
    "Traditional Uttarakhand"
  ]
},

 {
  id: 28,
  name: "Jhangora",
  category: "Cereals",

  image: Jhangora,

  description:
  "Authentic Himalayan Jhangora with light texture, wholesome nutrition, and traditional mountain goodness.",

  prices: {
    "250g": 99,
    "500g": 179,
    "1kg": 329
  },

  benefits: [
    "Traditional Himalayan superfood",
    "Naturally rich in dietary fiber",
    "Light and easy to digest",
    "Excellent alternative to refined grains",
    "Versatile for sweet and savory dishes",
    "No artificial additives or preservatives"
  ],

  ingredients:
    "100% Natural Jhangora (Barnyard Millet).",

  storage:
    "Store in a cool and dry place away from moisture and direct sunlight. Keep the package tightly sealed after opening to preserve freshness and quality.",

  nutrition: {
    servingSize: "100g",
    energy: "307 kcal",
    carbohydrates: "65g",
    protein: "11g",
    fat: "3g",
    fiber: "10g",
    iron: "Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 184,

  tags: [
    "Traditional Uttarakhand",
    "Barnyard Millet",
    "Himalayan Superfood",
    "Healthy Choice"
  ]
},



  // MURABBA

  {
  id: 29,
  name: "Awala Murabba",
  category: "Murabba",

  image: AwalaMurabba,

 description:
  "Traditional Uttarakhand Awala Murabba known for its sweet-tangy flavor and timeless wellness heritage.",

  prices: {
    "250g": 149,
    "500g": 279,
    "1kg": 499
  },

  benefits: [
    "Rich source of natural Vitamin C",
    "Prepared using traditional recipes",
    "Made from premium Himalayan Amla",
    "Naturally sweet and flavorful",
    "Supports a healthy and balanced lifestyle",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Fresh Amla (Indian Gooseberry), Sugar, Water, Cardamom, Natural Flavoring Ingredients.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Refrigerate after opening and always use a clean, dry spoon to maintain freshness and quality.",

  nutrition: {
    servingSize: "100g",
    energy: "250 kcal",
    carbohydrates: "62g",
    protein: "1g",
    fat: "0.5g",
    fiber: "4g",
    vitaminC: "Rich Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 231,

  tags: [
    "Best Seller",
    "Vitamin C Rich",
    "Traditional Recipe",
    "Authentic Himalayan"
  ]
},

  {
  id: 30,
  name: "Gajar Murabba",
  category: "Murabba",

  image: GajarMurabba,

  description:
  "Premium Carrot Murabba made from fresh carrots, delivering a delicious blend of sweetness and natural goodness.",

  prices: {
    "250g": 149,
    "500g": 279,
    "1kg": 499
  },

  benefits: [
    "Made from premium quality fresh carrots",
    "Rich in natural nutrients",
    "Prepared using traditional recipes",
    "Naturally sweet and flavorful",
    "Perfect for daily consumption",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Fresh Carrots, Sugar, Water, Cardamom, Saffron, Natural Flavoring Ingredients.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Refrigerate after opening and always use a clean, dry spoon to preserve freshness and quality.",

  nutrition: {
    servingSize: "100g",
    energy: "245 kcal",
    carbohydrates: "60g",
    protein: "1g",
    fat: "0.4g",
    fiber: "3g",
    vitaminA: "Rich Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 187,

  tags: [
    "Traditional Recipe",
    "Carrot Delight",
    "Premium Quality",
    "Authentic Himalayan"
  ]
},

  // LADDO

  {
  id: 31,
  name: "Awala Laddo",
  category: "Laddo",

  image: AwalaLaddo,

  description:
  "Authentic Himalayan Awala Laddo with natural sweetness, rich flavor, and traditional goodness.",

  prices: {
    "250g": 199,
    "500g": 349,
    "1kg": 649
  },

  benefits: [
    "Made from premium Himalayan Amla",
    "Rich in natural Vitamin C",
    "Traditional homemade-style recipe",
    "Perfect as a healthy snack option",
    "Prepared with carefully selected ingredients",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Amla (Indian Gooseberry), Jaggery, Dry Fruits, Desi Ghee, Cardamom, Natural Flavoring Ingredients.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Keep in an airtight container after opening to preserve freshness and flavor.",

  nutrition: {
    servingSize: "100g",
    energy: "420 kcal",
    carbohydrates: "58g",
    protein: "5g",
    fat: "18g",
    fiber: "6g",
    vitaminC: "Natural Source"
  },

  shelfLife: "6 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 164,

  tags: [
    "Healthy Snack",
    "Vitamin C Rich",
    "Traditional Sweet",
    "Authentic Himalayan"
  ]
},

  {
  id: 32,
  name: "Aam Laddo",
  category: "Laddo",

  image: AamLaddo,

 description:
  "Premium Mango Laddo made with ripe mango pulp, delivering a delicious blend of sweetness and fruity goodness.",

  prices: {
    "250g": 199,
    "500g": 349,
    "1kg": 649
  },

  benefits: [
    "Made from premium quality mangoes",
    "Rich fruity flavor and natural sweetness",
    "Prepared using traditional recipes",
    "Perfect for festive and everyday enjoyment",
    "Made with carefully selected ingredients",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Mango Pulp, Jaggery, Dry Fruits, Desi Ghee, Cardamom, Natural Flavoring Ingredients.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Keep in an airtight container after opening to preserve freshness and flavor.",

  nutrition: {
    servingSize: "100g",
    energy: "425 kcal",
    carbohydrates: "60g",
    protein: "5g",
    fat: "17g",
    fiber: "4g",
    vitaminA: "Natural Source"
  },

  shelfLife: "6 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 148,

  tags: [
    "Mango Delight",
    "Traditional Sweet",
    "Festive Favorite",
    "Authentic Himalayan"
  ]
},

  // JAM

 {
  id: 33,
  name: "Awala Jam",
  category: "Jam",

  image: AwalaJam,

 description:
  "Traditional Uttarakhand Awala Jam known for its sweet-tangy flavor, natural goodness, and homemade heritage.",

  prices: {
    "250g": 129,
    "500g": 229,
    "1kg": 429
  },

  benefits: [
    "Made from premium Himalayan Amla",
    "Rich in natural Vitamin C",
    "Smooth and delicious fruit spread",
    "Prepared using traditional recipes",
    "Perfect for breakfast and snacks",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Fresh Amla (Indian Gooseberry), Sugar, Fruit Pectin, Citric Acid, Natural Flavoring Ingredients.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Refrigerate after opening and consume within the recommended period. Always use a clean and dry spoon.",

  nutrition: {
    servingSize: "100g",
    energy: "265 kcal",
    carbohydrates: "65g",
    protein: "0.8g",
    fat: "0.2g",
    fiber: "2.5g",
    vitaminC: "Rich Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.8,

  reviews: 176,

  tags: [
    "Vitamin C Rich",
    "Breakfast Favorite",
    "Fruit Spread",
    "Authentic Himalayan"
  ]
},

  // CANDY

  {
  id: 34,
  name: "Awala Candy",
  category: "Candy",

  image: AwalaCandy,

  description:
  "Authentic Himalayan Awala Candy crafted from premium Amla, offering natural sweetness and refreshing goodness.",

  prices: {
    "250g": 99,
    "500g": 179,
    "1kg": 329
  },

  benefits: [
    "Made from premium Himalayan Amla",
    "Rich in natural Vitamin C",
    "Sweet and tangy flavor",
    "Convenient healthy snacking option",
    "Prepared using traditional recipes",
    "No artificial colors or preservatives"
  ],

  ingredients:
    "Amla (Indian Gooseberry), Sugar, Black Salt, Natural Spices, Citric Acid.",

  storage:
    "Store in a cool and dry place away from direct sunlight. Keep the container tightly closed after opening to maintain freshness, taste, and texture.",

  nutrition: {
    servingSize: "100g",
    energy: "310 kcal",
    carbohydrates: "75g",
    protein: "1g",
    fat: "0.3g",
    fiber: "4g",
    vitaminC: "Rich Natural Source"
  },

  shelfLife: "12 Months",

  origin: "Uttarakhand, India",

  weightOptions: [
    "250g",
    "500g",
    "1kg"
  ],

  rating: 4.9,

  reviews: 245,

  tags: [
    "Best Seller",
    "Vitamin C Rich",
    "Healthy Snack",
    "Authentic Himalayan"
  ]
},
];