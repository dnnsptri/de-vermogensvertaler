import type { Metadata } from "next";
import { site } from "@/content/site";
import { aowGat as c } from "@/content/tools";
import { BigFigure, Field, Note, NumberInput, Select, ToolForm, ToolPage, ToolResult } from "@/components/tools";

export const metadata: Metadata = {
  title: c.title,
  description: c.description,
  alternates: { canonical: c.path },
  openGraph: { type: "website", locale: "nl_NL", siteName: site.name, url: c.path },
};

// The AOW-gatscan, built from the same blocks as the Pensioencheck. Field ids are the hooks lib/tools.ts reads.
export default function AowGat() {
  const f = c.fields;
  const r = c.result;
  return (
    <ToolPage tool="aow-gat" c={c}>
      <ToolForm submit={c.submit}>
        <Field id="geboortejaar" label={f.geboortejaar.label}>
          <NumberInput id="geboortejaar" placeholder={f.geboortejaar.placeholder} min={1950} max={2008} />
        </Field>
        <Field id="verhuisleeftijd" label={f.verhuisleeftijd.label} hint={f.verhuisleeftijd.hint}>
          <NumberInput id="verhuisleeftijd" placeholder={f.verhuisleeftijd.placeholder} min={0} max={76} />
        </Field>
        <Field id="woon" label={f.woon.label}>
          <Select id="woon" options={f.woon.options} />
        </Field>
      </ToolForm>

      <ToolResult>
        <Note note="geenGat" text={r.geenGat} />
        <div data-note="gat" hidden>
          <BigFigure out="gat" unit={r.unit} />
          <Note text={r.opbouw} />
          <div className="mt-6 border-t border-forest/15 pt-2">
            <Note text={r.gemis} />
          </div>
        </div>
      </ToolResult>
    </ToolPage>
  );
}
