import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { detailPages, getDetailPage, home } from "@/content/site";
import { BookingCta, Button, Eyebrow, Photo, Section } from "@/components/ui";
import { Scan } from "@/components/Scan";

// One template for all four detail pages. Only the slot differs: a scan or a price block.
export const dynamicParams = false;

export function generateStaticParams() {
  return detailPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const page = getDetailPage((await params).slug);
  if (!page) return {};
  // Title gets the site-name suffix from the layout template
  return {
    title: page.title,
    description: page.intro,
    alternates: { canonical: `/${page.slug}` },
    openGraph: { title: page.title, description: page.intro, url: `/${page.slug}` },
  };
}

export default async function DetailPage({ params }: PageProps<"/[slug]">) {
  const page = getDetailPage((await params).slug);
  if (!page) notFound();

  return (
    <>
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-24">
          <div>
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{page.title}</h1>
            <p className="mt-6 text-lg text-neutral-700">{page.intro}</p>
            <div className="mt-8">
              <Button href="#aan-de-slag">{page.cta}</Button>
            </div>
          </div>
          <Photo {...page.photo} />
        </div>
      </Section>

      <Section tone="grey">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold">{page.problem.title}</h2>
          {page.problem.body.map((p) => (
            <p key={p} className="mt-4 text-lg text-neutral-700">
              {p}
            </p>
          ))}
        </div>
      </Section>

      {/* The slot */}
      <Section id="aan-de-slag">
        <div className="mx-auto max-w-2xl">
          {page.scan && <Scan {...page.scan} />}
          {page.price && (
            <div className="border border-black p-6 text-center md:p-10">
              <p className="font-semibold">{page.title}</p>
              <p className="mt-2 text-5xl font-semibold">{page.price.amount}</p>
              <p className="mt-2 text-neutral-600">{page.price.note}</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href={page.price.payOnce}>In één keer betalen</Button>
                {page.price.payInstallments && (
                  <Button href={page.price.payInstallments} variant="outline">
                    In termijnen betalen
                  </Button>
                )}
              </div>
              <p className="mt-4 text-sm text-neutral-500">Veilig betalen met iDEAL of creditcard</p>
            </div>
          )}
        </div>
      </Section>

      <Section tone="grey">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold">Dit is voor jou als</h2>
            <ul className="mt-6 space-y-3">
              {page.forYou.map((item) => (
                <li key={item} className="border-t border-black pt-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Wat je krijgt</h2>
            <ul className="mt-6 space-y-3">
              {page.youGet.map((item) => (
                <li key={item} className="border-t border-black pt-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section>
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="text-2xl font-semibold md:text-3xl">&ldquo;{page.quote.text}&rdquo;</blockquote>
          <figcaption className="mt-4 text-neutral-600">{page.quote.name}</figcaption>
        </figure>
      </Section>

      <Section tone="grey">
        <h2 className="text-3xl font-semibold">Veelgestelde vragen</h2>
        <div className="mt-8 max-w-3xl divide-y divide-black border-y border-black">
          {page.faq.map((item) => (
            <details key={item.q} className="group py-4">
              <summary className="cursor-pointer font-semibold">{item.q}</summary>
              <p className="mt-3 text-neutral-700">{item.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <BookingCta {...home.booking} />
    </>
  );
}
