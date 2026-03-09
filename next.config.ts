import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/web-gia-vang-trong-nuoc",
  assetPrefix: "/web-gia-vang-trong-nuoc/",
};

export default nextConfig;
