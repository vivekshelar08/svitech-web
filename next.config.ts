import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fresh build ID each deploy so Hostinger clients never hold stale chunks.
  generateBuildId: async () => {
    return process.env.BUILD_ID ?? `build-${Date.now()}`;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
