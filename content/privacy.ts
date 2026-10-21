// Privacyverklaring, verbatim from Alberta's "Privacy Statement De Vermogensvertaler.docx" (12 Oct 2026).
// Legal text: change nothing without her. Changed on 19 Oct 2026 (mailed to her for approval): contact
// address is site.email (admin@ doesn't exist), cookie sentence (said she *does* use tracking cookies),
// Cal.com is embedded on the homepage, Vercel is American, Google row completed, Google Analytics row added.
// Inline markup: **bold** and [label](url).
// A block is a paragraph (string), a bullet list or a table.
import { site } from "./site";

export type PrivacyBlock = string | { list: string[] } | { table: { head: string[]; rows: string[][] } };

export const privacy = {
  path: "/privacyverklaring",
  title: "Privacyverklaring",
  updated: "Laatst bijgewerkt: 22 oktober 2026",
  lede: "De Vermogensvertaler gaat zorgvuldig om met je gegevens en vraagt alleen wat nodig is. Hieronder lees je welke gegevens ik verwerk, waarom, met wie ik ze deel en hoe lang ik ze bewaar.",
  sections: [
    {
      title: "Wie is verantwoordelijk",
      blocks: [
        "Alberta Opoku, handelend onder de naam De Vermogensvertaler, is verantwoordelijk voor de verwerking van je gegevens.",
        { list: ["KvK-nummer: 34345341", `E-mail: [${site.email}](mailto:${site.email})`] },
      ],
    },
    {
      title: "Welke gegevens, waarom en op welke grondslag",
      blocks: [
        {
          table: {
            head: ["Situatie", "Gegevens", "Doel", "Grondslag"],
            rows: [
              [
                "Rekentools (Pensioencheck, AOW-gatscan)",
                "Alleen gegroepeerde antwoorden, zoals decennium van geboorte, aantal jaren buiten Nederland, werkvorm, alleen of samen. Geen naam, e-mailadres of exacte bedragen.",
                "Anonieme statistieken en verbetering van de tools",
                "Gerechtvaardigd belang",
              ],
              [
                "Een kennismaking plannen (Cal.com)",
                "Naam, e-mailadres, tijdstip van de afspraak en wat je zelf invult",
                "Het gesprek plannen en voeren",
                "Uitvoering van een overeenkomst, of stappen daarvoor op jouw verzoek",
              ],
              [
                "Contact via e-mail of een bericht op LinkedIn of Instagram",
                "Naam of profielnaam en je bericht",
                "Je vraag beantwoorden",
                "Gerechtvaardigd belang",
              ],
              [
                "Trainingen en begeleiding",
                "Naam, e-mailadres, factuurgegevens, deelname",
                "Training uitvoeren en factureren",
                "Uitvoering van een overeenkomst; wettelijke plicht voor de administratie",
              ],
              [
                "Bezoek aan de website",
                "IP-adres, tijdstip en browser in serverlogs, kortdurend",
                "Beveiliging en werking van de site",
                "Gerechtvaardigd belang",
              ],
            ],
          },
        },
        "Ik vraag je niet om je BSN, bankgegevens of beleggingsgegevens. Deel je in een gesprek of training toch iets over je eigen situatie, dan gebruik ik dat alleen voor dat gesprek en bewaar ik geen financiële details.",
        "Ik neem geen besluiten die alleen op automatische verwerking zijn gebaseerd en maak geen profielen van je.",
      ],
    },
    {
      title: "Rekentools en cookies",
      blocks: [
        "**Hoe de rekentools werken.** De berekening gebeurt in je browser. Na het berekenen stuur ik een klein aantal gegroepeerde kenmerken door, bijvoorbeeld het decennium van je geboortejaar (niet je geboortejaar zelf), het aantal jaren buiten Nederland, je werkvorm en of je alleen of samen bent. Je naam, e-mailadres en exacte bedragen stuur ik niet door. Ik gebruik deze gegevens alleen gecombineerd, bijvoorbeeld om te zeggen hoeveel procent van de bezoekers een AOW-gat heeft.",
        "**Opslag.** Deze antwoorden komen in een Google Sheet via Google Apps Script. Google ontvangt daarbij technisch het verzoek, inclusief gegevens als je IP-adres. In mijn overzicht bewaar ik die niet.",
        "**Links met tags.** Een link kan een tag bevatten, zoals utm_source=poster, zodat ik zie via welk kanaal je kwam. Die tag zegt niets over jou persoonlijk.",
        "**Cookies.** Ik gebruik Google Analytics 4 voor bezoekersstatistieken, en alleen na toestemming via de cookiemelding. Ik gebruik geen advertentiecookies of advertentietracking. De agenda op de homepage is van Cal.com. Als je daarin een afspraak plant, verwerkt Cal.com je gegevens en geldt voor hun cookies de privacyverklaring van Cal.com.",
      ],
    },
    {
      title: "Met wie ik gegevens deel",
      blocks: [
        "Ik verkoop je gegevens niet. Ik schakel wel partijen in die gegevens voor mij verwerken. Met hen heb ik afspraken over de beveiliging en het gebruik van die gegevens.",
        {
          table: {
            head: ["Partij", "Waarvoor", "Welke gegevens", "Locatie"],
            rows: [
              [
                "Vercel (hostingpartij)",
                "De website tonen",
                "Technische gegevens, zoals IP-adres",
                "Verenigde Staten, met servers wereldwijd, onder het EU-VS Data Privacy Framework en standaardcontractbepalingen.",
              ],
              [
                "Cal.com",
                "Afspraken plannen",
                "Naam, e-mailadres, afspraak",
                "Verenigde Staten, onder het EU-VS Data Privacy Framework en standaardcontractbepalingen.",
              ],
              [
                "Google (Sheets, Apps Script, e-mail, agenda)",
                "Anonieme overzichten van de rekentools, e-mail en agenda",
                "Gegroepeerde antwoorden van de rekentools; bij e-mail en afspraken je naam, e-mailadres en bericht",
                "Verenigde Staten en andere landen waar Google of zijn verwerkers vestigingen hebben.",
              ],
              [
                "Google Analytics 4",
                "Bezoekersstatistieken, alleen na toestemming",
                "Bezochte pagina's, apparaat, browser en globale locatie. Google Analytics slaat geen IP-adressen op.",
                "Verenigde Staten, onder het EU-VS Data Privacy Framework en standaardcontractbepalingen.",
              ],
              ["Stripe", "Betalingen", "Betaalgegevens, factuurgegevens", "Europese Unie, Verenigde Staten en India."],
              ["ManyChat", "Automatisch antwoord op Instagram", "Je profielnaam en bericht", "Verenigde Staten en andere landen."],
            ],
          },
        },
        "Ik geef gegevens ook door als een wet dat vereist, bijvoorbeeld aan de Belastingdienst.",
        "**Buiten de EU.** Sommige partijen verwerken gegevens buiten de Europese Economische Ruimte, bijvoorbeeld in de Verenigde Staten. Dat gebeurt alleen met passende waarborgen, zoals het EU-US Data Privacy Framework of standaardcontractbepalingen.",
      ],
    },
    {
      title: "Hoe lang ik gegevens bewaar en hoe ik ze beveilig",
      blocks: [
        {
          table: {
            head: ["Gegevens", "Bewaartermijn"],
            rows: [
              ["Anonieme antwoorden van de rekentools", "Zolang ze nuttig zijn voor statistieken; ze zijn niet herleidbaar tot een persoon"],
              ["Afspraak of vraag zonder vervolg", "Maximaal 12 maanden na het laatste contact"],
              ["Deelnemers aan trainingen", "Tot 24 maanden na afloop van de training"],
              ["Facturen en administratie", "7 jaar (fiscale bewaarplicht)"],
              [
                "Serverlogs van de website (zoals IP-adres en browser)",
                "Maximaal 1 dag (Vercel kan eigen logs bewaren voor beveiliging, zie de eigen privacyverklaring)",
              ],
            ],
          },
        },
        "**Beveiliging.** Ik geef alleen mijzelf en eventueel een daartoe bevoegde collega toegang tot je gegevens, gebruik tweestapsverificatie op mijn accounts en vraag niet meer gegevens dan nodig. Een vermoeden van een datalek meld ik waar nodig bij de Autoriteit Persoonsgegevens en bij jou.",
      ],
    },
    {
      title: "Jouw rechten, klachten en wijzigingen",
      blocks: [
        "Je kunt mij vragen om:",
        {
          list: [
            "inzage in je gegevens;",
            "correctie of verwijdering van je gegevens;",
            "beperking van de verwerking, of bezwaar tegen de verwerking;",
            "je gegevens in een gangbaar formaat te ontvangen (overdraagbaarheid).",
          ],
        },
        `Stuur daarvoor een e-mail naar [${site.email}](mailto:${site.email}). Ik kan eerst vragen wie je bent. Ik reageer binnen één maand.`,
        "Vind je dat ik niet goed met je gegevens omga? Neem dan eerst contact met mij op. Je kunt ook een klacht indienen bij de [Autoriteit Persoonsgegevens](https://www.autoriteitpersoonsgegevens.nl).",
        "Ik kan deze verklaring aanpassen, bijvoorbeeld als ik nieuwe tools of diensten gebruik. De datum bovenaan toont de laatste wijziging.",
      ],
    },
  ],
};
