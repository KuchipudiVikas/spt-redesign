import { NextFederationPlugin } from "@module-federation/nextjs-mf";

// import type { NextConfig } from "next";

const nextConfig = {
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

  webpack: function (config, options) {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    });
    // config.output.publicPath = "auto";
    // if (!options.isServer) {
    //   config.plugins.push(
    //     new NextFederationPlugin({
    //       name: "spt",
    //       library: { type: "var", name: "spt" },
    //       filename: "static/chunks/remoteEntry.js",
    //       // List of remotes to load from
    //       remotes: {
    //         // Key is the name of the remote, value is the URL (including protocol and port)
    //       },
    //       // List of shared modules to share between remotes
    //       shared: {
    //         tailwindcss: {
    //           eager: true,
    //           singleton: true,
    //           requiredVersion: false,
    //         },
    //       },
    //       exposes: {
    //         "./tools": "./components/MainPage/Menu/MenuComponent",
    //       },
    //     })
    //   );
    // }

    return config;
  },
};

export default nextConfig;
