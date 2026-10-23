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

const deKring: Training = {
  slug: "de-kring",
  title: "De Kring",
  summary: "In max 9 maanden samen leren bouwen aan je eigen vermogen, met live dagen, online sessies en Q&A.",
  when: "Start januari 2027 in Amsterdam en Rotterdam",
  eyebrow: "Groepstraject",
  lede: "Groepstraject voor wie als eerste in de familie eigen vermogen opbouwt.",
  intro: [
    "Je werkt hard en hebt een aardige spaarbuffer, maar de volgende stap naar vermogensopbouw zet je nog niet. Dat is niet omdat je het niet kunt. Maar omdat niemand het je ooit uitlegde. En als jij de eerste in je familie bent die dit doet, is er niemand om je heen die je kunt vragen hoe het zit.",
    "Je bent niet de enige. De AFM schat dat ongeveer 1 op de 10 Nederlandse huishoudens (zo'n 800.000) niet belegt, terwijl ze daar wel de ruimte voor hebben en later mogelijk geld tekortkomen. Gebrek aan kennis is de meest genoemde reden.¹",
    "In De Kring maak je samen met een kleine groep professionals dezelfde reis naar eigen vermogensopbouw, met mij als gids. In maximaal 9 maanden leer je stap voor stap hoe geld en vermogen werken, in gewone taal en zonder haast.",
  ],
  benefitsTitle: "Wat het oplevert",
  benefits: [
    "Inzicht in vermogensopbouw, pensioen en beleggen",
    "Heldere uitleg, in jouw tempo",
    "Een vaste groep om mee te leren en te spiegelen",
    "Een fundament voor je eigen investeringsplan en vertrouwen om zelf te bouwen",
  ],
  outro: [
    "In de eerste helft van het traject leg je de basis. In de tweede helft ligt de nadruk op actie en vertrouwen in de praktijk.",
    "Het gaat om begrip en overzicht, zodat je zelf weloverwogen keuzes kunt maken. De Kring is educatie en geen persoonlijk financieel advies.",
  ],
  facts: [
    { label: "Start", value: "januari 2027" },
    { label: "Groepsgrootte", value: "2 groepen van max 9 deelnemers" },
    { label: "Investering", value: "€9.075 incl. btw (particulieren) of €7.500 ex btw (ondernemers)" },
  ],
  signup: { label: "Meld je aan voor de wachtlijst", subject: "Wachtlijst De Kring" },
  footnote: "¹ Bron: AFM, 'Onbenut vermogen: een studie naar niet-beleggers' (2026).",
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
