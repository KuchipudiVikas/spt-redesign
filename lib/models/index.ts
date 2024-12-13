import { ESubscriptionType, productsType } from "@/constants";

export interface IPackage {
  name: string;
  productId?: string;
  subtitle: string;
  price: number;
  lifeTimePrice: number;
  type: ESubscriptionType;
  productType: productsType;
  isMostPopular: boolean;
  isYearly: boolean;
  isActive: boolean;
  isSale: boolean;
  salePrice: number;
}
