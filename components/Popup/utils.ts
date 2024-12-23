import ColoringBookImage from "@/public/assets/images/thumbs/coloring book maker.webp";
import AllPuzzleToolsBundleImage from "@/public/assets/images/thumbs/puzzle tools.webp";
import digitalTitansDesigner from "@/public/assets/images/thumbs/digital-titans.webp";
import EtsyImage from "@/public/assets/images/thumbs/etsy.png";
import Accounts from "@/lib/mw/Accounts";
import { shopIds } from "@/data/shopData";

// preferable to use camel casing for the image key's
export const imgIndex = {
  coloringBook: ColoringBookImage,
  puzzleTools: AllPuzzleToolsBundleImage,
  designer: digitalTitansDesigner,
  etsy: EtsyImage,
};

export const isPaid = (featureID, features): boolean => {
  for (let index = 0; index < features.length; index++) {
    const element = features[index];
    if (element.feature_shop == featureID) {
      return true;
    }
  }
  return false;
};

export const isSubscribed = (featureID, features) => {
  for (let index = 0; index < features.length; index++) {
    const element = features[index];
    if (element.feature_shop.id == featureID) {
      return element;
    }
  }
  return false;
};

const id_titansPro = "64562b9ae2210da37f2bdb2c";
const id_proMax = "6516aecf8a69c334783b3c27";
const id_ultra = "65603c9e1727b2465e1307ac";
const id_supreme = "655ee43f1727b2465e13079b";

const id_coloringBook = "63d6701a1ee1322b4efc1bb7";
const id_puzzleTools = "62e36e85577c41001b770a3e";
const id_designer = "655ee7bb1727b2465e1307a0";

const id_retroView = "655ee7681727b2465e13079f";
const id_deepView = "655ee6781727b2465e13079c";
const id_TrackerBundle = "65701a302f7789f16ddd78ac";
const id_CrativeBundle = "6431a2b1b7ca7bf13740c4c1";

const id_masterclass = "63149a704f08614dd053ec3d";

const seven_bkw_tool_popup = shopIds.BACKEND_KW_TOOL;

const id_etsy = "65a5fdf9bf8b2a80cbc509ac";
const id_kwt = "655ee6da1727b2465e13079d";
const id_asinTracker = "655ee71f1727b2465e13079e";

// mock up's
const id_affiliate = "affilliate";
const id_spt_book = "spt_book";
const id_amazonAds = "amazon_ads_video";

let fallBackData = {
  id: "no_auth",
  featuresToShow: [
    // id_amazonAds,
    // id_spt_book,
    id_titansPro,
    id_puzzleTools,
    seven_bkw_tool_popup,
    id_masterclass,
    id_proMax,
    id_ultra,
    id_etsy,
    id_retroView,
    id_deepView,
    id_TrackerBundle,
    id_coloringBook,
    id_designer,
  ],
  targetLifeTime: [],
  targetUpgrade: [],
};

export const getCurrentPopUpDetails = async (token, info) => {
  try {
    if (!token && !info) {
      console.log("no auth");
      return fallBackData;
    }

    if (!token) return null;

    if (token && info) {
      const features = await Accounts.features.list({}).catch((error) => {
        console.error("Failed to list features:", error);
        return { simple: [] };
      });

      let featuresOwned = await Accounts.features
        .checkAll(token)
        .catch((error) => {
          console.error("Failed to check all features:", error);
          return { simple: [] };
        });

      // let featuresOnSale = features?.simple.filter(
      //   (feature) => feature.isOnShop === true
      // );
      let featuresOnSale = features.simple;

      let featuresOnSaleIds = featuresOnSale.map((feature) => feature._id);

      let notPurchasedFeatures = [];
      let purchasedFeatures = [];
      let purchasedFeaturesIds = [];
      let featuresOwnedIds = featuresOwned.simple.map(
        (feature) => feature.feature_shop
      );

      for (let feature of featuresOnSale) {
        let isPurchased = false;
        for (let fOwned of featuresOwned.simple) {
          if (feature._id === fOwned.feature_shop) {
            isPurchased = true;
            break;
          }
        }
        if (!isPurchased) {
          notPurchasedFeatures.push(feature);
        } else {
          purchasedFeatures.push(feature);
        }
      }

      // console.log(
      //   "purchased features  ",
      //   { purchasedFeatures },
      //   { notPurchasedFeatures },
      //   { featuresOnSale },
      //   { featuresOwned },
      //   { featuresOwnedIds },
      //   { featuresOnSaleIds },
      //   { featuresOwned },
      //   { featuresOwned }
      // );

      let justMasterclass = checkJustMasterclass(
        info,
        notPurchasedFeatures,
        purchasedFeatures
      );
      if (justMasterclass) return justMasterclass;

      let justPuzzleTools = checkJustPuzzleTools(
        info,
        purchasedFeatures,
        notPurchasedFeatures
      );
      if (justPuzzleTools) return justPuzzleTools;

      let justCreativeBundle = checkCreativeBundle(
        info,
        purchasedFeatures,
        notPurchasedFeatures
      );
      if (justCreativeBundle) return justCreativeBundle;

      let checkTitansProResult = checkTitansPro(
        info,
        purchasedFeaturesIds,
        notPurchasedFeatures,
        purchasedFeatures,
        features
      );

      if (checkTitansProResult) {
        return checkTitansProResult;
      }

      let checkTitanproMax = checkProMax(
        info,
        id_proMax,
        features,
        purchasedFeaturesIds,
        notPurchasedFeatures,
        purchasedFeatures
      );
      if (checkTitanproMax) {
        return checkTitanproMax;
      }

      let checkUltraResult = checkUltra(
        info,
        id_ultra,
        features,
        purchasedFeaturesIds,
        notPurchasedFeatures,
        purchasedFeatures
      );
      if (checkUltraResult) {
        return checkUltraResult;
      }

      let checkSupremeResult = checkSupreme(
        info,
        id_supreme,
        features,
        purchasedFeaturesIds,
        notPurchasedFeatures,
        purchasedFeatures
      );
      if (checkSupremeResult) {
        return checkSupremeResult;
      }

      // return as gen/new/unclassified user

      let noFeat = removeDuplicates(notPurchasedFeatures, purchasedFeatures);

      let genFeaturesOrder = [
        id_titansPro,
        // id_amazonAds,
        // id_spt_book,
        id_masterclass,
        id_proMax,
        seven_bkw_tool_popup,
        id_etsy,
        id_retroView,
        id_deepView,
        id_TrackerBundle,
        id_puzzleTools,
        id_coloringBook,
        id_designer,
      ];
      let fG = filterPuchasedFeatures(
        info,
        genFeaturesOrder,
        noFeat,
        purchasedFeatures
      );

      return {
        id: "gen",
        featuresToShow: fG,
        targetLifeTime: [],
        targetUpgrade: [],
      };
    } else {
      return null;
    }
  } catch (error) {
    console.error("An error occurred in getCurrentPopUpDetails:", error);
    return fallBackData;
  }
};

const removeDuplicates = (notPurchasedFeatures, purchasedFeatures) => {
  // pro max
  let idsToRemove = [id_titansPro];
  if (purchasedFeatures.some((feature) => idsToRemove.includes(feature._id))) {
    notPurchasedFeatures = notPurchasedFeatures.filter(
      (feature) => feature._id !== id_titansPro
    );
  }

  idsToRemove = [id_coloringBook, id_puzzleTools, id_designer];
  if (purchasedFeatures.some((feature) => idsToRemove.includes(feature._id))) {
    notPurchasedFeatures = notPurchasedFeatures.filter(
      (feature) => feature._id !== id_proMax
    );
  }

  // titans ultra
  idsToRemove = [id_retroView, id_deepView, id_kwt, id_asinTracker];

  if (purchasedFeatures.some((feature) => idsToRemove.includes(feature._id))) {
    notPurchasedFeatures = notPurchasedFeatures.filter(
      (feature) => feature._id !== id_ultra
    );
  }

  // titans supreme
  idsToRemove = [
    id_deepView,
    id_retroView,
    id_kwt,
    id_asinTracker,
    id_coloringBook,
    id_puzzleTools,
    id_designer,
    id_titansPro,
    id_masterclass,
  ];

  if (purchasedFeatures.some((feature) => idsToRemove.includes(feature._id))) {
    notPurchasedFeatures = notPurchasedFeatures.filter(
      (feature) => feature._id !== id_supreme
    );
  }

  // tracker bundle
  idsToRemove = [id_kwt, id_asinTracker];
  if (purchasedFeatures.some((feature) => idsToRemove.includes(feature._id))) {
    notPurchasedFeatures = notPurchasedFeatures.filter(
      (feature) => feature._id !== id_TrackerBundle
    );
  }

  // creative Bunlde
  idsToRemove = [id_coloringBook, id_puzzleTools, id_designer];
  if (purchasedFeatures.some((feature) => idsToRemove.includes(feature._id))) {
    notPurchasedFeatures = notPurchasedFeatures.filter(
      (feature) => feature._id !== id_TrackerBundle
    );
  }

  return notPurchasedFeatures;
};

function checkTitansPro(
  info,
  purchasedFeaturesIds,
  notPurchasedFeatures,
  purchasedFeatures,
  features
) {
  let isTitansProSub = isSubscribed(id_titansPro, features);

  let isTitansProLife = isPaid(id_titansPro, features);

  if (isTitansProSub || isTitansProLife) {
    if (isTitansProSub) {
      purchasedFeaturesIds.push("64562b9ae2210da37f2bdb2c");

      let featuresToTarget = [
        id_titansPro,
        seven_bkw_tool_popup,
        id_masterclass,
        id_proMax,
        id_ultra,
        id_etsy,
        id_retroView,
        id_deepView,
        id_TrackerBundle,
        id_coloringBook,
        id_designer,
      ];
      let noFeat = removeDuplicates(notPurchasedFeatures, purchasedFeatures);
      let targetLifeTime = [id_titansPro];
      let targetUpgrade = [id_ultra, id_proMax];
      let featuresToShow = [];
      featuresToShow = filterPuchasedFeatures(
        info,
        featuresToTarget,
        noFeat,
        purchasedFeatures
      );
      return {
        id: "tp_m",
        targetLifeTime,
        targetUpgrade,
        featuresToShow,
      };
    } else {
      purchasedFeaturesIds.push("64562b9ae2210da37f2bdb2c");
      let featuresToTarget = [
        id_proMax,
        id_ultra,
        id_etsy,
        id_retroView,
        id_deepView,
        id_TrackerBundle,
        id_coloringBook,
        id_designer,
      ];
      let noFeat = removeDuplicates(notPurchasedFeatures, purchasedFeatures);
      let targetLifeTime = [id_proMax, id_ultra];
      let targetUpgrade = [,];
      let featuresToShow = [];

      featuresToShow = filterPuchasedFeatures(
        info,
        featuresToTarget,
        noFeat,
        purchasedFeatures
      );

      return {
        id: "tp_L",
        targetLifeTime,
        targetUpgrade,
        featuresToShow,
      };
    }
  }
}

function checkProMax(
  info,
  id_proMax: string,
  features: any,
  purchasedFeaturesIds: string[],
  notPurchasedFeatures: any[],
  purchasedFeatures: any[]
) {
  let isProMaxSub = isSubscribed(id_proMax, features);
  let isProMaxLife = isPaid(id_proMax, features);
  if (isProMaxLife || isProMaxSub) {
    if (isProMaxSub) {
      purchasedFeaturesIds.push(id_proMax);
      let featuresToTarget = [
        id_proMax,
        id_masterclass,
        id_ultra,
        id_etsy,
        id_retroView,
        id_deepView,
        id_TrackerBundle,
      ];
      let noFeat = removeDuplicates(notPurchasedFeatures, purchasedFeatures);
      let targetLifeTime = [id_proMax];
      let targetUpgrade = [id_ultra];
      let featuresToShow = [];
      featuresToShow = filterPuchasedFeatures(
        info,
        featuresToTarget,
        noFeat,
        purchasedFeatures
      );
      return {
        id: "tpm_m",
        targetLifeTime,
        targetUpgrade,
        featuresToShow,
      };
    } else {
      purchasedFeaturesIds.push(id_proMax);
      let featuresToTarget = [
        id_ultra,
        id_supreme,
        id_etsy,
        id_retroView,
        id_deepView,
        id_TrackerBundle,
      ];
      let noFeat = removeDuplicates(notPurchasedFeatures, purchasedFeatures);
      let targetLifeTime = [];
      let targetUpgrade = [id_supreme, id_ultra];
      let featuresToShow = [];
      featuresToShow = filterPuchasedFeatures(
        info,
        featuresToTarget,
        noFeat,
        purchasedFeatures
      );

      return {
        id: "tpm_l",
        targetLifeTime,
        targetUpgrade,
        featuresToShow,
      };
    }
  }
}

function checkUltra(
  info,
  id_ultra: string,
  features: any,
  purchasedFeaturesIds: string[],
  notPurchasedFeatures: any[],
  purchasedFeatures: any[]
) {
  let isUltraSub = isSubscribed(id_ultra, features);
  let isUltraLife = isPaid(id_ultra, features);

  if (isUltraLife || isUltraSub) {
    if (isUltraSub) {
      purchasedFeaturesIds.push(id_ultra);
      let featuresToTarget = [
        id_masterclass,
        id_ultra,
        id_etsy,
        id_puzzleTools,
        id_coloringBook,
        id_designer,
      ];
      let noFeat = removeDuplicates(notPurchasedFeatures, purchasedFeatures);
      let targetLifeTime = [id_ultra];
      let targetUpgrade = [id_supreme];
      let featuresToShow = [];
      featuresToShow = filterPuchasedFeatures(
        info,
        featuresToTarget,
        noFeat,
        purchasedFeatures
      );
      return {
        id: "tu_m",
        targetLifeTime,
        targetUpgrade,
        featuresToShow,
      };
    } else {
      purchasedFeaturesIds.push(id_ultra);
      let featuresToTarget = [
        id_masterclass,
        id_ultra,
        id_etsy,
        id_puzzleTools,
        id_coloringBook,
        id_designer,
      ];
      let noFeat = removeDuplicates(notPurchasedFeatures, purchasedFeatures);
      let targetLifeTime = [];
      let targetUpgrade = [id_supreme];
      let featuresToShow = [];
      featuresToShow = filterPuchasedFeatures(
        info,
        featuresToTarget,
        noFeat,
        purchasedFeatures
      );

      return {
        id: "tu_l",
        targetLifeTime,
        targetUpgrade,
        featuresToShow,
      };
    }
  }
}
function checkSupreme(
  info,
  id_supreme: string,
  features: any,
  purchasedFeaturesIds: string[],
  notPurchasedFeatures: any[],
  purchasedFeatures: any[]
) {
  let isUltraSub = isSubscribed(id_supreme, features);
  let isUltraLife = isPaid(id_supreme, features);

  if (isUltraLife || isUltraSub) {
    if (isUltraSub) {
      purchasedFeaturesIds.push(id_supreme);
      let featuresToTarget = [id_masterclass, id_etsy];
      let noFeat = removeDuplicates(notPurchasedFeatures, purchasedFeatures);
      let targetLifeTime = [id_supreme];
      let targetUpgrade = [];
      let featuresToShow = [];
      featuresToShow = filterPuchasedFeatures(
        info,
        featuresToTarget,
        noFeat,
        purchasedFeatures
      );

      return {
        id: "ts_m",
        targetLifeTime,
        targetUpgrade,
        featuresToShow,
      };
    } else {
      purchasedFeaturesIds.push(id_supreme);
      let featuresToTarget = [id_etsy];
      let noFeat = removeDuplicates(notPurchasedFeatures, purchasedFeatures);
      let targetLifeTime = [];
      let targetUpgrade = [];
      let featuresToShow = [];
      featuresToShow = filterPuchasedFeatures(
        info,
        featuresToTarget,
        noFeat,
        purchasedFeatures
      );
      return {
        id: "ts_l",
        targetLifeTime,
        targetUpgrade,
        featuresToShow,
      };
    }
  }
}

function checkJustMasterclass(info, notPurchasedFeatures, purchasedFeatures) {
  // kdp masterclass
  if (info.type == 3) {
    notPurchasedFeatures = notPurchasedFeatures.filter(
      (feature) => feature._id !== "63149a704f08614dd053ec3d"
    );
  }
  let justMasterclass = false;
  // check if the user purchased just the masterclass
  if (
    purchasedFeatures.some(
      (feature) => feature._id === "63149a704f08614dd053ec3d"
    ) &&
    purchasedFeatures.length === 1
  ) {
    justMasterclass = true;
  }

  if (justMasterclass) {
    let featuresToShow = [
      // id_amazonAds,
      // id_spt_book,
      id_titansPro,
      id_etsy,
      id_ultra,
      id_retroView,
      id_deepView,
      id_TrackerBundle,
      id_puzzleTools,
      id_coloringBook,
      id_designer,
    ];
    let targetUpgrade = [];
    let targetLifeTime = [];

    return {
      id: "jm",
      targetLifeTime,
      targetUpgrade,
      featuresToShow,
    };
  }
}

function checkJustPuzzleTools(info, purchasedFeatures, notPurchasedFeatures) {
  let justPuzzleTools = false;
  // check if the user purchased just the masterclass
  if (
    purchasedFeatures.some((feature) => feature._id === id_puzzleTools) &&
    purchasedFeatures.length === 1
  ) {
    justPuzzleTools = true;
  }

  if (justPuzzleTools) {
    let featuresToTarget = [
      id_coloringBook,
      id_designer,
      id_titansPro,
      id_ultra,
      id_TrackerBundle,
      id_retroView,
      id_deepView,
    ];

    let featuresToShow = filterPuchasedFeatures(
      info,
      featuresToTarget,
      notPurchasedFeatures,
      purchasedFeatures
    );
    return {
      id: "jpt",
      targetLifeTime: [],
      targetUpgrade: [],
      featuresToShow,
    };
  }
}
function checkCreativeBundle(info, purchasedFeatures, notPurchasedFeatures) {
  let justCreativeBundle = false;
  // check if the user purchased just the masterclass
  if (
    purchasedFeatures.some((feature) => feature._id === id_CrativeBundle) &&
    purchasedFeatures.length === 1
  ) {
    justCreativeBundle = true;
  }

  if (justCreativeBundle) {
    let featuresToTarget = [
      id_designer,
      id_titansPro,
      id_masterclass,
      id_ultra,
      id_retroView,
      id_deepView,
      id_TrackerBundle,
    ];

    let featuresToShow = filterPuchasedFeatures(
      info,
      featuresToTarget,
      notPurchasedFeatures,
      purchasedFeatures
    );
    return {
      id: "jcb",
      targetLifeTime: [],
      targetUpgrade: [],
      featuresToShow,
    };
  }
}

const filterPuchasedFeatures = (
  info,
  target,
  notPurchasedFeatures,
  purchasedFeatures
) => {
  let notPurchasedFeaturesIds = notPurchasedFeatures.map(
    (features) => features._id
  );
  let filtered = [];
  for (let i = 0; i < target.length; i++) {
    if (
      notPurchasedFeaturesIds.includes(target[i]) ||
      target[i] === "spt_book" ||
      target[i] === "affilliate"
    ) {
      filtered.push(target[i]);
    }
  }

  if (info) {
    if (info.type == 3) {
      filtered = filtered.filter((feature) => feature != id_masterclass);
    }
  }

  return filtered;
};
