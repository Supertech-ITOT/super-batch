import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.1.126"],
  devIndicators: false,
  images: { unoptimized: true },
  trailingSlash: true,
  output: "standalone",
};

export default nextConfig;
