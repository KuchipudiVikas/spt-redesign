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
  image?: string;
}

export interface UserData {
  user: {
    name: string;
    email: string;
    image: string;
  };
  expires: string; // ISO date string
  name: string;
  email: string;
  picture: string;
  sub: string; // User's unique identifier
  verified: boolean;
  type: number;
  source: string; // e.g., "Email"
  is_blocked: boolean;
  _id: string;
  __v: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  google_id: string;
  image: string;
  username: string;
  is_admin: boolean;
  id: string;
  token: string;
  iat: number; // Issued at (timestamp)
  exp: number; // Expiration (timestamp)
  jti: string; // JWT ID
}
