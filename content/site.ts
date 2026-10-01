// All site copy lives here, so text changes never touch components.
// Dummy content: structure follows herfirst100k.com, copy gets replaced by Alberta's texts.

// src set = hand-drawn illustration (transparent PNG); no src = grey placeholder with label
export type Photo = { label: string; ratio: "portrait" | "landscape" | "square"; src?: string };

export type ScanTool = {
  question: string;
  options: { label: string; result: string }[];
};

export type Price = {
  amount: string;
  note: string;
  // Stripe payment links, filled in once Alberta's Stripe account exists
  payOnce: string;
  payInstallments?: string;
};

export type DetailPage = {
  slug: string;
  kind: "scan" | "training";
  eyebrow: string;
  title: string;
  intro: string;
  cta: string;
  photo: Photo;
  problem: { title: string; body: string[] };
  forYou: string[];
  youGet: string[];
  quote: { text: string; name: string };
  faq: { q: string; a: string }[];
  scan?: ScanTool;
  price?: Price;
};

export const site = {
  name: "De VermogensVertaler",
  owner: "Alberta Opoku",
  tagline: "Financiële taal, vertaald naar jouw leven",
  // SEO: canonical domain (override per environment with NEXT_PUBLIC_SITE_URL) and default description
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devermogensvertaler.nl",
  description:
    "Voor professionals die weten wat ze willen: een eigen financieel plan, met trainingen en persoonlijke begeleiding. Begin met de gratis pensioen- of AOW-test.",
  disclaimer:
    "De scans en trainingen van De VermogensVertaler zijn educatief. Ze geven inzicht, geen persoonlijk financieel advies.",
  nav: [
    { label: "Gratis test", href: "/#gratis-test" },
    { label: "Werken met mij", href: "/#werken-met-mij" },
    { label: "Over mij", href: "/#over-mij" },
    { label: "Kennismaken", href: "/#kennismaken" },
  ],
  bookingCta: { label: "Plan een gratis kennismaking", href: "/#kennismaken" },
  // Alberta's profile URLs still to come
  social: [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
  ] as { label: string; href: string; icon: "instagram" | "linkedin" }[],
};

// Homepage in 7 blocks, modelled on Kim de Graeve / Katrin Van de Water: one free test as the way in,
// then straight to business. No prices here (that read as "a shop"); prices live on the detail pages.
export const home = {
  hero: {
    eyebrow: "Voor professionals die weten wat ze willen",
    title: "Je carrière staat. Nu je vermogen nog.",
    intro:
      "[Dummytekst] Je verdient goed, maar je geld groeit niet mee. Ik vertaal de taal van geld naar een plan dat bij jouw leven past, zodat je eindelijk de stap zet.",
    primary: { label: "Plan een kennismakingsgesprek", href: "#kennismaken" },
    secondary: { label: "Of doe eerst de gratis test", href: "#gratis-test" },
    // Shoot photo 004_097 (arms crossed, mustard on green) replaces this
    photo: { label: "Illustratie: Alberta met een kop koffie", ratio: "portrait", src: "/illustrations/alberta-portret-v2.png" } as Photo,
  },
  recognition: {
    title: "Herken je dit?",
    items: [
      { title: "Je carrière staat, je vermogen niet", text: "[Dummytekst] Je hebt hard gewerkt voor je positie, maar je geld staat vooral op een spaarrekening." },
      { title: "Niemand deed het je voor", text: "[Dummytekst] Geen ouders of oom die je leerden beleggen. Dus schuif je het op." },
      { title: "Je wilt, maar zet de stap niet", text: "[Dummytekst] Je weet dat het moet. Je mist alleen een plan dat je vertrouwt." },
    ],
  },
  work: {
    eyebrow: "Werken met mij",
    title: "Drie manieren om je plan te bouwen",
    items: [
      {
        format: "Eén dag, kleine groep",
        title: "De Proeverij",
        text: "[Dummytekst] Ervaar in één dag hoe je gestructureerd over je financiële toekomst nadenkt.",
        href: "/proeverij",
        link: "Meer over de proeverij",
        icon: "/illustrations/icon-proeverij.png",
      },
      {
        format: "Tien maanden, groep van 7 tot 9",
        title: "Het Groepstraject",
        text: "[Dummytekst] Bouw je eigen plan, samen met een groep die je scherp houdt. Live in Amsterdam of Rotterdam.",
        href: "/groepstraject",
        link: "Meer over het groepstraject",
        icon: "/illustrations/icon-groepstraject.png",
      },
      {
        format: "Bijna een jaar, één op één",
        title: "Persoonlijke begeleiding",
        text: "[Dummytekst] Voor wie het liefst persoonlijk en intensief werkt. Beperkt aantal plekken.",
        href: "#kennismaken",
        link: "Plan een kennismaking",
        icon: "/illustrations/icon-een-op-een.png",
      },
    ],
  },
  about: {
    eyebrow: "Over mij",
    title: "Ik vertaal de taal van geld naar jouw leven.",
    body: [
      "[Dummytekst] Ruim tien jaar was ik woordvoerder in de financiële wereld, onder meer bij SNS, de Volksbank, de AFM en ING. Ik weet hoe de sector praat, en hoe weinig daarvan bij mensen aankomt.",
      "[Dummytekst] Ik kwam op mijn tiende uit Ghana naar Nederland en moest alles over geld zelf uitzoeken. Die ervaring deel ik nu, zodat jij niet hoeft te zoeken.",
    ],
    // Shoot photo 005_121 (kente scarf, outdoors) replaces this
    photo: { label: "Illustratie: Alberta aan het werk", ratio: "portrait", src: "/illustrations/alberta-werk-v2.png" } as Photo,
  },
  quote: {
    text: "[Dummyquote] Voor het eerst heb ik een plan. En het kost me maar een paar uur per maand.",
    name: "Deelnemer, groepstraject",
  },
  freeTest: {
    eyebrow: "Gratis test",
    title: "Weet in twee minuten waar je staat",
    text: "[Dummytekst] Begin met een van de twee gratis scans. Je krijgt je uitkomst direct, en per mail als je wilt.",
    items: [
      {
        href: "/pensioenpot-check",
        icon: "/illustrations/pensioenoverzicht.png",
        title: "Pensioenpot-check",
        text: "Zie hoeveel jouw pensioen meebeweegt met de beurs onder de nieuwe pensioenwet.",
      },
      {
        href: "/aow-gatscan",
        icon: "/illustrations/onderweg.png",
        title: "AOW-gatscan",
        text: "Niet vanaf je 17e in Nederland gewoond? Zie welk deel van je AOW je opbouwt.",
      },
    ],
  },
  booking: {
    title: "Plan een gratis kennismaking",
    text: "Een kwartier om te kijken waar je staat en wat bij je past.",
  },
};

export const detailPages: DetailPage[] = [
  {
    slug: "pensioenpot-check",
    kind: "scan",
    eyebrow: "Gratis scan",
    title: "De Pensioenpot-check",
    intro:
      "Je pensioenfonds werkt sinds de nieuwe pensioenwet anders dan je denkt. Zie in twee minuten hoeveel jouw pensioen meebeweegt met de beurs.",
    cta: "Start de check",
    photo: { label: "Illustratie: pensioenoverzicht op tafel", ratio: "landscape", src: "/illustrations/pensioenoverzicht.png" },
    problem: {
      title: "Je pensioen is geen vast bedrag meer",
      body: [
        "[Dummytekst] Met de Wet toekomst pensioenen beweegt je pensioen meer mee met de financiële markten. Veel mensen weten niet wat dat voor hen betekent.",
        "[Dummytekst] Deze check laat zien hoe gevoelig jouw pot is, en hoeveel tijd je hebt om erop te reageren.",
      ],
    },
    forYou: [
      "Je bent in loondienst en denkt dat je pensioen wel geregeld is",
      "Je hebt je pensioenoverzicht nog nooit echt gelezen",
      "Je wil weten wat de nieuwe pensioenwet voor jou betekent",
    ],
    youGet: [
      "Inzicht in hoe jouw pensioen meebeweegt met de beurs",
      "Een eerste idee van je volgende stap",
      "Gratis, zonder verplichtingen",
    ],
    quote: { text: "[Dummyquote] Ik dacht dat mijn pensioen vaststond. Deze check opende mijn ogen.", name: "Gebruiker van de check" },
    faq: [
      { q: "Is dit financieel advies?", a: "Nee. De check is een educatieve berekening en geen persoonlijk advies." },
      { q: "Wat gebeurt er met mijn gegevens?", a: "[Dummytekst] We slaan alleen op wat nodig is, en alleen met jouw toestemming." },
    ],
    scan: {
      question: "Is je pensioenfonds al overgestapt op de nieuwe regeling?",
      options: [
        { label: "Ja", result: "[Dummyuitkomst] Je pensioen beweegt al mee met de beurs. Tijd om te kijken hoeveel." },
        { label: "Nee", result: "[Dummyuitkomst] De overstap komt eraan. Goed moment om je voor te bereiden." },
        { label: "Weet ik niet", result: "[Dummyuitkomst] Dan is dit precies het moment om het uit te zoeken." },
      ],
    },
  },
  {
    slug: "aow-gatscan",
    kind: "scan",
    eyebrow: "Gratis scan",
    title: "De AOW-gatscan",
    intro:
      "Voor iedereen die niet vanaf zijn 17e onafgebroken in Nederland heeft gewoond. Zie in twee minuten welk deel van je AOW je opbouwt.",
    cta: "Start de scan",
    photo: { label: "Illustratie: koffer en paspoort, onderweg naar huis", ratio: "landscape", src: "/illustrations/onderweg.png" },
    problem: {
      title: "Elk jaar buiten Nederland kost je AOW",
      body: [
        "[Dummytekst] Je bouwt 2% AOW op per jaar dat je in Nederland woont. Kwam je later naar Nederland, dan mis je een deel.",
        "[Dummytekst] Dat gat merk je pas als je met pensioen gaat. Tenzij je het nu al ziet.",
      ],
    },
    forYou: [
      "Je bent na je 17e naar Nederland gekomen",
      "Je hebt een tijd in het buitenland gewoond of gewerkt",
      "Je hebt geen idee hoeveel AOW je straks krijgt",
    ],
    youGet: [
      "Een schatting van je AOW-opbouw",
      "Wat dat betekent voor je maandinkomen later",
      "Gratis, zonder verplichtingen",
    ],
    quote: { text: "[Dummyquote] Ik wist niet dat ik zo'n groot gat had. Nu kan ik er nog iets aan doen.", name: "Gebruiker van de scan" },
    faq: [
      { q: "Is dit financieel advies?", a: "Nee. De scan is een educatieve inschatting. Check je exacte opbouw altijd in Mijn SVB." },
      { q: "Wat gebeurt er met mijn gegevens?", a: "[Dummytekst] We slaan alleen op wat nodig is, en alleen met jouw toestemming." },
    ],
    scan: {
      question: "Op welke leeftijd ben je in Nederland komen wonen?",
      options: [
        { label: "Voor mijn 17e", result: "[Dummyuitkomst] Je bouwt waarschijnlijk je volledige AOW op." },
        { label: "Tussen 17 en 30", result: "[Dummyuitkomst] Je mist een deel van je AOW. Zie hoeveel het scheelt." },
        { label: "Na mijn 30e", result: "[Dummyuitkomst] Je AOW-gat is flink. Juist nu kun je er iets aan doen." },
      ],
    },
  },
  {
    slug: "proeverij",
    kind: "training",
    eyebrow: "Training · één dag",
    title: "De Proeverij",
    intro:
      "Eén dag in een kleine groep. Je ontdekt hoe je gestructureerd over je financiële toekomst nadenkt, en of het groepstraject bij je past.",
    cta: "Meld je aan",
    photo: { label: "Illustratie: groep aan tafel", ratio: "landscape", src: "/illustrations/groep.png" },
    problem: {
      title: "Je wil beginnen, maar weet niet of dit bij je past",
      body: [
        "[Dummytekst] Een traject van tien maanden is een grote stap. De proeverij laat je in één dag ervaren hoe we werken.",
        "[Dummytekst] Je gaat naar huis met een eerste beeld van waar je over twintig jaar wil staan.",
      ],
    },
    forYou: [
      "Je wil eerst proeven voordat je je vastlegt",
      "Je leert het liefst samen met anderen",
      "Je wil een concrete eerste stap zetten",
    ],
    youGet: [
      "Een volle dag met oefeningen en tests",
      "Een eerste plan voor je financiële toekomst",
      "[Dummytekst] Lunch en materialen inbegrepen",
    ],
    quote: { text: "[Dummyquote] Na één dag wist ik: dit wil ik goed doen.", name: "Deelnemer, proeverij" },
    faq: [
      { q: "Waar vindt de proeverij plaats?", a: "[Dummytekst] In Amsterdam of Rotterdam. De data volgen." },
      { q: "Kan ik daarna doorstromen?", a: "[Dummytekst] Ja, naar het groepstraject." },
    ],
    price: {
      amount: "€ 600",
      note: "Eén dag, maximaal [aantal] deelnemers",
      payOnce: "#",
    },
  },
  {
    slug: "groepstraject",
    kind: "training",
    eyebrow: "Training · tien maanden",
    title: "Het Groepstraject",
    intro:
      "Tien maanden bouwen aan je vermogen, in een groep van zeven tot negen mensen. Grotendeels online, met live dagen in Amsterdam of Rotterdam.",
    cta: "Meld je aan",
    photo: { label: "Illustratie: Alberta geeft training", ratio: "landscape", src: "/illustrations/training-v2.png" },
    problem: {
      title: "Losse tips helpen je niet verder",
      body: [
        "[Dummytekst] Je hebt artikelen gelezen en video's gekeken, maar je hebt nog steeds geen plan. Wat ontbreekt is structuur en iemand die je scherp houdt.",
        "[Dummytekst] In het groepstraject bouw je een plan dat bestand is tegen schokken, en leer je het zelf te onderhouden.",
      ],
    },
    forYou: [
      "Je wil zelf je vermogen opbouwen, niet uitbesteden",
      "Je wil een plan dat een paar uur per maand kost",
      "Je leert beter in een groep die je scherp houdt",
    ],
    youGet: [
      "Tien maanden begeleiding in een kleine groep",
      "Live dagen in Amsterdam of Rotterdam",
      "Een eigen plan dat je zelf onderhoudt",
    ],
    quote: { text: "[Dummyquote] Ik kijk niet meer elke dag naar grafieken. Mijn plan staat.", name: "Deelnemer, groepstraject" },
    faq: [
      { q: "Hoeveel tijd kost het?", a: "[Dummytekst] Reken op een paar uur per maand, plus de live dagen." },
      { q: "Kan ik in termijnen betalen?", a: "Ja, je kiest bij het aanmelden voor één keer of in termijnen." },
    ],
    price: {
      amount: "€ 7.500",
      note: "Tien maanden, twee groepen per jaar",
      payOnce: "#",
      payInstallments: "#",
    },
  },
];

export const getDetailPage = (slug: string) => detailPages.find((p) => p.slug === slug);
