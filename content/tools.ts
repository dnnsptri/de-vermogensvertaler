// Copy for the two tools. Source: Alberta's standalone HTML tools (12 Oct 2026), carried over with
// the em dashes removed; lines marked OURS are new and need her approval.
// Inline markup in notes and hints: **bold**, [label](url), and {slot} for a value lib/tools.ts fills in.
// Sentences that change with the answers (kicker, verdict, AOW age) live in lib/tools.ts.
// The scans' hero texts are editable by Alberta (keystatic.config.ts); everything else here goes through Dennis.
import pensioencheckHero from "./cms/pensioencheck.json" with { type: "json" };
import aowGatHero from "./cms/aow-gatscan.json" with { type: "json" };

// Google Apps Script web app for the anonymous statistics. Empty = no logging.
export const toolsLogUrl =
  "https://script.google.com/macros/s/AKfycbzQT2lwjdUwUW49WiZu-ws5jeAwm43xib6eseSeioWq5DRCXRld2zKH6jSCgRGEQNIhSg/exec";

const pensioenoverzicht = "[mijnpensioenoverzicht.nl](https://www.mijnpensioenoverzicht.nl)";

// Shared by both result cards
export const toolCta = {
  label: "Bespreek je uitkomst in een kennismaking",
  href: "/#kennismaken",
  again: "Opnieuw berekenen",
};

// Mail field under both tools (site only), the result mail and the opt-in confirmation (Alberta, 28 and 30 Oct 2026).
// The address is required; the note says the result shows on screen regardless. Lines marked OURS need her approval.
export const toolMail = {
  label: "Je e-mailadres",
  placeholder: "naam@voorbeeld.nl",
  hint: "Je uitkomst zie je meteen hier op het scherm. Je krijgt hem ook per mail, met de disclaimer. Je adres gebruik ik alleen daarvoor, tenzij je hieronder kiest voor tips en inspiratie. Zo ga ik met je gegevens om: [privacyverklaring](/privacyverklaring).", // Alberta, 4 Nov 2026
  optin: "Ja, stuur mij af en toe tips, inspiratie en uitnodigingen voor trainingen van De Vermogensvertaler.", // Alberta, 4 Nov 2026
  // Result mail. Intro OURS, ctaIntro Alberta 4 Nov 2026 (the old one sounded like personal advice); the disclaimer follows the button
  intro: "Hier is je uitkomst, zoals je hem net op de site zag.",
  ctaIntro: "Wil je deze uitkomst samen doornemen? Plan een gratis kennismaking.",
  // Opt-in confirmation mail and page (double opt-in). OURS, button and wording Alberta 4 Nov 2026
  confirm: {
    subject: "Bevestig je aanmelding bij De Vermogensvertaler",
    body: "Je gaf aan dat je af en toe tips, inspiratie en uitnodigingen voor trainingen van De Vermogensvertaler wilt ontvangen. Bevestig dat met de knop hieronder. Heb je dit niet gevraagd? Dan hoef je niets te doen, je krijgt dan geen mails van mij.",
    button: "Ja, ik wil tips en inspiratie ontvangen",
    after: "Afmelden kan altijd, via de link onderaan elke mail. Zo ga ik met je gegevens om: [privacyverklaring](/privacyverklaring).",
    page: {
      eyebrow: "Aanmelding",
      heading: "Bevestig je *aanmelding*",
      lede: "Nog één klik, dan stuur ik je af en toe tips, inspiratie en uitnodigingen voor trainingen. Afmelden kan altijd, onderaan elke mail.",
      doneHeading: "Je bent *aangemeld*",
      doneLede: "Dank je wel. Je ontvangt af en toe tips, inspiratie en uitnodigingen voor trainingen van De Vermogensvertaler. Afmelden kan altijd, onderaan elke mail.",
      error: "Deze link klopt niet, is niet compleet of is ouder dan 7 dagen. Vul de tool opnieuw in en vink het vakje aan, dan krijg je een nieuwe link.",
    },
  },
};

const woonOptions: [string, string][] = [
  ["", "Kies…"],
  ["alleen", "Alleenstaand"],
  ["samen", "Samenwonend of getrouwd"],
];

export const pensioencheck = {
  path: "/pensioencheck",
  title: "De Pensioencheck",
  description:
    "Zie in twee minuten wat je later maandelijks aan pensioen overhoudt, en of er iets ontbreekt. Gratis check van De Vermogensvertaler.",
  og: ["De Pensioencheck:", "wat houd je later", "per maand over?"], // OURS: share image headline
  ...pensioencheckHero, // eyebrow, heading, lede: Alberta edits these in content/cms/pensioencheck.json
  steps: ["Over jou", "Je pensioen", "Later"],
  fields: {
    geboortejaar: { label: "In welk jaar ben je geboren?", placeholder: "Bijv. 1985" },
    werk: {
      label: "Hoe werk je?",
      options: [
        ["", "Kies…"],
        ["loondienst", "In loondienst"],
        ["zzp", "Als zzp'er of ondernemer"],
        ["beide", "Allebei, of wisselend"],
      ] as [string, string][],
    },
    woon: { label: "Hoe woon je?", options: woonOptions },
    partnerMee: "Ik neem mijn partner mee in de berekening",
    pJaren: { label: "Partner: jaren niet in Nederland gewoond of gewerkt (vanaf 17e)", placeholder: "0 als altijd in Nederland" },
    pPensioenKeuze: {
      label: "Partner: aanvullend pensioen",
      options: [
        ["bedrag", "Ik weet het bedrag"],
        ["geen", "Geen aanvullend pensioen"],
        ["onbekend", "Weet ik niet"],
      ] as [string, string][],
    },
    pBedrag: { label: "Partner: verwacht pensioen, bruto per maand", placeholder: "Bijv. 900" }, // OURS: was only a placeholder
    jaren: {
      label: "Hoeveel jaar woonde of werkte je sinds je 17e niet in Nederland?",
      placeholder: "0 als altijd in Nederland",
      hint: "Kwam je op je 28e naar Nederland? Dan is dat 11 jaar (28 min 17).",
    },
    pensioenKeuze: {
      label: "Bouw je aanvullend pensioen op, via een werkgever of zelf?",
      options: [
        ["bedrag", "Ja, ik weet het bedrag"], // was "...het verwachte bedrag": cut off on phones
        ["geen", "Nee, geen aanvullend pensioen"],
        ["onbekend", "Weet ik niet"],
      ] as [string, string][],
    },
    bedrag: {
      label: "Verwacht pensioen, bruto per maand", // OURS: was only a placeholder
      placeholder: "Bijv. 900",
      hint: `Staat in je pensioenoverzicht (${pensioenoverzicht}). Zie je een bedrag per jaar? Deel het door 12.`,
    },
    // The label text itself is swapped by lib/tools.ts (alone, together, or only your part)
    wens: { placeholder: "Bijv. 2500", hint: "In euro's van nu, dus zonder rekening te houden met inflatie." },
  },
  submit: "Toon en mail me wat ik later overhoud", // Alberta, 4 Nov 2026: the result shows on screen as well
  submitExport: "Bereken wat ik later overhoud", // standalone HTML files: no mail there
  result: {
    perMonth: "netto per maand",
    // Order = order on screen; keys are the data-out slots lib/tools.ts fills
    rows: { wens: "{wensWie} (netto)", aow: "AOW (na korting, bruto)", pensioen: "Aanvullend pensioen (bruto)", net: "Geschat netto na belasting" },
    notes: {
      onbekend: `{onbekendWie} niet ingevuld, dus dit is het verschil als er alleen AOW is. Het werkelijke tekort is waarschijnlijk kleiner. Kijk in ${pensioenoverzicht} wat je verwacht, en reken dan opnieuw.`,
      verlies: "**AOW-korting.** {gatTekst} Dat scheelt ongeveer **{verlies} netto per maand**, je hele pensioen lang.",
      zzp: "**Zonder eigen regeling** bouw je als zzp'er geen aanvullend pensioen op. Alles boven de AOW komt dan uit eigen vermogen.",
      vermogen:
        "**Wat hier niet in zit:** je eigen vermogen, zoals spaargeld, beleggingen en overwaarde. Hoe je het verschil met eigen vermogen dicht, leg ik je in gewone taal uit.",
    },
  },
  fine: "Dit is een educatieve, indicatieve berekening en geen persoonlijk financieel advies. Gerekend is met de AOW-bedragen en belastingregels van 2026 (AOW per 1 juli 2026) en met de wettelijke AOW-korting van 2% per jaar waarin je niet in Nederland verzekerd was. Netto is een schatting, inclusief de inkomensafhankelijke Zvw-bijdrage. Niet meegeteld zijn: je eigen vermogen (spaargeld, beleggingen, overwaarde van je woning), het vakantiegeld op je AOW, pensioen uit andere landen, en toekomstige wijzigingen in regels of bedragen. In sommige gevallen telt verzekering in een ander land of via een Nederlandse werkgever toch mee voor je AOW. Check je exacte opbouw altijd in Mijn SVB.",
};

export const aowGat = {
  path: "/aow-gatscan",
  title: "De AOW-gatscan",
  description:
    "Zie in twee minuten welk deel van je AOW je opbouwt als je niet sinds je 17e in Nederland woont, en wat dat scheelt per maand. Gratis scan van De Vermogensvertaler.", // OURS
  og: ["De AOW-gatscan:", "hoeveel AOW", "loop je mis?"], // OURS: share image headline
  ...aowGatHero, // eyebrow, heading, lede: Alberta edits these in content/cms/aow-gatscan.json
  fields: {
    geboortejaar: { label: "In welk jaar ben je geboren?", placeholder: "Bijv. 1985" },
    verhuisleeftijd: {
      label: "Op welke leeftijd ben je (voor het laatst) in Nederland komen wonen?",
      placeholder: "Bijv. 28",
      hint: "Woonde je al voor je 17e in Nederland? Vul dan 17 of lager in.",
    },
    woon: { label: "Woonsituatie bij pensionering", options: woonOptions },
  },
  submit: "Toon en mail me mijn AOW-gat", // Alberta, 4 Nov 2026
  submitExport: "Bereken mijn AOW-gat",
  result: {
    unit: "% AOW-gat",
    geenGat:
      "Op basis van wat je invulde, heb je waarschijnlijk **geen AOW-gat**: je woonde al voor je 17e in Nederland. Dat is goed nieuws, maar controleer je exacte percentage altijd zelf in Mijn SVB.",
    opbouw: "Je bouwt naar schatting **{opgebouwd}%** van een volledige AOW op, over {jaren}.",
    gemis: "Geschat gemis: **{gemisMaand} bruto per maand**, oftewel ongeveer **{gemisJaar} per jaar**, je hele pensioen lang.",
  },
  fine: "Deze scan is een educatieve inschatting op basis van de officiële AOW-opbouwregel (2% per verzekerd jaar in de 50 jaar voor je AOW-leeftijd, dus doorgaans vanaf leeftijd 17) en de actuele AOW-bedragen van de SVB. Je persoonlijke situatie kan afwijken door onder meer eerdere verhuizingen, werk voor een Nederlandse werkgever in het buitenland, of vrijwillige AOW-verzekering. Check je exacte opbouw altijd in Mijn SVB. Dit is geen persoonlijk financieel advies.",
};
