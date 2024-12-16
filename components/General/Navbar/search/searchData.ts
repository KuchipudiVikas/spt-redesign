import { domains } from "@/constants/index";

export type SectionItem = {
  item: string;
  tag: string;
  flair?: string;
  productLink?: string;
  openInNewTab?: boolean;
  keywords?: string[];
};

const ToolSearchData: SectionItem[] = [
  {
    item: "Titans Pro",
    tag: "Chrome Extension for finding hot niches & keywords with search suggestions, search volume & more",
    openInNewTab: true,
    productLink:
      "https://chromewebstore.google.com/detail/titans-pro-amazon-kdp-key/mmdamlknnafgffhlobhlmiljonijdnid",
  },
  {
    item: "Titans Quick View",
    tag: "Chrome Extension for niche analysis, BSR data, top keywords, search volume & more.",
    openInNewTab: true,
    productLink:
      "https://chromewebstore.google.com/detail/titans-quick-view-amazon/eefljgmhgaidffapnppcmmafobefjece",
  },
  {
    flair: "New",
    item: "7 Backend Keywords Tool",
    tag: "SEO tool to optimize your 7 backend keyword slots to rank higher with more keywords on Amazon.",
    openInNewTab: false,
    productLink:
      "https://selfpublishingtitans.com/7-backend-keywords-tool-amazon-kdp",
  },
  {
    item: "Titans Deep View",
    tag: "Analyze 100 search result products at once to help you do more in-depth research faster.",
    productLink: "https://selfpublishingtitans.com/titans-deep-view",
  },
  {
    item: "Titans Retro View",
    tag: "Reverse engineer competitors' books and find all their best performing keywords at once.",
    productLink: "https://selfpublishingtitans.com/titans-retro-vision",
  },

  {
    item: "Titans Pro Web App ",
    tag: "Do research anywhere, anytime with Titans Pro without the need for a Chrome Extension.",
    productLink: "https://selfpublishingtitans.com/titans-pro/on-site",
  },
  {
    item: "KDP Category Finder",
    tag: "Find the best categories for your book and improve your SEO.",
    productLink:
      "https://selfpublishingtitans.com/tools/KDP-Kindle-Category-Finder",
  },
  {
    item: "Low Content Book Maker",
    tag: "Create unlimited notebooks, journals, planners, and lots of other printables.",
    productLink:
      "https://books.selfpublishingtitans.com/FREE-No-Content-Book-Creator-Software",
  },
  {
    item: "KDP BSR Sales Calculator",
    tag: "Get monthly sales estimates for any book on Amazon.",
    productLink:
      "https://selfpublishingtitans.com/tools/KDP-BSR-Sales-Calculator",
  },
  {
    item: "ACOS Royalty Calculator",
    tag: "Calculate the profitability and break even for your ad campaigns.",
    productLink:
      "https://selfpublishingtitans.com/tools/KDP-Royalty-Calculator",
  },
  {
    item: "Pen Name Generator",
    tag: "Get pen name inspiration from 13 different countries.",
    productLink: "https://selfpublishingtitans.com/tools/Pen-Name-Generator",
  },
  {
    item: "QR Code Generator",
    tag: "Create QR codes to help drive traffic to your website, social media, etc.",
    productLink:
      "https://selfpublishingtitans.com/tools/QR-Code-Generator-for-KDP-Books",
  },
  {
    item: "Word Cloud Tool",
    tag: "One of our favorite tools. See in seconds the most used words & keywords for titles, suggestions, etc.",
    productLink: "https://selfpublishingtitans.com/word-cloud",
  },
  {
    item: "Book Cover Maker",
    tag: " Create beautiful book covers for Notebooks, Activity Books, Children’s Books, and more.",
    productLink: "https://selfpublishingtitans.com/book-cover-creator",
    flair: "New",
  },
  {
    item: "A+ Content Maker",
    tag: " Create beautiful A+ Content for your book listing.",
    productLink:
      "https://selfpublishingtitans.com/A+-content-template-generator",
    flair: "New",
  },
  {
    item: "KDP Cover template generator",
    tag: "Generate KDP cover templates for your book",
    productLink:
      "https://selfpublishingtitans.com/kdp-cover-template-generator",
    flair: "New",
  },
  {
    item: "Puzzle Book Tools",
    tag: "Create 21 different types of book book interiors including Sudoku, Word Search, Crosswords, & more.",
    productLink: "https://selfpublishingtitans.com/tools",
  },
  {
    item: "Activity Book Tools",
    tag: "Create 13 different types of book interiors including Samurai Sudoku, Math Fractions, Angle Measurement, & Other Math Games.",
    productLink: "https://selfpublishingtitans.com/tools/v2",
  },

  {
    item: "Coloring Book Maker",
    tag: "Create coloring books with over 9,250 hand drawn illustrations.",
    productLink: "https://selfpublishingtitans.com/coloring-book-maker",
  },
  {
    item: "Titans Keyword Tracker",
    tag: "Track the ranking for any keyword, for any product, on any marketplace",
    productLink: "https://selfpublishingtitans.com/titans-keyword-tracker",
  },
  {
    item: "Titans ASIN Tracker",
    tag: "Track the performance of any product or competitor on Amazon, on any marketplace",
    productLink: "https://selfpublishingtitans.com/titans-asin-tracker",
  },
  {
    item: "KDP Masterclass",
    tag: "A structured and systematic step by step course with 80 videos, lots of resources, & more",
    productLink: "https://selfpublishingtitans.com/masterclass",
  },
  {
    item: "Self-Publishing Simplified",
    tag: "Our book teaches you all the basics from A-Z about Amazon KDP. Perfect for beginners. Available on Amazon as paperback, Kindle edition and audiobook.",
    productLink:
      "https://www.amazon.com/Self-Publishing-Simplified-Publish-Amazon-Beginners/dp/B0CMZ92XLG/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=1704220990&sr=8-1",
    openInNewTab: true,
  },
  {
    item: "AudioBook and eBook",
    tag: "Self-Publishing Simplified is also available on our website as an eBook and audiobook for anyone that prefers to get it on our website.",
    productLink: "https://selfpublishingtitans.com/spt-book",
  },

  {
    item: "Youtube Channel",
    tag: "Tutorials on how to use our tools available on our website and general videos about Amazon KDP and self-publishing.",
    openInNewTab: true,
    productLink: "https://www.youtube.com/@SelfPublishingTitans",
  },
];

export default ToolSearchData;
