import Image from "next/image";
import Link from "next/link";
import { home, site } from "@/content/site";
import { Button, Emph, Eyebrow, Logo, Pattern, TextLink } from "@/components/ui";
import { CalEmbed } from "@/components/CalEmbed";

// Simple StoryBrand homepage: hero, voor wie, wat ik doe, over Alberta, succes, kennismaken.
// One call to action throughout: the free intro call (Cal.com). Motion lives in globals.css.
export default function Home() {
  const { hero, forWhom, what, who, success, booking } = home;

  return (
    <>
      {/* 1. Hero: full-screen photo, giant headline rising in, one primary action */}
      <section className="relative flex flex-col overflow-clip bg-forest-deep text-white md:h-[100svh] md:min-h-[40rem]">
        {/* Photo: top of the screen on mobile (text below, never over her face); from md up the right 60%,
            fading into the green so it still reads as one image */}
        <div className="hero-zoom hero-photo relative h-[58svh] md:absolute md:inset-y-0 md:left-auto md:right-0 md:h-auto md:w-[60%]">
          {/* Parallax layer: 20% taller than its frame so the drift never shows an edge */}
          <div className="parallax absolute inset-x-0 -inset-y-[10%]">
            <Image
              src={hero.photo.src}
              alt={hero.photo.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover object-[62%_28%]"
            />
          </div>
        </div>
        {/* Light green floor under the text from md up */}
        <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-t from-forest-deep/60 to-transparent md:block" />

        <header className="fade-up absolute inset-x-0 top-0 z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-6 md:relative md:px-8">
          <Link href="/" aria-label={`${site.name}, naar boven`}>
            <Logo name={site.name} dark />
          </Link>
          {/* Right slot stays empty until the Pensioencheck is live; then Alberta's "Pensioencheck" link goes here */}
        </header>

        <div className="relative mx-auto -mt-8 w-full max-w-7xl px-4 pb-16 md:my-auto md:px-8 md:pb-[6svh] md:pt-0">
          <h1 className="hero-title">
            {hero.title.flatMap((sentence, s) =>
              sentence.map((line, l) => (
                // Mask for the rise animation: bottom padding leaves room for descenders (g, j),
                // the negative margin cancels it out so the line spacing stays the same
                <span key={line} className="-mb-[0.14em] block overflow-hidden whitespace-nowrap pb-[0.22em]">
                  <span
                    className={`rise ${s === 1 ? "text-mustard" : ""}`}
                    style={{ "--d": `${150 + (s * 2 + l) * 110}ms` } as React.CSSProperties}
                  >
                    {line}
                  </span>
                </span>
              )),
            )}
          </h1>
          <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
            <p className="fade-up max-w-md text-lg text-white/85 md:text-xl" style={{ "--d": "550ms" } as React.CSSProperties}>
              {hero.intro}
            </p>
            <div className="fade-up flex flex-wrap items-center gap-x-8 gap-y-4" style={{ "--d": "700ms" } as React.CSSProperties}>
              <Button href={site.booking.href}>{site.booking.label}</Button>
              <TextLink href={hero.secondary.href} dark>
                {hero.secondary.label}
              </TextLink>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div aria-hidden className="absolute bottom-0 left-1/2 hidden h-10 w-px overflow-hidden bg-white/20 md:block">
          <span className="cue block h-full w-full bg-mustard" />
        </div>
      </section>

      {/* 2. Voor wie: three statements at headline size, colouring in as you scroll */}
      <section className="px-4 py-16 md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <Eyebrow>{forWhom.eyebrow}</Eyebrow>
          <h2 className="reveal text-section text-forest">
            <Emph text={forWhom.title} />
          </h2>
          <ul className="mt-14 border-t border-forest/15">
            {forWhom.items.map((item) => (
              <li
                key={item.title}
                className="scrub grid gap-3 border-b border-forest/15 py-8 md:grid-cols-[1fr_22rem] md:items-end md:gap-16 md:py-14"
              >
                <h3 className="text-[clamp(2rem,5.2vw,5.25rem)] leading-[1] text-forest">{item.title}</h3>
                <p className="text-lg text-ink/70">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Wat ik doe: four steps as cards that stack while you scroll, then what she doesn't do */}
      <section className="relative overflow-x-clip bg-cream px-4 py-16 md:px-8 md:py-36">
        <Pattern className="turn -right-48 top-10 h-[46rem] w-[46rem] md:-right-24" />
        <div className="relative mx-auto max-w-7xl">
          <div className="reveal max-w-5xl">
            <Eyebrow>{what.eyebrow}</Eyebrow>
            <h2 className="text-display text-forest">
              <Emph text={what.title} />
            </h2>
            <p className="mt-8 max-w-xl text-lg text-ink/75 md:text-xl">{what.intro}</p>
          </div>

          <ol className="mt-16 md:mt-24">
            {what.steps.map((step, i) => {
              // One card per brand colour; each sticks a little lower so they stack visibly
              const tone = [
                "bg-white text-forest",
                "bg-forest text-white",
                "bg-mustard text-ink",
                "bg-ink text-white",
              ][i];
              const num = ["text-mustard bg-forest", "text-ink bg-mustard", "text-mustard bg-ink", "text-ink bg-mustard"][i];
              return (
                <li
                  key={step.title}
                  className={`sticky mb-4 rounded-[1.5rem] p-6 shadow-[0_-12px_40px_-24px_rgba(21,22,16,0.35)] md:mb-6 md:min-h-[20rem] md:rounded-[2rem] md:p-14 ${tone}`}
                  style={{ top: `calc(5rem + ${i * 1.75}rem)` }}
                >
                  {/* Mobile: small number above the title so the title gets the full card width.
                      From md up: side by side, number and title on one baseline */}
                  <div className="flex flex-col items-start gap-4 md:flex-row md:items-baseline md:gap-12">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-serif text-2xl md:h-28 md:w-28 md:text-5xl ${num}`}>
                      {i + 1}
                    </span>
                    <h3 className="text-[clamp(2rem,4.5vw,4.5rem)] leading-[1]">{step.title}</h3>
                  </div>
                  <div className="mt-3 md:mt-4 md:pl-40">
                    {/* One sentence per line from md up, so the lines break where the thought breaks */}
                    <p className="text-lg opacity-80 md:text-xl">
                      {step.text.split(/(?<=[.?!])\s+/).map((sentence) => (
                        <span key={sentence} className="md:block">
                          {sentence}{" "}
                        </span>
                      ))}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>

          {/* What she doesn't do: the boundary that keeps her out of advice (her words) */}
          <div className="reveal mt-16 grid gap-6 border-t border-forest/20 pt-12 md:mt-24 md:grid-cols-[1fr_2fr] md:gap-16">
            <h3 className="text-[clamp(2rem,3.5vw,3.25rem)] leading-[1] text-forest">{what.not.title}</h3>
            <p className="text-lg text-ink/80 md:text-xl">{what.not.text}</p>
          </div>
        </div>
      </section>

      {/* 4. Over Alberta: the portrait opens up, track record as large figures */}
      <section id="over" className="scroll-mt-8 px-4 py-16 md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl items-center gap-14 md:grid-cols-[5fr_6fr] md:gap-24">
          <div className="unveil relative aspect-[4/5] overflow-hidden rounded-3xl">
            <Image
              src={who.photo.src}
              alt={who.photo.alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-top"
            />
          </div>
          <div className="reveal">
            <Eyebrow>{who.eyebrow}</Eyebrow>
            <h2 className="text-[clamp(2rem,5vw,5rem)] leading-[1] text-forest">
              <Emph text={who.title} />
            </h2>
            {who.body.map((p) => (
              <p key={p} className="mt-6 text-lg text-ink/75">
                {p}
              </p>
            ))}
            <dl className="mt-10 grid grid-cols-2 gap-8 border-t border-forest/15 pt-8">
              {who.stats.map((s) => (
                <div key={s.value}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-serif text-[clamp(3rem,6vw,5.5rem)] leading-none text-forest">{s.value}</dd>
                  <dd className="mt-2 text-ink/70">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 5. Succes: full-screen photo that slowly zooms out, one big sentence */}
      <section className="relative flex h-[100svh] min-h-[36rem] items-end overflow-clip">
        <div className="drift absolute inset-0">
          <div className="parallax absolute inset-x-0 -inset-y-[10%]">
            <Image src={success.photo.src} alt={success.photo.alt} fill sizes="100vw" className="object-cover object-[40%_42%]" />
          </div>
        </div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
        <div className="reveal relative mx-auto w-full max-w-7xl px-4 pb-16 md:px-8 md:pb-24">
          <p className="text-display max-w-5xl font-serif text-white">
            <Emph text={success.title} dark />
          </p>
        </div>
      </section>

      {/* 6. Kennismaken: the conversion point */}
      <section id="kennismaken" data-green className="relative scroll-mt-8 overflow-clip bg-forest px-4 py-16 text-white md:px-8 md:py-36">
        <Pattern dark className="turn -bottom-56 -left-56 h-[44rem] w-[44rem]" />
        <div className="relative mx-auto max-w-7xl">
          <Eyebrow dark>{booking.eyebrow}</Eyebrow>
          <h2 className="reveal text-section">
            <Emph text={booking.title} dark />
          </h2>
          <div className="mt-6 grid items-start gap-8 md:mt-14 md:grid-cols-[2fr_3fr] md:gap-20">
            <p className="max-w-md text-lg text-white/85 md:text-xl">{booking.text}</p>
            <CalEmbed />
          </div>
        </div>
      </section>
    </>
  );
}
