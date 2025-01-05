import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors in production builds
    
  },
    output: 'export', // Enable static export
    
};

export default nextConfig;

