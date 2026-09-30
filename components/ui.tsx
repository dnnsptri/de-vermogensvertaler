import Image from "next/image";
import Link from "next/link";
import type { Photo as PhotoType } from "@/content/site";

// Grey placeholder until Alberta's shoot photos arrive; the label says what goes where.
// Organic shapes: portrait becomes a pebble (uneven radii), landscape and square a soft frame.
const ratios = {
  portrait: "aspect-[4/5] rounded-[58%_42%_48%_52%/42%_46%_54%_58%]",
  landscape: "aspect-[3/2] rounded-card",
  square: "aspect-square rounded-card",
};

// Drawing size inside its shape; the square notepad is dense, so it gets less
const artScale = { portrait: "scale-[0.85]", landscape: "scale-[0.85]", square: "scale-[0.65]" };

export function Photo({ label, ratio, src }: PhotoType) {
  // Illustration stands in the organic shape and breaks out at the top and right edge for depth.
  // The shape is its own layer so the drawing can overflow it; Section clips any sideways overflow.
  if (src)
    return (
      <div className={`${ratios[ratio].split(" ")[0]} relative w-full`}>
        <div aria-hidden className={`${ratios[ratio]} absolute inset-0 bg-neutral-200`} />
        {/* 115% of the shape: 15% out at the top, 10% right, 5% left */}
        <div className="absolute -top-[15%] -right-[10%] bottom-0 -left-[5%]">
          <Image src={src} alt={label} fill sizes="(min-width: 768px) 50vw, 100vw" className={`origin-bottom ${artScale[ratio]} object-contain object-bottom`} />
        </div>
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
  const field = "w-full rounded-full border border-black bg-white px-5 py-3 placeholder:text-neutral-500";
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
          <button type="submit" className="rounded-full bg-black px-6 py-3 font-medium text-white transition-colors hover:bg-neutral-800">
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
      {/* Hand-drawn euro mark: wobbly strokes to match the illustrations, crisp at any size */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-8 w-8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2.6c5.3-.2 9.5 4 9.3 9.4-.1 5.1-4.3 9.2-9.5 9.1C6.6 21 2.6 16.9 2.7 11.8 2.8 6.6 6.9 2.4 12.4 2.9" />
        <path d="M15.6 8.2c-.9-1-2.1-1.5-3.4-1.4-2.6.1-4.4 2.4-4.3 5.3.1 2.9 2 5 4.6 4.9 1.2 0 2.3-.6 3.1-1.5" />
        <path d="M6.4 10.7c2.1-.2 4.2-.3 6.3-.2M6.6 13.2c1.8-.1 3.7-.1 5.5 0" />
      </svg>
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
            className="flex h-11 w-11 items-center justify-center rounded-full border border-black transition-colors hover:bg-black hover:text-white"
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
      ? "rounded-full bg-black text-white hover:bg-neutral-800"
      : "rounded-full border border-black text-black hover:bg-neutral-100";
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
        <div className="flex aspect-[4/3] items-center justify-center rounded-card border border-neutral-500 text-sm text-neutral-400">
          Cal.com agenda
        </div>
      </div>
    </Section>
  );
}
