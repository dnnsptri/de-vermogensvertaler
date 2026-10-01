import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import { site } from "@/content/site";
import { Logo, Newsletter } from "@/components/ui";
import { BackToTop } from "@/components/BackToTop";
import { Nav } from "@/components/Nav";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

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
    <html lang="nl" className={`${inter.variable} antialiased`}>
      <body id="top" className="flex min-h-screen flex-col bg-white text-black">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <header className="border-b border-black px-4">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 py-4">
            <Link href="/">
              <Logo name={site.name} />
            </Link>
            <Nav items={site.nav} />
          </div>
        </header>

        <main className="flex-1">{children}</main>

        <Newsletter {...site.newsletter} />
        <BackToTop />

        <footer className="border-t border-black px-4 py-10 text-sm">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:justify-between">
            <div>
              <Logo name={site.name} />
              {/* Indented to line up with the name, past the 32px mark and 8px gap */}
              <p className="mt-1 pl-10 text-xs text-neutral-500">{site.owner}</p>
            </div>
            <p className="max-w-md text-neutral-600">{site.disclaimer}</p>
            <Link href="#" className="underline underline-offset-4">
              Privacyverklaring
            </Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
