import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

// Share image for WhatsApp, LinkedIn etc.: name, tagline and Alberta's illustration
export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const art = await readFile(join(process.cwd(), "public/illustrations/alberta-portret-v2.png"));
  const src = `data:image/png;base64,${art.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "white", padding: 72 }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>{site.name}</div>
          <div style={{ fontSize: 36, marginTop: 24, color: "#525252" }}>{site.tagline}</div>
        </div>
        <div style={{ width: 400, display: "flex", alignItems: "flex-end", background: "#e5e5e5" }}>
          <img src={src} alt="" width={400} height={538} style={{ objectFit: "contain" }} />
        </div>
      </div>
    ),
    size,
  );
}
