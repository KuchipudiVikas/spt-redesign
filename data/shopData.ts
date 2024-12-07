import {
  KWT_SHOP_ID,
  DEEP_VIEW_SHOP_ID,
  RETRO_VIEW_SHOP_ID,
  ASIN_TRACKER_SHOP_ID,
  TITANS_PRO_FOR_AMAZON_SHOP_ID,
  DIGITAL_TITANS_DESIGNER_SHOP_ID,
  TITANS_PRO_FOR_ETSY_SHOP_ID,
} from "./constants";
export const productsWithPreview = [
  KWT_SHOP_ID,
  DEEP_VIEW_SHOP_ID,
  RETRO_VIEW_SHOP_ID,
  ASIN_TRACKER_SHOP_ID,
  TITANS_PRO_FOR_AMAZON_SHOP_ID,
  DIGITAL_TITANS_DESIGNER_SHOP_ID,
  TITANS_PRO_FOR_ETSY_SHOP_ID,
];

export const shopUrlIndex = {
  [KWT_SHOP_ID]: "/titans-keyword-tracker",
  [DEEP_VIEW_SHOP_ID]: "/titans-deep-view",
  [RETRO_VIEW_SHOP_ID]: "/titans-retro-vision",
  [ASIN_TRACKER_SHOP_ID]: "/titans-asin-tracker",
  [DIGITAL_TITANS_DESIGNER_SHOP_ID]: "https://design.selfpublishingtitans.com",
  [TITANS_PRO_FOR_AMAZON_SHOP_ID]: "/titans-pro/on-site",
  [TITANS_PRO_FOR_ETSY_SHOP_ID]:
    "https://chromewebstore.google.com/detail/titans-pro-amazon-kdp-key/mmdamlknnafgffhlobhlmiljonijdnid",
};

// can be updaed to the backend later
export const descriptionIndex = {
  [KWT_SHOP_ID]:
    "Track the ranking for any keyword, for any product, on any marketplace",
  [DEEP_VIEW_SHOP_ID]: "Analyze 100 competitors at once with speed",
  [RETRO_VIEW_SHOP_ID]: "Reverse engineer any competitors / ASINs keywords",
  [ASIN_TRACKER_SHOP_ID]:
    "Track the performance of any product or competitor on Amazon, on any marketplace",
  [DIGITAL_TITANS_DESIGNER_SHOP_ID]:
    "Create your own unique fonts with custom backgrounds to use or sell in your own creative journey.",
  "63149a704f08614dd053ec3d":
    "Structured course sequence to learn all basics. How we sold 170,000+ books",
  "62e36e85577c41001b770a3e":
    "Make over 2 0 different puzzles. Most variety available online",
  "63d6701a1ee1322b4efc1bb7":
    "Create coloring books with our 9,250 hand drawn illustrations",
  "64562b9ae2210da37f2bdb2c":
    "Amazon suggestions, search volume, search results & more",
  "65a5fdf9bf8b2a80cbc509ac":
    "Etsy suggestions, search volume, search results & more",
  "65603c9e1727b2465e1307ac":
    "Bundle includes:  Titans Retro View, Titans Deep View, Titans ASIN Tracker and Titans Keyword Tracker",
  "6516aecf8a69c334783b3c27":
    "Bundle includes:  Titans Pro, Puzzle Tools, KDP Masterclass and Coloring Book Maker",
  "6431a2b1b7ca7bf13740c4c1":
    "Bundle includes:  Coloring Book Maker and Puzzle Tools",
  "655ee43f1727b2465e13079b": "Our biggest bundle with the biggest savings",
  "65701a302f7789f16ddd78ac":
    "Bundle includes: Titans Keyword Tracker and Product Tracker",
};

export const shop_bundle_description = {
  "65603c9e1727b2465e1307ac": [
    "Titans Retro View",
    "Titans Deep View",
    "Titans ASIN Tracker",
    "Titans Keyword Tracker",
  ],
  "6516aecf8a69c334783b3c27": [
    "Titans Pro",
    "Puzzle Tools",
    "KDP Masterclass",
    "Coloring Book Maker",
  ],
  "6431a2b1b7ca7bf13740c4c1": ["Puzzle Tools", "Coloring Book Maker"],
};

export const isOpenNewTab = (id) => {
  return id === TITANS_PRO_FOR_ETSY_SHOP_ID;
};

export const shopIds = {
  PUZZLE_TOOLS_V2: "65eff4a6666fa5befecf70da",
  PUZZLE_TOOLS_V1: "62e36e85577c41001b770a3e",
  ALL_PUZZLE_BUNDLE: "6605056382a0656421585620",
  BACKEND_KW_TOOL: "66585db27fa69298ee51aa7d",
  BACKEND_KW_TOOL_B1: "665aadce57248789a8268980",
  BACKEND_KW_TOOL_B2: "665aaeea57248789a8268981",
  BACKEND_KW_TOOL_B3: "665aaf9157248789a8268983",
  KDP_BOOK_DATA_TRANSLATOR: "66f11ec860a7f1a8e8afc365",
  KDP_GUIDELINES_CHECKER: "66f11ec860a7f1a8e8afc364",
  KDP_TRADEMARK_CHECKER: "66f11ec860a7f1a8e8afc363",
  GRAMMER_SPELL_CHECKER: "66f11ec860a7f1a8e8afc362",
  BOOK_PRICE_SUGGESTION_TOOL: "66f11ec860a7f1a8e8afc361",
  KDP_DESCRIPTION_TOOL: "66f11ec860a7f1a8e8afc360",
  KDP_TITLE_CREATOR: "66f11ec860a7f1a8e8afc35f",
  AUTHOR_TOOLS_BUNDLE: "66f524dd3aee8a0b6616c41f",
  RETRO_VIEW_SHOP_ID,
  DEEP_VIEW_SHOP_ID,
  ASIN_TRACKER_SHOP_ID,
  TITANS_PRO_FOR_AMAZON_SHOP_ID,
  KWT_SHOP_ID,
  TITANS_PRO: "64562b9ae2210da37f2bdb2c",
};
