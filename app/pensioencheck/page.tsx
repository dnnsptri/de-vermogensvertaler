import type { Metadata } from "next";
import { site } from "@/content/site";
import { pensioencheck as c } from "@/content/tools";
import { BigFigure, Field, Note, NumberInput, Rich, Select, Step, ToolForm, ToolPage, ToolResult } from "@/components/tools";

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: c.path },
  openGraph: { type: "website", locale: "nl_NL", siteName: site.name, url: c.path },
};

// The Pensioencheck: the template for both tools. Field ids are the hooks lib/tools.ts reads.
export default function Pensioencheck() {
  const f = c.fields;
  const r = c.result;
  return (
    <ToolPage tool="pensioencheck" eyebrow={c.eyebrow} heading={c.heading} lede={c.lede} fine={c.fine}>
      <ToolForm submit={c.submit}>
        <Step n={1} title={c.steps[0]} />
        <Field id="geboortejaar" label={f.geboortejaar.label}>
          <NumberInput id="geboortejaar" placeholder={f.geboortejaar.placeholder} min={1950} max={2008} />
        </Field>
        <Field id="werk" label={f.werk.label}>
          <Select id="werk" options={f.werk.options} />
        </Field>
        <Field id="woon" label={f.woon.label}>
          <Select id="woon" options={f.woon.options} />
        </Field>

        {/* Only for "samenwonend of getrouwd"; lib/tools.ts shows it */}
        <div id="partnerBox" hidden>
          <label className="mt-6 flex items-start gap-3 text-base">
            <input type="checkbox" id="partnerMee" className="mt-1 h-5 w-5 shrink-0 accent-forest" />
            <span>{f.partnerMee}</span>
          </label>
          <div id="partnerFields" hidden className="mt-2 border-l-4 border-mustard pl-4">
            <Field id="pJaren" label={f.pJaren.label}>
              <NumberInput id="pJaren" placeholder={f.pJaren.placeholder} min={0} max={50} />
            </Field>
            <Field id="pPensioenKeuze" label={f.pPensioenKeuze.label}>
              <Select id="pPensioenKeuze" options={f.pPensioenKeuze.options} />
            </Field>
            <div id="pBedragBox">
              <Field id="pBedrag" label={f.pBedrag.label}>
                <NumberInput id="pBedrag" placeholder={f.pBedrag.placeholder} min={0} />
              </Field>
            </div>
          </div>
        </div>

        <Step n={2} title={c.steps[1]} />
        <Field id="jaren" label={f.jaren.label} hint={f.jaren.hint}>
          <NumberInput id="jaren" placeholder={f.jaren.placeholder} min={0} max={50} />
        </Field>
        <Field id="pensioenKeuze" label={f.pensioenKeuze.label}>
          <Select id="pensioenKeuze" options={f.pensioenKeuze.options} />
        </Field>
        <div id="bedragBox">
          <Field id="bedrag" label={f.bedrag.label} hint={f.bedrag.hint}>
            <NumberInput id="bedrag" placeholder={f.bedrag.placeholder} min={0} />
          </Field>
        </div>

        <Step n={3} title={c.steps[2]} />
        <Field id="wens" labelOut="wensLabel" hint={f.wens.hint}>
          <NumberInput id="wens" placeholder={f.wens.placeholder} min={0} />
        </Field>
      </ToolForm>

      <ToolResult>
        <p data-out="kicker" className="text-base text-ink/65" />
        <BigFigure out="net" unit={r.perMonth} />
        <p data-out="verdict" className="mt-4 font-serif text-[clamp(1.5rem,5vw,2.25rem)] leading-tight text-forest" />
        <Note note="onbekend" warn text={r.notes.onbekend} />

        <dl className="mt-8 border-b border-forest/15">
          {Object.entries(r.rows).map(([out, label]) => (
            <div key={out} className="flex justify-between gap-4 border-t border-forest/15 py-3 text-base">
              <dt className="text-ink/65">
                <Rich text={label} />
              </dt>
              <dd data-out={out} className="whitespace-nowrap text-right font-semibold" />
            </div>
          ))}
        </dl>

        <Note note="verlies" text={r.notes.verlies} />
        <Note note="zzp" text={r.notes.zzp} />
        <Note text="{aowTekst}" />
        <Note text={r.notes.vermogen} />
      </ToolResult>
    </ToolPage>
  );
}
