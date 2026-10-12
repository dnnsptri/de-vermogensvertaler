import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// iOS home-screen icon: the favicon (app/icon.svg) rendered as a 180px PNG, since iOS ignores SVG icons.
// iOS rounds the corners itself, so the tile's own rounding is clipped away by the full-bleed green.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const svg = await readFile(join(process.cwd(), "app/icon.svg"), "utf8");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#275139" }}>
        <img src={`data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`} width={180} height={180} alt="" />
      </div>
    ),
    size,
  );
}
