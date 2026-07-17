import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  allowedDevOrigins: process.env.HOST_IP
    ? [process.env.HOST_IP]
    : [],
  devIndicators: false,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;