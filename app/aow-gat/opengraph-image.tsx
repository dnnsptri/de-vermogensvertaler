import { brandOgImage, ogSize } from "@/components/og";
import { site } from "@/content/site";
import { aowGat as c } from "@/content/tools";

// Share image for this tool, e.g. when a link goes round in WhatsApp
export const alt = `${c.title}, ${site.name}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return brandOgImage({ kicker: `${c.eyebrow}, ${site.name}`, lines: c.og });
}
