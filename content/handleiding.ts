// Copy for /handleiding: Alberta's manual for the tools, the Google Sheet, the exports and Analytics.
// Not linked from the site and not indexed; she gets the link by mail. Same inline markup as the tools:
// **bold** and [label](url). Keep it timeless: one-off to-dos belong in the mail, not here.
import { site } from "./site";
import { aowGat, pensioencheck } from "./tools";

const link = (path: string) => `[${site.url.replace("https://", "")}${path}](${site.url}${path})`;

export const handleiding = {
  path: "/handleiding",
  title: "Handleiding",
  eyebrow: "Voor Alberta",
  heading: "Zo werken je *tools*",
  lede: "Alles over de Pensioencheck en de AOW-gatscan op één plek: delen, meten, testen en aanpassen.",
  sections: [
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
      title: "De losse bestanden (ZIP)",
      items: [
        "Naast de website heb je de tools ook als losse HTML-bestanden. Dubbelklik een bestand en het opent in je browser.",
        "Elk bestand is compleet, dus je kunt het ook mailen of op een andere plek zetten. Ze rekenen en loggen precies zoals de website.",
        "**Pas ze niet zelf aan.** Dan lopen site en bestand uit elkaar. Na elke wijziging op de site krijg je een nieuwe ZIP.",
      ],
    },
    {
      title: "Bezoekers in Google Analytics",
      items: [
        "Open [Google Analytics](https://analytics.google.com), kies **Rapporten** en dan **Realtime** om te zien wie er nu op je site is.",
        "Analytics telt alleen bezoekers die in de cookiemelding op **Akkoord** klikken. De echte aantallen zijn dus hoger. Je Google Sheet telt wel iedereen die een tool invult.",
      ],
    },
    {
      title: "Iets aanpassen",
      items: [
        `Mail wat je wilt veranderen en op welke pagina: [hi@dennispetri.nl](mailto:hi@dennispetri.nl). Een screenshot met de tekst erbij is genoeg.`,
        "**Elk halfjaar nakijken:** de AOW-bedragen veranderen per 1 januari en 1 juli, de belastingcijfers per 1 januari. Geef de nieuwe bedragen door, dan gelden ze meteen voor site en bestanden.",
      ],
    },
  ],
};
