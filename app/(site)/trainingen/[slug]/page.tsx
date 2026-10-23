import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mailto, site } from "@/content/site";
import { trainingen, trainingHref } from "@/content/trainingen";
import { card, PageHero } from "@/components/tools";
import { Button, TextLink } from "@/components/ui";

// One page per training in content/trainingen.ts, built at deploy time; unknown slugs are a 404
export const dynamicParams = false;
export const generateStaticParams = () => trainingen.items.map((t) => ({ slug: t.slug }));

const find = async (params: Promise<{ slug: string }>) => {
  const { slug } = await params;
  return trainingen.items.find((t) => t.slug === slug) ?? notFound();
};

export async function generateMetadata({ params }: PageProps<"/trainingen/[slug]">): Promise<Metadata> {
  const t = await find(params);
  return {
    title: t.title,
    description: t.lede,
    alternates: { canonical: trainingHref(t) },
    openGraph: { type: "website", locale: "nl_NL", siteName: site.name, url: trainingHref(t) },
  };
}

export default async function Training({ params }: PageProps<"/trainingen/[slug]">) {
  const t = await find(params);
  // Course structured data: search engines and AI assistants see what the training is and who gives it.
  // No price here: the facts are free text Alberta edits, a copied number would drift.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: t.title,
    description: [t.lede, ...t.intro].join(" "),
    url: site.url + trainingHref(t),
    inLanguage: "nl",
    provider: { "@type": "Organization", name: site.name, url: site.url },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero eyebrow={t.eyebrow} heading={t.title} lede={t.lede} />
      <section className="bg-cream px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto grid max-w-5xl gap-6">
          <div className={`${card} space-y-5 text-lg md:text-xl`}>
            {t.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className={card}>
            <h2 className="text-3xl text-forest md:text-4xl">{t.benefitsTitle}</h2>
            <ul className="mt-6 space-y-3 text-lg">
              {t.benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span aria-hidden className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-mustard" />
                  {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-5 text-lg text-ink/80">
              {t.outro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>

          {/* Practical facts and the sign-up, on green like the booking section */}
          <div className="rounded-[1.5rem] bg-forest p-6 text-white md:rounded-[2rem] md:p-10">
            <dl className="grid gap-6 md:grid-cols-3">
              {t.facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-sm font-semibold uppercase tracking-wide text-mustard">{f.label}</dt>
                  <dd className="mt-2 text-lg">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Button href={t.signup.href || mailto(t.signup.subject)}>{t.signup.label}</Button>
              <span className="text-white/85">
                Liever eerst kennismaken?{" "}
                <TextLink href={`/${site.booking.href}`} dark>
                  {site.booking.label}
                </TextLink>
              </span>
            </div>
          </div>

          {t.footnote && <p className="text-sm text-ink/60">{t.footnote}</p>}
        </div>
      </section>
    </>
  );
}
