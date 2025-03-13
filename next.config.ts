import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ["@clerk/nextjs"],
  },
  transpilePackages: ["@clerk/nextjs"],
};

export default nextConfig;
