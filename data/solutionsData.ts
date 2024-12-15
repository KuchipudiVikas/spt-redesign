import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  BlocksIcon,
  BookAIcon,
  BookHeartIcon,
  BookIcon,
  BookImageIcon,
  BookTextIcon,
  BrushIcon,
  ChartLineIcon,
  CheckIcon,
  ClipboardTypeIcon,
  CloudIcon,
  CopyrightIcon,
  DollarSignIcon,
  FileStackIcon,
  GraduationCap,
  GroupIcon,
  ImageIcon,
  LanguagesIcon,
  LayoutListIcon,
  ListCheckIcon,
  ListEndIcon,
  NotebookPen,
  PenIcon,
  Percent,
  PuzzleIcon,
  QrCode,
  SearchIcon,
  TablePropertiesIcon,
  TextIcon,
  TextSearchIcon,
  TrendingUpDownIcon,
  TriangleAlert,
  VideoIcon,
} from "lucide-react";

export type Item = {
  heading: string;
  tag: string;
  link: string;
  newTab?: boolean;
  flair?: string;
  icon: React.ElementType;
};

export type TCategory = {
  Heading?: string;
  Items: Item[];
};

export type TSolutionsData = {
  Title: String;
  Categories: TCategory[];
  icon: React.ElementType;
};

const SolutionsData: TSolutionsData[] = [
  {
    Title: "Research Tools",
    icon: SearchIcon,
    Categories: [
      {
        Items: [
          {
            heading: "Titans Pro Web App",
            tag: "Search suggestions, search volume & more",
            newTab: true,
            link: "/titans-pro/on-site",
            icon: SearchIcon,
          },
          {
            heading: "Titans Pro Chrome Extension",
            tag: "Chrome Extension for search suggestions, search volume & more",
            newTab: true,
            link: "https://chromewebstore.google.com/detail/titans-pro-amazon-kdp-key/mmdamlknnafgffhlobhlmiljonijdnid",
            icon: BlocksIcon,
          },
          {
            heading: "Titans Quick View",
            tag: "Chrome Extension for niche analysis, BSR data, top keywords, search volume & more.",
            newTab: true,
            link: "https://chromewebstore.google.com/detail/titans-quick-view-amazon/eefljgmhgaidffapnppcmmafobefjece",
            icon: TextIcon,
          },
          {
            flair: "New",
            heading: "7 Backend Keywords Tool",
            tag: "Booklisting SEO tool",
            newTab: false,
            link: "/7-backend-keywords-tool-amazon-kdp",
            icon: ListEndIcon,
          },
          {
            heading: "Titans Deep View",
            tag: "Analyze 100 products at once",
            link: "/titans-deep-view",
            icon: LayoutListIcon,
          },
          {
            heading: "Titans Retro View",
            tag: "Find competetiors top keywords",
            link: "/titans-retro-vision",
            icon: TablePropertiesIcon,
          },
        ],
      },
    ],
  },
  {
    Title: "Book Creation Tools",
    icon: BookIcon,
    Categories: [
      {
        Items: [
          {
            heading: "Book Writer",
            tag: "Start writing a children’s book, novel, joke book or anything else you want.",
            link: "https://author.selfpublishingtitans.com",
            icon: PenIcon,
          },
          {
            heading: "Puzzle & Activity Tools",
            tag: "Create 30+ different puzzles and activities. sudoku, wordsearch, mazes etc.  ",
            link: "https://books.selfpublishingtitans.com/tools",
            icon: PuzzleIcon,
          },
          {
            heading: "Coloring Books",
            tag: "Create coloring books with over 9,250 hand drawn illustrations.",
            link: "https://selfpublishingtitans.com/coloring-book-maker",
            icon: BrushIcon,
          },
          {
            heading: "Digital Titans Designer",
            tag: "Create awesome letters and text designs",
            link: "https://design.selfpublishingtitans.com/",
            icon: BookAIcon,
          },
          {
            heading: "Low Content Books",
            tag: "Create notebooks, journals, and more.",
            link: "https://books.selfpublishingtitans.com/FREE-No-Content-Book-Creator-Software",
            icon: FileStackIcon,
          },
        ],
      },
    ],
  },
  {
    Title: "Book Listing Tools",
    icon: ListCheckIcon,
    Categories: [
      {
        Items: [
          {
            heading: "KDP Title Creator",
            tag: "Generate the perfect title for your book effortlessly.",
            link: "/kdp-title-creator",
            icon: ClipboardTypeIcon,
          },
          {
            heading: "KDP Description Generator",
            tag: "Create a compelling description for your book.",
            link: "/kdp-description-creator",
            icon: TextIcon,
          },
          {
            heading: "KDP Trademark Violation Checker",
            tag: "Check if your book title violates any trademarks.",
            link: "/kdp-trademark-checker",
            icon: CopyrightIcon,
          },
          {
            heading: "KDP Guidelines Checker",
            tag: "Check if your book meets KDP guidelines.",
            link: "/kdp-guidelines-checker",
            icon: TextIcon,
          },
          {
            heading: "KDP Book Data Translator",
            tag: "Translate your book data into any language with a click.",
            link: "/kdp-bookdata-translator",
            icon: LanguagesIcon,
          },
          {
            heading: "Book Price Suggestion Tool",
            tag: "Get the perfect price for your book.",
            link: "/kdp-price-checker",
            icon: DollarSignIcon,
          },
          {
            link: "/grammar-check",
            tag: "Check your book info for grammar and spelling mistakes.",
            heading: "Grammar Checker",
            icon: ListCheckIcon,
          },
        ],
      },
    ],
  },
  {
    Title: "Design Tools",
    icon: ImageIcon,
    Categories: [
      {
        Items: [
          {
            heading: "Cover Designer",
            tag: "Create covers for your books in all formats and sizes",
            link: "/book-cover-creator",
            icon: BookHeartIcon,
          },
          {
            heading: "A+ Content Maker",
            tag: " Create images for your book listing",
            link: "/A+-content-template-generator",
            flair: "New",
            icon: BookImageIcon,
          },
        ],
      },
    ],
  },

  {
    Title: "General KDP Tools",
    icon: BlocksIcon,
    Categories: [
      {
        Items: [
          {
            heading: "KDP BSR Sales Calculator",
            tag: "Estimate anyone's book sales",
            link: "/tools/KDP-BSR-Sales-Calculator",
            icon: ChartLineIcon,
          },
          {
            heading: "ACOS Royalty Calculator",
            tag: "Calculate ad campaign profitability.",
            link: "/tools/KDP-Royalty-Calculator",
            icon: Percent,
          },
          {
            heading: "Pen Name Generator",
            tag: "Generate pen names for your books",
            link: "/tools/Pen-Name-Generator",
            icon: NotebookPen,
          },
          {
            heading: "QR Code Generator",
            tag: "Create QR codes for your books",
            link: "/tools/QR-Code-Generator-for-KDP-Books",
            icon: QrCode,
          },
          {
            heading: "Word Cloud Generator",
            tag: "View most used words and keywords",
            link: "/word-cloud",
            icon: CloudIcon,
          },
          {
            heading: "Keyword Tracker",
            tag: "Track Keyword ranking for any product",
            link: "/titans-keyword-tracker",
            icon: TrendingUpDownIcon,
          },
          {
            heading: "ASIN Tracker",
            tag: "Monitor any products performance",
            link: "/titans-asin-tracker",
            icon: ChartLineIcon,
          },
          {
            heading: "KDP Category Finder",
            tag: "Find the best categories for your book and improve your SEO.",
            link: "/tools/KDP-Kindle-Category-Finder",
            icon: TextSearchIcon,
          },
          {
            heading: "KDP Cover Template Generator",
            tag: "Create KDP Cover Templates",
            link: "/kdp-cover-template-generator",
            icon: BookTextIcon,
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
    icon: GraduationCap,
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
            link: "/masterclass",
            icon: VideoIcon,
          },
        ],
      },
      {
        Items: [
          {
            heading: "Community Forum",
            tag: " Join our community of like-minded people and ask any and all your questions, share your wins, learn from others.",
            link: "https://community.selfpublishingtitans.com/",
            newTab: true,
            icon: GroupIcon,
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
            icon: BookIcon,
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
