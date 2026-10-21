import type { Metadata } from "next";
import { privacy as c, type PrivacyBlock } from "@/content/privacy";
import { card, PageHero, Rich, Step } from "@/components/tools";

export const metadata: Metadata = {
  title: c.title,
  description: c.lede,
  alternates: { canonical: c.path },
};

// Paragraph, bullet list or table. Tables stack per row on phones: each cell shows its column name
// above the value (data-label), so four columns never need sideways scrolling.
function Block({ block }: { block: PrivacyBlock }) {
  if (typeof block === "string")
    return (
      <p>
        <Rich text={block} />
      </p>
    );
  if ("list" in block)
    return (
      <ul className="flex list-disc flex-col gap-2 pl-5 marker:text-forest">
        {block.list.map((item) => (
          <li key={item}>
            <Rich text={item} />
          </li>
        ))}
      </ul>
    );
  const { head, rows } = block.table;
  return (
    <table className="block w-full text-left text-sm md:table">
      <thead className="hidden md:table-header-group">
        <tr className="border-b-2 border-forest/25">
          {head.map((h) => (
            <th key={h} scope="col" className="py-2 pr-4 align-bottom font-semibold text-forest">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="block md:table-row-group">
        {rows.map((row) => (
          <tr key={row[0]} className="block border-t border-forest/15 py-3 md:table-row md:py-0">
            {row.map((cell, i) => (
              <td
                key={i}
                data-label={head[i]}
                className="block py-1 pr-4 align-top before:block before:text-xs before:font-semibold before:text-forest before:content-[attr(data-label)] md:table-cell md:py-3 md:before:content-none"
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Privacyverklaring() {
  return (
    <>
      <PageHero eyebrow={c.updated} heading={c.title} lede={c.lede} />
      <section className="bg-cream px-4 py-12 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          {/* Numbered sections as in her document */}
          {c.sections.map((s, i) => (
            <div key={s.title} className={card}>
              <Step n={i + 1} title={s.title} />
              <div className="flex flex-col gap-4 text-base break-words">
                {s.blocks.map((b, j) => (
                  <Block key={j} block={b} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
