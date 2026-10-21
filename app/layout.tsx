import type { Metadata, Viewport } from "next";
import { Inter, Young_Serif } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
// Stand-in for the soft serif in Menno's sketch; swap once he names the real font
const youngSerif = Young_Serif({ variable: "--font-young-serif", subsets: ["latin"], weight: "400" });

// Only the production deployment may be indexed; previews and localhost stay out of search engines
const indexable = process.env.VERCEL_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "nl_NL", siteName: site.name, url: "/" },
  twitter: { card: "summary_large_image" },
  robots: { index: indexable, follow: indexable },
};

// viewport-fit=cover makes iOS report safe-area insets (used by the back-to-top button);
// theme colour tints the mobile browser bar in the hero green
export const viewport: Viewport = { viewportFit: "cover", themeColor: "#173326" };

// Structured data so search engines understand who is behind the site
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  url: site.url,
  email: site.email,
  areaServed: "NL",
  // sameAs links the profiles to this site, so search engines treat them as the same person
  founder: { "@type": "Person", name: site.owner, sameAs: site.social.filter((s) => s.href !== "#").map((s) => s.href) },
};

// Shared shell: fonts, metadata, structured data. The site chrome (footer, cookie bar) lives in
// app/(site)/layout.tsx, so the editor at /keystatic gets a clean screen without it.
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${inter.variable} ${youngSerif.variable} antialiased`}>
      <body id="top" className="flex min-h-screen flex-col bg-white text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {children}
      </body>
    </html>
  );
}
