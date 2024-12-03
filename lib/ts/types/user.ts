import { Features } from "./shop";

export interface User {
  verified: boolean;
  type: number;
  source: string;
  is_blocked: boolean;
  _id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  username: string;
  id: string;
  has_past_due: boolean;
  features: Features;
}
