import Image from "next/image";
import Link from "next/link";
import { home, site } from "@/content/site";
import { BookingCta, Button, Eyebrow, Photo, Section, SocialLinks } from "@/components/ui";

// 7 blocks: hero, recognition, working with me, about, testimonial, free test, booking.
// One main call to action (intro call); the free test is the low-threshold alternative.
export default function Home() {
  const { hero, recognition, work, about, quote, freeTest, booking } = home;

  return (
    <>
      {/* 1. Hero */}
      <Section>
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-24">
          <div>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="text-4xl font-semibold leading-tight md:text-5xl">{hero.title}</h1>
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

      {/* 2. Recognition */}
      <Section tone="grey">
        <h2 className="text-3xl font-semibold">{recognition.title}</h2>
        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {recognition.items.map((item) => (
            <li key={item.title} className="border-t border-black pt-4">
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-neutral-700">{item.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* 3. Working with me: three offers, no prices on the homepage */}
      <Section id="werken-met-mij">
        <Eyebrow>{work.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-semibold">{work.title}</h2>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {work.items.map((item) => (
            <li key={item.title}>
              <Link href={item.href} className="flex h-full flex-col border border-black p-6 hover:bg-neutral-100">
                <div className="relative h-28">
                  <Image src={item.icon} alt="" fill sizes="12rem" className="object-contain object-left" />
                </div>
                <p className="mt-6 text-sm text-neutral-500">{item.format}</p>
                <h3 className="mt-1 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 flex-1 text-neutral-700">{item.text}</p>
                <p className="mt-6 font-medium underline underline-offset-4">{item.link}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      {/* 4. About */}
      <Section id="over-mij" tone="grey">
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

      {/* 5. Testimonial */}
      <Section>
        <figure className="mx-auto max-w-3xl text-center">
          <blockquote className="text-2xl font-semibold md:text-3xl">&ldquo;{quote.text}&rdquo;</blockquote>
          <figcaption className="mt-4 text-neutral-600">{quote.name}</figcaption>
        </figure>
      </Section>

      {/* 6. Free test: the two scans as one lead magnet (email capture follows with the real scans) */}
      <Section id="gratis-test" tone="grey">
        <Eyebrow>{freeTest.eyebrow}</Eyebrow>
        <h2 className="text-3xl font-semibold">{freeTest.title}</h2>
        <p className="mt-4 max-w-2xl text-neutral-700">{freeTest.text}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {freeTest.items.map((s) => (
            <Link key={s.href} href={s.href} className="border border-black bg-white p-8 hover:bg-neutral-100">
              <div className="relative mb-6 h-24 w-full">
                <Image src={s.icon} alt="" fill sizes="10rem" className="object-contain object-right" />
              </div>
              <h3 className="text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-neutral-700">{s.text}</p>
              <p className="mt-6 font-medium underline underline-offset-4">Start gratis</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* 7. Booking */}
      <BookingCta {...booking} />
    </>
  );
}
