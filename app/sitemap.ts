import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { aowGat, pensioencheck } from "@/content/tools";

// Homepage plus the two tools; the detail pages return with the content in tag wireframe-7blocks
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...[pensioencheck.path, aowGat.path].map((path) => ({ url: site.url + path, priority: 0.8 })),
  ];
}
