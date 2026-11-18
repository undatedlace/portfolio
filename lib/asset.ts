// Prefix public-folder URLs with the basePath when deployed under a sub-path, and add a per-build
// version so a replaced file (like resume.pdf) is never served from a stale browser cache.
export const asset = (path: string) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/${path.replace(/^\//, "")}?v=${process.env.NEXT_PUBLIC_BUILD_ID || "dev"}`;
