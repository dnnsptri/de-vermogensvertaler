import type { MetadataRoute } from "next";
import { detailPages, site } from "@/content/site";

// Home plus every detail page; new pages in content/site.ts appear here automatically
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...detailPages.map((p) => ({ url: `${site.url}/${p.slug}`, priority: p.kind === "scan" ? 0.9 : 0.8 })),
  ];
}
