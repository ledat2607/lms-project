import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.(js|ts|tsx)$/,
      exclude: /node_modules|C:\\Users\\ledat\\Application Data/,
    });
    return config;
  },
};

export default nextConfig;
