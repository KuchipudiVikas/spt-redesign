import { ImageIndex } from "@/lib/imageindex";
import { ToolLinkIndex } from "@/lib/linkIndex";
import { ProductIdentifier } from "./ProductEnum";

export const Categories = [
  "Education",
  "Book Education Tools",
  "Research Tools",
  "Book Listing Tools",
  "Design Tools",
  "General KDP Tools",
  "Training Tools",
];

export type ProductCategory = (typeof Categories)[number];

export type Product = {
  name: string;
  icon?: string;
  id?: string;
  product_link: string;
  thumbnail_image: string;
  description: string;
  category: ProductCategory;
  isPaid: boolean;
};

export type ProductMap = {
  [key in ProductIdentifier]?: Product;
};

export const Products: ProductMap = {
  [ProductIdentifier.LOW_CONTENT_BOOK_GENERATOR]: {
    name: "Low content book maker",
    category: "Design Tools",
    description: "Low Content Books Tool. The fast and easy way.",
    isPaid: false,
    thumbnail_image: ImageIndex.LOW_CONTENT_BOOK_GENERATOR,
    product_link: ToolLinkIndex.LOW_CONTENT_BOOK_GENERATOR,
  },
  [ProductIdentifier.SEVEN_BACKEND_KEYWORDS]: {
    name: "7 Backend Keywords",
    thumbnail_image: ImageIndex["7 Backend Keywords"],
    product_link: ToolLinkIndex["7 Backend Keywords"],
    category: "Research Tools",
    description: "Keyword research tool. The fast and easy way",
    isPaid: true,
    id: "66585bdf7fa69298ee51aa7b",
  },
  [ProductIdentifier.KDP_BSR_Sales_CALCULATOR]: {
    name: "KDP BSR Sales Calculator",
    category: "General KDP Tools",
    isPaid: false,
    description: "KDP BSR Sales Calculator Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/free_tools/kdp_bsr_calculator.png",
    product_link: ToolLinkIndex["KDP BSR Sales Calculator"],
  },
  [ProductIdentifier.ACOS_Royalty_Calculator]: {
    name: "ACOS Royalty Calculator",
    category: "General KDP Tools",
    isPaid: false,
    description: "ACOS Royalty Calculator Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/free_tools/acos_royality_calculator.png",
    product_link: ToolLinkIndex[ProductIdentifier.ACOS_Royalty_Calculator],
  },
  [ProductIdentifier.PEN_NAME_GENERATOR]: {
    name: "Pen Name Generator",
    category: "General KDP Tools",
    isPaid: false,
    description: "Pen Name Generator Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/free_tools/pen_name_generator.png",
    product_link: ToolLinkIndex[ProductIdentifier.PEN_NAME_GENERATOR],
  },
  [ProductIdentifier.QR_GEN]: {
    name: "QR Code Generator",
    category: "General KDP Tools",
    description: "QR Code Generator for KDP Books Tool. The fast and easy way.",
    isPaid: false,
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/free_tools/qr_code_gen.png",
    product_link: ToolLinkIndex[ProductIdentifier.QR_GEN],
  },
  [ProductIdentifier.BOOK_WRITER]: {
    name: "Book Writer",
    category: "Design Tools",
    isPaid: false,
    description: "Book Writer Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/BookDetails/book_writer.png",
    product_link: ToolLinkIndex[ProductIdentifier.BOOK_WRITER],
  },
  [ProductIdentifier.PUZZLE_MAKER]: {
    name: "Puzzle Maker Software",
    category: "Book Creation Tools",
    isPaid: true,
    description: `The following tools are included with lifetime access and unlimited use: Sudoku, Word Search, Crossword, Letter Maze, Shape Maze, Nonogram, Word Snake, Number Search, Word Scramble, Pontoon Grid, Kakuro, Cryptogram, Link Janitor, Hidato, Wordoku, Drawgrid, Letter Tracing, Bingo Card, Equation Solver, Cryptomaths, Cross Sums`,
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/BookDetails/puzzle_maker_software.png",
    product_link: ToolLinkIndex[ProductIdentifier.PUZZLE_MAKER],
  },
  [ProductIdentifier.COLORING_BOOKS]: {
    name: "Coloring Books",
    category: "Design Tools",
    isPaid: true,
    description: "Coloring Books. The fast and easy way.",
    id: "63d6701a1ee1322b4efc1bb7",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/BookDetails/coloringBooks.png",
    product_link: ToolLinkIndex[ProductIdentifier.COLORING_BOOKS],
  },
  [ProductIdentifier.TITAN_PRO_WEB_APP]: {
    name: "Titans Pro Web App",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/titans_pro_web_app.png",
    product_link: ToolLinkIndex[ProductIdentifier.TITAN_PRO_WEB_APP],
    id: "64562b9ae2210da37f2bdb2c",
    category: "Research Tools",
    description: "Amazon suggestions, search volume, search results & more",
    isPaid: true,
  },
  [ProductIdentifier.TITANS_QUICK_VIEW]: {
    name: "Titans Quick View",
    description: "Quickly view key metrics on Amazon search pages",
    category: "Research Tools",
    isPaid: false,
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/titans_quick_view.png",
    product_link: ToolLinkIndex[ProductIdentifier.TITANS_QUICK_VIEW],
  },
  [ProductIdentifier.DEEP_VIEW]: {
    id: "655ed9e21727b2465e130795",
    category: "Research Tools",
    name: "Deep View",
    isPaid: true,
    description:
      "Analyze 100 Products At Once, Niche Metrics, Sales Est., Key Metrics, Excel Download All Data",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/deep_view.png",
    product_link: ToolLinkIndex[ProductIdentifier.DEEP_VIEW],
  },
  [ProductIdentifier.RETRO_VIEW]: {
    name: "Tians Retro View",
    id: "655eda781727b2465e130798",
    category: "Research Tools",
    description: "This is a description",
    isPaid: true,

    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/retro_view.png",
    product_link: ToolLinkIndex[ProductIdentifier.RETRO_VIEW],
  },
  [ProductIdentifier.TITLE_CREATOR]: {
    name: "Title Creator",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/title_creator.png",
    product_link: ToolLinkIndex[ProductIdentifier.TITLE_CREATOR],
    category: "Book Listing Tools",
    isPaid: true,
    description: "KDP Title Creator Tool. The fast and easy way.",
    id: "66f11ec860a7f1a8e8afc35f",
  },
  [ProductIdentifier.DESCRIPTION_CREATOR]: {
    name: "Description Creator",
    id: "66f11df160a7f1a8e8afc357",

    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/description_creator.png",
    product_link: ToolLinkIndex[ProductIdentifier.DESCRIPTION_CREATOR],
    category: "Book Listing Tools",
    isPaid: true,

    description: "KDP Book Description Generator Tool. The fast and easy way.",
  },
  [ProductIdentifier.TRADEMARK_CHECKER]: {
    name: "Trademark Checker",
    category: "Book Listing Tools",
    id: "66f11df160a7f1a8e8afc35a",
    isPaid: true,
    description: "KDP Trademark Checker Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/trademark_checker.png",
    product_link: ToolLinkIndex[ProductIdentifier.TRADEMARK_CHECKER],
  },
  [ProductIdentifier.GUIDELINES_CHECKER]: {
    name: "Guidelines Checker",
    category: "Book Listing Tools",
    id: "66f11df160a7f1a8e8afc35b",
    isPaid: true,
    description: "KDP Guidelines Checker Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/guidelines.png",
    product_link: ToolLinkIndex[ProductIdentifier.GUIDELINES_CHECKER],
  },
  [ProductIdentifier.PRICE_CHECKER]: {
    name: "Price Checker",
    id: "66f11df160a7f1a8e8afc358",
    isPaid: true,
    category: "Book Listing Tools",
    description: "Book Price Suggestion Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/book_price.png",
    product_link: ToolLinkIndex[ProductIdentifier.PRICE_CHECKER],
  },
  [ProductIdentifier.GRAMMAR_CHECKER]: {
    name: "Grammar Checker",
    category: "Book Listing Tools",
    isPaid: true,
    description: "Grammar and Spell Checker Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/grammar_check.png",
    product_link: ToolLinkIndex[ProductIdentifier.GRAMMAR_CHECKER],
  },
  [ProductIdentifier.BOOK_DATA_TRANSLATOR]: {
    name: "Book Data Translator",
    category: "Book Listing Tools",
    id: "66f11df160a7f1a8e8afc35c",
    isPaid: true,

    description: "KDP Book Data Translator Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/translator.png",
    product_link: ToolLinkIndex[ProductIdentifier.BOOK_DATA_TRANSLATOR],
  },
  [ProductIdentifier.WORD_CLOUD]: {
    name: "Word Cloud",
    isPaid: false,
    category: "General KDP Tools",
    description: "Word Cloud Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/word_cloud.png",
    product_link: ToolLinkIndex[ProductIdentifier.WORD_CLOUD],
  },
  [ProductIdentifier.KEYWORD_TRACKER]: {
    name: "Keyword Tracker",
    isPaid: true,
    category: "General KDP Tools",
    description: "Keyword Tracker Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/kwt.png",
    product_link: ToolLinkIndex[ProductIdentifier.KEYWORD_TRACKER],
  },
  [ProductIdentifier.ASIN_TRACKER]: {
    name: "ASIN Tracker",
    isPaid: true,
    category: "General KDP Tools",
    description: "ASIN Tracker Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/asin_tracker.png",
    product_link: ToolLinkIndex[ProductIdentifier.ASIN_TRACKER],
  },
  [ProductIdentifier.KDP_CATEGORY_FINDER]: {
    name: "KDP Category Finder",
    isPaid: false,
    category: "General KDP Tools",
    description: "KDP Category Finder Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/kdp%20category%20finder.png",
    product_link: ToolLinkIndex[ProductIdentifier.KDP_CATEGORY_FINDER],
  },
  [ProductIdentifier.DIGITAL_TITANS_DESIGNER]: {
    name: "Digital Titans Designer",
    category: "Design Tools",
    isPaid: true,
    description: "Digital Titans Designer Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/BookDetails/coloringBooks.png",
    product_link: ToolLinkIndex[ProductIdentifier.DIGITAL_TITANS_DESIGNER],
  },
  [ProductIdentifier.A_PLUS_CONTENT]: {
    name: "A+ Content Template Generator",
    category: "Design Tools",
    isPaid: false,
    description: "A+ Content Template Generator Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/book_cover_creator.png",
    product_link: ToolLinkIndex[ProductIdentifier.A_PLUS_CONTENT],
  },
  [ProductIdentifier.BOOK_COVER_DESIGNER]: {
    name: "Book Cover Creator",
    category: "Design Tools",
    isPaid: false,
    description: "Book Cover  Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/book_cover_creator.png",
    product_link: ToolLinkIndex[ProductIdentifier.A_PLUS_CONTENT],
  },
  [ProductIdentifier.KDP_COVER_TEMPLATE_GENERATOR]: {
    name: "KDP Cover Template Generator",
    category: "Design Tools",
    isPaid: false,
    description: "KDP Cover Template Generator Tool. The fast and easy way.",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/kdp_cover_template_gen.png",
    product_link: ToolLinkIndex[ProductIdentifier.KDP_COVER_TEMPLATE_GENERATOR],
  },
};
