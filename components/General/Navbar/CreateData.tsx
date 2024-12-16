import {
  ImageIcon,
  BookIcon,
  BookOpenText,
  BookCopy,
  BrushIcon,
  SearchIcon,
  TextSearch,
  ListCheck,
  SearchCheck,
  ListChecks,
  HandCoins,
  Banknote,
  LogsIcon,
  QrCodeIcon,
  PencilIcon,
  CloudIcon,
  GitCompareArrows,
  Youtube,
  TvMinimalPlay,
  ArrowUpNarrowWideIcon,
  ListTodoIcon,
  Languages,
  DollarSignIcon,
  PlusIcon,
  ChartAreaIcon,
  TriangleIcon,
  BookAIcon,
} from "lucide-react";

import { FaAmilia } from "react-icons/fa6";

type TOption = {
  name: string;
  Icon: React.ElementType;
  tag?: string;
  link: string;

  //   link:string
};

const booksDomain = process.env.NEXT_PUBLIC_BOOKS_SUBDOMAIN;

const CreateOptions: TOption[] = [
  {
    name: "Book Cover",
    Icon: ImageIcon,
    link: "/book-cover-creator",
  },
  {
    name: "A+ Content",
    Icon: ImageIcon,
    link: "/A+-content-template-generator",
  },
  {
    name: "Write Book",
    Icon: BookIcon,
    link: "https://author.selfpublishingtitans.com",
  },
  {
    name: "Puzzle Pages",
    Icon: BookOpenText,
    link: booksDomain + "/Puzzle-Maker-Software",
  },
  {
    name: "Low Content Pages",
    Icon: BookCopy,
    link:
      booksDomain +
      "/FREE-No-Content-Book-Creator-Software/start-now?simple=true",
  },
  {
    name: "Coloring Book",
    Icon: BrushIcon,
    link: "https://editor.selfpublishingtitans.com",
  },
  {
    name: "Digital Titans Designer",
    Icon: BookAIcon,
    link: "https://design.selfpublishingtitans.com/",
  },
];

const ResearchOptions: TOption[] = [
  {
    name: "Titans Pro",
    tag: "Search Suggestions",
    Icon: SearchIcon,
    link: "https://chromewebstore.google.com/detail/titans-pro-amazon-kdp-key/mmdamlknnafgffhlobhlmiljonijdnid",
  },
  {
    name: "Deep View",
    tag: "Niche Analysis",
    Icon: TextSearch,
    link: "/titans-deep-view",
  },
  {
    name: "7 Backend Keywords",
    tag: "Book Listing SEO",
    Icon: ListCheck,
    link: "/7-backend-keywords-tool-amazon-kdp",
  },
  {
    name: "Retro View",
    tag: "Competetior Analysis",
    Icon: SearchCheck,
    link: "/titans-retro-vision",
  },
  {
    name: "Quick View",
    tag: "Quick Analysis",
    Icon: ListChecks,
    link: "https://chromewebstore.google.com/detail/titans-quick-view-amazon/eefljgmhgaidffapnppcmmafobefjece",
  },
];

const GeneralTools: TOption[] = [
  {
    name: "KDP BSR Sales Calculator",
    tag: "Estimate anyone's book sales",
    link: "/tools/KDP-BSR-Sales-Calculator",
    Icon: HandCoins,
  },
  {
    name: "ACOS Royalty Calculator",
    tag: "Calculate ad campaign profitability.",
    link: "/tools/KDP-Royalty-Calculator",
    Icon: Banknote,
  },
  {
    name: "KDP Category Finder",
    tag: "Find the best categories for your book and improve your SEO.",
    link: "/tools/KDP-Kindle-Category-Finder",
    Icon: LogsIcon,
  },
  {
    name: "QR Code Generator",
    tag: "Create QR codes for your books",
    link: "/tools/QR-Code-Generator-for-KDP-Books",
    Icon: QrCodeIcon,
  },
  {
    name: "Pen Name Generator",
    tag: "Create pen names for your books",
    link: "/tools/Pen-Name-Generator",
    Icon: PencilIcon,
  },
  {
    name: "Word Cloud Generator",
    tag: "View most used words and keywords",
    link: "/word-cloud",
    Icon: CloudIcon,
  },
  {
    name: "Keyword Tracker",
    tag: "Track Keyword ranking for any product",
    link: "/titans-keyword-tracker",
    Icon: ChartAreaIcon,
  },
  {
    name: "ASIN Tracker",
    tag: "Monitor any products performance",
    link: "/titans-asin-tracker",
    Icon: GitCompareArrows,
  },
  {
    name: "KDP Cover Template Generator",
    tag: "Create KDP Cover Templates",
    link: "/kdp-cover-template-generator",
    Icon: BookIcon,
  },
];

const LearningTools: TOption[] = [
  {
    name: "Youtube Tutorials",
    Icon: Youtube,
    link: "https://www.youtube.com/@SelfPublishingTitans",
  },
  {
    name: "KDP Masterclass",
    Icon: TvMinimalPlay,
    link: "https://www.selfpublishingtitans.com/masterclass",
  },
];

const BookListingTools: TOption[] = [
  {
    name: "KDP Title Creator",
    Icon: TvMinimalPlay,
    link: "/kdp-title-creator",
  },
  {
    name: "KDP Description Generator",
    Icon: ArrowUpNarrowWideIcon,
    link: "/kdp-description-creator",
  },
  {
    name: "KDP Trademark Violation Checker",
    Icon: TriangleIcon,
    link: "/kdp-trademark-checker",
  },
  {
    name: "KDP Guidelines Checker",
    Icon: ListTodoIcon,
    link: "/kdp-guidelines-checker",
  },
  {
    name: "KDP Book Data Translator",
    Icon: Languages,
    link: "/kdp-bookdata-translator",
  },
  {
    name: "Book Price Suggestion Tool",
    Icon: DollarSignIcon,
    link: "https://www.selfpublishingtitans.com/book-price",
  },
  {
    link: "https://www.selfpublishingtitans.com/grammar-check",
    name: "Grammar Checker",
    Icon: ListChecks,
  },
];

export {
  CreateOptions,
  ResearchOptions,
  GeneralTools,
  LearningTools,
  BookListingTools,
};
