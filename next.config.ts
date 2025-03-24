import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "images.shopdutyfree.com",
      "avolta-glasses.s3.amazonaws.com",
      "mirrar-medialibrary.s3.amazonaws.com",
      "mirrar-medialibrary.s3.ap-south-1.amazonaws.com",
    ],
  },
};

export default nextConfig;
