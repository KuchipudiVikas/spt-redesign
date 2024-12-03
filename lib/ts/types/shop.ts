export interface Features {
  simple: string[];
  full: {
    query: string;
    data: string[];
    total: number;
    name: string;
    status: number;
  };
}

type Feature = {
  _id: string;
};

type DisplayImage = {
  _id: string;
  url: string;
};

type Link = {
  text: string;
  url: string;
};

export type ProductData = {
  isSale: boolean;
  video_url: string;
  features: Feature[];
  isMultiShop: boolean;
  featureShops: any[]; // You can replace `any` with a more specific type if needed
  isOnShop: boolean;
  index: number;
  mode: "both" | string; // If `mode` has specific values, you can list them as a union type
  trial_period_days: number;
  monthly_price: number;
  yearly_price: number;
  buy_page: string;
  subscription_shops: any[]; // Replace `any` with a more specific type if needed
  cross_sale_price: number;
  feature_type: string;
  related: any[]; // Replace `any` with a more specific type if needed
  _id: string;
  Description: string;
  Title: string;
  sale_price: number;
  price: number;
  published_at: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  created_by: string;
  displayImage: DisplayImage;
  updated_by: string;
  price_id: string;
  monthly_price_id: string;
  yearly_price_id: string;
  s_product_id: string;
  links: Link[];
  subscription_package_name: string;
  monthly_sale_price: number;
  is_monthly_sale: boolean;
  isLifetimeOwned: boolean;
  id: string;
};

type FeatureId = {
  _id: string;
  feature_name: string;
  feature_id: string;
  published_at: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  created_by: string;
  updated_by: string;
  id: string;
};

export type PurchasedProduct = {
  payment_service: string;
  _id: string;
  account: string;
  feature_id: FeatureId;
  feature_shop: string;
  payment_intent: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
  id: string;
};
