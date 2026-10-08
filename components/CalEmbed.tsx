import { site } from "@/content/site";

// Cal.com inline booking. A plain iframe: no SDK needed. Until Alberta's account exists
// (site.calLink empty) it shows a placeholder of the same size, so the layout doesn't shift later.
export function CalEmbed() {
  if (!site.calLink)
    return (
      <div className="flex min-h-[28rem] flex-col items-center justify-center gap-2 rounded-2xl bg-cream p-8 text-center text-forest">
        <p className="font-serif text-2xl">Agenda volgt</p>
        <p className="max-w-xs text-sm text-ink/70">Hier komt de Cal.com-agenda van Alberta, om direct een gesprek in te plannen.</p>
      </div>
    );

  return (
    <iframe
      src={`https://cal.com/${site.calLink}?embed=true&theme=light`}
      title="Plan een kennismakingsgesprek met Alberta"
      loading="lazy"
      className="h-[40rem] w-full rounded-2xl bg-white"
    />
  );
}
