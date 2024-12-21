import { ProductIdentifier } from "@/data/ProductEnum";
import { ToolIndex } from "./ToolIndex";

enum LinkIndex {
  MASTERCLASS = "/masterclass",
  BLOG = "/blog",
  ABOUT = "/about",
  FREE_RESOURCES = "/free-resources",
  SUPPORT = "/support",
  COMMUNITY = "/community",
  MEDIA = "/media",
  AFFILIATEs = "/affiliates",
  LOGIN = "/login",
  TESTIMONIALS = "/testimonials",
  MY_ACCOUNT = "/me",
  REGISTER = "/register",

  RESEARCH_TOOLS = "/research-tools",
  BOOK_CREATION = "/book-creation",
  BOOK_LISTING = "/book-listing",
  DESIGN_TOOLS = "/design-tools",
  GENERAL_KDP = "/general-kdp",
  TRAINING_TOOLS = "/training-tools",
  CONTACT_FORM = "/contact-form",

  CONTACT_US = "/contact-us",
  FAQS = "/faqs",
  TERMS_CONDITIONS = "/terms-conditions",
  TRADEMARK = "/trademark",
  FEATURES = "/features",
  PRICING = "/pricing",
  TOOLS = "/tools",

  TITANS_PRO = "/titans-pro/on-site",
  BOOK_WRITER = "https://author.selfpublishingtitans.com",
  KDP_COVER_TEMPLATE_GENERATOR = "/kdp-cover-template-generator",
  A_PLUS_CONTENT_TEMPLATE = "/A+-content-template-generator",
  LOW_CONTENT_BOOK_GENERATOR = "https://books.selfpublishingtitans.com/FREE-No-Content-Book-Creator-Software",
  PUZZLE_MAKER = "https://books.selfpublishingtitans.com/Puzzle-Maker-Software",
  COLORING_BOOKS = "https://editor.selfpublishingtitans.com/",
  BOOK_TITLE_CREATOR = "https://selfpublishingtitans.com/kdp-title-creator",
  BOOK_DESCRIPTION_CREATOR = "https://selfpublishingtitans.com/kdp-description-creator",
  SEVEN_BACKEND_KEYWORDS = "/7-backend-keywords-tool-amazon-kdp",
  KDP_BSR_ROYALITY_CALCULATOR = "/tools/KDP-BSR-Sales-Calculator",
  ACOS_Royalty_Calculator = "/tools/KDP-Royalty-Calculator",
  PEN_NAME_GENERATOR = "/tools/Pen-Name-Generator",
  QR_GEN = "/tools/QR-Code-Generator-for-KDP-Books",
  WORD_CLOUD = "/word-cloud",
  KEYWORD_TRACKER = "/titans-keyword-tracker",
  ASIN_TRACKER = "/titans-asin-tracker",
  BOOK_COVER_CREATOR = "/book-cover-creator",
  KDP_CATEGORY_FINDER = "/tools/KDP-Kindle-Category-Finder",
  DIGITAL_TITANS_DESIGNER = "https://design.selfpublishingtitans.com/",
  TITANS_QUICK_VIEW = "https://chromewebstore.google.com/detail/titans-quick-view-amazon/eefljgmhgaidffapnppcmmafobefjece",
  DEEP_VIEW = "/titans-deep-view",
  RETRO_VIEW = "/titans-retro-vision",

  TITLE_CREATOR = "/kdp-title-creator",
  DESCRIPTION_CREATOR = "/kdp-description-creator",
  TRADEMARK_CHECKER = "/kdp-trademark-checker",
  GUIDELINES_CHECKER = "/kdp-guidelines-checker",
  BOOK_DATA_TRANSLATOR = "/kdp-bookdata-translator",
  PRICE_CHECKER = "/kdp-price-checker",
  GRAMMAR_CHECKER = "/grammar-check",

  PROFILE = "/profile",
}

export const ToolLinkIndex: {
  [key in ProductIdentifier]?: LinkIndex;
} = {
  [ProductIdentifier.SEVEN_BACKEND_KEYWORDS]: LinkIndex.SEVEN_BACKEND_KEYWORDS,
  [ProductIdentifier.KDP_BSR_Sales_CALCULATOR]:
    LinkIndex.KDP_BSR_ROYALITY_CALCULATOR,
  [ProductIdentifier.ACOS_Royalty_Calculator]:
    LinkIndex.ACOS_Royalty_Calculator,
  [ProductIdentifier.PEN_NAME_GENERATOR]: LinkIndex.PEN_NAME_GENERATOR,
  [ProductIdentifier.QR_GEN]: LinkIndex.QR_GEN,
  [ProductIdentifier.WORD_CLOUD]: LinkIndex.WORD_CLOUD,
  [ProductIdentifier.KEYWORD_TRACKER]: LinkIndex.KEYWORD_TRACKER,
  [ProductIdentifier.ASIN_TRACKER]: LinkIndex.ASIN_TRACKER,
  [ProductIdentifier.KDP_CATEGORY_FINDER]: LinkIndex.KDP_CATEGORY_FINDER,
  [ProductIdentifier.KDP_COVER_TEMPLATE_GENERATOR]:
    LinkIndex.KDP_COVER_TEMPLATE_GENERATOR,
  [ProductIdentifier.A_PLUS_CONTENT]: LinkIndex.A_PLUS_CONTENT_TEMPLATE,
  [ProductIdentifier.BOOK_COVER_DESIGNER]: LinkIndex.BOOK_COVER_CREATOR,
  [ProductIdentifier.LOW_CONTENT_BOOK_GENERATOR]:
    LinkIndex.LOW_CONTENT_BOOK_GENERATOR,
  [ProductIdentifier.BOOK_WRITER]: LinkIndex.BOOK_WRITER,
  [ProductIdentifier.PUZZLE_MAKER]: LinkIndex.PUZZLE_MAKER,
  [ProductIdentifier.COLORING_BOOKS]: LinkIndex.COLORING_BOOKS,
  [ProductIdentifier.DIGITAL_TITANS_DESIGNER]:
    LinkIndex.DIGITAL_TITANS_DESIGNER,
  [ProductIdentifier.TITAN_PRO_WEB_APP]: LinkIndex.TITANS_PRO,
  [ProductIdentifier.TITANS_QUICK_VIEW]: LinkIndex.TITANS_QUICK_VIEW,
  [ProductIdentifier.DEEP_VIEW]: LinkIndex.DEEP_VIEW,
  [ProductIdentifier.RETRO_VIEW]: LinkIndex.RETRO_VIEW,
  [ProductIdentifier.TITLE_CREATOR]: LinkIndex.TITLE_CREATOR,
  [ProductIdentifier.DESCRIPTION_CREATOR]: LinkIndex.DESCRIPTION_CREATOR,
  [ProductIdentifier.TRADEMARK_CHECKER]: LinkIndex.TRADEMARK_CHECKER,
  [ProductIdentifier.GUIDELINES_CHECKER]: LinkIndex.GUIDELINES_CHECKER,
  [ProductIdentifier.PRICE_CHECKER]: LinkIndex.PRICE_CHECKER,
  [ProductIdentifier.GRAMMAR_CHECKER]: LinkIndex.GRAMMAR_CHECKER,
  [ProductIdentifier.BOOK_DATA_TRANSLATOR]: LinkIndex.BOOK_DATA_TRANSLATOR,
};

export default LinkIndex;
