import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { aowGat, pensioencheck } from "@/content/tools";
import { trainingen, trainingHref } from "@/content/trainingen";

// Homepage plus the two tools; the detail pages return with the content in tag wireframe-7blocks
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    ...[pensioencheck.path, aowGat.path].map((path) => ({ url: site.url + path, priority: 0.8 })),
    // Training pages; the overview only once there are two or more (see app/trainingen/page.tsx)
    ...trainingen.items.map((t) => ({ url: site.url + trainingHref(t), priority: 0.8 })),
    ...(trainingen.items.length > 1 ? [{ url: site.url + trainingen.path, priority: 0.7 }] : []),
  ];
}
