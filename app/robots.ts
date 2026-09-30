import type { MetadataRoute } from "next";
import { site } from "@/content/site";

// Crawlers only get the green light on the production deployment
export default function robots(): MetadataRoute.Robots {
  const indexable = process.env.VERCEL_ENV === "production";
  return {
    rules: indexable ? { userAgent: "*", allow: "/" } : { userAgent: "*", disallow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
