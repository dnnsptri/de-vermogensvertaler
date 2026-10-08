import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Homepage only for now; the detail pages return with the content in tag wireframe-7blocks
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: site.url, priority: 1 }];
}
