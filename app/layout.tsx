import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Inter, Young_Serif } from "next/font/google";
import { site } from "@/content/site";
import { ContactIcons, Logo } from "@/components/ui";
import { BackToTop } from "@/components/BackToTop";
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
  areaServed: "NL",
  founder: { "@type": "Person", name: site.owner },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="nl" className={`${inter.variable} ${youngSerif.variable} antialiased`}>
      <body id="top" className="flex min-h-screen flex-col bg-white text-ink">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* The header lives inside the hero (app/page.tsx), so it sits on the green like Menno's sketch */}
        <main className="flex-1">{children}</main>

        <BackToTop />

        <footer className="border-t border-white/15 bg-forest px-4 py-12 text-sm text-white/80 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <Logo name={site.name} dark className="h-9" />
              {/* Indented to line up with the wordmark: it starts at 16% of the 318px-wide logo */}
              <p className="mt-2 pl-[3.2rem] text-xs text-white/60">{site.owner}</p>
            </div>
            <p className="max-w-md">{site.disclaimer}</p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <ContactIcons />
              <Link href="#" className="underline underline-offset-4 hover:text-white">
                Privacyverklaring
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
