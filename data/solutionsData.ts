import { domains } from "@/constants/index";
import { getLinkForTheTool } from "@/lib/utils";
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
  Title: string;
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
            heading: "Keyword Research - Titans Pro",
            tag: "Search suggestions, analysis & search vol.",
            link: "/titans-pro/on-site",
            icon: SearchIcon,
          },
          {
            flair: "New",
            heading: "7 Backend Keywords",
            tag: "Boost SEO rankings and visibility.",
            newTab: false,
            link: "/7-backend-keywords-tool-amazon-kdp",
            icon: ListEndIcon,
          },
          {
            heading: "Reverse ASIN Lookup",
            tag: "Find top keywords from any top product.",
            link: "/titans-retro-vision",
            icon: TablePropertiesIcon,
          },
          {
            heading: "Titans Pro Chrome Extension",
            tag: "Search insights directly in Chrome.",
            newTab: true,
            link: "https://chromewebstore.google.com/detail/titans-pro-amazon-kdp-key/mmdamlknnafgffhlobhlmiljonijdnid",
            icon: BlocksIcon,
          },
          {
            heading: "Competitor Research - Deep View",
            tag: "Analyze 100 competitors for any niche.",
            link: "/titans-deep-view",
            icon: LayoutListIcon,
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
            heading: "30+ Puzzle & Activity Tools",
            tag: "Create puzzles like Sudoku, mazes, etc.",
            link: domains.books + "/Puzzle-Maker-Software",
            icon: PuzzleIcon,
            newTab: true,
          },
          {
            heading: "Low Content Books",
            tag: "Create notebooks, journals, and more.",
            link: domains.books + "/FREE-No-Content-Book-Creator-Software",
            icon: FileStackIcon,
          },
          {
            heading: "Coloring Books",
            tag: "Create pages with hand drawn illustrations.",
            link: domains.coloring_book + "/",
            icon: BrushIcon,
            newTab: true,
          },
          {
            heading: "Book Writing & Editing",
            tag: "Write books easily and efficiently.",
            link: "https://author.selfpublishingtitans.com",
            icon: PenIcon,
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
            tag: "Create effective book titles that sell.",
            link: "/kdp-title-creator",
            icon: ClipboardTypeIcon,
          },
          {
            heading: "Book Description Generator",
            tag: "Write great book descriptions.",
            link: "/kdp-description-creator",
            icon: TextIcon,
          },
          {
            heading: "Trademark Checker",
            tag: "Avoid violations with your books.",
            link: "/kdp-trademark-checker",
            icon: CopyrightIcon,
          },
          {
            heading: "Guidelines Checker",
            tag: "Follow the rules & regulations better.",
            link: "/kdp-guidelines-checker",
            icon: TextIcon,
          },
          {
            heading: "Book Listing Translations",
            tag: "Translate your book data instantly.",
            link: "/kdp-bookdata-translator",
            icon: LanguagesIcon,
          },
          {
            heading: "Book Price Suggestions",
            tag: "Find the perfect price for your book.",
            link: "/kdp-price-checker",
            icon: DollarSignIcon,
          },
          {
            heading: "Grammar Checker",
            tag: "Fix grammar in book details.",
            link: "/grammar-check",
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
            tag: "Design great book covers with ease.",
            link: "/book-cover-creator",
            icon: BookHeartIcon,
          },
          {
            heading: "A+ Content Maker",
            tag: "Create A+ content images for your book.",
            link: "/A+-content-template-generator",
            flair: "New",
            icon: BookImageIcon,
          },
          {
            heading: "Digital Titans Designer",
            tag: "Create text and letter designs & patterns.",
            link: "https://design.selfpublishingtitans.com/",
            icon: BookAIcon,
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
            tag: "Estimate book sales via BSR.",
            link: "/tools/KDP-BSR-Sales-Calculator",
            icon: ChartLineIcon,
          },
          {
            heading: "ACOS Royalty Calculator",
            tag: "Evaluate ad profitability.",
            link: "/tools/KDP-Royalty-Calculator",
            icon: Percent,
          },
          {
            heading: "Pen Name Generator",
            tag: "Generate creative pen names.",
            link: "/tools/Pen-Name-Generator",
            icon: NotebookPen,
          },
          {
            heading: "QR Code Generator",
            tag: "Create QR codes for books.",
            link: "/tools/QR-Code-Generator-for-KDP-Books",
            icon: QrCode,
          },
          {
            heading: "Word Cloud Generator",
            tag: "Visualize keyword usage.",
            link: "/word-cloud",
            icon: CloudIcon,
          },
          {
            heading: "Keyword Tracker",
            tag: "Track keyword rankings.",
            link: "/titans-keyword-tracker",
            icon: TrendingUpDownIcon,
          },
          {
            heading: "ASIN Tracker",
            tag: "Monitor product performance.",
            link: "/titans-asin-tracker",
            icon: ChartLineIcon,
          },
          {
            heading: "KDP Category Finder",
            tag: "Find the best book categories.",
            link: "/tools/KDP-Kindle-Category-Finder",
            icon: TextSearchIcon,
          },
          {
            heading: "KDP Cover Template Generator",
            tag: "Generate cover templates.",
            link: "/kdp-cover-template-generator",
            icon: BookTextIcon,
          },
        ],
      },
    ],
  },
  {
    Title: "Training",
    icon: GraduationCap,
    Categories: [
      {
        Items: [
          {
            heading: "KDP Masterclass",
            tag: "A-Z training, 80+ videos, 100+ resources.",
            link: "/masterclass",
            icon: VideoIcon,
          },
        ],
      },
      {
        Items: [
          {
            heading: "Community Forum",
            tag: "Ask any and all questions, anytime.",
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
            tag: "Our Book available on Amazon. ",
            link: "https://www.amazon.com/Self-Publishing-Simplified-Publish-Amazon-Beginners/dp/B0CMZ92XLG/ref=tmm_pap_swatch_0?_encoding=UTF8&qid=1704220990&sr=8-1",
            newTab: true,
            icon: BookIcon,
          },
        ],
      },
    ],
  },
];

export default SolutionsData;
