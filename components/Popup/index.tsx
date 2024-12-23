import dynamic from "next/dynamic";

const TitansPro = dynamic(() => import("./new/titansPro"), {
  ssr: false,
});
const TitansProMax = dynamic(() => import("./new/titansProMax"), {
  ssr: false,
});
const TitansUltra = dynamic(() => import("./new/titansUltra"), {
  ssr: false,
});
const TitansSupreme = dynamic(() => import("./new/titansSupreme"), {
  ssr: false,
});
const CreativeBundle = dynamic(() => import("./new/creativeBundle"), {
  ssr: false,
});
const ColoringBook = dynamic(() => import("./new/ColoringBook"), {
  ssr: false,
});
// const EtsyPopUp = dynamic(() => import("./new/EtsyPopup"), {
//   ssr: false,
// });
const DeepViewPopup = dynamic(() => import("./new/DeepView"), {
  ssr: false,
});

const RetroView = dynamic(() => import("./new/RetroView"), {
  ssr: false,
});
const PuzzleTools = dynamic(() => import("./new/PuzzleTools"), {
  ssr: false,
});
const Designer = dynamic(() => import("./new/Designer"), {
  ssr: false,
});
const TrackerBundle = dynamic(() => import("./new/kwtBundle"), {
  ssr: false,
});
const SptBookPopup = dynamic(() => import("./new/sptbook"), {
  ssr: false,
});
const MasterclassPopup = dynamic(() => import("./new/masterclass"), {
  ssr: false,
});
const AffiliatePopup = dynamic(() => import("./new/affiliate"), {
  ssr: false,
});

const AmazonAdsVideo = dynamic(() => import("./new/amazonAdsVideo"), {
  ssr: false,
});

const SevenBackendKeyword = dynamic(
  () => import("./special/seven_bkw_tool_popup"),
  {
    ssr: false,
  }
);

type ButtonConfig = {
  url: string;
  text: string;
  textColor: string;
  bgColor: string;
};

type OverviewTexts = {
  highlightTexts: string[];
  texts: string[];
};

type Popup = {
  name: string;
  items: string[];
  popUpComponent: any;
  isTier?: boolean;
  tierId?: string;
};

type PopupsIndex = Popup[];

export const popupsIndex: PopupsIndex = [
  {
    name: "Titans Pro",
    items: ["64562b9ae2210da37f2bdb2c"],
    popUpComponent: TitansPro,
  },
  {
    name: "Titans Pro Max",
    items: ["6516aecf8a69c334783b3c27"],
    popUpComponent: TitansProMax,
  },
  {
    name: "Titans Ultra",
    items: ["65603c9e1727b2465e1307ac"],
    tierId: "65603c9e1727b2465e1307ac",
    popUpComponent: TitansUltra,
  },
  {
    name: "Titans Supreme",
    items: ["655ee43f1727b2465e13079b"],
    tierId: "655ee43f1727b2465e13079b",
    popUpComponent: TitansSupreme,
  },
  {
    name: "coloring book",
    items: ["63d6701a1ee1322b4efc1bb7"],
    popUpComponent: ColoringBook,
  },
  {
    name: "All Puzzle tools Bundle",
    items: ["62e36e85577c41001b770a3e"],
    popUpComponent: PuzzleTools,
  },
  {
    name: "Digital Titans Designer",
    items: ["655ee7bb1727b2465e1307a0"],
    popUpComponent: Designer,
  },
  {
    name: "Titans Deep View",
    items: ["655ee6781727b2465e13079c"],
    popUpComponent: DeepViewPopup,
  },
  {
    name: "Titans Retro View",
    items: ["655ee7681727b2465e13079f"],
    popUpComponent: RetroView,
  },
  // {
  //   name: "Titans Pro Etsy",
  //   items: ["65a5fdf9bf8b2a80cbc509ac"],
  //   popUpComponent: EtsyPopUp,
  // },
  {
    name: "kwt bundle",
    items: ["65701a302f7789f16ddd78ac"],
    popUpComponent: TrackerBundle,
  },
  {
    name: "Creative Bundle",
    items: ["6431a2b1b7ca7bf13740c4c1"],
    popUpComponent: CreativeBundle,
  },
  {
    name: "affilliate",
    items: ["affilliate"],
    popUpComponent: AffiliatePopup,
  },
  {
    name: "kdp masterclass",
    items: ["63149a704f08614dd053ec3d"],
    popUpComponent: MasterclassPopup,
  },
  {
    name: "Spt Book",
    items: ["spt_book"],
    popUpComponent: SptBookPopup,
  },
  {
    name: "Amazon Ads Video",
    items: ["amazon_ads_video"],
    popUpComponent: AmazonAdsVideo,
  },
  {
    name: "7 Backend Keywords Tool",
    items: ["66585db27fa69298ee51aa7d"],
    popUpComponent: SevenBackendKeyword,
  },
];
