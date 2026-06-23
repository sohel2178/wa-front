import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wa-backend.sultantracker.com",
      },
    ],
  },
};

export default nextConfig;
