// Alberta's text editor at /keystatic (decided 21 Oct 2026: words only, layout goes through Dennis).
// Each singleton is one JSON file in content/cms/ that the site imports; saving in the editor commits that
// file to GitHub and Vercel deploys it. Lists are fixed in length where the layout depends on it.
import { config, fields, singleton } from "@keystatic/core";


const emph = "Zet *sterretjes* om het woord dat geel wordt, bijvoorbeeld: Herken je *dit*?";
const line = (label: string, description?: string) => fields.text({ label, description });
const para = (label: string) => fields.text({ label, multiline: true });

// Eyebrow (small line above), heading and intro: the same three fields on every page hero
const hero = {
  eyebrow: line("Kopje boven de titel"),
  heading: line("Titel", emph),
  lede: para("Introductie"),
};

export default config({
  // Live: Keystatic Cloud (login for Alberta, saves become commits on GitHub). On npm run dev: straight to
  // the local files, so Dennis can edit without logging in.
  storage: process.env.NODE_ENV === "production" ? { kind: "cloud" } : { kind: "local" },
  cloud: { project: "dennis-petri/de-vermogensvertaler" },
  ui: {
    brand: { name: "De Vermogensvertaler" },
    navigation: { Homepage: ["home"], Scans: ["pensioencheck", "aowGatscan"], Training: ["deKring"] },
  },
  singletons: {
    home: singleton({
      label: "Homepage",
      path: "content/cms/home",
      format: { data: "json" },
      schema: {
        hero: fields.object(
          {
            white: fields.array(line("Regel"), {
              label: "Witte regels",
              itemLabel: (p) => p.value,
              validation: { length: { min: 1, max: 3 } },
            }),
            mustard: fields.array(line("Regel"), {
              label: "Gele regels",
              itemLabel: (p) => p.value,
              validation: { length: { min: 1, max: 3 } },
            }),
            intro: para("Introductie"),
          },
          { label: "Bovenaan (grote foto)", description: "Elke regel van de titel staat op een eigen regel op de site." },
        ),
        forWhom: fields.object(
          {
            eyebrow: line("Kopje boven de titel"),
            title: line("Titel", emph),
            items: fields.array(fields.object({ title: line("Uitspraak"), text: para("Toelichting") }), {
              label: "Uitspraken",
              itemLabel: (p) => p.fields.title.value,
              validation: { length: { min: 3, max: 3 } },
            }),
          },
          { label: "Voor wie" },
        ),
        what: fields.object(
          {
            eyebrow: line("Kopje boven de titel"),
            title: line("Titel", emph),
            intro: para("Introductie"),
            steps: fields.array(fields.object({ title: line("Titel"), text: para("Tekst") }), {
              label: "Vijf stappen",
              description: "De links onder de stappen (Pensioencheck, kennismaken, De Kring, nieuwsbrief) staan vast.",
              itemLabel: (p) => p.fields.title.value,
              validation: { length: { min: 5, max: 5 } },
            }),
            not: fields.object({ title: line("Titel"), text: para("Tekst") }, { label: "Wat ik niet doe" }),
            why: fields.object(
              {
                title: line("Tekst op de knop"),
                body: fields.array(para("Alinea"), {
                  label: "Alinea's",
                  itemLabel: (p) => p.value.slice(0, 60),
                  validation: { length: { min: 1 } },
                }),
              },
              { label: "Waarom ik dit doe (uitklapknop)" },
            ),
          },
          { label: "Wat ik doe" },
        ),
        who: fields.object(
          {
            eyebrow: line("Kopje boven de titel"),
            title: line("Titel", emph),
            body: fields.array(para("Alinea"), {
              label: "Alinea's",
              itemLabel: (p) => p.value.slice(0, 60),
              validation: { length: { min: 1 } },
            }),
            stats: fields.array(fields.object({ value: line("Getal"), label: line("Uitleg") }), {
              label: "Cijfers",
              itemLabel: (p) => `${p.fields.value.value} ${p.fields.label.value}`,
              validation: { length: { min: 1, max: 2 } },
            }),
          },
          { label: "Over Alberta" },
        ),
        success: fields.object({ title: line("Zin over de grote foto", emph) }, { label: "Grote foto onderaan" }),
        booking: fields.object(
          { eyebrow: line("Kopje boven de titel"), title: line("Titel", emph), text: para("Tekst") },
          { label: "Kennismaken (bij de agenda)" },
        ),
      },
    }),
    pensioencheck: singleton({
      label: "Pensioencheck",
      path: "content/cms/pensioencheck",
      format: { data: "json" },
      schema: hero,
    }),
    aowGatscan: singleton({
      label: "AOW-gatscan",
      path: "content/cms/aow-gatscan",
      format: { data: "json" },
      schema: hero,
    }),
    deKring: singleton({
      label: "De Kring",
      path: "content/cms/de-kring",
      format: { data: "json" },
      schema: {
        eyebrow: line("Kopje boven de titel"),
        lede: para("Introductie onder de titel"),
        intro: fields.array(para("Alinea"), {
          label: "Tekst",
          itemLabel: (p) => p.value.slice(0, 60),
          validation: { length: { min: 1 } },
        }),
        benefitsTitle: line("Kopje boven de lijst"),
        benefits: fields.array(line("Punt"), {
          label: "Wat het oplevert",
          itemLabel: (p) => p.value,
          validation: { length: { min: 1 } },
        }),
        outro: fields.array(para("Alinea"), {
          label: "Tekst onder de lijst",
          itemLabel: (p) => p.value.slice(0, 60),
          validation: { length: { min: 1 } },
        }),
        facts: fields.array(fields.object({ label: line("Kopje"), value: line("Tekst") }), {
          label: "Feiten (start, groep, prijs)",
          itemLabel: (p) => `${p.fields.label.value}: ${p.fields.value.value}`,
          validation: { length: { min: 1, max: 4 } },
        }),
        signupLabel: line("Tekst op de knop"),
        signupUrl: fields.url({
          label: "Link van de knop",
          description: "Bijvoorbeeld je Stripe-link. Leeg laten: de knop opent een mail aan jou.",
        }),
        footnote: para("Voetnoot (bron)"),
      },
    }),
  },
});
