import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Inter, Young_Serif } from "next/font/google";
import { site } from "@/content/site";
import { ContactIcons, Logo } from "@/components/ui";
import { BackToTop } from "@/components/BackToTop";
import { CookieConsent, CookieSettingsLink } from "@/components/CookieConsent";
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
        <CookieConsent />

        <footer className="border-t border-white/15 bg-forest px-4 py-12 text-sm text-white/80 md:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <Logo name={site.name} dark className="h-9" />
            <p className="max-w-md">{site.disclaimer}</p>
            {/* Icons on top, both legal links together underneath */}
            <div className="flex flex-col gap-4">
              <ContactIcons />
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link href={site.privacyHref} className="underline underline-offset-4 hover:text-white">
                  Privacyverklaring
                </Link>
                <CookieSettingsLink className="underline underline-offset-4 hover:text-white" />
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
