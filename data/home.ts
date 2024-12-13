export type SelectedTab = "ft" | "et" | "ct" | "rt";

export type Product = {
  title: string;
  features: string[];
  ctaLink: string;
  image: string;
};

export type Item = {
  category: string;
  products: Product[];
  type: SelectedTab;
};

export const Items: Item[] = [
  {
    category: "Free Publishing Tools ",
    type: "ft",
    products: [
      {
        title: "Low content book maker",
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
        ctaLink:
          "https://books.selfpublishingtitans.com/FREE-No-Content-Book-Creator-Software",
        image: "",
      },
      {
        title: "Pen Name Generator",
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
        ctaLink: "/tools/Pen-Name-Generator",
        image: "",
      },
      {
        title: "Acos Royality Calculator",
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
        ctaLink: "/tools/KDP-Royalty-Calculator",
        image: "",
      },
      {
        title: "KDP BSR Calculator",
        features: [
          "Provides informative and useful metrics",
          "Free and Unlimited Use",
        ],
        ctaLink: "/tools/KDP-BSR-Sales-Calculator",
        image: "",
      },
      {
        title: "QR Code Generator",
        features: [
          "Free and unlimited use",
          "One click download",
          "Fast and easy to use",
        ],
        ctaLink: "/tools/QR-Code-Generator-for-KDP-Books",
        image: "",
      },
    ],
  },
  {
    category: "Book Creation Tools",
    type: "et",
    products: [
      {
        title: "Book Writer",
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
        ctaLink: "/",
        image: "",
      },
      {
        title: "Puzzle & Activity Tools",
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
        ctaLink: "/",
        image: "",
      },
      {
        title: "Coloring Books",
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
        ctaLink: "/",
        image: "",
      },
      {
        title: "Digital Titans Designer",
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
        ctaLink: "/",
        image: "",
      },
      {
        title: "Low content book maker",
        features: [
          "Create low content books",
          "Upload your own designs",
          "Download as PDF",
          "Free to use",
        ],
        ctaLink: "/",
        image: "",
      },
    ],
  },
  {
    category: "Creative Tools",
    type: "ct",
    products: [
      {
        title: "Puzzle Book Tools",
        features: [
          "Over 20 puzzle & activity tools",
          "Easy interface, unlimited use",
          "Biggest variety available anywhere",
          "Download puzzles as png files",
          "Option to create pdf pages ",
        ],
        ctaLink: "https://books.selfpublishingtitans.com/",
        image: "",
      },
      {
        title: "Activity Tool Bundle 2.0",
        features: [
          "Over 13 puzzle & activity tools",
          "Easy interface, unlimited use",
          "Biggest variety available anywhere",
          "Download puzzles as png files",
          "Option to create pdf pages ",
          "No hidden upsells",
        ],
        ctaLink: "https://books.selfpublishingtitans.com/",
        image: "",
      },
      {
        title: "Coloring Book Maker",
        features: [
          "Over 9,200 coloring elements",
          "Hundreds of categories",
          "Search by keyword",
          "All hand drawn, no AI",
          "Unlimited use",
        ],
        ctaLink: "https://editor.selfpublishingtitans.com/",
        image: "",
      },
    ],
  },
  {
    category: "Research Tools",
    type: "rt",
    products: [
      {
        title: "Titans Pro Webapp",
        features: [
          "See all key niche metrics",
          "Niche Score Analysis",
          "BSR on search pages",
          "One click download all data",
        ],
        ctaLink: "/titans-pro/web-app",
        image: "",
      },
      {
        title: "Titans Quick View",
        features: [
          " See all key niche metrics",

          "  Niche score analysis",

          "BSR on search pages",

          " One click download all data",
        ],
        ctaLink:
          "https://chromewebstore.google.com/detail/titans-quick-view-amazon/eefljgmhgaidffapnppcmmafobefjece",
        image: "",
      },
      {
        title: "7 Backend Keywords Tool",
        features: [
          "Increase your book's discoverability and rank higher on Amazon",
          "Improve your Amazon rankings and reach more potential readers",
          "Save time and effort with our intuitive and powerful tool.",
        ],
        ctaLink: "/shop/7-backend-keywords-tool-amazon-kdp",
        image: "",
      },
      {
        title: "Deep View",
        features: [
          "Analyze the top 100 competitors at once",
          "One click download of all data",
          "Search results (competitors)",
          "All key metrics",
        ],
        ctaLink: "/titans-deep-view",
        image: "",
      },
      {
        title: "Retro View",
        features: [
          "Reverse engineer any product",
          "Find top competitors keywords",
          "See rankings of competitors",
          "Full analysis of each keyword",
          "More affordable than all alternatives",
        ],
        ctaLink: "/titans-retro-vision",
        image: "",
      },
    ],
  },
];
