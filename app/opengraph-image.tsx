import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

// Share image for WhatsApp, LinkedIn etc.: brand green, mustard headline, Alberta on the right
export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/photos/alberta-tafel.jpg"));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#173326" }}>
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px" }}
        >
          <div style={{ fontSize: 30, color: "#ffffff", opacity: 0.85 }}>{site.name}</div>
          <div style={{ fontSize: 68, lineHeight: 1.05, color: "#e3b63f", marginTop: 24 }}>Je carrière staat.</div>
          <div style={{ fontSize: 68, lineHeight: 1.05, color: "#e3b63f" }}>Nu je vermogen nog.</div>
        </div>
        <img src={src} alt="" width={480} height={630} style={{ objectFit: "cover", objectPosition: "60% 30%" }} />
      </div>
    ),
    size,
  );
}
