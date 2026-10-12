import Link from "next/link";
import { site } from "@/content/site";
import { toolCta, toolsLogUrl } from "@/content/tools";
import { Button, Emph, Eyebrow, Logo, Pattern } from "@/components/ui";
import { ToolInit } from "@/components/ToolInit";

// Building blocks for the tools (Pensioencheck, AOW-gatscan). Server-rendered only: behaviour comes from
// lib/tools.ts, which also runs in the standalone exports (scripts/export-tools.mjs). Hooks for that script:
// data-tool (which tool), data-out (filled-in text), data-note (shown or hidden), data-error, data-result.

/* Inline markup from content/tools.ts: **bold**, [label](url), {slot}. Slots become empty spans
   that lib/tools.ts fills in; bold may contain slots. */
export function Rich({ text }: { text: string }) {
  return text.split(/(\*\*.+?\*\*|\[.+?\]\(.+?\)|\{\w+\})/).map((part, i) => {
    if (part.startsWith("**")) return <strong key={i} className="font-semibold"><Rich text={part.slice(2, -2)} /></strong>;
    const link = part.match(/^\[(.+?)\]\((.+?)\)$/);
    if (link)
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-forest">
          {link[1]}
        </a>
      );
    const slot = part.match(/^\{(\w+)\}$/);
    if (slot) return <span key={i} data-out={slot[1]} />;
    return part;
  });
}

// Page frame: green hero in the homepage's style, then the tool on cream, fine print underneath
export function ToolPage({
  tool,
  eyebrow,
  heading,
  lede,
  fine,
  children,
}: {
  tool: string;
  eyebrow: string;
  heading: string;
  lede: string;
  fine: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section data-green className="relative overflow-clip bg-forest-deep text-white">
        <Pattern dark className="turn -right-48 -top-24 h-[40rem] w-[40rem]" />
        <header className="relative mx-auto flex max-w-7xl items-center px-4 py-6 md:px-8">
          <Link href="/" aria-label={`${site.name}, naar de homepage`}>
            <Logo name={site.name} dark />
          </Link>
        </header>
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-6 md:px-8 md:pb-24 md:pt-14">
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="text-display max-w-4xl">
            <Emph text={heading} dark />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85 md:mt-8 md:text-xl">{lede}</p>
        </div>
      </section>

      <section className="bg-cream px-4 py-12 md:px-8 md:py-20">
        <div data-tool={tool} data-log-url={toolsLogUrl} className="mx-auto max-w-2xl">
          {children}
          <p className="mt-10 text-sm text-ink/60">{fine}</p>
        </div>
      </section>
      <ToolInit />
    </>
  );
}

// White card, same rounding as the step cards on the homepage
const card = "rounded-[1.5rem] bg-white p-6 text-ink md:rounded-[2rem] md:p-10";

// The form card: fields, the error line (announced by screen readers) and the submit pill
export function ToolForm({ submit, children }: { submit: string; children: React.ReactNode }) {
  return (
    <form id="formulier" noValidate className={`${card} scroll-mt-6`}>
      {children}
      <p data-error role="alert" className="mt-6 text-base font-semibold text-forest empty:hidden" />
      <div className="mt-8">
        <Button>{submit}</Button>
      </div>
    </form>
  );
}

// Numbered section heading inside the form, the number in the style of the homepage steps
export function Step({ n, title }: { n: number; title: string }) {
  return (
    <h2 className="mb-6 mt-12 flex items-center gap-4 text-2xl text-forest first:mt-0 md:text-3xl">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest text-xl text-mustard">{n}</span>
      {title}
    </h2>
  );
}

// One look for every control: white like the card, fixed height so inputs and dropdowns line up.
// Focus: mustard glow for the brand; the border turns forest so focus still meets 3:1 contrast
// (mustard alone on white is 1.65:1).
const control =
  "h-14 w-full rounded-xl border border-forest/25 bg-white px-4 text-base text-ink placeholder:text-ink/45 focus:border-forest focus:outline-none focus:ring-4 focus:ring-mustard/60";

// Label + control + optional hint. labelOut: the label text is swapped by lib/tools.ts.
export function Field({
  id,
  label,
  labelOut,
  hint,
  children,
}: {
  id: string;
  label?: string;
  labelOut?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 first:mt-0">
      <label htmlFor={id} className="block font-semibold text-forest" {...(labelOut && { "data-out": labelOut })}>
        {label}
      </label>
      {children}
      {hint && (
        <p className="mt-2 text-sm text-ink/65">
          <Rich text={hint} />
        </p>
      )}
    </div>
  );
}

export function NumberInput({ id, placeholder, min, max }: { id: string; placeholder: string; min?: number; max?: number }) {
  return <input type="number" inputMode="numeric" id={id} name={id} min={min} max={max} placeholder={placeholder} className={`mt-2 ${control}`} />;
}

// Native select without the browser styling (Safari ignores height and padding otherwise),
// with the site's thin outline chevron in its place
export function Select({ id, options }: { id: string; options: [string, string][] }) {
  return (
    <div className="relative mt-2">
      <select id={id} name={id} className={`${control} cursor-pointer appearance-none pr-12`}>
        {options.map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-forest">
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

// Note in the result. warn = mustard-tinted callout; note = hidden until lib/tools.ts shows it.
export function Note({ text, note, warn = false }: { text: string; note?: string; warn?: boolean }) {
  return (
    <p
      {...(note && { "data-note": note, hidden: true })}
      className={`mt-4 text-base ${warn ? "rounded-xl border-l-4 border-mustard bg-mustard/20 px-4 py-3" : ""}`}
    >
      <Rich text={text} />
    </p>
  );
}

// Result card: hidden until the first calculation; focusable so focus can move to it
export function ToolResult({ children }: { children: React.ReactNode }) {
  return (
    <div data-result hidden tabIndex={-1} className={`${card} mt-6 scroll-mt-6 outline-none`}>
      {children}
      <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-forest/15 pt-8">
        <Button href={toolCta.href}>
          {toolCta.label}
        </Button>
        {/* Back to the form: plain anchor, so it works the same on the site and in the export */}
        <a href="#formulier" className="text-base font-semibold text-forest underline underline-offset-4 hover:text-forest-deep">
          {toolCta.again}
        </a>
      </div>
    </div>
  );
}

// The big serif figure at the top of a result
export function BigFigure({ out, unit }: { out: string; unit: string }) {
  return (
    <p className="font-serif text-[clamp(3rem,11vw,5rem)] leading-none text-forest">
      <span data-out={out} />
      {/* Real space (not margin) so screen readers don't run figure and unit together; "%" sits tight */}
      {unit.startsWith("%") ? "" : " "}
      <span className="font-sans text-lg font-medium tracking-normal text-ink/65 md:text-xl">{unit}</span>
    </p>
  );
}
