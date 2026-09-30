import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 100],
  },
  experimental: {
    turbopackFileSystemCacheForBuild: false,
  },
};
export default nextConfig;