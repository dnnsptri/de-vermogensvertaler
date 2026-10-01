import Image from "next/image";
import Link from "next/link";
import type { Photo as PhotoType } from "@/content/site";

// Grey box per ratio. With src it shows the illustration contained; without, a labelled placeholder.
const ratios = { portrait: "aspect-[4/5]", landscape: "aspect-[3/2]", square: "aspect-square" };

export function Photo({ label, ratio, src }: PhotoType) {
  if (src)
    return (
      <div className={`${ratios[ratio]} relative w-full bg-neutral-200`}>
        <Image src={src} alt={label} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-contain p-[8%]" />
      </div>
    );
  return (
    <div
      role="img"
      aria-label={label}
      className={`${ratios[ratio]} w-full bg-neutral-200 flex items-center justify-center p-4 text-center text-sm text-neutral-500`}
    >
      {label}
    </div>
  );
}

// Newsletter signup on every page. Plain form post: works without JS; endpoint comes from the mailing tool.
export function Newsletter({ title, text, button, action }: { title: string; text: string; button: string; action: string }) {
  const field = "w-full border border-black bg-white px-5 py-3 placeholder:text-neutral-500";
  return (
    <Section tone="grey">
      <div className="grid gap-8 md:grid-cols-2 md:items-end">
        <div>
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="mt-4 text-neutral-700">{text}</p>
        </div>
        <form action={action} method="post" className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <label className="sr-only" htmlFor="nl-name">Naam</label>
          <input id="nl-name" name="name" type="text" autoComplete="given-name" placeholder="Naam" required className={field} />
          <label className="sr-only" htmlFor="nl-email">E-mailadres</label>
          <input id="nl-email" name="email" type="email" autoComplete="email" placeholder="E-mailadres" required className={field} />
          <button type="submit" className="bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-800">
            {button}
          </button>
        </form>
      </div>
    </Section>
  );
}

// Wordmark with euro badge; header and footer share it. Icon is decorative, the name carries the meaning.
export function Logo({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 font-semibold">
      <span aria-hidden className="flex h-8 w-8 items-center justify-center bg-neutral-200 text-sm">
        €
      </span>
      {name}
    </span>
  );
}

// Brand glyphs as inline SVG: no icon library needed for two icons.
const socialIcons = {
  instagram: (
    <path d="M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.8a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z" />
  ),
  linkedin: (
    <path d="M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1zM7.1 20.5H3.6V9h3.5v11.5zM22.2 0H1.8C.8 0 0 .8 0 1.7v20.6c0 .9.8 1.7 1.8 1.7h20.4c1 0 1.8-.8 1.8-1.7V1.7C24 .8 23.2 0 22.2 0z" />
  ),
};

export function SocialLinks({
  links,
}: {
  links: { label: string; href: string; icon: keyof typeof socialIcons }[];
}) {
  return (
    <ul className="flex gap-3">
      {links.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Alberta op ${l.label}`}
            className="flex h-11 w-11 items-center justify-center border border-black transition-colors hover:bg-black hover:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              {socialIcons[l.icon]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Button({
  href,
  children,
  variant = "solid",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
}) {
  const style =
    variant === "solid"
      ? " bg-black text-white hover:bg-neutral-800"
      : " border border-black text-black hover:bg-neutral-100";
  return (
    <Link href={href} className={`inline-block px-6 py-3 font-medium transition-colors ${style}`}>
      {children}
    </Link>
  );
}

export function Section({
  id,
  children,
  tone = "white",
}: {
  id?: string;
  children: React.ReactNode;
  tone?: "white" | "grey" | "black";
}) {
  const tones = { white: "bg-white", grey: "bg-neutral-100", black: "bg-black text-white" };
  return (
    <section id={id} className={`${tones[tone]} overflow-x-clip px-4 py-16 md:py-24`}>
      <div className="mx-auto max-w-5xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-sm font-medium text-neutral-500">{children}</p>;
}

// Shared closing block: every page ends with the free intro call.
export function BookingCta({ title, text }: { title: string; text: string }) {
  return (
    <Section id="kennismaken" tone="black">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        <div>
          <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
          <p className="mt-4 text-neutral-300">{text}</p>
        </div>
        {/* Cal.com embed goes here once Alberta's account exists */}
        <div className="flex aspect-[4/3] items-center justify-center border border-neutral-500 text-sm text-neutral-400">
          Cal.com agenda
        </div>
      </div>
    </Section>
  );
}
