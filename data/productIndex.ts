import { ImageIndex } from "@/lib/imageindex";
import { ToolLinkIndex } from "@/lib/linkIndex";
import { ProductIdentifier } from "./ProductEnum";

export type Product = {
  name: string;
  icon?: string;
  id?: string;
  product_link: string;
  thumbnail_image: string;
};

export type ProductMap = {
  [key in ProductIdentifier]?: Product;
};

export const Products: ProductMap = {
  [ProductIdentifier.LOW_CONTENT_BOOK_GENERATOR]: {
    name: "Low content book maker",
    thumbnail_image: ImageIndex.LOW_CONTENT_BOOK_GENERATOR,
    product_link: ToolLinkIndex.LOW_CONTENT_BOOK_GENERATOR,
  },
  [ProductIdentifier.SEVEN_BACKEND_KEYWORDS]: {
    name: "7 Backend Keywords",
    thumbnail_image: ImageIndex["7 Backend Keywords"],
    product_link: ToolLinkIndex["7 Backend Keywords"],
  },
  [ProductIdentifier.KDP_BSR_Sales_CALCULATOR]: {
    name: "KDP BSR Sales Calculator",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/free_tools/kdp_bsr_calculator.png",
    product_link: ToolLinkIndex["KDP BSR Sales Calculator"],
  },
  [ProductIdentifier.ACOS_Royalty_Calculator]: {
    name: "ACOS Royalty Calculator",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/free_tools/acos_royality_calculator.png",
    product_link: ToolLinkIndex[ProductIdentifier.ACOS_Royalty_Calculator],
  },
  [ProductIdentifier.PEN_NAME_GENERATOR]: {
    name: "Pen Name Generator",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/free_tools/pen_name_generator.png",
    product_link: ToolLinkIndex[ProductIdentifier.PEN_NAME_GENERATOR],
  },
  [ProductIdentifier.QR_GEN]: {
    name: "QR Code Generator",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/free_tools/qr_code_gen.png",
    product_link: ToolLinkIndex[ProductIdentifier.QR_GEN],
  },
  [ProductIdentifier.BOOK_WRITER]: {
    name: "Book Writer",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/BookDetails/book_writer.png",
    product_link: ToolLinkIndex[ProductIdentifier.BOOK_WRITER],
  },
  [ProductIdentifier.PUZZLE_MAKER]: {
    name: "Puzzle Maker Software",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/BookDetails/puzzle_maker_software.png",
    product_link: ToolLinkIndex[ProductIdentifier.PUZZLE_MAKER],
  },
  [ProductIdentifier.COLORING_BOOKS]: {
    name: "Coloring Books",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/BookDetails/coloringBooks.png",
    product_link: ToolLinkIndex[ProductIdentifier.COLORING_BOOKS],
  },
  [ProductIdentifier.TITAN_PRO_WEB_APP]: {
    name: "Titans Pro Web App",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/titans_pro_web_app.png",
    product_link: ToolLinkIndex[ProductIdentifier.TITAN_PRO_WEB_APP],
  },
  [ProductIdentifier.TITANS_QUICK_VIEW]: {
    name: "Titans Quick View",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/titans_quick_view.png",
    product_link: ToolLinkIndex[ProductIdentifier.TITANS_QUICK_VIEW],
  },
  [ProductIdentifier.DEEP_VIEW]: {
    name: "Deep View",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/deep_view.png",
    product_link: ToolLinkIndex[ProductIdentifier.DEEP_VIEW],
  },
  [ProductIdentifier.RETRO_VIEW]: {
    name: "Tians Retro View",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/retro_view.png",
    product_link: ToolLinkIndex[ProductIdentifier.RETRO_VIEW],
  },
  [ProductIdentifier.TITLE_CREATOR]: {
    name: "Title Creator",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/title_creator.png",
    product_link: ToolLinkIndex[ProductIdentifier.TITLE_CREATOR],
  },
  [ProductIdentifier.DESCRIPTION_CREATOR]: {
    name: "Description Creator",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/description_creator.png",
    product_link: ToolLinkIndex[ProductIdentifier.DESCRIPTION_CREATOR],
  },
  [ProductIdentifier.TRADEMARK_CHECKER]: {
    name: "Trademark Checker",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/trademark_checker.png",
    product_link: ToolLinkIndex[ProductIdentifier.TRADEMARK_CHECKER],
  },
  [ProductIdentifier.GUIDELINES_CHECKER]: {
    name: "Guidelines Checker",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/guidelines.png",
    product_link: ToolLinkIndex[ProductIdentifier.GUIDELINES_CHECKER],
  },
  [ProductIdentifier.PRICE_CHECKER]: {
    name: "Price Checker",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/book_price.png",
    product_link: ToolLinkIndex[ProductIdentifier.PRICE_CHECKER],
  },
  [ProductIdentifier.GRAMMAR_CHECKER]: {
    name: "Grammar Checker",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/grammar_check.png",
    product_link: ToolLinkIndex[ProductIdentifier.GRAMMAR_CHECKER],
  },
  [ProductIdentifier.BOOK_DATA_TRANSLATOR]: {
    name: "Book Data Translator",
    thumbnail_image:
      "https://sptmedia.nyc3.cdn.digitaloceanspaces.com/ShopImages/translator.png",
    product_link: ToolLinkIndex[ProductIdentifier.BOOK_DATA_TRANSLATOR],
  },
};
