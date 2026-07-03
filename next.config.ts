import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  allowedDevOrigins: [process.env.HOST_IP!],
  devIndicators: false,
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;