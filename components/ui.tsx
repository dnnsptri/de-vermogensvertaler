import Link from "next/link";
import { site } from "@/content/site";
import { FLOWER, LOGO_VIEWBOX, MARK_VIEWBOX, STAR, WORDMARK } from "@/components/logo-paths";

/* Brand mark from Menno's logo: a flower in outline with a star at its heart.
   On dark backgrounds the two-colour version: flower in the text colour (white), star in mustard. */
export function Mark({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <svg viewBox={MARK_VIEWBOX} fill="currentColor" aria-hidden className={className}>
      <path d={FLOWER} />
      <path d={STAR} fill={dark ? "var(--color-mustard)" : "currentColor"} />
    </svg>
  );
}

// Full logo (mark + wordmark) as delivered. The wordmark is outlined artwork, so it carries an aria-label.
export function Logo({ name, dark = false, className = "h-6 md:h-9" }: { name: string; dark?: boolean; className?: string }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      fill="currentColor"
      role="img"
      aria-label={name}
      className={`w-auto ${dark ? "text-white" : "text-forest"} ${className}`}
    >
      <path d={FLOWER} />
      <path d={STAR} fill={dark ? "var(--color-mustard)" : "currentColor"} />
      {WORDMARK.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

// Big cropped flower at 10% opacity behind a section; decorative only.
export function Pattern({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <Mark className={`pointer-events-none absolute opacity-10 ${dark ? "text-white" : "text-forest"} ${className}`} />
  );
}

/* Renders `*word*` as emphasis: a mustard pill under the word on light backgrounds,
   mustard text on dark ones (mustard text on cream or white fails contrast, so never that). */
export function Emph({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <>
      {text.split("*").map((part, i) =>
        i % 2 === 1 ? (
          dark ? (
            <span key={i} className="text-mustard">
              {part}
            </span>
          ) : (
            // Mustard pill behind the bottom of the word: rounded ends echo the strokes of the logo.
            // leading-none fixes the box to the font, so the pill sits at the same spot relative to the
            // baseline in every heading, whatever that heading's line-height is.
            <span key={i} className="relative inline-block leading-none">
              <span
                aria-hidden
                className="absolute inset-x-[-0.12em] bottom-[0.06em] h-[0.34em] rounded-full bg-mustard"
              />
              <span className="relative">{part}</span>
            </span>
          )
        ) : (
          part
        ),
      )}
    </>
  );
}

// Plain outline arrow; the thin rounded line follows the line weight of the logo. Points right by default.
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className}>
      <path d="M4 12h14M12 6l6 6-6 6" />
    </svg>
  );
}

/* Pill with a round arrow badge. Hover: the pill lifts slightly, the arrow slides out to the right
   and a second one slides in from the left (all transform-only, so it stays smooth). */
export function Button({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "dark" | "light";
}) {
  const styles = {
    // Forest on mustard: 4.75:1 (passes AA for this 16px semibold label). White on forest: 9:1.
    primary: { pill: "bg-mustard text-forest", badge: "bg-forest text-mustard" },
    dark: { pill: "bg-forest text-white", badge: "bg-mustard text-ink" },
    light: { pill: "bg-white text-ink", badge: "bg-forest text-white" },
  }[variant];
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-4 rounded-full py-2 pl-7 pr-2 text-base font-semibold transition-transform duration-300 ease-out hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${styles.pill}`}
    >
      {children}
      <span className={`relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full ${styles.badge}`}>
        <Arrow className="h-5 w-5 transition-transform duration-300 ease-out group-hover:translate-x-10 motion-reduce:transition-none" />
        <Arrow className="absolute h-5 w-5 -translate-x-10 transition-transform duration-300 ease-out group-hover:translate-x-0 motion-reduce:transition-none" />
      </span>
    </Link>
  );
}

// Text link with an underline that grows from the left on hover
export function TextLink({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link
      href={href}
      className={`group relative inline-block py-1 text-base font-semibold ${dark ? "text-white" : "text-forest"}`}
    >
      {children}
      <span
        aria-hidden
        className={`absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-30 transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:transition-none ${dark ? "bg-mustard" : "bg-forest"}`}
      />
    </Link>
  );
}

export function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`mb-4 text-sm font-semibold tracking-wide ${dark ? "text-mustard" : "text-forest"}`}>{children}</p>
  );
}

// Footer contact icons on green: e-mail, then the social profiles (in the order of site.social).
// Profiles with href "#" are left out until the real URL is known.
const iconPaths: Record<string, string> = {
  // Open envelope: flap folded up, the opening cut out (evenodd)
  "E-mail":
    "M22 8.6a2 2 0 0 0-.9-1.7L12 1.5 2.9 6.9A2 2 0 0 0 2 8.6V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8.6zM12 13.2 4.3 8.4 12 3.8l7.7 4.6L12 13.2z",
  LinkedIn:
    "M20.4 20.5h-3.6v-5.6c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2zM5.3 7.4a2.1 2.1 0 1 1 0-4.1 2.1 2.1 0 0 1 0 4.1zM7.1 20.5H3.6V9h3.5v11.5z",
  Instagram:
    "M12 2.2c3.2 0 3.6 0 4.8.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.8.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.8C2.4 3.9 3.9 2.4 7.2 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 4.8a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4zm5.2-9.6a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z",
};

export function ContactIcons({ className = "" }: { className?: string }) {
  const items = [
    { label: "E-mail", href: `mailto:${site.email}`, aria: `Mail Alberta: ${site.email}`, external: false },
    ...site.social
      .filter((s) => s.href !== "#")
      .map((s) => ({ ...s, aria: `Alberta op ${s.label}`, external: true })),
  ];
  return (
    <ul className={`flex gap-3 ${className}`}>
      {items.map((s) => (
        <li key={s.label}>
          <a
            href={s.href}
            {...(s.external && { target: "_blank", rel: "noopener noreferrer" })}
            aria-label={s.aria}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-white/40 text-white transition-colors duration-300 hover:border-mustard hover:bg-mustard hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
              <path d={iconPaths[s.label]} fillRule="evenodd" />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
