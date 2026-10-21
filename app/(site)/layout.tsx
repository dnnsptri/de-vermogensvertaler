import Link from "next/link";
import { site } from "@/content/site";
import { ContactIcons, Logo } from "@/components/ui";
import { CookieConsent, CookieSettingsLink } from "@/components/CookieConsent";

// Chrome for every public page. The editor (/keystatic) sits outside this group, so it has no footer,
// cookie bar or Google Analytics.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      {/* The header lives inside the hero (app/(site)/page.tsx), so it sits on the green like Menno's sketch */}
      <main className="flex-1">{children}</main>

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
    </>
  );
}
