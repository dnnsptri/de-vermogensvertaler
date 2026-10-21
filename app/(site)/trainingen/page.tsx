import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { trainingen as c, trainingHref } from "@/content/trainingen";
import { card, PageHero } from "@/components/tools";
import { Arrow, Button } from "@/components/ui";

// Overview of all trainings. Out of search engines (noindex, not in the sitemap) until there are two or more.
// The menu links here while there is none (shows the "binnenkort" text) or two or more; with exactly one it
// links straight to that training (trainingLink in content/trainingen.ts).
const listed = c.items.length > 1;

export const metadata: Metadata = {
  title: c.title,
  description: c.lede,
  alternates: { canonical: c.path },
  ...(!listed && { robots: { index: false, follow: false } }),
};

export default function Trainingen() {
  return (
    <>
      <PageHero eyebrow={c.eyebrow} heading={c.heading} lede={c.lede} />
      <section className="bg-cream px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto max-w-5xl">
          {c.items.length ? (
            <ul className="grid gap-6 md:grid-cols-2">
              {c.items.map((t) => (
                <li key={t.slug}>
                  {/* Whole card is the link; the arrow slides on hover like the buttons */}
                  <Link href={trainingHref(t)} className={`${card} group flex h-full flex-col gap-4`}>
                    <p className="text-sm font-semibold text-forest">{t.when}</p>
                    <h2 className="text-3xl text-forest md:text-4xl">{t.title}</h2>
                    <p className="text-lg text-ink/75">{t.summary}</p>
                    <span className="mt-auto flex items-center gap-2 pt-4 font-semibold text-forest">
                      Bekijk de training
                      <Arrow className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className={`${card} flex flex-col items-start gap-6`}>
              <p className="text-lg">{c.empty}</p>
              <Button href={`/${site.booking.href}`}>{site.booking.label}</Button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
