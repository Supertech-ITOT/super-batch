import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.120.1"],
  devIndicators: false,
  output: 'export',
  distDir: 'out',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;