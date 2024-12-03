import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  typescript: {
    // Ignore TypeScript build errors
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["placehold.co"],
  },
};

export default nextConfig;
