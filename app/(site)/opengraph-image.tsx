import { brandOgImage, ogSize } from "@/components/og";
import { home, site } from "@/content/site";

// Share image for the homepage: the hero headline, one sentence per line
export const alt = `${site.name}: ${site.tagline}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return brandOgImage({ lines: home.hero.title.map((lines) => lines.join(" ")) });
}
