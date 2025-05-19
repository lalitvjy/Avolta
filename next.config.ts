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
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
        },
      },
    });
    return config;
  },
};

export default nextConfig;
