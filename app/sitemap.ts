import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://undatedlace.github.io";
  return [{ url: `${base}/`, lastModified: new Date() }];
}
