import type { NextConfig } from "next";

// Static export for GitHub Pages. If the repo is NOT named <user>.github.io,
// set NEXT_PUBLIC_BASE_PATH=/<repo> at build time (e.g. in the deploy workflow).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  outputFileTracingRoot: __dirname,
  basePath,
  assetPrefix: basePath || undefined,
};

export default nextConfig;
