// All site copy lives here, so text changes never touch components.
// Simple homepage (October 2026): what it is, who Alberta is, who it's for, plus booking.
// The earlier 7-block homepage, detail pages and scans are parked in git tag wireframe-7blocks.
// `*word*` in a heading marks the emphasised word (mustard highlight, or mustard text on dark).

export const site = {
  name: "De Vermogensvertaler",
  owner: "Alberta Opoku",
  tagline: "Financiële taal, vertaald naar jouw leven",
  // SEO: canonical domain (override per environment with NEXT_PUBLIC_SITE_URL) and default description
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devermogensvertaler.nl",
  description:
    "Je verdient goed en wilt als eerste in je familie vermogen opbouwen. Alberta Opoku legt in gewone taal uit hoe geld, pensioen en beleggen werken. Geen producten, geen persoonlijk advies.",
  // Verbatim from Alberta's text document (8 Oct 2026)
  disclaimer:
    "De Vermogensvertaler geeft educatie en begeleiding, geen persoonlijk financieel advies of beleggingsadvies. Beleggen brengt risico's met zich mee. Alberta Opoku is geen vergunninghouder onder de Wft.",
  email: "alberta@devermogensvertaler.nl",
  // Cal.com booking path, e.g. "alberta-opoku/kennismaking". Empty = placeholder until her account exists.
  calLink: "devermogensvertaler/kennismaking",
  // Label as Alberta wrote it. Her "Doe de Pensioencheck" buttons stay hidden until the check is on the site.
  booking: { label: "Plan een kennismaking", href: "#kennismaken" },
  // Profiles with href "#" are hidden until the real URL is known
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/albertaopoku/" },
    { label: "Instagram", href: "#" },
  ],
};

// Copy from Alberta's "Websitetekst De Vermogensvertaler" (8 Oct 2026), verbatim, with two agreed fixes:
// "Tocht" -> "Toch", and a full stop after "Nu je vermogen nog". Lines marked OURS are not in her
// document; she is asked to approve them.
export const home = {
  hero: {
    // Fixed line breaks: two white lines, then two mustard lines
    title: [
      ["Je carrière loopt", "op rolletjes."],
      ["Nu je vermogen", "nog."],
    ],
    intro:
      "Je verdient goed en wilt als eerste in je familie vermogen opbouwen. Maar niemand van wie je kon leren hoe het kan? Dat verandert hier. Ik leg in gewone taal uit hoe geld, pensioen en beleggen werken, zodat jij weloverwogen zelf kunt bouwen. Geen producten, geen persoonlijk advies.",
    secondary: { label: "Maak kennis met Alberta", href: "#over" },
    photo: {
      src: "/photos/alberta-tafel.jpg",
      alt: "Alberta Opoku in een gele trui, zittend op een tafel met boeken over geld",
    },
  },

  // Voor wie: StoryBrand problem. Title = her first sentence of each point, text = the rest.
  forWhom: {
    eyebrow: "Voor wie",
    title: "Herken je *dit*?",
    items: [
      {
        title: "Je carrière loopt op rolletjes, je vermogen nog niet.",
        text: "Je verdient goed en hebt een buffer. Maar wat je daarna met je geld doet, weet je niet precies.",
      },
      {
        title: "Niemand deed het je voor.",
        text: "Geen ouder, oom of tante die je kon bellen. Dus zoek je het zelf uit, tussen tips en verkooppraatjes.",
      },
      {
        title: "Je wilt bouwen, maar eerst begrijpen.",
        text: "Inzicht in klare taal: wat kan, wat kost het, wat zijn de risico's. En hoe kom je van uitstellen naar een overzichtelijke, eigen aanpak?",
      },
    ],
  },

  // Wat ik doe: StoryBrand plan, her four steps
  what: {
    eyebrow: "Wat ik doe",
    title: "Geld, vertaald naar *jouw* leven.", // OURS
    intro:
      "Ik leer je hoe geld, pensioen en beleggen werken, zodat je zelf kunt bouwen aan jouw vermogen. Het is te leren. Jij krijgt bij mij de kennis om een heldere aanpak te maken, en het vertrouwen om zelf aan de slag te gaan.",
    steps: [
      { title: "De Pensioencheck", text: "Bereken in 2 minuten waar je staat en wat je blinde vlekken zijn." },
      { title: "Kennismaken", text: "Een kwartier, gratis. We kijken of mijn training bij je past." },
      { title: "Training", text: "Je leert de basis: pensioen, sparen, beleggen, risico en kosten." },
      {
        title: "Zelf bouwen",
        text: "Je maakt je eigen afwegingen en bouwt zelf aan je eigen vermogen. Beleggen brengt risico's met zich mee: je kunt je inleg verliezen. Resultaten uit het verleden bieden geen garantie voor de toekomst.",
      },
    ],
    not: {
      title: "Wat ik niet doe",
      text: "Zeggen wat je met je geld moet doen. Dat bepaal jij zelf, nadat je hebt geleerd wat de mogelijkheden en risico's zijn. Ik ben geen financieel adviseur, verkoop geen financiële producten en ik beheer geen portefeuilles of jouw geld.",
    },
  },

  // Over Alberta: StoryBrand guide, empathy plus authority
  who: {
    eyebrow: "Over Alberta",
    title: "Ik ken de taal van de financiële sector. En ik vertaal die naar de *jouwe*.",
    body: [
      "Ik kwam rond mijn tiende uit Ghana naar Nederland en was de eerste in mijn familie die hier vermogen opbouwde. Met vallen en opstaan, want ik had niemand om mij heen die het mij kon voordoen. Dus leer ik het nu aan jou.",
      "Ik heb ruim 20 jaar ervaring in de financiële journalistiek en communicatie, waarvan ruim tien jaar als woordvoerder in de financiële sector. Ik ben geen econoom of adviseur en heb geen vergunning: ik vertaal de wereld van vermogen naar die van professionals zoals jij.",
      "Uit een verkenning van de Autoriteit Financiële Markten (2021) bleek, dat 24 procent van de hoogopgeleide Nederlanders zonder migratieachtergrond belegt, tegenover 9 procent van de hoogopgeleiden met een niet-westerse migratieachtergrond. Het cijfer voor die laatste groep is indicatief, want de groep in het onderzoek was klein. Toch zegt het veel. Zelfde opleidingsniveau, bijna drie keer minder deelname. Ik denk dat het verschil vooral zit in het referentiepunt: iemand om je heen van wie je de kunst kunt leren.",
    ],
    stats: [
      { value: "20+", label: "jaar ervaring in financiële journalistiek en communicatie" },
      { value: "8", label: "jaar ervaring met investeren" },
    ],
    photo: {
      src: "/photos/alberta-portret.jpg",
      alt: "Alberta Opoku in een witte geborduurde blouse voor een donkergroene muur",
    },
  },

  // StoryBrand success: what life looks like after
  success: {
    title: "Een plan dat schokken aankan. Zodat jij *rustig* verder kunt.", // OURS
    photo: {
      src: "/photos/alberta-park.jpg",
      alt: "Alberta Opoku in een geruite jas, wandelend in een park",
    },
  },

  booking: {
    eyebrow: "Kennismaken",
    title: "Zet de *eerste* stap.", // OURS
    text: "Plan een gratis kennismakingsgesprek van een kwartier. Geen verkooppraatje: we kijken samen waar je staat en wat bij je past.", // OURS
  },
};
