export type Item = {
  heading: string;
  tag: string;
  link: string;
  newTab?: boolean;
  flair?: string;
};

export type TCategory = {
  Heading?: string;
  Items: Item[];
};

export type TSolutionsData = {
  Title: String;
  Categories: TCategory[];
};

const SolutionsData: TSolutionsData[] = [
  {
    Title: "Research Tools",
    Categories: [
      {
        Items: [
          {
            heading: "Titans Pro Web App",
            tag: "Search suggestions, search volume & more",
            newTab: true,
            link: "https://www.selfpublishingtitans.com/titans-pro/on-site",
          },
          {
            heading: "Titans Pro Chrome Extension",
            tag: "Chrome Extension for search suggestions, search volume & more",
            newTab: true,
            link: "https://chromewebstore.google.com/detail/titans-pro-amazon-kdp-key/mmdamlknnafgffhlobhlmiljonijdnid",
          },
          {
            heading: "Titans Quick View",
            tag: "Chrome Extension for niche analysis, BSR data, top keywords, search volume & more.",
            newTab: true,
            link: "https://chromewebstore.google.com/detail/titans-quick-view-amazon/eefljgmhgaidffapnppcmmafobefjece",
          },
          {
            flair: "New",
            heading: "7 Backend Keywords Tool",
            tag: "Booklisting SEO tool",
            newTab: false,
            link: "https://selfpublishingtitans.com/7-backend-keywords-tool-amazon-kdp",
          },
          {
            heading: "Titans Deep View",
            tag: "Analyze 100 products at once",
            link: "https://selfpublishingtitans.com/titans-deep-view",
          },
          {
            heading: "Titans Retro View",
            tag: "Find competetiors top keywords",
            link: "https://selfpublishingtitans.com/titans-retro-vision",
          },
        ],
      },
    ],
  },
  {
    Title: "Book Creation Tools",
    Categories: [
      {
        Items: [
          {
            heading: "Book Writer",
            tag: "Start writing a children’s book, novel, joke book or anything else you want.",
            link: "https://author.selfpublishingtitans.com",
          },
          {
            heading: "Puzzle & Activity Tools",
            tag: "Create 30+ different puzzles and activities. sudoku, wordsearch, mazes etc.  ",
            link: "https://selfpublishingtitans.com/tools",
          },
          {
            heading: "Coloring Books",
            tag: "Create coloring books with over 9,250 hand drawn illustrations.",
            link: "https://selfpublishingtitans.com/coloring-book-maker",
          },
          {
            heading: "Digital Titans Designer",
            tag: "Create awesome letters and text designs",
            link: "https://design.selfpublishingtitans.com/",
          },
          {
            heading: "Low Content Books",
            tag: "Create notebooks, journals, and more.",
            link: "https://books.selfpublishingtitans.com/FREE-No-Content-Book-Creator-Software",
          },
        ],
      },
    ],
  },
  {
    Title: "Book Listing Tools",
    Categories: [
      {
        Items: [
          {
            heading: "KDP Title Creator",
            tag: "Generate the perfect title for your book effortlessly.",
            link: "https://selfpublishingtitans.com/kdp-title-creator",
          },
          {
            heading: "KDP Description Generator",
            tag: "Create a compelling description for your book.",
            link: "https://selfpublishingtitans.com/kdp-description-creator",
          },
          {
            heading: "KDP Trademark Violation Checker",
            tag: "Check if your book title violates any trademarks.",
            link: "https://selfpublishingtitans.com/kdp-trademark-checker",
          },
          {
            heading: "KDP Guidelines Checker",
            tag: "Check if your book meets KDP guidelines.",
            link: "https://selfpublishingtitans.com/kdp-guidelines-checker",
          },
          {
            heading: "KDP Book Data Translator",
            tag: "Translate your book data into any language with a click.",
            link: "https://selfpublishingtitans.com/kdp-bookdata-translator",
          },
          {
            heading: "Book Price Suggestion Tool",
            tag: "Get the perfect price for your book.",
            link: "https://www.selfpublishingtitans.com/book-price",
          },
          {
            link: "https://www.selfpublishingtitans.com/grammar-check",
            tag: "Check your book info for grammar and spelling mistakes.",
            heading: "Grammar Checker",
          },
        ],
      },
    ],
  },
  {
    Title: "Design Tools",
    Categories: [
      {
        Items: [
          {
            heading: "Cover Designer",
            tag: "Create covers for your books in all formats and sizes",
            link: "https://selfpublishingtitans.com/book-cover-creator",
          },
          {
            heading: "A+ Content Maker",
            tag: " Create images for your book listing",
            link: "https://selfpublishingtitans.com/A+-content-template-generator",
            flair: "New",
          },
        ],
      },
    ],
  },

  {
    Title: "General KDP Tools",
    Categories: [
      {
        Items: [
          {
            heading: "KDP BSR Sales Calculator",
            tag: "Estimate anyone's book sales",
            link: "https://selfpublishingtitans.com/tools/KDP-BSR-Sales-Calculator",
          },
          {
            heading: "ACOS Royalty Calculator",
            tag: "Calculate ad campaign profitability.",
            link: "https://selfpublishingtitans.com/tools/KDP-Royalty-Calculator",
          },
          {
            heading: "Pen Name Generator",
            tag: "Generate pen names for your books",
            link: "https://selfpublishingtitans.com/tools/Pen-Name-Generator",
          },
          {
            heading: "QR Code Generator",
            tag: "Create QR codes for your books",
            link: "https://selfpublishingtitans.com/tools/QR-Code-Generator-for-KDP-Books",
          },
          {
            heading: "Word Cloud Generator",
            tag: "View most used words and keywords",
            link: "https://selfpublishingtitans.com/word-cloud",
          },
          {
            heading: "Keyword Tracker",
            tag: "Track Keyword ranking for any product",
            link: "https://selfpublishingtitans.com/titans-keyword-tracker",
          },
          {
            heading: "ASIN Tracker",
            tag: "Monitor any products performance",
            link: "https://selfpublishingtitans.com/titans-asin-tracker",
          },
          {
            heading: "KDP Category Finder",
            tag: "Find the best categories for your book and improve your SEO.",
            link: "https://selfpublishingtitans.com/tools/KDP-Kindle-Category-Finder",
          },
          {
            heading: "KDP Cover Template Generator",
            tag: "Create KDP Cover Templates",
            link: "https://selfpublishingtitans.com/kdp-cover-template-generator",
          },
        ],
      },
    ],
  },
  // {
  //   Title: "Tools",
  //   Categories: [
  //     {
  //       Heading: "Research",
  //       Items: [
  //         {
  //           heading: "Titans Pro",
  //           tag: "Chrome Extension for search suggestions, search volume & more",
  //           newTab: true,
  //           link: "https://chromewebstore.google.com/detail/titans-pro-amazon-kdp-key/mmdamlknnafgffhlobhlmiljonijdnid",
  //         },
  //         {
  //           heading: "Titans Quick View",
  //           tag: "Chrome Extension for niche analysis, BSR data, top keywords, search volume & more.",
  //           newTab: true,
  //           link: "https://chromewebstore.google.com/detail/titans-quick-view-amazon/eefljgmhgaidffapnppcmmafobefjece",
  //         },
  //         {
  //           flair: "New",
  //           heading: "7 Backend Keywords Tool",
  //           tag: "Booklisting SEO tool",
  //           newTab: false,
  //           link: "https://selfpublishingtitans.com/7-backend-keywords-tool-amazon-kdp",
  //         },
  //         {
  //           heading: "Titans Deep View",
  //           tag: "Analyze 100 products at once",
  //           link: "https://selfpublishingtitans.com/titans-deep-view",
  //         },
  //         {
  //           heading: "Titans Retro View",
  //           tag: "Find competetiors top keywords",
  //           link: "https://selfpublishingtitans.com/titans-retro-vision",
  //         },
  //       ],
  //     },
  //     {
  //       Heading: "Book Creation",
  //       Items: [
  //         {
  //           heading: "Puzzle & Activity Tools",
  //           tag: "Create 30+ different puzzles and activities. sudoku, wordsearch, mazes etc.  ",
  //           link: "https://selfpublishingtitans.com/tools",
  //         },
  //         {
  //           heading: "Coloring Books",
  //           tag: "Create coloring books with over 9,250 hand drawn illustrations.",
  //           link: "https://selfpublishingtitans.com/coloring-book-maker",
  //         },
  //         {
  //           heading: "Low Content Books",
  //           tag: "Create notebooks, journals, and more.",
  //           link: "https://books.selfpublishingtitans.com/FREE-No-Content-Book-Creator-Software",
  //         },
  //       ],
  //     },

  //     {
  //       Heading: "Design",
  //       Items: [
  //         {
  //           heading: "Cover Designer",
  //           tag: "Create covers for your books in all formats and sizes",
  //           link: "https://selfpublishingtitans.com/book-cover-creator",
  //         },
  //         {
  //           heading: "A+ Content Maker",
  //           tag: " Create images for your book listing",
  //           link: "https://selfpublishingtitans.com/A+-content-template-generator",
  //           flair: "New",
  //         },
  //       ],
  //     },
  //     {
  //       Heading: "General",
  //       Items: [
  //         {
  //           heading: "KDP BSR Sales Calculator",
  //           tag: "Estimate anyone's book sales",
  //           link: "https://selfpublishingtitans.com/tools/KDP-BSR-Sales-Calculator",
  //         },
  //         {
  //           heading: "ACOS Royalty Calculator",
  //           tag: "Calculate ad campaign profitability.",
  //           link: "https://selfpublishingtitans.com/tools/KDP-Royalty-Calculator",
  //         },
  //         {
  //           heading: "QR Code Generator",
  //           tag: "Create QR codes for your books",
  //           link: "https://selfpublishingtitans.com/tools/QR-Code-Generator-for-KDP-Books",
  //         },
  //         {
  //           heading: "Word Cloud Generator",
  //           tag: "View most used words and keywords",
  //           link: "https://selfpublishingtitans.com/word-cloud",
  //         },
  //         {
  //           heading: "Keyword Tracker",
  //           tag: "Track Keyword ranking for any product",
  //           link: "https://selfpublishingtitans.com/titans-keyword-tracker",
  //         },
  //         {
  //           heading: "ASIN Tracker",
  //           tag: "Monitor any products performance",
  //           link: "https://selfpublishingtitans.com/titans-asin-tracker",
  //         },
  //       ],
  //     },
  //   ],
  // },
  {
    Title: "Training",
    Categories: [
      // {
      //   item: "KDP Masterclass",
      //   tag: "A structured and systematic step by step course with 80 videos, lots of resources, & more",
      //   productLink: "https://selfpublishingtitans.com/masterclass",
      // },
      {
        Items: [
          {
            heading: "KDP Masterclass",
            tag: "A structured and systematic step by step course with 80 videos, lots of resources, & more",
            link: "https://selfpublishingtitans.com/masterclass",
          },
        ],
      },
      {
        Items: [
          {
            heading: "Support",
            tag: "Get help with any of our tools, request feature updates, report bugs. Tell us everything. We want to hear from you.",
            link: "https://selfpublishingtitans.com/support",
          },
        ],
      },

      {
        Items: [
          {
            heading: "Self-Publishing Simplified",
            tag: "Available as print, Kindle ebook & audiobook. It teaches you all the basics about Amazon KDP. Perfect for beginners.",
            link: "https://www.amazon.com/Self-Publishing-Simplified-Publish-Amazon-Beginners/dp/B0CMZ92XLG/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=1704220990&sr=8-1",
            newTab: true,
          },
        ],
      },
    ],
  },
  // {
  //   Title: "Services",
  //   Categories: [
  //     {
  //       Items: [
  //         {
  //           heading: "Book Listing Optimization Bundle",
  //           tag: "Get your book listing optimized by our experts. We will write your title, subtitle, bullet points, and description.",
  //           link: "/services",
  //         },
  //         {
  //           heading: "Amazon Ads Set-Up",
  //           tag: "Advise you on 4 Amazon Ad campaigns ",
  //           link: "/services",
  //         },
  //         {
  //           heading: "Description Optimization",
  //           tag: "Do you need help writing a better description for your book? Optimize current book description or Help write descriptions for new book",
  //           link: "/services",
  //         },
  //         {
  //           heading: "7 Backend Keywords",
  //           tag: "Maximize your book’s searchability with effective backend keywords tailored to your target audience. ",
  //           link: "/services",
  //         },
  //         {
  //           heading: "Book Categories",
  //           tag: "Are you unsure which categories to choose for your book? Analyize and optimize categories for existing book or help choose categories for your new book",
  //           link: "/services",
  //         },
  //         {
  //           heading: "Title & Subtitle Optimization",
  //           tag: "Get your book title and subtitle optimized by our experts. ",
  //           link: "/services",
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default SolutionsData;
