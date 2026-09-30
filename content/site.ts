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
  name: "De Vermogensvertaler",
  tagline: "Financiële taal, vertaald naar jouw leven",
  // SEO: canonical domain (override per environment with NEXT_PUBLIC_SITE_URL) and default description
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devermogensvertaler.nl",
  description:
    "Gratis pensioen- en AOW-scans en trainingen die je helpen je financiële toekomst zelf in handen te nemen. Voor zzp'ers en iedereen zonder financiële voorsprong van huis uit.",
  disclaimer:
    "De scans en trainingen van De Vermogensvertaler zijn educatief. Ze geven inzicht, geen persoonlijk financieel advies.",
  nav: [
    { label: "Pensioenpot-check", href: "/pensioenpot-check" },
    { label: "AOW-gatscan", href: "/aow-gatscan" },
    { label: "Proeverij", href: "/proeverij" },
    { label: "Groepstraject", href: "/groepstraject" },
  ],
  bookingCta: { label: "Plan een gratis kennismaking", href: "/#kennismaken" },
  newsletter: {
    title: "[Dummytekst] Eén keer per maand geld, vertaald",
    text: "[Dummytekst] Geen jargon, geen verkooppraatjes. Afmelden kan altijd.",
    button: "Aanmelden",
    // Mailing tool (form endpoint) still to be chosen
    action: "#",
  },
  // Alberta's profile URLs still to come
  social: [
    { label: "Instagram", href: "#", icon: "instagram" },
    { label: "LinkedIn", href: "#", icon: "linkedin" },
  ] as { label: string; href: string; icon: "instagram" | "linkedin" }[],
};

export const home = {
  hero: {
    eyebrow: "Voor zzp'ers en iedereen zonder financiële voorsprong van huis uit",
    title: "Weet jij waar je staat als je stopt met werken?",
    intro:
      "In twee minuten zie je hoe groot je pensioenpot en je AOW-gat zijn. Daarna weet je wat je volgende stap is, zonder vakjargon en zonder schaamte.",
    primary: { label: "Doe de gratis scan", href: "#scans" },
    secondary: { label: "Plan een vrijblijvend gesprek", href: "#kennismaken" },
    photo: { label: "Illustratie: Alberta met een kop koffie", ratio: "portrait", src: "/illustrations/alberta-portret-v2.png" } as Photo,
  },
  banner: "Gratis online masterclass op [datum] · Meld je aan",
  scans: {
    title: "Begin met inzicht. Gratis, in twee minuten.",
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
    coaching: { label: "Liever direct persoonlijk? Vraag 1-op-1 coaching aan", href: "#kennismaken" },
  },
  problem: {
    title: "Je weet dat je iets moet doen. Maar waar begin je?",
    steps: [
      { title: "Het overzicht komt binnen", text: "Je opent je pensioenoverzicht en begrijpt de helft." },
      { title: "Je schuift het op", text: "Het voelt ver weg, en er is altijd iets dringenders." },
      { title: "De onrust blijft", text: "Ergens weet je dat het later tegen je gaat werken." },
    ],
  },
  notNeeded: {
    title: "Wat je niet nodig hebt om te beginnen",
    illustration: { label: "Illustratie: kladblok met doorgestreepte lijstjes", ratio: "square", src: "/illustrations/kladblok.png" } as Photo,
    items: [
      { title: "Een rijke oom", text: "Niemand die het je voordeed? Dan leren we het samen." },
      { title: "Een financiële opleiding", text: "Je hoeft geen rekenwonder te zijn. Wel nieuwsgierig." },
      { title: "Het perfecte moment", text: "Dat bestaat niet. Het beste moment is nu." },
      { title: "Een goeroe", text: "Geen snelle rijkdom, wel een plan dat schokken aankan." },
    ],
  },
  about: {
    eyebrow: "Hoi, ik ben Alberta",
    title: "Ik vertaal de taal van geld naar jouw leven.",
    body: [
      "[Dummytekst] Jarenlang was ik journalist en woordvoerder in de financiële wereld, bij banken en bij de toezichthouder. Ik weet hoe de sector praat, en hoe weinig daarvan bij mensen aankomt.",
      "[Dummytekst] Ik kwam op mijn tiende naar Nederland en moest alles over geld zelf uitzoeken. Die ervaring deel ik nu, zodat jij niet hoeft te zoeken.",
    ],
    photo: { label: "Illustratie: Alberta aan het werk", ratio: "portrait", src: "/illustrations/alberta-werk-v2.png" } as Photo,
  },
  offer: {
    title: "Zo werken we samen",
    free: [
      { title: "Gratis scans", text: "Pensioenpot-check en AOW-gatscan.", href: "#scans", icon: "/illustrations/icon-scans.png" },
      { title: "Kennismaking", text: "Een kwartier, gratis. Waar sta je?", href: "#kennismaken", icon: "/illustrations/icon-kennismaking.png" },
      { title: "Online masterclass", text: "Anderhalf uur, gratis. Waarom juist nu?", href: "#", icon: "/illustrations/icon-masterclass.png" },
    ],
    paid: [
      { title: "Proeverij", price: "€ 600", text: "Eén dag, in een kleine groep.", href: "/proeverij", icon: "/illustrations/icon-proeverij.png" },
      { title: "Groepstraject", price: "€ 7.500", text: "Tien maanden, Amsterdam of Rotterdam.", href: "/groepstraject", icon: "/illustrations/icon-groepstraject.png" },
      { title: "Eén op één", price: "Op aanvraag", text: "Persoonlijke begeleiding, bijna een jaar.", href: "#kennismaken", icon: "/illustrations/icon-een-op-een.png" },
    ],
  },
  quote: {
    text: "[Dummyquote] Voor het eerst heb ik een plan. En het kost me maar een paar uur per maand.",
    name: "Deelnemer, groepstraject",
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
