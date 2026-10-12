import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "@/content/site";

// One share-image design (WhatsApp, LinkedIn etc.) for every page: brand green, small white kicker,
// mustard headline lines, Alberta on the right. Each page's opengraph-image.tsx only passes its words.
// Fonts are the site's own (Young Serif headline, Inter kicker) as TTF in assets/fonts: ImageResponse
// can't read the woff2 files next/font serves. Both are SIL Open Font License, from Google Fonts.
export const ogSize = { width: 1200, height: 630 };

export async function brandOgImage({ kicker = site.name, lines }: { kicker?: string; lines: string[] }) {
  const file = (path: string) => readFile(join(process.cwd(), path));
  const [photo, serif, sans] = await Promise.all([
    file("public/photos/alberta-tafel.jpg"),
    file("assets/fonts/YoungSerif-Regular.ttf"),
    file("assets/fonts/Inter-Regular.ttf"),
  ]);
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#173326", fontFamily: "Inter" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 64px" }}>
          <div style={{ fontSize: 30, color: "#ffffff", opacity: 0.85 }}>{kicker}</div>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{ fontFamily: "Young Serif", fontSize: 60, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#e3b63f", marginTop: i === 0 ? 24 : 0 }}
            >
              {line}
            </div>
          ))}
        </div>
        {/* ImageResponse renders plain <img>; next/image doesn't exist there */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={480} height={630} style={{ objectFit: "cover", objectPosition: "60% 30%" }} />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Young Serif", data: serif, weight: 400, style: "normal" },
        { name: "Inter", data: sans, weight: 400, style: "normal" },
      ],
    },
  );
}
