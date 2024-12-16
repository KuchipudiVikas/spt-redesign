import { domains } from "@/constants/index";
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
            tag: "Search suggestions and volume insights.",
            newTab: true,
            link: "/titans-pro/on-site",
            icon: SearchIcon,
          },
          {
            heading: "Titans Pro Chrome Extension",
            tag: "Search insights directly in Chrome.",
            newTab: true,
            link: "https://chromewebstore.google.com/detail/titans-pro-amazon-kdp-key/mmdamlknnafgffhlobhlmiljonijdnid",
            icon: BlocksIcon,
          },
          {
            heading: "Titans Quick View",
            tag: "Niche analysis and top keywords.",
            newTab: true,
            link: "https://chromewebstore.google.com/detail/titans-quick-view-amazon/eefljgmhgaidffapnppcmmafobefjece",
            icon: TextIcon,
          },
          {
            flair: "New",
            heading: "7 Backend Keywords Tool",
            tag: "Optimize book SEO.",
            newTab: false,
            link: "/7-backend-keywords-tool-amazon-kdp",
            icon: ListEndIcon,
          },
          {
            heading: "Titans Deep View",
            tag: "Analyze multiple products at once.",
            link: "/titans-deep-view",
            icon: LayoutListIcon,
          },
          {
            heading: "Titans Retro View",
            tag: "Find competitors' top keywords.",
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
            tag: "Write books easily and efficiently.",
            link: "https://author.selfpublishingtitans.com",
            icon: PenIcon,
          },
          {
            heading: "Puzzle & Activity Tools",
            tag: "Create puzzles like Sudoku, mazes, etc.",
            link: domains.books + "/Puzzle-Maker-Software",
            icon: PuzzleIcon,
            newTab: true,
          },
          {
            heading: "Coloring Books",
            tag: "Design coloring books with illustrations.",
            link: domains.coloring_book + "/",
            icon: BrushIcon,
            newTab: true,
          },
          {
            heading: "Digital Titans Designer",
            tag: "Create text and letter designs.",
            link: "https://design.selfpublishingtitans.com/",
            icon: BookAIcon,
          },
          {
            heading: "Low Content Books",
            tag: "Create notebooks and journals.",
            link: domains.books + "/FREE-No-Content-Book-Creator-Software",
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
            tag: "Generate engaging book titles.",
            link: "/kdp-title-creator",
            icon: ClipboardTypeIcon,
          },
          {
            heading: "KDP Description Generator",
            tag: "Write compelling descriptions.",
            link: "/kdp-description-creator",
            icon: TextIcon,
          },
          {
            heading: "KDP Trademark Checker",
            tag: "Avoid trademark violations.",
            link: "/kdp-trademark-checker",
            icon: CopyrightIcon,
          },
          {
            heading: "KDP Guidelines Checker",
            tag: "Ensure KDP guidelines compliance.",
            link: "/kdp-guidelines-checker",
            icon: TextIcon,
          },
          {
            heading: "KDP Book Data Translator",
            tag: "Translate book data instantly.",
            link: "/kdp-bookdata-translator",
            icon: LanguagesIcon,
          },
          {
            heading: "Book Price Suggestion Tool",
            tag: "Set the perfect book price.",
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
            tag: "Design book covers easily.",
            link: "/book-cover-creator",
            icon: BookHeartIcon,
          },
          {
            heading: "A+ Content Maker",
            tag: "Create images for book listings.",
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
            tag: "Learn KDP with 80+ videos.",
            link: "/masterclass",
            icon: VideoIcon,
          },
        ],
      },
      {
        Items: [
          {
            heading: "Community Forum",
            tag: "Join our supportive community.",
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
            tag: "Learn the basics of Amazon KDP.",
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
