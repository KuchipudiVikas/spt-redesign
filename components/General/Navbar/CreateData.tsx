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
} from "lucide-react";

import { FaAmilia } from "react-icons/fa6";

type TOption = {
  name: string;
  Icon: React.ElementType;
  tag?: string;
  link: string;

  //   link:string
};

function EditNoteicon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mr-4"
      height="35px"
      viewBox="0 -960 960 960"
      width="35px"
      fill="#00000"
    >
      <path d="M480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v200h-80v-145l-240-90-240 90v189q0 121 68 220t172 132q26-8 49.5-20.5T576-214l56 56q-33 27-71.5 47T480-80Zm360 0q-17 0-28.5-11.5T800-120q0-17 11.5-28.5T840-160q17 0 28.5 11.5T880-120q0 17-11.5 28.5T840-80Zm-40-160v-240h80v240h-80ZM480-480Zm0 80q33 0 56.5-23.5T560-480q0-33-23.5-56.5T480-560q-33 0-56.5 23.5T400-480q0 33 23.5 56.5T480-400Zm0 80q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 22-5.5 42.5T618-398l119 118-57 57-120-119q-18 11-38.5 16.5T480-320Z" />
    </svg>
  );
}
function TextCompare() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="mr-4"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#00000"
    >
      <path d="M400-40v-80H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h200v-80h80v880h-80ZM200-200h200v-80H280v-80h120v-80H280v-80h120v-80H280v-80h120v-80H200v560Zm360-560v-80h200q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H560v-80h200v-560H560Zm0 320v-80h120v80H560Zm0-160v-80h120v80H560ZM400-480Z" />
    </svg>
  );
}

function TwoPages() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="34px"
      className="mr-4"
      viewBox="0 -960 960 960"
      width="34px"
      fill="#00000"
    >
      <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h280v-480H160v480Zm360 0h280v-480H520v480Zm-320-80h200v-80H200v80Zm0-120h200v-80H200v80Zm0-120h200v-80H200v80Zm360 240h200v-80H560v80Zm0-120h200v-80H560v80Zm0-120h200v-80H560v80ZM440-240v-480 480Z" />
    </svg>
  );
}
const CreateOptions: TOption[] = [
  {
    name: "Book Cover",
    Icon: ImageIcon,
    link: "https://selfpublishingtitans.com/book-cover-creator",
  },
  {
    name: "A+ Content",
    Icon: ImageIcon,
    link: "https://selfpublishingtitans.com/A+-content-template-generator",
  },
  {
    name: "Write Book",
    Icon: BookIcon,
    link: "https://author.selfpublishingtitans.com",
  },
  {
    name: "Puzzle Pages",
    Icon: BookOpenText,
    link: "https://books.selfpublishingtitans.com/Puzzle-Maker-Software",
  },
  {
    name: "Low Content Pages",
    Icon: BookCopy,
    link: "https://books.selfpublishingtitans.com/FREE-No-Content-Book-Creator-Software/start-now?simple=true",
  },
  {
    name: "Coloring Book",
    Icon: BrushIcon,
    link: "https://editor.selfpublishingtitans.com",
  },
  {
    name: "Digital Titans Designer",
    Icon: FaAmilia,
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
    link: "https://selfpublishingtitans.com/titans-deep-view",
  },
  {
    name: "7 Backend Keywords",
    tag: "Book Listing SEO",
    Icon: ListCheck,
    link: "https://selfpublishingtitans.com/7-backend-keywords-tool-amazon-kdp",
  },
  {
    name: "Retro View",
    tag: "Competetior Analysis",
    Icon: SearchCheck,
    link: "https://selfpublishingtitans.com/titans-retro-vision",
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
    link: "https://selfpublishingtitans.com/tools/KDP-BSR-Sales-Calculator",
    Icon: HandCoins,
  },
  {
    name: "ACOS Royalty Calculator",
    tag: "Calculate ad campaign profitability.",
    link: "https://selfpublishingtitans.com/tools/KDP-Royalty-Calculator",
    Icon: Banknote,
  },
  {
    name: "KDP Category Finder",
    tag: "Find the best categories for your book and improve your SEO.",
    link: "https://selfpublishingtitans.com/tools/KDP-Kindle-Category-Finder",
    Icon: LogsIcon,
  },
  {
    name: "QR Code Generator",
    tag: "Create QR codes for your books",
    link: "https://selfpublishingtitans.com/tools/QR-Code-Generator-for-KDP-Books",
    Icon: QrCodeIcon,
  },
  {
    name: "Pen Name Generator",
    tag: "Create pen names for your books",
    link: "https://selfpublishingtitans.com/tools/Pen-Name-Generator",
    Icon: PencilIcon,
  },
  {
    name: "Word Cloud Generator",
    tag: "View most used words and keywords",
    link: "https://selfpublishingtitans.com/word-cloud",
    Icon: CloudIcon,
  },
  {
    name: "Keyword Tracker",
    tag: "Track Keyword ranking for any product",
    link: "https://selfpublishingtitans.com/titans-keyword-tracker",
    Icon: TextCompare,
  },
  {
    name: "ASIN Tracker",
    tag: "Monitor any products performance",
    link: "https://selfpublishingtitans.com/titans-asin-tracker",
    Icon: GitCompareArrows,
  },
  {
    name: "KDP Cover Template Generator",
    tag: "Create KDP Cover Templates",
    link: "https://selfpublishingtitans.com/kdp-cover-template-generator",
    Icon: TwoPages,
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
    link: "https://selfpublishingtitans.com/kdp-title-creator",
  },
  {
    name: "KDP Description Generator",
    Icon: ArrowUpNarrowWideIcon,
    link: "https://selfpublishingtitans.com/kdp-description-creator",
  },
  {
    name: "KDP Trademark Violation Checker",
    Icon: EditNoteicon,
    link: "https://selfpublishingtitans.com/kdp-trademark-checker",
  },
  {
    name: "KDP Guidelines Checker",
    Icon: ListTodoIcon,
    link: "https://selfpublishingtitans.com/kdp-guidelines-checker",
  },
  {
    name: "KDP Book Data Translator",
    Icon: Languages,
    link: "https://selfpublishingtitans.com/kdp-bookdata-translator",
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
