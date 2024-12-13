import {
  AccessTypes,
  Availability,
  ESubscriptionType,
  productsType,
} from "@/constants";
import { IPackage } from "@/models/interfaces";

// Basic Plus Bundle,	Research Bundle 1.0,	Creative Bundle 1.0,	Mega Bundle 1.0
export const lifetimeBundlePackages: IPackage[] = [
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
    productId: "6682549f162266c1417d4a72",
    name: "Basic Plus Bundle",
    subtitle: "Lifetime",
    price: 297,
    type: ESubscriptionType.Lifetime,
    productType: productsType.BasicPlusBundleLifetime,
    lifeTimePrice: 227,
    isMostPopular: false,
    isYearly: false,
    isActive: true,
    isSale: false,
    salePrice: 0,
  },
  {
    productId: "668255c5162266c1417d4a73",
    name: "Research Bundle",
    subtitle: "Lifetime",
    price: 297,
    type: ESubscriptionType.Lifetime,
    productType: productsType.ResearchBundleLifetime,
    isMostPopular: false,
    lifeTimePrice: 699,
    isYearly: false,
    isActive: true,
    isSale: false,
    salePrice: 0,
  },
  {
    productId: "66825715162266c1417d4a74",
    name: "Creative Bundle",
    subtitle: "Lifetime",
    price: 297,
    type: ESubscriptionType.Lifetime,
    productType: productsType.CreativeBundleLifetime,
    isMostPopular: false,
    lifeTimePrice: 399,
    isYearly: false,
    isActive: true,
    isSale: false,
    salePrice: 0,
  },
  {
    productId: "66824bb5ef1f1684cc805b11",
    name: "Mega Bundle",
    subtitle: "Lifetime",
    price: 297,
    type: ESubscriptionType.Lifetime,
    productType: productsType.TitansMegaLifetime,
    isMostPopular: false,
    lifeTimePrice: 1237,
    isYearly: false,
    isActive: true,
    isSale: false,
    salePrice: 0,
  },
];

export const featuresMobileLifetime = [
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.NotAvailable,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
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
            status: AccessTypes.Available,
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.NotAvailable,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.NotAvailable,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
          },
        ],
      },
    ],
  },
  {
    title: "Puzzle & Activity Book Tools",
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.Available,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
          },
        ],
      },
    ],
  },
  {
    title: "Puzzle & Activity Book Tools V2",
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.Available,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.Available,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.NotAvailable,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.NotAvailable,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.NotAvailable,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.NotAvailable,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.NotAvailable,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
          },
        ],
      },
    ],
  },

  // KDP Simplified Book
  {
    title: "KDP Simplified Book",
    includes: [
      {
        title: "KDP Simplified Pdf And Audio Book ",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.NotAvailable,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
          },
        ],
      },
    ],
  },

  //   {
  //     title: "Digital Titans Designer",
  //     includes: [
  //       {
  //         title: "Design Unique Themed Designs and Fonts",
  //         isAvailable: [
  //           {
  //             status: AccessTypes.NotAvailable,
  //             name: productsType.Free,
  //           },
  //           {
  //             status: AccessTypes.NotAvailable,
  //             name: productsType.BasicPlusBundleLifetime,
  //           },
  //           {
  //             status: AccessTypes.NotAvailable,
  //             name: productsType.ResearchBundleLifetime,
  //           },

  //           {
  //             status: AccessTypes.Available,
  //             name: productsType.CreativeBundleLifetime,
  //           },
  //           {
  //             status: AccessTypes.Available,
  //             name: productsType.TitansMegaLifetime,
  //           },
  //         ],
  //       },
  //     ],
  //   },

  //   {
  //     title: "Etsy Keyword Research Tool",
  //     includes: [
  //       {
  //         title: "Etsy Extension",
  //         subtitle:
  //           "Huge Search Suggestion Expander, Search Volume Ext., Search Results, Opportunity & Demand Analysis",
  //         isAvailable: [
  //           {
  //             status: AccessTypes.Limited,
  //             name: productsType.Free,
  //           },
  //           {
  //             status: AccessTypes.NotAvailable,
  //             name: productsType.BasicPlusBundleLifetime,
  //           },
  //           {
  //             status: AccessTypes.Available,
  //             name: productsType.ResearchBundleLifetime,
  //           },

  //           {
  //             status: AccessTypes.NotAvailable,
  //             name: productsType.CreativeBundleLifetime,
  //           },
  //           {
  //             status: AccessTypes.Available,
  //             name: productsType.TitansMegaLifetime,
  //           },
  //         ],
  //       },
  //     ],
  //   },

  //   {
  //     title: "Titans Quick View",
  //     includes: [
  //       {
  //         title: "Search Results Metrics",
  //         isAvailable: [
  //           {
  //             status: AccessTypes.Limited,
  //             name: productsType.Free,
  //           },
  //           {
  //             status: AccessTypes.NotAvailable,
  //             name: productsType.BasicPlusBundleLifetime,
  //           },
  //           {
  //             status: AccessTypes.Available,
  //             name: productsType.ResearchBundleLifetime,
  //           },

  //           {
  //             status: AccessTypes.NotAvailable,
  //             name: productsType.CreativeBundleLifetime,
  //           },
  //           {
  //             status: AccessTypes.Available,
  //             name: productsType.TitansMegaLifetime,
  //           },
  //         ],
  //       },
  //       {
  //         title: "Best Seller Rank Data",
  //         isAvailable: [
  //           {
  //             status: AccessTypes.Limited,
  //             name: productsType.Free,
  //           },
  //           {
  //             status: AccessTypes.NotAvailable,
  //             name: productsType.BasicPlusBundleLifetime,
  //           },
  //           {
  //             status: AccessTypes.Available,
  //             name: productsType.ResearchBundleLifetime,
  //           },

  //           {
  //             status: AccessTypes.NotAvailable,
  //             name: productsType.CreativeBundleLifetime,
  //           },
  //           {
  //             status: AccessTypes.Available,
  //             name: productsType.TitansMegaLifetime,
  //           },
  //         ],
  //       },
  //     ],
  //   },
  //   {
  //     title: "Community",
  //     includes: [
  //       {
  //         title: "Free Facebook Group Community",
  //         isAvailable: [
  //           {
  //             status: AccessTypes.Limited,
  //             name: productsType.Free,
  //           },
  //           {
  //             status: AccessTypes.Available,
  //             name: productsType.BasicPlusBundleLifetime,
  //           },
  //           {
  //             status: AccessTypes.Available,
  //             name: productsType.ResearchBundleLifetime,
  //           },

  //           {
  //             status: AccessTypes.Available,
  //             name: productsType.CreativeBundleLifetime,
  //           },
  //           {
  //             status: AccessTypes.Available,
  //             name: productsType.TitansMegaLifetime,
  //           },
  //         ],
  //       },
  //     ],
  //   },
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.Available,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.Available,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.Available,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.Available,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.Available,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
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
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.Available,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
          },
        ],
      },
    ],
  },
  {
    title: "KDP Masterclass",
    includes: [
      {
        title: "100 Resources",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.NotAvailable,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
          },
        ],
      },
      {
        title: "Masterclass Mastermind Group",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.NotAvailable,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
          },
        ],
      },
      {
        title: "60 Amazon KDP Videos",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.NotAvailable,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
          },
        ],
      },
      {
        title: "20 Amazon Ads Videos",
        isAvailable: [
          {
            status: AccessTypes.NotAvailable,
            name: productsType.Free,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.BasicPlusBundleLifetime,
          },
          {
            status: AccessTypes.NotAvailable,
            name: productsType.ResearchBundleLifetime,
          },

          {
            status: AccessTypes.NotAvailable,
            name: productsType.CreativeBundleLifetime,
          },
          {
            status: AccessTypes.Available,
            name: productsType.TitansMegaLifetime,
          },
        ],
      },
    ],
  },
];
