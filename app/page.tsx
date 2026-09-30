import Image from "next/image";
import { Carousel } from "@/components/Carousel";
import Link from "next/link";
import { home, site } from "@/content/site";
import {
  BookingCta,
  Button,
  Eyebrow,
  Photo,
  Section,
  SocialLinks,
} from "@/components/ui";

export default function Home() {
  const {
    hero,
    banner,
    scans,
    problem,
    notNeeded,
    about,
    offer,
    quote,
    booking,
  } = home;

  return (
    <>
      {/* Hero: the visitor's question first, Alberta second (StoryBrand) */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-24">
          <div>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="text-[2.8125rem] font-semibold leading-tight md:text-[3.75rem]">
              {hero.title}
            </h1>
            <p className="mt-6 text-lg text-neutral-700">{hero.intro}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <Button href={hero.primary.href}>{hero.primary.label}</Button>
              <Link href={hero.secondary.href} className="font-medium underline underline-offset-4 hover:no-underline">
                {hero.secondary.label}
              </Link>
            </div>
          </div>
          <Photo {...hero.photo} />
        </div>
      </Section>

      {/* Running ticker: two identical halves so the loop is seamless; screen readers get the text once */}
      <div className="ticker-tilt">
        <Link
          href="#"
          aria-label={banner}
          className="block overflow-hidden bg-black py-3 text-sm text-white"
        >
          <div aria-hidden className="ticker flex w-max">
            {[0, 1].map((half) => (
              <span key={half} className="flex shrink-0">
                {Array.from({ length: 6 }, (_, i) => (
                  <span key={i} className="px-6">
                    {banner}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </Link>
      </div>

      <Section id="scans">
        <h2 className="text-3xl font-semibold">{scans.title}</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {scans.items.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-card border border-black p-8 hover:bg-neutral-100"
            >
              {/* Same illustration as the scan's own page, small */}
              <div className="relative mb-6 h-24 w-full">
                <Image src={s.icon} alt="" fill sizes="10rem" className="object-contain object-right" />
              </div>
              <h3 className="text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-neutral-700">{s.text}</p>
              <p className="mt-6 font-medium underline underline-offset-4">
                Start gratis
              </p>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href={scans.coaching.href} variant="outline">
            {scans.coaching.label}
          </Button>
        </div>
      </Section>

      <Section tone="grey">
        <h2 className="max-w-2xl text-3xl font-semibold">{problem.title}</h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {problem.steps.map((step, i) => (
            <li key={step.title}>
              <p className="font-display text-6xl font-semibold text-neutral-300">
                0{i + 1}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="mt-2 text-neutral-700">{step.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-24">
          <div>
            <h2 className="text-3xl font-semibold">{notNeeded.title}</h2>
            <ul className="mt-10 grid gap-6">
              {notNeeded.items.map((item) => (
                <li key={item.title} className="border-t border-black pt-4">
                  <h3 className="text-xl font-semibold line-through decoration-1">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-neutral-700">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <Photo {...notNeeded.illustration} />
        </div>
      </Section>

      <Section tone="grey">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-24">
          <Photo {...about.photo} />
          <div>
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <h2 className="text-3xl font-semibold">{about.title}</h2>
            {about.body.map((p) => (
              <p key={p} className="mt-4 text-neutral-700">
                {p}
              </p>
            ))}
            <div className="mt-8">
              <SocialLinks links={site.social} />
            </div>
          </div>
        </div>
      </Section>

      {/* Six 2:3 cards in one row: starts on the content edge, bleeds off the right and scrolls sideways */}
      <section className="bg-white py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-3xl font-semibold">{offer.title}</h2>
        </div>
        <Carousel
          label={offer.title}
          className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pr-4 pl-[max(1rem,calc((100vw-64rem)/2+1rem))] scroll-pl-[max(1rem,calc((100vw-64rem)/2+1rem))]"
        >
          {[
            ...offer.free.map((o) => ({
              ...o,
              group: "Gratis",
              price: undefined as string | undefined,
            })),
            ...offer.paid.map((o) => ({ ...o, group: "Training" })),
          ].map((o) => {
            const paid = o.price !== undefined;
            return (
              <li key={o.title} className="w-60 shrink-0 snap-start md:w-64">
                <Link
                  href={o.href}
                  className={`flex aspect-[2/3] flex-col rounded-card p-6 transition-colors ${
                    paid
                      ? "bg-black text-white hover:bg-neutral-800"
                      : "border border-black hover:bg-neutral-100"
                  }`}
                >
                  <p
                    className={`text-sm font-medium ${paid ? "text-neutral-400" : "text-neutral-500"}`}
                  >
                    {o.group}
                  </p>
                  {/* Black line art turns white on the dark paid cards */}
                  <div className="relative my-4 flex-1">
                    <Image src={o.icon} alt="" fill sizes="16rem" className={`scale-[0.85] object-contain ${paid ? "invert" : ""}`} />
                  </div>
                  <p className="mt-auto text-xl font-semibold">{o.title}</p>
                  {paid && (
                    <p className="mt-1 text-2xl font-semibold">{o.price}</p>
                  )}
                  <p
                    className={`mt-2 ${paid ? "text-neutral-300" : "text-neutral-700"}`}
                  >
                    {o.text}
                  </p>
                </Link>
              </li>
            );
          })}
        </Carousel>
      </section>

      <Section tone="grey">
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="text-2xl font-semibold md:text-3xl">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-4 text-neutral-600">
            {quote.name}
          </figcaption>
        </figure>
      </Section>

      <BookingCta {...booking} />
    </>
  );
}
