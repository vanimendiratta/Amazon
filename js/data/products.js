/**
 * Centralized Product Catalog Database
 * Amazon Storefront Clone
 */

const PRODUCTS = [
  {
    id: "macbook-pro-16-m1-max",
    title: "2021 Apple MacBook Pro (16-inch, Apple M1 Max chip with 10-core CPU and 32-core GPU, 32GB RAM, 1TB SSD) - Space Grey",
    category: "Laptops",
    brand: "Apple",
    price: 399999,
    originalPrice: 429900,
    rating: 4.8,
    reviewCount: 1420,
    inStock: true,
    badge: "Amazon's Choice",
    image: "https://m.media-amazon.com/images/I/61aUBxqc5PL._SX679_.jpg",
    gallery: [
      "https://m.media-amazon.com/images/I/61aUBxqc5PL._SX679_.jpg",
      "https://images-eu.ssl-images-amazon.com/images/I/61aUBxqc5PL._AC_UL320_SR320,320_.jpg",
      "https://m.media-amazon.com/images/I/61Y30DpqRVL._AC_SY400_.jpg"
    ],
    features: [
      "Apple M1 Max chip with 10-core CPU and 32-core GPU for unprecedented performance",
      "16-core Neural Engine for up to 5x faster machine learning acceleration",
      "Up to 21 hours of battery life with advanced thermal architecture",
      "32GB unified memory with 400GB/s bandwidth so everything is fluid",
      "1TB super-fast SSD storage with up to 7.4GB/s read speeds",
      "Liquid Retina XDR display with 1,000,000:1 contrast ratio and ProMotion 120Hz",
      "1080p FaceTime HD camera with computational video & studio-quality 3-mic array",
      "Six-speaker sound system with force-cancelling woofers & Spatial Audio support"
    ],
    specs: {
      "Brand": "Apple",
      "Model Name": "MacBook Pro",
      "Screen Size": "16.2 Inches",
      "Color": "Space Grey",
      "CPU Model": "Apple M1 Max (10-Core)",
      "RAM Memory": "32 GB",
      "Operating System": "macOS",
      "Graphics Card": "Integrated 32-Core GPU"
    }
  },
  {
    id: "iphone-13-blue",
    title: "Apple iPhone 13 (128GB) - Blue",
    category: "Smartphones",
    brand: "Apple",
    price: 69999,
    originalPrice: 79900,
    rating: 4.6,
    reviewCount: 15480,
    inStock: true,
    badge: "Best Seller",
    image: "https://m.media-amazon.com/images/I/71ZOtNdaZCL._AC_UY436_FMwebp_QL65_.jpg",
    gallery: [
      "https://m.media-amazon.com/images/I/71ZOtNdaZCL._AC_UY436_FMwebp_QL65_.jpg"
    ],
    features: [
      "15 cm (6.1-inch) Super Retina XDR display",
      "Cinematic mode adds shallow depth of field and shifts focus automatically in your videos",
      "Advanced dual-camera system with 12MP Wide and Ultra Wide cameras",
      "A15 Bionic chip for lightning-fast performance",
      "Up to 19 hours of video playback",
      "Durable design with Ceramic Shield and industry-leading IP68 water resistance"
    ],
    specs: {
      "Brand": "Apple",
      "Model Name": "iPhone 13",
      "Display": "6.1-inch OLED Super Retina XDR",
      "Storage": "128 GB",
      "Processor": "A15 Bionic"
    }
  },
  {
    id: "imac-24-m1-silver",
    title: "Apple iMac 24-inch Retina 4.5K (Apple M1 Chip, 8-Core CPU, 8-Core GPU, 8GB RAM, 256GB SSD) - Silver",
    category: "Computers",
    brand: "Apple",
    price: 119900,
    originalPrice: 139900,
    rating: 4.7,
    reviewCount: 890,
    inStock: true,
    badge: "Amazon's Choice",
    image: "https://images-eu.ssl-images-amazon.com/images/I/61LNnZPoKPS._AC_UL320_SR320,320_.jpg",
    gallery: [
      "https://images-eu.ssl-images-amazon.com/images/I/61LNnZPoKPS._AC_UL320_SR320,320_.jpg"
    ],
    features: [
      "Immersive 24-inch 4.5K Retina display with P3 wide color gamut and 500 nits brightness",
      "Apple M1 chip delivers powerful performance with 8-core CPU and 8-core GPU",
      "Strikingly thin 11.5 mm design in vibrant colors",
      "1080p FaceTime HD camera with M1 ISP for exceptional video quality",
      "Studio-quality three-mic array for crystal-clear calls and voice recordings",
      "Six-speaker sound system with spatial audio for room-filling acoustic experience"
    ],
    specs: {
      "Brand": "Apple",
      "Screen Size": "24 Inches",
      "Resolution": "4.5K Retina (4480 x 2520)",
      "RAM": "8 GB Unified",
      "Storage": "256 GB SSD"
    }
  },
  {
    id: "hp-pavilion-15",
    title: "HP Pavilion 15 (12th Gen Intel Core i5-1240P, 16GB DDR4, 512GB SSD, FHD Micro-Edge Display, Win 11) - Natural Silver",
    category: "Laptops",
    brand: "HP",
    price: 68990,
    originalPrice: 79999,
    rating: 4.3,
    reviewCount: 3210,
    inStock: true,
    badge: "Popular Deal",
    image: "https://images-eu.ssl-images-amazon.com/images/I/71hmqIQJFdL._AC_UL320_SR320,320_.jpg",
    gallery: [
      "https://images-eu.ssl-images-amazon.com/images/I/71hmqIQJFdL._AC_UL320_SR320,320_.jpg"
    ],
    features: [
      "12th Gen Intel Core i5-1240P processor with 12 cores and 16 threads",
      "16 GB DDR4-3200 MHz RAM (2 x 8 GB) for seamless multitasking",
      "512 GB PCIe NVMe M.2 SSD fast boot times",
      "39.6 cm (15.6\") diagonal FHD micro-edge anti-glare display",
      "Audio by B&O with dual stereo speakers",
      "HP Fast Charge: 0 to 50% in approximately 45 minutes"
    ],
    specs: {
      "Brand": "HP",
      "Model": "Pavilion 15-eg2009TU",
      "Processor": "Intel Core i5-1240P",
      "Screen Size": "15.6 Inches",
      "RAM": "16 GB"
    }
  },
  {
    id: "amazon-basics-laptop-sleeve",
    title: "Amazon Basics Pro Water-Resistant Laptop Sleeve Case with Handle & Accessory Pocket (15.6-inch) - Jet Black",
    category: "Accessories",
    brand: "Amazon Basics",
    price: 899,
    originalPrice: 1499,
    rating: 4.4,
    reviewCount: 22100,
    inStock: true,
    badge: "Top Seller",
    image: "https://images-eu.ssl-images-amazon.com/images/I/71eknZxZLmL._AC_UL320_SR320,320_.jpg",
    gallery: [
      "https://images-eu.ssl-images-amazon.com/images/I/71eknZxZLmL._AC_UL320_SR320,320_.jpg"
    ],
    features: [
      "Form-fitting sleeve with quick top-loading access for 15.6-inch laptops and ultrabooks",
      "Water-resistant neoprene exterior protects against spills and light rain",
      "Padded fleece interior cushions against bumps, scratches, and drops",
      "Front zipper pocket keeps chargers, cables, and pens organized"
    ],
    specs: {
      "Brand": "Amazon Basics",
      "Color": "Jet Black",
      "Material": "Water-Resistant Neoprene",
      "Compatibility": "Up to 15.6-inch Laptops"
    }
  },
  {
    id: "inateck-shockproof-laptop-bag",
    title: "Inateck Shockproof 360 Protective Laptop Carrying Case with Shoulder Strap (16-inch) - Heather Grey",
    category: "Accessories",
    brand: "Inateck",
    price: 1499,
    originalPrice: 2299,
    rating: 4.5,
    reviewCount: 4560,
    inStock: true,
    badge: "Amazon's Choice",
    image: "https://images-eu.ssl-images-amazon.com/images/I/91k86Cdp1uL._AC_UL320_SR320,320_.jpg",
    gallery: [
      "https://images-eu.ssl-images-amazon.com/images/I/91k86Cdp1uL._AC_UL320_SR320,320_.jpg"
    ],
    features: [
      "360-degree all-around protective reinforced edge bumpers",
      "Super soft plush lining to prevent scuffs and micro-scratches",
      "Spacious front organizer compartment for iPad, power adapter, and mouse",
      "Detachable padded shoulder strap and concealable carry handles"
    ],
    specs: {
      "Brand": "Inateck",
      "Color": "Heather Grey",
      "Closure Type": "YKK Zippers",
      "Size": "16-inch"
    }
  },
  {
    id: "macbook-air-m1-space-grey",
    title: "2020 Apple MacBook Air (13.3-inch, Apple M1 chip with 8-core CPU and 7-core GPU, 8GB RAM, 256GB SSD) - Space Grey",
    category: "Laptops",
    brand: "Apple",
    price: 82990,
    originalPrice: 99900,
    rating: 4.7,
    reviewCount: 28400,
    inStock: true,
    badge: "Amazon's Choice",
    image: "https://m.media-amazon.com/images/I/61Y30DpqRVL._AC_SY400_.jpg",
    gallery: [
      "https://m.media-amazon.com/images/I/61Y30DpqRVL._AC_SY400_.jpg"
    ],
    features: [
      "Apple-designed M1 chip for a giant leap in CPU, GPU, and machine learning performance",
      "Go longer than ever with up to 18 hours of battery life",
      "8-core CPU delivers up to 3.5x faster performance to tackle projects faster",
      "Fanless design for completely silent operation",
      "13.3-inch Retina display with P3 wide color for vibrant images and incredible detail"
    ],
    specs: {
      "Brand": "Apple",
      "Model": "MacBook Air",
      "Chip": "Apple M1",
      "RAM": "8 GB",
      "SSD": "256 GB"
    }
  },
  {
    id: "ipad-air-5th-gen-blue",
    title: "2022 Apple iPad Air (10.9-inch, Wi-Fi, 64GB) - Blue (5th Generation)",
    category: "Tablets",
    brand: "Apple",
    price: 54900,
    originalPrice: 59900,
    rating: 4.6,
    reviewCount: 6120,
    inStock: true,
    badge: "Popular Deal",
    image: "https://m.media-amazon.com/images/I/71iiXU7HHkL._AC_SY400_.jpg",
    gallery: [
      "https://m.media-amazon.com/images/I/71iiXU7HHkL._AC_SY400_.jpg"
    ],
    features: [
      "10.9-inch Liquid Retina display with True Tone, P3 wide color, and an anti-reflective coating",
      "Apple M1 chip with Neural Engine for desktop-class computing",
      "12MP Wide camera with Smart HDR and 4K video recording",
      "12MP Ultra Wide front camera with Center Stage for engaging video calls",
      "Touch ID built into the top button for secure authentication and Apple Pay"
    ],
    specs: {
      "Brand": "Apple",
      "Model": "iPad Air (5th Gen)",
      "Display": "10.9-inch Liquid Retina",
      "Storage": "64 GB",
      "Processor": "Apple M1"
    }
  },
  {
    id: "xiaomi-mi-notebook-pro",
    title: "Xiaomi Mi Notebook Pro (11th Gen Intel Core i5-11300H, 14-inch 2.5K 16:10 Display, 16GB RAM, 512GB SSD) - Lustrous Grey",
    category: "Laptops",
    brand: "Xiaomi",
    price: 56999,
    originalPrice: 69999,
    rating: 4.2,
    reviewCount: 4190,
    inStock: true,
    badge: "Value Pick",
    image: "https://m.media-amazon.com/images/I/61XZQXFQeVL._AC_SY400_.jpg",
    gallery: [
      "https://m.media-amazon.com/images/I/61XZQXFQeVL._AC_SY400_.jpg"
    ],
    features: [
      "11th Gen TigerLake Intel Core i5-11300H processor with max turbo up to 4.4GHz",
      "14-inch 2.5K (2560x1600) display with 16:10 aspect ratio and 100% sRGB",
      "16GB DDR4 3200MHz RAM and 512GB PCIe NVMe SSD",
      "Fingerprint scanner built into power button for instant login",
      "Aerospace grade Series 6 Aluminium alloy body with 17.3mm slim profile"
    ],
    specs: {
      "Brand": "Xiaomi",
      "Screen Size": "14 Inches",
      "Resolution": "2.5K QHD+",
      "RAM": "16 GB",
      "SSD": "512 GB"
    }
  },
  {
    id: "ipad-10-2-9th-gen",
    title: "Apple iPad 10.2-inch (9th Generation, Wi-Fi, 64GB) - Space Grey",
    category: "Tablets",
    brand: "Apple",
    price: 29900,
    originalPrice: 33900,
    rating: 4.6,
    reviewCount: 18900,
    inStock: true,
    badge: "Best Seller",
    image: "https://m.media-amazon.com/images/I/712B4P3yOnL._AC_SY400_.jpg",
    gallery: [
      "https://m.media-amazon.com/images/I/712B4P3yOnL._AC_SY400_.jpg"
    ],
    features: [
      "Gorgeous 10.2-inch Retina display with True Tone technology",
      "A13 Bionic chip with Neural Engine for smooth multitasking and gaming",
      "8MP Wide back camera, 12MP Ultra Wide front camera with Center Stage",
      "Stereo speakers and up to 10 hours of battery life",
      "Supports Apple Pencil (1st generation) and Smart Keyboard"
    ],
    specs: {
      "Brand": "Apple",
      "Display": "10.2-inch Retina",
      "Storage": "64 GB",
      "Processor": "A13 Bionic"
    }
  },
  {
    id: "mac-mini-m1",
    title: "Apple Mac Mini (Apple M1 Chip with 8-Core CPU and 8-Core GPU, 8GB RAM, 256GB SSD) - Silver",
    category: "Computers",
    brand: "Apple",
    price: 59900,
    originalPrice: 64900,
    rating: 4.7,
    reviewCount: 3820,
    inStock: true,
    badge: "Amazon's Choice",
    image: "https://m.media-amazon.com/images/I/51eTOVYRbTL._AC_SY400_.jpg",
    gallery: [
      "https://m.media-amazon.com/images/I/51eTOVYRbTL._AC_SY400_.jpg"
    ],
    features: [
      "Apple-designed M1 chip for incredible desktop performance in an ultra-compact body",
      "8-core CPU delivers up to 3x faster performance to fly through complex workflows",
      "8-core GPU with up to 6x faster graphics for graphics-intensive apps",
      "Advanced cooling system maintains astonishing performance without throttling",
      "Versatile connectivity: Two Thunderbolt / USB 4 ports, two USB-A, HDMI 2.0, Gigabit Ethernet"
    ],
    specs: {
      "Brand": "Apple",
      "Chip": "Apple M1",
      "RAM": "8 GB Unified",
      "SSD": "256 GB NVMe"
    }
  },
  {
    id: "cadbury-chocobakes-cakes",
    title: "Cadbury Chocobakes Choc Layered Cakes (Box of 6, 126g)",
    category: "Groceries",
    brand: "Cadbury",
    price: 60,
    originalPrice: 70,
    rating: 4.5,
    reviewCount: 8900,
    inStock: true,
    badge: "Best Seller",
    image: "https://m.media-amazon.com/images/I/617tvTiZLGL._AC_SY400_.jpg",
    gallery: [
      "https://m.media-amazon.com/images/I/617tvTiZLGL._AC_SY400_.jpg"
    ],
    features: [
      "Delicious soft sponge cake wrapped in decadent Cadbury chocolate cream",
      "Enrobed in smooth and rich Cadbury milk chocolate layer",
      "Individually wrapped 6 snack packs for freshness on the go",
      "100% vegetarian product made with premium cocoa"
    ],
    specs: {
      "Brand": "Cadbury",
      "Diet Type": "Vegetarian",
      "Weight": "126 Grams",
      "Package": "Box of 6 Units"
    }
  },
  {
    id: "quaker-rolled-oats-1kg",
    title: "Quaker Rolled Oats 1kg, 100% Wholegrain Oats, Rich in Fibre & Protein",
    category: "Groceries",
    brand: "Quaker",
    price: 190,
    originalPrice: 220,
    rating: 4.6,
    reviewCount: 31200,
    inStock: true,
    badge: "Amazon's Choice",
    image: "https://m.media-amazon.com/images/I/51tNket0w8L._AC_SY400_.jpg",
    gallery: [
      "https://m.media-amazon.com/images/I/51tNket0w8L._AC_SY400_.jpg"
    ],
    features: [
      "100% natural wholegrain rolled oats for a wholesome, heart-healthy breakfast",
      "High dietary fibre content helps maintain healthy cholesterol levels",
      "Rich source of plant-based protein and sustained energy",
      "Quick cooking in just 3 minutes with hot milk or water"
    ],
    specs: {
      "Brand": "Quaker",
      "Weight": "1 Kilogram",
      "Diet Type": "Vegetarian",
      "Specialty": "100% Whole Grain"
    }
  },
  {
    id: "vedaka-raw-peanuts-1kg",
    title: "Amazon Brand - Vedaka Raw Peanut / Groundnut Seeds (1kg)",
    category: "Groceries",
    brand: "Vedaka",
    price: 185,
    originalPrice: 230,
    rating: 4.3,
    reviewCount: 14750,
    inStock: true,
    badge: "Amazon Brand",
    image: "https://m.media-amazon.com/images/I/91oNY+gNzPL._AC_SY400_.jpg",
    gallery: [
      "https://m.media-amazon.com/images/I/91oNY+gNzPL._AC_SY400_.jpg"
    ],
    features: [
      "Hygienically sorted and vacuum-packed raw groundnut seeds",
      "Uniform size, crunchy texture, and natural nutty flavor",
      "Ideal for roasting, chikkis, salads, and traditional gravies",
      "Undergoes rigorous laboratory tests for aflatoxin and pesticide limits"
    ],
    specs: {
      "Brand": "Vedaka (Amazon Brand)",
      "Weight": "1 Kilogram",
      "Form": "Whole Raw Seeds"
    }
  },
  {
    id: "aashirvaad-iodised-salt-1kg",
    title: "Aashirvaad Iodised Salt (1kg Pouch) - Vacuum Evaporated Crystal Pure",
    category: "Groceries",
    brand: "Aashirvaad",
    price: 28,
    originalPrice: 30,
    rating: 4.7,
    reviewCount: 42100,
    inStock: true,
    badge: "Essential",
    image: "https://m.media-amazon.com/images/I/81NrftYFxsL._AC_SY400_.jpg",
    gallery: [
      "https://m.media-amazon.com/images/I/81NrftYFxsL._AC_SY400_.jpg"
    ],
    features: [
      "Crystal pure vacuum evaporated iodised table salt",
      "Sourced from the pristine waters of the Arabian Sea",
      "Guarantees the right amount of iodine for healthy mental growth",
      "Free-flowing, uniform granules that dissolve quickly in cooking"
    ],
    specs: {
      "Brand": "Aashirvaad",
      "Weight": "1 Kilogram",
      "Type": "Vacuum Evaporated Iodised Salt"
    }
  },
  {
    id: "tata-sampann-high-fibre-poha-500g",
    title: "Tata Sampann High in Fibre Thick Poha (500g)",
    category: "Groceries",
    brand: "Tata",
    price: 58,
    originalPrice: 65,
    rating: 4.5,
    reviewCount: 16800,
    inStock: true,
    badge: "Top Seller",
    image: "https://m.media-amazon.com/images/I/61uohjMdfzL._AC_SY400_.jpg",
    gallery: [
      "https://m.media-amazon.com/images/I/61uohjMdfzL._AC_SY400_.jpg"
    ],
    features: [
      "Made from premium paddy grains using authentic traditional flattening",
      "High dietary fibre content keeps you satiated for longer",
      "Retains natural grain nutrients without excessive polishing",
      "Ideal for preparing quick, authentic Maharashtrian or Gujarati poha recipes"
    ],
    specs: {
      "Brand": "Tata Sampann",
      "Weight": "500 Grams",
      "Grain Type": "Thick Flattened Rice"
    }
  },
  {
    id: "fortune-sunlite-sunflower-oil-1l",
    title: "Fortune Sunlite Refined Sunflower Oil (1 Litre Pouch)",
    category: "Groceries",
    brand: "Fortune",
    price: 135,
    originalPrice: 160,
    rating: 4.4,
    reviewCount: 29000,
    inStock: true,
    badge: "Amazon's Choice",
    image: "https://m.media-amazon.com/images/I/61oagbcgAtS._AC_SY400_.jpg",
    gallery: [
      "https://m.media-amazon.com/images/I/61oagbcgAtS._AC_SY400_.jpg"
    ],
    features: [
      "Light and clear cooking oil with high smoke point",
      "Fortified with Vitamin A and Vitamin D for balanced nutrition",
      "Helps maintain healthy heart function with polyunsaturated fatty acids",
      "Absorbs less oil in food, keeping fried snacks crisp and light"
    ],
    specs: {
      "Brand": "Fortune",
      "Volume": "1 Litre",
      "Specialty": "Fortified with Vitamins A & D"
    }
  },
  {
    id: "lg-split-ac-1-5-ton",
    title: "LG 1.5 Ton 5 Star AI DUAL Inverter Split AC (Copper, Super Convertible 6-in-1 Cooling, 2024 Model)",
    category: "Appliances",
    brand: "LG",
    price: 44490,
    originalPrice: 75990,
    rating: 4.2,
    reviewCount: 9400,
    inStock: true,
    badge: "Amazon's Choice",
    image: "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-372x232----B08RDL6H79._SY232_CB667322346_.jpg",
    gallery: [
      "https://images-eu.ssl-images-amazon.com/images/G/31/IMG15/Irfan/GATEWAY/MSO/Appliances-QC-PC-372x232----B08RDL6H79._SY232_CB667322346_.jpg"
    ],
    features: [
      "Split AC with inverter compressor: Variable speed compressor adjusting power based on heat load",
      "Capacity: 1.5 Ton suitable for medium sized rooms (111 to 150 sq.ft)",
      "Energy Rating: 5 Star ISEER value 5.2 - Best in class efficiency",
      "100% Copper condenser with Ocean Black Protection prevents rust and corrosion"
    ],
    specs: {
      "Brand": "LG",
      "Capacity": "1.5 Tons",
      "Cooling Power": "5000 Watts",
      "Energy Star": "5 Star"
    }
  },
  {
    id: "amazon-symbol-polo-shirt",
    title: "Amazon Brand - Symbol Men's Regular Fit Pique Polo T-Shirt (Pack of 2)",
    category: "Fashion",
    brand: "Symbol",
    price: 599,
    originalPrice: 1299,
    rating: 4.1,
    reviewCount: 12400,
    inStock: true,
    badge: "Best Seller",
    image: "https://images-eu.ssl-images-amazon.com/images/G/31/AmazonSmallBusinessDay/PrivateBrands/GW20/GW_Desktop_Softlines_QC_2X_V2_5._SY232_CB636581721_.jpg",
    gallery: [
      "https://images-eu.ssl-images-amazon.com/images/G/31/AmazonSmallBusinessDay/PrivateBrands/GW20/GW_Desktop_Softlines_QC_2X_V2_5._SY232_CB636581721_.jpg"
    ],
    features: [
      "Premium breathable pique fabric crafted from 60% cotton and 40% polyester",
      "Ribbed collar and sleeve hems with two-button placket",
      "Pre-shrunk fabric ensures colors and fit remain true after multiple washes",
      "Versatile styling for smart casual work days and weekend outings"
    ],
    specs: {
      "Brand": "Symbol (Amazon Brand)",
      "Fit": "Regular Fit",
      "Material": "60% Cotton, 40% Polyester",
      "Care Instructions": "Machine Wash"
    }
  },
  {
    id: "asus-zenbook-oled-collection",
    title: "ASUS ZenBook 14 OLED (13th Gen Intel Core i7-1360P, 16GB LPDDR5, 1TB SSD, 2.8K 90Hz OLED Display)",
    category: "Laptops",
    brand: "ASUS",
    price: 74990,
    originalPrice: 104990,
    rating: 4.4,
    reviewCount: 3100,
    inStock: true,
    badge: "Amazon's Choice",
    image: "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Electronics/Clearance/Clearance_store_Desktop_CC_2x._SY608_CB628315133_.jpg",
    gallery: [
      "https://images-eu.ssl-images-amazon.com/images/G/31/img22/Electronics/Clearance/Clearance_store_Desktop_CC_2x._SY608_CB628315133_.jpg"
    ],
    features: [
      "14.0-inch 2.8K (2880 x 1800) OLED 16:10 aspect ratio 90Hz refresh rate display",
      "100% DCI-P3 color gamut, PANTONE Validated, VESA DisplayHDR True Black 600",
      "Intel Core i7-1360P Processor 2.2 GHz (18MB Cache, up to 5.0 GHz, 12 cores, 16 Threads)",
      "75WHrs high-capacity battery provides up to 18 hours of productivity"
    ],
    specs: {
      "Brand": "ASUS",
      "Series": "ZenBook 14 OLED",
      "Screen": "14-inch 2.8K 90Hz OLED",
      "RAM": "16 GB LPDDR5",
      "Storage": "1 TB SSD"
    }
  }
];

// Helper Functions
function getAllProducts() {
  return [...PRODUCTS];
}

function getProductById(id) {
  if (!id) return null;
  return PRODUCTS.find(p => p.id === id) || null;
}

function getProductsByCategory(category) {
  if (!category) return [];
  const target = category.toLowerCase();
  return PRODUCTS.filter(p => p.category.toLowerCase() === target);
}

function searchProducts(query) {
  if (!query || typeof query !== "string") return [];
  const q = query.trim().toLowerCase();
  if (q.length === 0) return [];
  return PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    (p.features && p.features.some(f => f.toLowerCase().includes(q)))
  );
}

function formatPriceINR(amount) {
  return "₹ " + Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Universal export pattern for browser (global window) and Node (CommonJS / ES modules)
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    PRODUCTS,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
    formatPriceINR
  };
}

if (typeof window !== "undefined") {
  window.ProductCatalog = {
    PRODUCTS,
    getAllProducts,
    getProductById,
    getProductsByCategory,
    searchProducts,
    formatPriceINR
  };
}
