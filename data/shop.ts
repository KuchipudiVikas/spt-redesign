import { ImageIndex } from "@/lib/imageindex";
import { ToolIndex } from "@/lib/ToolIndex";
import { ToolLinkIndex } from "@/lib/linkIndex";
import { Product, Products } from "./productIndex";
import { ProductIdentifier } from "./ProductEnum";

// export type Product = {
//   title: string;
//   price: number;
//   og_price: number;
//   category: ProductCategory;
//   description: string;
//   buy_url: string;
//   preview_url: string;
//   isPaid: boolean;
//   thumb_url: string;
//   id?: string;
// };

// export const Categories = [
//   "Education",
//   "Book Education Tools",
//   "Research Tools",
//   "Book Listing Tools",
//   "Design Tools",
//   "General KDP Tools",
//   "Training Tools",
// ];

export const allProducts: Product[] = [
  {
    ...Products[ProductIdentifier.TITAN_PRO_WEB_APP],
  },
  Products[ProductIdentifier.DEEP_VIEW],
  Products[ProductIdentifier.SEVEN_BACKEND_KEYWORDS],
  Products[ProductIdentifier.PUZZLE_MAKER],
  Products[ProductIdentifier.RETRO_VIEW],
  Products[ProductIdentifier.COLORING_BOOKS],
  Products[ProductIdentifier.DESCRIPTION_CREATOR],
  Products[ProductIdentifier.PRICE_CHECKER],
  Products[ProductIdentifier.TRADEMARK_CHECKER],
  Products[ProductIdentifier.GUIDELINES_CHECKER],
  Products[ProductIdentifier.BOOK_DATA_TRANSLATOR],
  Products[ProductIdentifier.GRAMMAR_CHECKER],
  Products[ProductIdentifier.TITANS_QUICK_VIEW],
  Products[ProductIdentifier.KDP_COVER_TEMPLATE_GENERATOR],
  Products[ProductIdentifier.KDP_BSR_Sales_CALCULATOR],
  Products[ProductIdentifier.ACOS_Royalty_Calculator],
  Products[ProductIdentifier.QR_GEN],
  Products[ProductIdentifier.WORD_CLOUD],
  Products[ProductIdentifier.KEYWORD_TRACKER],
  Products[ProductIdentifier.ASIN_TRACKER],
  Products[ProductIdentifier.KDP_BSR_Sales_CALCULATOR],
  Products[ProductIdentifier.BOOK_COVER_DESIGNER],
  Products[ProductIdentifier.A_PLUS_CONTENT],
  Products[ProductIdentifier.LOW_CONTENT_BOOK_GENERATOR],
  Products[ProductIdentifier.BOOK_WRITER],
  Products[ProductIdentifier.DIGITAL_TITANS_DESIGNER],
];
