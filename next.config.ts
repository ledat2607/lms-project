import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  ignoreBuildErrors: true,
  images: {
    domains: [
      "lms-project-datn.t3.storage.dev",
      "avatars.githubusercontent.com",
    ],
  },
};

export default nextConfig;
