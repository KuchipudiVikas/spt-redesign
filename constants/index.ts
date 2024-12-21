export enum ESubscriptionType {
  Free = "free",
  Monthly = "month",
  Yearly = "year",
  Both = "both",
  Lifetime = "lifetime",
}

export interface Package {
  name: string;
  subtitle: string;
  price: number;
  yearlyPrice?: number;
  type: ESubscriptionType;
  isMostPopular: boolean;
  isYearly: boolean;
  isActive: boolean;
  productId?: string;
  isSale: boolean;
  salePrice?: number;
  features: {
    isAvailable: boolean;
    name: string;
  }[];
}

export enum productsType {
  Free = "free",
  TitansPro = "titans pro",
  TitansProMax = "titans pro max",
  // TitansUltra = "titans ultra",
  TitansSupreme = "titans supreme",
  TitansMega = "titans mega",

  // cloud storage products 2GB, 10GB, 14GB, 20GB
  TitansPro2GB = "titans pro 2GB",
  TitansPro10GB = "titans pro 10GB",
  TitansPro14GB = "titans pro 14GB",
  TitansPro20GB = "titans pro 20GB",

  // lifetime // Basic Plus Bundle,	Research Bundle 1.0,	Creative Bundle 1.0,	Mega Bundle 1.0
  TitansMegaLifetime = "titans mega lifetime",
  BasicPlusBundleLifetime = "basic plus bundle lifetime",
  ResearchBundleLifetime = "research bundle lifetime",
  CreativeBundleLifetime = "creative bundle lifetime",
  MegaBundleLifetime = "mega bundle lifetime",
}

export enum products {
  Free = "free",
  TitansProLifetime = "titans pro lifetime",
  TitansProMonthly = "titans pro monthly",
  TitansProMaxMonthly = "titans pro max monthly",
  TitansProMaxLifetime = "titans pro max lifetime",
}

export enum AccessTypes {
  Available = "available",
  Limited = "limited",
  NotAvailable = "not available",
  Max100Entries = "max 100 entries",
  Max200Entries = "max 200 entries",
}

export enum Availability {
  MonthlyOnly = "monthly only",
  LifeTimeOnly = "lifetime only",
  Both = "both",
}

export const domainMidDict = {
  "amazon.com": "ATVPDKIKX0DER",
  "amazon.com.au": "A39IBJ37TRP1C6",
  "amazon.com.mx": "A1AM78C64UM0Y8",
  "amazon.com.br": "A2Q3Y263D00KWC",
  "amazon.com.tr": "A33AVAJ2PDY3EV",
  "amazon.co.uk": "A1F83G8C2ARO7P",
  "amazon.de": "A1PA6795UKMFR9",
  "amazon.fr": "A13V1IB3VIYZZH",
  "amazon.it": "APJ6JRA9NG5V4",
  "amazon.es": "A1RKKUPIHCS9HS",
  "amazon.co.jp": "A1VC38T7YXB528",
  "amazon.ca": "A2EUQ1WTGCTBG2",
  "amazon.cn": "AAHKV2X7AFYLW",
  "amazon.in": "A21TJRUUN4KGV",
  "amazon.nl": "A1805IZSGTT6HS",
  "amazon.ae": "A2VIGQ35RCS4UG",
  "amazon.sg": "A19VAU5U5O7RUS",
  "amazon.sa": "A17E79C6D8DWNP",
  "amazon.se": "A2NODRKZP88ZB9",
};

export const keepaDomainMidDict = {
  "www.amazon.com": "ATVPDKIKX0DER", // ok
  "www.amazon.com.au": "A39IBJ37TRP1C6", // not available
  "www.amazon.com.mx": "A1AM78C64UM0Y8", // ok
  //"www.amazon.com.br": "A2Q3Y263D00KWC",
  //"www.amazon.com.tr": "A33AVAJ2PDY3EV",
  "www.amazon.co.uk": "A1F83G8C2ARO7P", // ok
  "www.amazon.de": "A1PA6795UKMFR9", // ok
  "www.amazon.fr": "A13V1IB3VIYZZH", // ok
  "www.amazon.it": "APJ6JRA9NG5V4", // ok
  "www.amazon.es": "A1RKKUPIHCS9HS", // ok
  "www.amazon.co.jp": "A1VC38T7YXB528", //ok
  "www.amazon.ca": "A2EUQ1WTGCTBG2", // ok
  //"www.amazon.cn": "AAHKV2X7AFYLW",
  "www.amazon.in": "A21TJRUUN4KGV", // ok
  //"www.amazon.nl": "A1805IZSGTT6HS",
  //"www.amazon.ae": "A2VIGQ35RCS4UG",
  //"www.amazon.sg": "A19VAU5U5O7RUS",
  //"www.amazon.sa": "A17E79C6D8DWNP",
};

export const languages = {
  "www.amazon.com": "en_US",
  "www.amazon.co.jp": "en_US",
  "www.amazon.com.au": "en_AU",
  "www.amazon.ca": "en_CA",
  "www.amazon.in": "en_IN",
  "www.amazon.de": "de_DE",
  "www.amazon.co.uk": "en_GB",
  "www.amazon.sg": "en_SG",
  "www.amazon.ae": "en_AE",
  "www.amazon.sa": "ar_AE",
  "www.amazon.com.br": "pt_BR",
  "www.amazon.com.mx": "es_MX",
  "www.amazon.es": "es_ES",
  "www.amazon.com.tr": "tr_TR",
  "www.amazon.cn": "zh_CN",
  "www.amazon.fr": "fr_FR",
  "www.amazon.it": "it_IT",
  "www.amazon.nl": "nl_NL",
  "www.amazon.pl": "pl_PL",
  "www.amazon.se": "sv_SE",
};

// domain to country code
export const domainToCountryCode = {
  "amazon.com": "US",
  "amazon.co.uk": "GB",
  "amazon.de": "DE",
  "amazon.fr": "FR",
  "amazon.co.jp": "JP",
  "amazon.ca": "CA",
  "amazon.it": "IT",
  "amazon.es": "ES",
  "amazon.in": "IN",
  "amazon.com.mx": "MX",
  "amazon.com.au": "AU",
};

export const domains = {
  books: process.env.NEXT_PUBLIC_BOOKS_SUBDOMAIN,
  coloring_book: process.env.NEXT_PUBLIC_COLORING_BOOK_SUBDOMAIN,
  main: process.env.NEXT_PUBLIC_CLIENT_URL,
};
