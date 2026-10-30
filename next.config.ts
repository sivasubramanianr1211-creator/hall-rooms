import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Plain HTML in out/ for Cloudflare Pages or Vercel. Cache Components and
  // Partial Prefetching are left off: they need a server and break export.
  output: "export",
  images: { unoptimized: true },
  // English and Tamil have separate root layouts, so the 404 page needs its own.
  experimental: { globalNotFound: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
