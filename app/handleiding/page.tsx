import type { Metadata } from "next";
import { handleiding as c } from "@/content/handleiding";
import { card, PageHero, Rich, Step } from "@/components/tools";

// Alberta's manual. Reachable by link only: not in the sitemap, llms.txt or menu, and never indexed.
export const metadata: Metadata = {
  title: c.title,
  alternates: { canonical: c.path },
  robots: { index: false, follow: false },
};

export default function Handleiding() {
  return (
    <>
      <PageHero eyebrow={c.eyebrow} heading={c.heading} lede={c.lede} />
      <section className="bg-cream px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-2xl flex-col gap-6">
          {c.sections.map((s, i) => (
            <div key={s.title} className={card}>
              {/* Numbered like the tool steps, so the page reads as one sequence */}
              <Step n={i + 1} title={s.title} />
              <ul className="flex list-disc [overflow-wrap:anywhere] flex-col gap-3 pl-5 text-base marker:text-forest">
                {s.items.map((item) => (
                  <li key={item}>
                    <Rich text={item} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
