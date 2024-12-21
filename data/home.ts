export type SelectedTab = "ft" | "et" | "rt" | "blt";
import LinkIndex from "@/lib/linkIndex";
import { ImageLinkIndex } from "./ImageLinkIndex";
import { ToolIndex } from "@/lib/ToolIndex";
import { Product, Products } from "./productIndex";
import { ProductIdentifier } from "./ProductEnum";

// export type Product = {
//   title: string;
//   features: string[];
//   ctaLink: string;
//   image: string;
// };

export type ListItem = Product & {
  features: string[];
};

export type Item = {
  category: string;
  products: ListItem[];
  type: SelectedTab;
};

export const Items: Item[] = [
  {
    category: "Free Publishing Tools ",
    type: "ft",
    products: [
      {
        ...Products.LOW_CONTENT_BOOK_GENERATOR,
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
      },
      {
        ...Products[ProductIdentifier.PEN_NAME_GENERATOR],
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
      },
      {
        ...Products[ProductIdentifier.ACOS_Royalty_Calculator],
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
      },
      {
        ...Products[ProductIdentifier.KDP_BSR_Sales_CALCULATOR],
        features: [
          "Provides informative and useful metrics",
          "Free and Unlimited Use",
        ],
      },
      {
        ...Products[ProductIdentifier.QR_GEN],
        features: [
          "Free and unlimited use",
          "One click download",
          "Fast and easy to use",
        ],
      },
    ],
  },
  {
    category: "Book Creation Tools",
    type: "et",
    products: [
      {
        ...Products[ProductIdentifier.BOOK_WRITER],
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
      },
      {
        ...Products[ProductIdentifier.PUZZLE_MAKER],
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
      },
      {
        ...Products[ProductIdentifier.COLORING_BOOKS],
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
      },
    ],
  },
  {
    category: "Research Tools",
    type: "rt",
    products: [
      {
        ...Products[ProductIdentifier.TITAN_PRO_WEB_APP],
        features: [
          "See all key niche metrics",
          "Niche Score Analysis",
          "BSR on search pages",
          "One click download all data",
        ],
      },
      {
        ...Products[ProductIdentifier.TITANS_QUICK_VIEW],
        features: [
          " See all key niche metrics",

          "  Niche score analysis",

          "BSR on search pages",

          " One click download all data",
        ],
      },
      {
        ...Products[ProductIdentifier.SEVEN_BACKEND_KEYWORDS],
        features: [
          "Increase your book's discoverability and rank higher on Amazon",
          "Improve your Amazon rankings and reach more potential readers",
          "Save time and effort with our intuitive and powerful tool.",
        ],
      },
      {
        ...Products[ProductIdentifier.DEEP_VIEW],
        features: [
          "Analyze the top 100 competitors at once",
          "One click download of all data",
          "Search results (competitors)",
          "All key metrics",
        ],
      },
      {
        ...Products[ProductIdentifier.RETRO_VIEW],
        features: [
          "Reverse engineer any product",
          "Find top competitors keywords",
          "See rankings of competitors",
          "Full analysis of each keyword",
          "More affordable than all alternatives",
        ],
      },
    ],
  },
  {
    category: "Book Listing Tools",
    type: "blt",
    products: [
      {
        ...Products[ProductIdentifier.TITLE_CREATOR],
        features: [
          "100 Title Ideas Instantly!",

          " See What the Top Authors Are Using",

          "Spot Trends and Patterns",
        ],
      },
      {
        ...Products[ProductIdentifier.DESCRIPTION_CREATOR],
        features: [
          "Get a Ready-to-Use Description",

          "See What’s Working for the Bestsellers",

          "Create a Description That Sells",
        ],
      },
      {
        ...Products[ProductIdentifier.TRADEMARK_CHECKER],
        features: ["Instant Trademark Check", "Stay Safe and Secure"],
      },
      {
        ...Products[ProductIdentifier.GUIDELINES_CHECKER],
        features: [
          "Get a Ready-to-Use Description",

          "See What’s Working for the Bestsellers",

          "Create a Description That Sells",
        ],
      },
      {
        ...Products[ProductIdentifier.PRICE_CHECKER],
        features: [
          "Find the Perfect Price for Your Book!",

          "Get a Smart Price Suggestion",

          "Maximize Sales and Profits",
        ],
      },
      {
        ...Products[ProductIdentifier.GRAMMAR_CHECKER],
        features: [
          "Make Your Book Look Professional!",

          "Instantly Spot Mistakes",

          "Polish Your Book to Perfection",
        ],
      },
      {
        ...Products[ProductIdentifier.BOOK_DATA_TRANSLATOR],
        features: [
          "Translate Your Entire Listing",

          "List Your Book in Other Marketplaces",

          "Grow Your Sales Internationally",
        ],
      },
    ],
  },
];
