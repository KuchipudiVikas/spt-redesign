import { AccessTypes, Availability, ESubscriptionType, productsType } from "@/constants";
import { IPackage } from "@/models/interfaces";

export const featuresMobile = [

];

export const faq = [
  {
    question: "Refund Policy",
    answer: `We offer a 7-day money-back gurantee. This applies to an account's first charge/payment only.
    In order to submit a refund request you will need to send us an email to customer support. Once we receive your email request for a refund, your request will be reviewed for eligibility and issue a refund as needed.
`,
  },
  {
    question: "Is the Chrome Extension included with the plan?",
    answer: `Access is limited with a free account, but with a paid account you will have all features with unlimited use. `,
  },

  {
    question: "If I choose monthly subscription, can I cancel anytime?",
    answer: `Yes, you can cancel anytime. You will see the option to do so under your account tab.`,
  },
];

export const packages: IPackage[] = [
  {
    name: "500MB",
    subtitle: "Free",
    price: 0,
    lifeTimePrice: 0,
    type: ESubscriptionType.Free,
    productType: productsType.Free,
    isMostPopular: false,
    isYearly: false,
    isActive: true,
    isSale: false,
    salePrice: 0,
  },
  {
    name: "2GB",
    subtitle: "Monthly",
    productId: "663b0717c3170c98474ad6ac",
    price: 29,
    lifeTimePrice: 297,
    type: ESubscriptionType.Monthly,
    productType: productsType.TitansPro2GB,
    isMostPopular: true,
    isYearly: false,
    isActive: true,
    isSale: false,
    salePrice: 0,
  },
  {
    name: "10GB",
    subtitle: "Monthly",
    productId: "663b07afc3170c98474ad6ad",
    price: 49,
    lifeTimePrice: 400,
    type: ESubscriptionType.Monthly,
    productType: productsType.TitansPro10GB,
    isMostPopular: false,
    isYearly: false,
    isActive: true,
    isSale: false,
    salePrice: 0,
  },
  {
    name: "14GB",
    subtitle: "Monthly",
    productId: "663b09d1c3170c98474ad6ae",
    price: 49,
    lifeTimePrice: 400,
    type: ESubscriptionType.Monthly,
    productType: productsType.TitansPro14GB,
    isMostPopular: false,
    isYearly: false,
    isActive: true,
    isSale: false,
    salePrice: 0,
  },
  {
    name: "20GB",
    subtitle: "Monthly",
    productId: "663b2728c3170c98474ad6b0",
    price: 49,
    lifeTimePrice: 400,
    type: ESubscriptionType.Both,
    productType: productsType.TitansPro20GB,
    isMostPopular: false,
    isYearly: false,
    isActive: true,
    isSale: false,
    salePrice: 0,
  },
];
