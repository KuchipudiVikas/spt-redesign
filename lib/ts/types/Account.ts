type Owner = {
  id: string;
  email: string;
  type: number;
};

type FeatureShop = {
  id: string;
  isSale: boolean;
  index: number;
  features: string[];
  description: string;
  title: string;
  sale_price: number;
  price: number;
  published_at: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  displayImage: string;
  updated_by: string;
  mode: string;
  monthly_price: number;
  monthly_sale_price: number;
  trial_period_days: number;
  yearly_price: number;
  is_on_shop: boolean;
  is_multi_shop: boolean;
  featureShops: null | any; // Adjust `any` if more details are known about the `featureShops`
  subscription_shops: null | any; // Adjust `any` if more details are known about the `subscription_shops`
  is_monthly_sale: boolean;
  links: null | any; // Adjust `any` if more details are known about `links`
};

export type DataType = {
  ID: string;
  AccountID: string;
  FeatureID: string;
  FeatureShopID: string;
  PaymentIntentID: string;
  PaymentType: string;
  CreatedAt: string;
  UpdatedAt: string;
  owner: Owner;
  feature_shop: FeatureShop;
};
