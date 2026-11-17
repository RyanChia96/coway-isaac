/* =========================================================
   PRODUCT CATALOGUE — PLACEHOLDER PRICES.
   Confirm every price with the agent before going live.
   promo: introductory monthly price (null if none)
   price: normal monthly rental price
   ========================================================= */
window.CATEGORIES = [
  { id: "water",   name: "Water Purifiers",  short: "Water",      img: "cat-water",     blurb: "Hot, cold & ambient water, filtered at the tap." },
  { id: "air",     name: "Air Purifiers",    short: "Air",        img: "cat-air",       blurb: "Haze, dust & pet dander — handled." },
  { id: "outdoor", name: "Outdoor Filters",  short: "Outdoor",    img: "cat-outdoor",   blurb: "Whole-home filtration from the main pipe." },
  { id: "appl",    name: "Home Appliances",  short: "Appliances", img: "cat-appliance", blurb: "Bidets, washer dryers & refrigerators." },
  { id: "home",    name: "Home Care",        short: "Home Care",  img: "cat-homecare",  blurb: "Air conditioners & massage chairs." },
  { id: "sleep",   name: "Mattresses",       short: "Sleep",      img: "cat-mattress",  blurb: "Rental mattresses with regular care service." },
];

window.PRODUCTS = [
  // Water
  { id: "neon", img: "products/neon.png",        cat: "water",   name: "NeoN",          tag: "Best seller", price: 74,  promo: 54,  features: ["Hot, cold & ambient", "Compact countertop", "Regular filter change"] },
  { id: "cinnamon", img: "products/cinnamon.png",    cat: "water",   name: "Cinnamon",      tag: "",            price: 32,  promo: null, features: ["Ambient water", "Slim design", "Budget friendly"] },
  { id: "neo-plus", img: "products/neo-plus.png",    cat: "water",   name: "Neo Plus",      tag: "",            price: 79,  promo: 59,  features: ["Hot & ambient", "Child safety lock", "Space-saving"] },
  { id: "villaem-3", img: "products/villaem-3.png",   cat: "water",   name: "Villaem 3",     tag: "",            price: 74,  promo: null, features: ["Hot, cold & ambient", "Large tank", "Family size"] },
  { id: "glaze", img: "products/glaze.png",       cat: "water",   name: "Glaze",         tag: "New",         price: 75,  promo: null, features: ["Tankless", "Instant hot water", "Sleek finish"] },
  { id: "core-plus", img: "products/core-plus.png",   cat: "water",   name: "Core Plus",     tag: "",            price: 93,  promo: null, features: ["Under-sink option", "Hot & ambient", "Smart sterilisation"] },
  { id: "ombak", img: "products/ombak.png",       cat: "water",   name: "Ombak",         tag: "",            price: 90,  promo: null, features: ["Hot, cold & ambient", "Self-sterilising", "Modern look"] },
  { id: "lucy-plus", img: "products/lucy-plus.png",   cat: "water",   name: "Lucy Plus",     tag: "Ice maker",   price: 150, promo: null, features: ["Built-in ice maker", "Hot, cold & ambient", "Premium"] },
  // Outdoor
  { id: "outdoor-filter", img: "products/outdoor-filter.png", cat: "outdoor", name: "Outdoor Filter POE-23A", tag: "Promo", price: 108, promo: 20, features: ["304 stainless steel", "Whole-home filtration", "No high pressure needed"] },
  // Air
  { id: "storm-2", img: "products/storm-2.png",     cat: "air",     name: "Storm 2",       tag: "Promo",       price: 75,  promo: 55,  features: ["Up to ~X sq ft", "Pet & haze mode", "Real-time air sensor"] },
  { id: "studio", img: "products/studio.png",      cat: "air",     name: "Studio",        tag: "",            price: 49,  promo: null, features: ["Bedroom size", "Quiet night mode", "Compact"] },
  { id: "suite", img: "products/suite.png",       cat: "air",     name: "Suite",         tag: "",            price: 60,  promo: null, features: ["Mid-size rooms", "HEPA filter", "Auto mode"] },
  { id: "lombok-3", img: "products/lombok-3.png",    cat: "air",     name: "Lombok 3",      tag: "",            price: 65,  promo: null, features: ["Living rooms", "Dust sensor", "Low noise"] },
  { id: "noble-2", img: "products/noble-2.png",     cat: "air",     name: "Noble 2",       tag: "Award-winning", price: 95, promo: null, features: ["Large spaces", "Premium design", "Smart app"] },
  { id: "atrium", img: "products/atrium.png", cat: "air", name: "Atrium", tag: "New", price: 89, promo: null, features: ["Up to 1,248 sq ft", "Dual-motor, 2-sided suction", "PM1.0 / PM2.5 / PM10 sensor"] },
  // Appliances
  { id: "bidet", img: "products/bidet.png",       cat: "appl",    name: "Bidet",         tag: "",            price: 0,   promo: null, features: ["Warm water wash", "Self-cleaning nozzle", "Easy install"] },
  { id: "washer-dryer", img: "products/washer-dryer.png",cat: "appl",    name: "Washer Dryer",  tag: "",            price: 0,   promo: null, features: ["2-in-1", "Large drum", "Energy saving"] },
  { id: "refrigerator", img: "products/refrigerator.png",cat: "appl",    name: "Refrigerator",  tag: "",            price: 0,   promo: null, features: ["Large capacity", "Inverter", "Even cooling"] },
  // Home care
  { id: "aircond", img: "products/aircond.png",     cat: "home",    name: "Air Conditioner", tag: "",          price: 0,   promo: null, features: ["Inverter", "Air purifying", "Regular servicing"] },
  { id: "massage-chair", img: "products/massage-chair.png", cat: "home",  name: "Massage Chair", tag: "",            price: 0,   promo: null, features: ["Full body", "Multiple programs", "Rental plan"] },
  // Sleep
  { id: "mattress-ecolite", img: "products/mattress-ecolite.png", cat: "sleep", name: "Mattress Eco Lite", tag: "", price: 65, promo: null, features: ["Medium firm", "Changeable topper*", "Care service every 4 months"] },
];
