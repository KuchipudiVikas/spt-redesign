import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  typescript: {
    // Ignore TypeScript build errors
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      "placehold.co",
      "sptmedia.nyc3.cdn.digitaloceanspaces.com",
      "lh3.googleusercontent.com",
      "coverimages.nyc3.digitaloceanspaces.com",
      "m.media-amazon.com",
      "pub-5da859198666414bbca8c7866fa6d266.r2.dev",
      "booksbytitans-bucket.sgp1.digitaloceanspaces.com",
      "images-na.ssl-images-amazon.com",
      "booksbytitans-bucket.sgp1.cdn.digitaloceanspaces.com",
    ],
  },
};

export default nextConfig;
