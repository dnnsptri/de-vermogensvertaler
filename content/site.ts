// All site copy lives here, so text changes never touch components.
// Simple homepage (October 2026): what it is, who Alberta is, who it's for, plus booking.
// The earlier 7-block homepage, detail pages and scans are parked in git tag wireframe-7blocks.
// `*word*` in a heading marks the emphasised word (mustard highlight, or mustard text on dark).
import { aowGat, pensioencheck } from "./tools.ts"; // .ts: scripts/export-tools.mjs loads this file in plain Node
import { trainingen, trainingHref, trainingLink } from "./trainingen.ts";
import homeText from "./cms/home.json" with { type: "json" };

const email = "alberta@devermogensvertaler.nl";
// Sign-ups by mail until her Stripe link and the waitlist/newsletter forms exist (Dennis, 21 Oct 2026)
export const mailto = (subject: string) => `mailto:${email}?subject=${encodeURIComponent(subject)}`;

const pensioenLink = { label: "Doe de Pensioencheck", href: pensioencheck.path }; // her button label
const aowLink = { label: "Doe de AOW-gatscan", href: aowGat.path };

export const site = {
  name: "De Vermogensvertaler",
  owner: "Alberta Opoku",
  tagline: "Financiële taal, vertaald naar jouw leven",
  // SEO: canonical domain (override per environment with NEXT_PUBLIC_SITE_URL) and default description
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://devermogensvertaler.nl",
  description:
    "Je verdient goed en wilt als eerste in je familie vermogen opbouwen. Alberta Opoku legt in gewone taal uit hoe geld, pensioen en beleggen werken. Geen financiële producten, geen persoonlijk advies.",
  // Verbatim from Alberta's text document (8 Oct 2026)
  disclaimer:
    "De Vermogensvertaler geeft educatie en begeleiding, geen persoonlijk financieel advies of beleggingsadvies. Beleggen brengt risico's met zich mee. Alberta Opoku is geen vergunninghouder onder de Wft.",
  email,
  // Google Analytics 4: property "De Vermogensvertaler" (account 111826009), web stream devermogensvertaler.nl.
  // Only loads after cookie consent (components/CookieConsent.tsx).
  gaId: "G-919MP1L46Z",
  // Footer and cookie bar link; page copy in content/privacy.ts
  privacyHref: "/privacyverklaring",
  // Cal.com booking path, e.g. "alberta-opoku/kennismaking". Empty = placeholder until her account exists.
  calLink: "devermogensvertaler/kennismaking",
  // Label as Alberta wrote it
  booking: { label: "Plan een kennismaking", href: "#kennismaken" },
  // Main menu (components/Nav.tsx), agreed 21 Oct 2026: the scans, trainings, about, contact. On desktop the logo is
  // home and the hero button books; the phone menu adds Home first and the booking button last.
  // Training: straight to the training once there is one, until then the overview with its "binnenkort" text.
  nav: [
    { label: "Pensioencheck", href: pensioencheck.path },
    { label: "AOW-gatscan", href: aowGat.path },
    trainingLink ?? { label: "Training", href: trainingen.path },
    { label: "Over Alberta", href: "/#over" },
    { label: "Contact", href: "/#kennismaken" }, // the booking section (Cal.com)
  ],
  // Profiles with href "#" are hidden until the real URL is known
  social: [
    { label: "Instagram", href: "https://www.instagram.com/albertaopoku2018/" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/albertaopoku/" },
  ],
};

// Homepage copy lives in content/cms/home.json, which Alberta edits at /keystatic (keystatic.config.ts).
// Origin: her "Websitetekst De Vermogensvertaler" (8 Oct 2026), with "Tocht" -> "Toch" and a full stop after
// "Nu je vermogen nog". Not in her document (ours, she approved the page): what.title and the booking texts.
// Photos, button targets and step links stay here: she edits words, layout goes through Dennis.
const text = homeText;

// Text links under each homepage step, by position (her steps are fixed at four in the editor).
// ponytail: matched by index; if she reorders steps in the editor, the links follow the position, not the step.
const stepLinks = [
  [pensioenLink, aowLink],
  [{ label: "Plan een kennismaking", href: "#kennismaken" }],
  // De Kring, her first training: "wachtlijst" goes to its sign-up page; the newsletter sentence gets its own link
  [
    { label: "Zet jezelf op de wachtlijst", href: trainingHref(trainingen.items[0]) },
    { label: "Schrijf je in voor de nieuwsbrief", href: mailto("Nieuwsbrief") },
  ],
  [],
];

export const home = {
  ...text,
  hero: {
    // Fixed line breaks: the white lines, then the mustard lines
    title: [text.hero.white, text.hero.mustard],
    intro: text.hero.intro,
    photo: {
      src: "/photos/alberta-tafel.jpg",
      alt: "Alberta Opoku in een gele trui, zittend op een tafel met boeken over geld",
    },
  },
  what: { ...text.what, steps: text.what.steps.map((step, i) => ({ ...step, links: stepLinks[i] ?? [] })) },
  who: {
    ...text.who,
    photo: {
      src: "/photos/alberta-portret.jpg",
      alt: "Alberta Opoku in een witte geborduurde blouse voor een donkergroene muur",
    },
  },
  success: {
    ...text.success,
    photo: {
      src: "/photos/alberta-park.jpg",
      alt: "Alberta Opoku in een geruite jas, wandelend in een park",
    },
  },
};
