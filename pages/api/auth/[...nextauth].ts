import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/auth.options";

const allowedOrigins = [
  "http://localhost:3001",
  "https://community.selfpublishingtitans.com",
  "https://spt-admin-app.vercel.app",
];

const handler = async (req, res) => {
  const requestOrigin = req.headers.origin;

  if (allowedOrigins.includes(requestOrigin)) {
    res.setHeader("Access-Control-Allow-Origin", requestOrigin); // Allow requests from the specific origin
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*"); // Fallback to allow all origins (not recommended with credentials)
  }

  res.setHeader("Access-Control-Allow-Credentials", "true"); // Enable sending cookies
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE"); // Allow specific HTTP methods
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Allow specific headers

  if (req.method === "OPTIONS") {
    // Respond to preflight requests (OPTIONS method)
    return res.status(200).end();
  }

  return NextAuth(req, res, authOptions);
};

export default handler;
