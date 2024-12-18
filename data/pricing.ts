import {
  AccessTypes,
  Availability,
  ESubscriptionType,
  productsType,
} from "@/data";

export interface IPackage {
  name: string;
  productId?: string;
  subtitle: string;
  price: number;
  lifeTimePrice: number;
  type: ESubscriptionType;
  productType: productsType;
  isMostPopular: boolean;
  isYearly: boolean;
  isActive: boolean;
  isSale: boolean;
  salePrice: number;
}

export type ProductDetails = {
  isSale: boolean;
  video_url: string;
  features: {
    _id: string;
  }[];
  isMultiShop: boolean;
  featureShops: any[]; // Replace `any` with the specific type if known
  isOnShop: boolean;
  index: number;
  mode: "both" | "monthly" | "yearly"; // Extend with other possible values if necessary
  trial_period_days: number;
  monthly_price: number;
  yearly_price: number;
  buy_page: string;
  subscription_shops: any[]; // Replace `any` with the specific type if known
  cross_sale_price: number;
  feature_type: string;
  related: any[]; // Replace `any` with the specific type if known
  _id: string;
  Description: string;
  Title: string;
  sale_price: number;
  price: number;
  published_at: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  created_by: string;
  displayImage: {
    _id: string;
    url: string;
  };
  updated_by: string;
  price_id: string;
  monthly_price_id: string;
  yearly_price_id: string;
  s_product_id: string;
  links: {
    text: string;
    url: string;
  }[];
  subscription_package_name: string;
  monthly_sale_price: number;
  is_monthly_sale: boolean;
  isLifetimeOwned: boolean;
  id: string;
  buttonType: "SUBSCRIBED" | "UNSUBSCRIBED"; // Add other possible values if necessary
};

export type SingleFeature = {
  title: string;
  subtitle?: string;
  isAvailable: {
    status: AccessTypes;
    name: productsType;
  }[];
};

export type TShopFeature = {
  title: string;
  includes: SingleFeature[];
};

export const featuresMobile: TShopFeature[] = [
  {
    title: "7 New Author Tools",
    includes: [
      {
        title:
          "KDP Title Creator, KDP Book Description Generator, Book Price Suggestion Tool, Grammar and Spell Checker, KDP Trademark Checker, KDP Guidelines Checker, KDP Book Data Translator",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
    ],
  },
  {
    title: "Titans Pro Amazon",
    includes: [
      {
        title: "Chrome Extension & Web App",
        subtitle:
          "Huge Search Suggestion Expander, Search Volume Ext., Search Results, Opportunity & Demand Analysis",
        isAvailable: [
          {
            status: AccessTypes.Limited,
            name: productsType.Free,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
    ],
  },
  {
    title: "Titans Quick View",
    includes: [
      {
        title: "Search Results Metrics",
        subtitle:
          "Chrome Extension for niche analysis, BSR data, top keywords, search volume & more",
        isAvailable: [
          {
            status: AccessTypes.Limited,
            name: productsType.Free,
          },
          {
            status: AccessTypes.Limited,
            name: productsType.TitansPro,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
    ],
  },
  {
    title: "Titans Deep View",
    includes: [
      {
        title:
          "Analyze top 100 products for any niche. Take your research to a whole new level with deep insights and understanding. See all key metrics for all top 100 products, including search volume est. and monthly sales estimates.",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
    ],
  },
  {
    title: "7 Backend Keywords Tool",
    includes: [
      {
        title: "Backend Keywords",
        subtitle:
          "Find the best backend keywords for your Amazon KDP listings.",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
    ],
  },

  {
    title: "Puzzle Book Tools",
    includes: [
      {
        title: `Sudoku, 
        Word Search,
        Crossword,
        Letter Maze,
        Shape Maze,
        Nonogram,
        Word Snake,
        Number Search,
        Word Scramble,
        Pontoon Grid,
        Kakuro,
        Cryptogram,
        Link Janitor,
        Hidato,
        Wordoku,
        Drawgrid,
        Letter Tracing,
        Bingo Card,
        Equation Solver,
        Cryptomaths,
        Cross Sums`,

        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
    ],
  },
  {
    title: "Activity Book Tools",
    includes: [
      {
        title: `Adding Fraction, Addition Pyramid, Jigsaw Sudoku, Compare Fraction, Sum Search, Ultimate Addition Grid, Math Crossword, Graphical Adding Fractions, Thermometer, Ruler, Angle Measurement, Samurai Sudoku, Dodeku`,

        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
    ],
  },

  {
    title: "Coloring Book Maker Tool",
    includes: [
      {
        title:
          "Create an unlimited amount of coloring books with this tool. It comes with over 9,200 hand drawn illustrations.",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
    ],
  },

  {
    title: "Titans Retro View",
    includes: [
      {
        title: "Reverse Competitor ASIN Research",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
      {
        title: "Rank Checker",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
      {
        title: "Search Volume Est. Analysis Scores",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
    ],
  },

  {
    title: "Titans Product Tracker",
    includes: [
      {
        title: "Track 100 products and or Competitors",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Max100Entries,
            name: productsType.TitansMega,
          },
        ],
      },
    ],
  },

  {
    title: "Titans Keyword Tracker",
    includes: [
      {
        title: "Track 200 keywords for any products",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Max200Entries,
            name: productsType.TitansMega,
          },
        ],
      },
    ],
  },

  // {
  //   title: "Digital Titans Designer",
  //   includes: [
  //     {
  //       title: "Design Unique Themed Designs and Fonts",
  //       isAvailable: [
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.Free,
  //         },
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.TitansPro,
  //         },
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.TitansProMax,
  //         },

  //         {
  //           status: AccessTypes.Available,
  //           name: productsType.TitansMega,
  //         },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   title: "Etsy Keyword Research Tool",
  //   includes: [
  //     {
  //       title: "Etsy Extension",
  //       subtitle:
  //         "Huge Search Suggestion Expander, Search Volume Ext., Search Results, Opportunity & Demand Analysis",
  //       isAvailable: [
  //         {
  //           status: AccessTypes.Limited,
  //           name: productsType.Free,
  //         },
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.TitansPro,
  //         },
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.TitansProMax,
  //         },

  //         {
  //           status: AccessTypes.Available,
  //           name: productsType.TitansMega,
  //         },
  //       ],
  //     },
  //   ],
  // },

  // {
  //   title: "Community",
  //   includes: [
  //     {
  //       title: "Free Facebook Group Community",
  //       isAvailable: [
  //         {
  //           status: AccessTypes.Available,
  //           name: productsType.Free,
  //         },
  //         {
  //           status: AccessTypes.Available,
  //           name: productsType.TitansPro,
  //         },

  //         {
  //           status: AccessTypes.Available,
  //           name: productsType.TitansProMax,
  //         },

  //         {
  //           status: AccessTypes.Available,
  //           name: productsType.TitansMega,
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    title: "Tools On Website",
    includes: [
      {
        title: "QR Code Creator",
        isAvailable: [
          {
            status: AccessTypes.Available,
            name: productsType.Free,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
      {
        title: "KDP Book Sales Estimates",
        isAvailable: [
          {
            status: AccessTypes.Available,
            name: productsType.Free,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
      {
        title: "KDP Royalty Calculator",
        isAvailable: [
          {
            status: AccessTypes.Available,
            name: productsType.Free,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
      {
        title: "Pen Name Generator",
        isAvailable: [
          {
            status: AccessTypes.Available,
            name: productsType.Free,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
    ],
  },
  {
    title: "No & Low Content Book Tools",
    includes: [
      {
        title: "No Content Book Maker",
        isAvailable: [
          {
            status: AccessTypes.Available,
            name: productsType.Free,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
      {
        title: "Low Content Book Maker",
        isAvailable: [
          {
            status: AccessTypes.Available,
            name: productsType.Free,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansPro,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansProMax,
          },

          {
            status: AccessTypes.Available,
            name: productsType.TitansMega,
          },
        ],
      },
    ],
  },
  // {
  //   title: "KDP Masterclass",
  //   includes: [
  //     {
  //       title: "100 Resources",
  //       isAvailable: [
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.Free,
  //         },
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.TitansPro,
  //         },
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.TitansProMax,
  //         },

  //         {
  //           status: AccessTypes.Available,
  //           name: productsType.TitansMega,
  //         },
  //       ],
  //     },
  //     {
  //       title: "Masterclass Mastermind Group",
  //       isAvailable: [
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.Free,
  //         },
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.TitansPro,
  //         },
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.TitansProMax,
  //         },

  //         {
  //           status: AccessTypes.Available,
  //           name: productsType.TitansMega,
  //         },
  //       ],
  //     },
  //     {
  //       title: "60 Amazon KDP Videos",
  //       isAvailable: [
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.Free,
  //         },
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.TitansPro,
  //         },
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.TitansProMax,
  //         },
  //         // {
  //         //   status: AccessTypes.NotAvailable,
  //         //   name: productsType.TitansUltra,
  //         // },
  //         // {
  //         //   status: AccessTypes.Available,
  //         //   name: productsType.TitansSupreme,
  //         // },
  //         {
  //           status: AccessTypes.Available,
  //           name: productsType.TitansMega,
  //         },
  //       ],
  //     },
  //     {
  //       title: "20 Amazon Ads Videos",
  //       isAvailable: [
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.Free,
  //         },
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.TitansPro,
  //         },
  //         {
  //           status: AccessTypes.NotAvailable,
  //           name: productsType.TitansProMax,
  //         },
  //         // {
  //         //   status: AccessTypes.NotAvailable,
  //         //   name: productsType.TitansUltra,
  //         // },
  //         // {
  //         //   status: AccessTypes.Available,
  //         //   name: productsType.TitansSupreme,
  //         // },
  //         {
  //           status: AccessTypes.Available,
  //           name: productsType.TitansMega,
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export const faq = [
  {
    question: "Refund Policy",
    answer: `We offer a 7-day money-back gurantee. This applies to an account's first charge/payment only.
    In order to submit a refund request you will need to send us an email to customer support. Once we receive your email request for a refund, your request will be reviewed for eligibility and issue a refund as needed.
`,
  },
  {
    question: "Is the Chrome Extension included with the plan?",
    answer: `Access is limited with a free account, but with a paid account you will have all features with unlimited use. `,
  },

  {
    question: "If I choose monthly subscription, can I cancel anytime?",
    answer: `Yes, you can cancel anytime. You will see the option to do so under your account tab.`,
  },
];

export const packages: IPackage[] = [
  {
    name: "Free",
    subtitle: "Free",
    price: 0,
    lifeTimePrice: 0,
    type: ESubscriptionType.Free,
    productType: productsType.Free,
    isMostPopular: false,
    isYearly: false,
    isActive: true,
    isSale: false,
    salePrice: 0,
  },
  {
    name: "Titans Pro",
    subtitle: "Monthly",
    productId: "64562b9ae2210da37f2bdb2c",
    price: 29,
    lifeTimePrice: 297,
    type: ESubscriptionType.Monthly,
    productType: productsType.TitansPro,
    isMostPopular: true,
    isYearly: false,
    isActive: true,
    isSale: false,
    salePrice: 0,
  },
  {
    name: "Titans Pro Max",
    subtitle: "Monthly",
    productId: "6516aecf8a69c334783b3c27",
    price: 49,
    lifeTimePrice: 400,
    type: ESubscriptionType.Monthly,
    productType: productsType.TitansProMax,
    isMostPopular: false,
    isYearly: false,
    isActive: true,
    isSale: false,
    salePrice: 0,
  },

  {
    name: "Titans Supreme",
    subtitle: "Monthly",
    productId: "6687afdff6f516e9488a1ea6", // new subscription
    price: 44,
    lifeTimePrice: 400,
    type: ESubscriptionType.Monthly,
    productType: productsType.TitansSupreme,
    isMostPopular: false,
    isYearly: false,
    isActive: true,
    isSale: false,
    salePrice: 0,
  },
];
