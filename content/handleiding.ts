// Copy for /handleiding: Alberta's manual, editing in Keystatic first, then the tools and the Google Sheet.
// Not linked from the site and not indexed (the editor itself is at /keystatic); she gets the link by mail. Same inline markup as the tools:
// **bold** and [label](url). Keep it timeless: one-off to-dos belong in the mail, not here.
import { site } from "./site";
import { aowGat, pensioencheck } from "./tools";

const link = (path: string) => `[${site.url.replace("https://", "")}${path}](${site.url}${path})`;

export const handleiding = {
  path: "/handleiding",
  title: "Handleiding",
  eyebrow: "Voor Alberta",
  heading: "Zo pas je je *site* aan",
  lede: "Je teksten pas je zelf aan in Keystatic. Hier lees je hoe, en hoe je je tools deelt en test.",
  sections: [
    {
      title: "Inloggen",
      items: [
        `Ga naar ${link("/keystatic")} en log in met je Keystatic-account.`,
        "Zet de link in je bladwijzers, dan heb je hem altijd bij de hand.",
      ],
    },
    {
      title: "Een tekst aanpassen",
      items: [
        "Kies links de pagina: **Homepage**, **Pensioencheck**, **AOW-gatscan** of **De Kring**.",
        "Elk blok op de pagina heeft een eigen kopje met de velden eronder, in dezelfde volgorde als op de site.",
        "Pas de tekst aan en klik rechtsboven op **Save**. Na ongeveer een minuut staat je wijziging op de site. Ververs de pagina om hem te zien.",
      ],
    },
    {
      title: "Handige trucs",
      items: [
        "**Geel woord in een titel?** Zet er sterretjes omheen, bijvoorbeeld: Herken je *dit*? Op de site wordt dat woord dan geel, zonder sterretjes.",
        "**Waar breekt de titel af?** Bij de grote titel bovenaan de homepage staat elke regel apart. Zo bepaal je zelf waar een nieuwe regel begint.",
        "**Alinea of punt erbij?** Bij lijsten, zoals de alinea's over jou of wat De Kring oplevert, kun je er een toevoegen of weghalen. Het aantal stappen en uitspraken op de homepage ligt vast, omdat de vormgeving daarop is gebouwd.",
      ],
    },
    {
      title: "Wat je zelf doet en wat via Dennis gaat",
      items: [
        "**Zelf:** alle teksten op de homepage en op de pagina van De Kring (ook de link van de aanmeldknop, bijvoorbeeld je Stripe-link), en de titel en introductie van de Pensioencheck en de AOW-gatscan.",
        "**Via Dennis:** blokken verplaatsen of toevoegen, nieuwe pagina's, foto's, knoppen en links, de berekeningen in de tools en je privacyverklaring.",
        "**Gaat er iets mis?** Elke wijziging wordt bewaard, dus Dennis kan altijd terug naar een eerdere versie.",
      ],
    },
    {
      title: "Je tools",
      items: [
        `**${pensioencheck.title}:** ${link(pensioencheck.path)}`,
        `**${aowGat.title}:** ${link(aowGat.path)}`,
        "De website is de bron. De berekening, de teksten en de logging staan op één plek en gelden overal tegelijk.",
      ],
    },
    {
      title: "Delen en meten per kanaal",
      items: [
        "Deel gewoon de link hierboven, in WhatsApp, op LinkedIn of als QR-code op een poster.",
        `Wil je weten welk kanaal werkt? Zet er een label achter: **${site.url.replace("https://", "")}${pensioencheck.path}?utm_source=poster&utm_campaign=event-oktober**. Dat label komt mee in je Google Sheet.`,
        "Kies korte woorden zonder spaties, bijvoorbeeld instagram, linkedin, nieuwsbrief of flyer.",
      ],
    },
    {
      title: "Je Google Sheet",
      items: [
        "Na elke berekening komt er een anonieme regel in je Sheet, met dezelfde kolommen als voorheen.",
        "Er staat geen naam, e-mail, geboortejaar of exact bedrag in. Alleen gegroepeerde antwoorden, zoals het decennium waarin iemand geboren is of een bandbreedte van het tekort.",
        `**Zelf testen?** Zet ?test=1 achter de link, bijvoorbeeld ${pensioencheck.path}?test=1. Dan telt je test niet mee.`,
      ],
    },
    {
      title: "Iets anders veranderen",
      items: [
        `Voor alles wat je niet zelf aanpast: mail wat je wilt veranderen en op welke pagina naar [hi@dennispetri.nl](mailto:hi@dennispetri.nl). Een screenshot met een korte uitleg is genoeg.`,
        "**Elk halfjaar nakijken:** de AOW-bedragen veranderen per 1 januari en 1 juli, de belastingcijfers per 1 januari. Geef de nieuwe bedragen door, dan gelden ze meteen voor site en bestanden.",
      ],
    },
  ],
};
