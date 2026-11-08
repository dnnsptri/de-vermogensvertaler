import type { Metadata } from "next";
import { toolMail } from "@/content/tools";
import { Button } from "@/components/ui";
import { card, PageHero } from "@/components/tools";

// Double opt-in, step two. The link in the confirmation mail lands here with the address and its signature;
// the button posts them to /api/bevestig, which redirects back with ?klaar=1 or ?fout=1. Never indexed.
export const metadata: Metadata = {
  title: "Aanmelding bevestigen",
  robots: { index: false, follow: false },
};

export default async function Bevestig({ searchParams }: PageProps<"/bevestig">) {
  const q = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";
  const [e, t0, s] = [one(q.e), one(q.t), one(q.s)];
  const t = toolMail.confirm.page;
  const done = one(q.klaar) === "1";
  const failed = one(q.fout) === "1" || (!done && (!e || !t0 || !s));

  return (
    <>
      <PageHero eyebrow={t.eyebrow} heading={done ? t.doneHeading : t.heading} lede={done ? t.doneLede : t.lede} />
      {!done && (
        <section className="bg-cream px-4 py-12 md:px-8 md:py-20">
          <div className={`${card} mx-auto max-w-2xl`}>
            {failed ? (
              <p className="text-base">{t.error}</p>
            ) : (
              <form method="post" action="/api/bevestig">
                <input type="hidden" name="e" value={e} />
                <input type="hidden" name="t" value={t0} />
                <input type="hidden" name="s" value={s} />
                <p className="mb-6 text-base [overflow-wrap:anywhere]">{e}</p>
                <Button>{toolMail.confirm.button}</Button>
              </form>
            )}
          </div>
        </section>
      )}
    </>
  );
}
