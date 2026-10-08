// All site copy lives here, so text changes never touch components.
// Simple homepage (October 2026): what it is, who Alberta is, who it's for, plus booking.
// The earlier 7-block homepage, detail pages and scans are parked in git tag wireframe-7blocks.
// `*word*` in a heading marks the emphasised word (mustard highlight, or mustard text on dark).

export const site = {
  name: "De VermogensVertaler",
  owner: "Alberta Opoku",
  tagline: "Financiële taal, vertaald naar jouw leven",
  // SEO: canonical domain (override per environment with NEXT_PUBLIC_SITE_URL) and default description
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devermogensvertaler.nl",
  description:
    "Voor professionals die weten wat ze willen: Alberta Opoku vertaalt de taal van geld naar een plan dat bij jouw leven past. Plan een gratis kennismakingsgesprek.",
  disclaimer: "De VermogensVertaler geeft inzicht en begeleiding, geen persoonlijk financieel advies.",
  // Cal.com booking path, e.g. "alberta-opoku/kennismaking". Empty = placeholder until her account exists.
  calLink: "",
  booking: { label: "Plan een kennismakingsgesprek", href: "#kennismaken" },
  // Alberta's profile URLs still to come ("#" until then)
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
  ],
};

export const home = {
  hero: {
    // Fixed line breaks: two white lines, then two mustard lines
    title: [
      ["Je carrière", "staat."],
      ["Nu je vermogen", "nog."],
    ],
    intro:
      "Je verdient goed, maar je geld groeit niet mee. Ik vertaal de taal van geld naar een plan dat bij jouw leven past, zodat je eindelijk de stap zet.",
    secondary: { label: "Maak kennis met Alberta", href: "#over" },
    photo: {
      src: "/photos/alberta-tafel.jpg",
      alt: "Alberta Opoku in een gele trui, zittend op een tafel met boeken over geld",
    },
  },

  // Voor wie: StoryBrand problem, in the visitor's own words
  forWhom: {
    eyebrow: "Voor wie",
    title: "Herken je *dit*?",
    items: [
      {
        title: "Je carrière staat, je vermogen niet",
        text: "[Dummytekst] Je hebt hard gewerkt voor je positie, maar je geld staat vooral op een spaarrekening.",
      },
      {
        title: "Niemand deed het je voor",
        text: "[Dummytekst] Geen ouders of oom die je leerden beleggen. Dus schuif je het op.",
      },
      {
        title: "Je wilt, maar zet de stap niet",
        text: "[Dummytekst] Je weet dat het moet. Je mist alleen een plan dat je vertrouwt.",
      },
    ],
  },

  // Wat is het: StoryBrand plan in three steps
  what: {
    eyebrow: "Wat ik doe",
    title: "Geld, vertaald naar *jouw* leven.",
    intro:
      "[Dummytekst] Ik verkoop geen financiële producten. Ik help je je eigen plan te maken, in gewone taal, zodat je zelf de keuzes maakt en ze ook begrijpt.",
    steps: [
      { title: "Kennismaken", text: "Een kwartier, gratis. Waar sta je, en waar wil je naartoe?" },
      { title: "Je plan", text: "[Dummytekst] Samen vertalen we je doelen naar een plan dat bij jouw leven past." },
      {
        title: "Zelf aan het stuur",
        text: "[Dummytekst] Je bouwt je vermogen zelf op. Een paar uur per maand, met rust in je hoofd.",
      },
    ],
  },

  // Wie is: StoryBrand guide, empathy plus authority
  who: {
    eyebrow: "Over Alberta",
    title: "Ik spreek de taal van de bank. *En* die van jou.",
    body: [
      "[Dummytekst] Ruim tien jaar was ik woordvoerder in de financiële wereld, onder meer bij SNS, de Volksbank, de AFM en ING. Ik weet hoe de sector praat, en hoe weinig daarvan bij mensen aankomt.",
      "[Dummytekst] Ik kwam op mijn tiende uit Ghana naar Nederland en moest alles over geld zelf uitzoeken. Die ervaring gebruik ik nu, zodat jij niet hoeft te zoeken.",
    ],
    // Track record as large figures (from the kickoff: 10 to 12 years as spokesperson)
    stats: [
      { value: "10+", label: "jaar woordvoerder in de financiële wereld" },
      { value: "4", label: "instellingen: SNS, de Volksbank, de AFM en ING" },
    ],
    photo: {
      src: "/photos/alberta-portret.jpg",
      alt: "Alberta Opoku in een witte geborduurde blouse voor een donkergroene muur",
    },
  },

  // StoryBrand success: what life looks like after
  success: {
    title: "Een plan dat schokken aankan. Zodat jij *rustig* verder kunt.",
    photo: {
      src: "/photos/alberta-park.jpg",
      alt: "Alberta Opoku in een geruite jas, wandelend in een park",
    },
  },

  booking: {
    eyebrow: "Kennismaken",
    title: "Zet de *eerste* stap.",
    text: "Plan een gratis kennismakingsgesprek van een kwartier. Geen verkooppraatje: we kijken samen waar je staat en wat bij je past.",
  },
};
