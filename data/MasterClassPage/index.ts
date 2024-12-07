import {
  faq,
  ourJourney,
  overviewTexts,
  testimonialsLocal,
  videoCardWithDetailsObj,
  descriptionTextsEnglish,
} from "@/data/MasterClassPage/constants";

import {
  videoCardWithDetailsObj as videoCardWithDetailsObjArabic,
  testimonialsLocal as testimonialsLocalArabic,
  faq as faqArabic,
  ourJourney as ourJourneyArabic,
  overviewTexts as overviewTextsArabic,
  descriptionTextsArabic,
} from "@/data/MasterClassPage/arabic";

import {
  videoCardWithDetailsObj as videoCardWithDetailsObjFrench,
  testimonialsLocal as testimonialsLocalFrench,
  faq as faqFrench,
  ourJourney as ourJourneyFrench,
  overviewTexts as overviewTextsFrench,
  descriptionTextsFrench,
} from "@/data/MasterClassPage/french";

import {
  videoCardWithDetailsObj as videoCardWithDetailsObjGerman,
  testimonialsLocal as testimonialsLocalGerman,
  faq as faqGerman,
  ourJourney as ourJourneyGerman,
  overviewTexts as overviewTextsGerman,
  descriptionTextsGerman,
} from "@/data/MasterClassPage/german";

import {
  videoCardWithDetailsObj as videoCardWithDetailsObjBangla,
  testimonialsLocal as testimonialsLocalBangla,
  faq as faqBangla,
  ourJourney as ourJourneyBangla,
  overviewTexts as overviewTextsBangla,
  descriptionTextsBangla,
} from "@/data/MasterClassPage/bangla";

import {
  videoCardWithDetailsObj as videoCardWithDetailsObjRomanian,
  testimonialsLocal as testimonialsLocalRomanian,
  faq as faqRomanian,
  ourJourney as ourJourneyRomanian,
  overviewTexts as overviewTextsRomanian,
  descriptionTextsRomanian,
} from "@/data/MasterClassPage/romanian";

import {
  videoCardWithDetailsObj as videoCardWithDetailsObjItalian,
  testimonialsLocal as testimonialsLocalItalian,
  faq as faqItalian,
  ourJourney as ourJourneyItalian,
  overviewTexts as overviewTextsItalian,
  descriptionTextsItalian,
} from "@/data/MasterClassPage/italian";

type LanguageItem = {
  ourJourney: string[];
  ourJourneyTitle: string;
  getItNow: string;
  videoCardInfo: any[];
  descriptionTexts: any;
  testimonials: any;
  trainingOptionsTitle: string;
  aboutMasterclassTitle: string;
  includedText: string;
  notInlcudedText: string;
  expectedText: string;
  notExpextedText: string;
  reviewsText: string;
  specialNote?: string;
  faq: any[];
};

export const languageItemsIndex: Record<string, LanguageItem> = {
  English: {
    ourJourney: ourJourney,
    ourJourneyTitle: "Our Own KDP Journey",
    getItNow: "Get It Now",
    videoCardInfo: videoCardWithDetailsObj,
    descriptionTexts: descriptionTextsEnglish,
    testimonials: testimonialsLocal,
    trainingOptionsTitle: "Training Options",
    aboutMasterclassTitle: "About The Masterclass",
    includedText: "Included",
    notInlcudedText: "Not Included",
    expectedText: "Who This Is For",
    notExpextedText: "Who This Is Not For",
    reviewsText: "Masterclass Reviews",
    faq: faq,
  },
  Italian: {
    ourJourney: ourJourneyItalian,
    ourJourneyTitle: "Our Own KDP Journey",
    getItNow: "Ottienilo ora",
    videoCardInfo: videoCardWithDetailsObjItalian,
    descriptionTexts: descriptionTextsItalian,
    testimonials: testimonialsLocalItalian,
    trainingOptionsTitle: "OPZIONI DI FORMAZIONE PER MASTERCLASS",
    aboutMasterclassTitle: "LA MasterClass",
    includedText: "included",
    notInlcudedText: "Non Include",
    expectedText: "A Chi è Rivolto",
    notExpextedText: "A chi non è rivolto",
    reviewsText: "RECENSIONI DELLE MASTERCLASS",
    faq: faqItalian,
  },
  Romanian: {
    ourJourney: ourJourneyRomanian,
    ourJourneyTitle: "PROPRIA NOASTRĂ CĂLĂTORIE DE PE AMAZON",
    getItNow: "Obține-l acum",
    videoCardInfo: videoCardWithDetailsObjRomanian,
    testimonials: testimonialsLocalRomanian,
    trainingOptionsTitle: "OPZIONI DI FORMAZIONE PER MASTERCLASS",
    descriptionTexts: descriptionTextsRomanian,
    aboutMasterclassTitle: "DESPRE MASTERCLASS",
    includedText: "Included",
    notInlcudedText: "Nu este inclus",
    expectedText: "Pentru cine este",
    notExpextedText: "Pentru cine nu este",
    reviewsText: "RECENZII MASTERCLASS",
    faq: faqRomanian,
  },

  Arabic: {
    ourJourney: ourJourneyArabic,
    ourJourneyTitle: "رحلة أمازون الخاصة بنا",
    trainingOptionsTitle: "خيارات تدريبات الدورة",
    getItNow: "Get It Now",
    videoCardInfo: videoCardWithDetailsObjArabic,
    descriptionTexts: descriptionTextsArabic,
    testimonials: testimonialsLocalArabic,
    aboutMasterclassTitle: "حول دورتنا",
    includedText: "يشمل",
    notInlcudedText: "لا يشمل",
    expectedText: "لمن هذهالدورة؟",
    notExpextedText: "هذه الدورة ليست لمن؟",
    reviewsText: "الدورةتقييمات",
    specialNote: "ترجمة صوتية باللغة الإنجليزية والعربية",
    faq: faqArabic,
  },
  Bangla: {
    ourJourney: ourJourneyBangla,
    ourJourneyTitle: "আমাদের আমাজন যাত্রা",
    getItNow: "এখনই নিন",
    videoCardInfo: videoCardWithDetailsObjBangla,
    descriptionTexts: descriptionTextsBangla,
    testimonials: testimonialsLocalBangla,
    trainingOptionsTitle: "মাস্টারক্লাস প্রশিক্ষণের কোর্স সমূহ",
    aboutMasterclassTitle: "মাস্টারক্লাস সম্পর্কে কিছু তথ্য",
    includedText: "যাহা পাবেন",
    notInlcudedText: "যাহা পাবেন না",
    expectedText: "যাদের জন্য এই মাস্টারক্লাস",
    specialNote: "ইংরেজি অডিও - বাংলা সাবটাইটেল",
    notExpextedText: "যাদের জন্য নয়",
    reviewsText: "মাস্টারক্লাস প্রশংসাপত্র",
    faq: faqBangla,
  },
  French: {
    ourJourney: ourJourneyFrench,
    ourJourneyTitle: "NOTRE PROPRE EXPÉRIENCE SUR AMAZON",
    getItNow: "Get It Now",
    videoCardInfo: videoCardWithDetailsObjFrench,
    descriptionTexts: descriptionTextsFrench,
    testimonials: testimonialsLocalFrench,
    trainingOptionsTitle: "Masterclass Training Options",
    aboutMasterclassTitle: "À PROPOS DE LA MASTERCLASS",
    includedText: "Inclus",
    notInlcudedText: "Non inclus",
    expectedText: "Pour qui?",
    notExpextedText: "À qui cela ne s'adresse-t-il pas?",
    reviewsText: "COMMENTAIRES SUR MASTERCLASS",
    specialNote: "Audio en anglais et sous-titres en français",
    faq: faqFrench,
  },
  German: {
    ourJourney: ourJourneyGerman,
    ourJourneyTitle: "UNSERE EIGENE AMAZON REISE",
    getItNow: "Get It Now",
    videoCardInfo: videoCardWithDetailsObjGerman,
    descriptionTexts: descriptionTextsGerman,
    testimonials: testimonialsLocalGerman,
    trainingOptionsTitle: "Masterclass Training Options",
    aboutMasterclassTitle: "Über unsere MASTERCLASS",
    specialNote: "Englische Sprache und deutsche Untertitel",
    includedText: "Inklusive",
    notInlcudedText: "Nicht inbegriffen",
    expectedText: "Für wen ist der Kurs geeignet?",
    notExpextedText: "Für wen der Kurs nicht geeignet ist?",
    reviewsText: "BEWERTUNGEN UNSERER USER",
    faq: faqGerman,
  },
};

type TMasterClassDetails = {
  id: string;
  name: string;
  language: string;
  overviewTexts: string[];
  purchaseUrl?: string;
  isBNPLavailable?: boolean;
};

export const masterclassInfo: TMasterClassDetails[] = [
  {
    id: "masterclass_english",
    name: "Masterclass",
    language: "English",
    overviewTexts: overviewTexts,
    purchaseUrl: "/masterclass#masterclass",
    isBNPLavailable: true,
  },
  {
    id: "masterclass_italian",
    name: "Masterclass",
    language: "Italian",
    overviewTexts: overviewTextsItalian,
    purchaseUrl: "https://selfpublishingtitans.com/masterclass-italian",
    isBNPLavailable: false,
  },
  {
    id: "masterclass_romanian",
    name: "Masterclass",
    language: "Romanian",
    overviewTexts: overviewTextsRomanian,
    purchaseUrl: "https://selfpublishingtitans.com/masterclass-romanian",
    isBNPLavailable: false,
  },
  {
    id: "masterclass_arabic",
    name: "Masterclass",
    language: "Arabic",
    overviewTexts: overviewTextsArabic,
    purchaseUrl: "https://selfpublishingtitans.com/masterclass-romanian",
    isBNPLavailable: false,
  },
  {
    id: "masterclass_bangla",
    name: "Masterclass",
    language: "Bangla",
    overviewTexts: overviewTextsBangla,
    purchaseUrl: "https://selfpublishingtitans.com/masterclass-romanian",
    isBNPLavailable: false,
  },
  {
    id: "masterclass_french",
    name: "Masterclass",
    language: "French",
    overviewTexts: overviewTextsFrench,
    purchaseUrl: "https://selfpublishingtitans.com/masterclass-romanian",
    isBNPLavailable: false,
  },
  {
    id: "masterclass_german",
    name: "Masterclass",
    language: "German",
    overviewTexts: overviewTextsGerman,
    purchaseUrl: "https://selfpublishingtitans.com/masterclass-romanian",
    isBNPLavailable: false,
  },
];
