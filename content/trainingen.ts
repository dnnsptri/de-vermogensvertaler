import deKringText from "./cms/de-kring.json" with { type: "json" };

// Trainings. Alberta starts with one group training, De Kring (January 2027, her text of 21 Oct 2026). The menu adapts to this list (content/site.ts): one = straight to that training,
// none or two or more = the overview page /trainingen. The overview stays out of search engines (noindex,
// not in the sitemap) until there are two or more.
export type Training = {
  slug: string; // detail page at /trainingen/<slug>
  title: string;
  summary: string; // one or two sentences for the overview card
  when: string; // e.g. "Start januari 2027, 6 bijeenkomsten"
  // Detail page (app/(site)/trainingen/[slug]/page.tsx)
  eyebrow: string;
  lede: string;
  intro: string[];
  benefitsTitle: string;
  benefits: string[];
  outro: string[];
  facts: { label: string; value: string }[];
  signup: { label: string; subject: string }; // mail subject until Stripe, see mailto in content/site.ts
  footnote?: string;
};

// Her texts come from the editor (content/cms/de-kring.json, keystatic.config.ts). Slug, title (= menu label)
// and the mail subject stay here: changing them moves the URL or the menu, so that goes through Dennis.
const { signupLabel, ...kringText } = deKringText;
const deKring: Training = {
  slug: "de-kring",
  title: "De Kring",
  summary: "In max 9 maanden samen leren bouwen aan je eigen vermogen, met live dagen, online sessies en Q&A.",
  when: "Start januari 2027 in Amsterdam en Rotterdam",
  ...kringText,
  signup: { label: signupLabel, subject: "Wachtlijst De Kring" },
};

export const trainingen = {
  path: "/trainingen",
  title: "Trainingen",
  eyebrow: "Trainingen",
  heading: "Leer het *zelf*",
  lede: "Kies de training die bij je past. Je leert de basis van pensioen, sparen, beleggen, risico en kosten, in gewone taal.",
  empty: "Binnenkort staan hier de trainingen. Wil je als eerste horen wanneer de inschrijving opent? Plan een kennismaking.",
  items: [deKring] as Training[],
};

export const trainingHref = (t: Training) => `${trainingen.path}/${t.slug}`;

// Where "the training" links to (menu, homepage card): one training = its page, more = the overview, none = null
export const trainingLink =
  trainingen.items.length === 0
    ? null
    : trainingen.items.length === 1
      ? { label: trainingen.items[0].title, href: trainingHref(trainingen.items[0]) }
      : { label: "Trainingen", href: trainingen.path };
