// Privacyverklaring, verbatim from Alberta's "Privacy Statement De Vermogensvertaler.docx" (12 Oct 2026).
// Legal text: change nothing without her. Changed on 19 Oct 2026 (mailed to her for approval): contact
// address (admin@ since 21 Oct 2026, her request), cookie sentence (said she *does* use tracking cookies),
// Cal.com is embedded on the homepage, Vercel is American, Google row completed, Google Analytics row added.
// 2 Nov 2026: result by mail and opt-in via Resend (new rows in the first, processors and retention tables, extra
// paragraph under "Rekentools en cookies"). Reworked after her feedback of 4 Nov 2026, approved by Alberta.
// Inline markup: **bold** and [label](url).
// A block is a paragraph (string), a bullet list or a table.
// Her privacy address; everything else on the site mails site.email
const email = "admin@devermogensvertaler.nl";

export type PrivacyBlock = string | { list: string[] } | { table: { head: string[]; rows: string[][] } };

export const privacy = {
  path: "/privacyverklaring",
  title: "Privacyverklaring",
  updated: "Laatst bijgewerkt: 2 november 2026",
  lede: "De Vermogensvertaler gaat zorgvuldig om met je gegevens en vraagt alleen wat nodig is. Hieronder lees je welke gegevens ik verwerk, waarom, met wie ik ze deel en hoe lang ik ze bewaar.",
  sections: [
    {
      title: "Wie is verantwoordelijk",
      blocks: [
        "Alberta Opoku, handelend onder de naam De Vermogensvertaler, is verantwoordelijk voor de verwerking van je gegevens.",
        { list: ["KvK-nummer: 34345341", `E-mail: [${email}](mailto:${email})`] },
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
                "Rekentools (Pensioencheck, AOW-gatscan): statistieken",
                "Alleen gegroepeerde antwoorden, zoals decennium van geboorte, aantal jaren buiten Nederland, werkvorm, alleen of samen. Geen naam, e-mailadres of exacte bedragen.",
                "Anonieme statistieken en verbetering van de tools",
                "Gerechtvaardigd belang",
              ],
              [
                "Rekentools: je uitkomst per mail",
                "E-mailadres en je uitkomst",
                "Je de uitkomst mailen, met de uitnodiging voor een kennismaking",
                "Uitvoering van je verzoek",
              ],
              [
                "Tips, inspiratie en uitnodigingen voor trainingen (alleen als je het vakje aanvinkt en je aanmelding bevestigt)",
                "E-mailadres",
                "Je af en toe tips, inspiratie en uitnodigingen voor trainingen mailen",
                "Toestemming, die je altijd kunt intrekken via de afmeldlink in elke mail",
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
        "**Hoe de rekentools werken.** De berekening gebeurt in je browser. Na het berekenen stuur ik een klein aantal gegroepeerde kenmerken door, bijvoorbeeld het decennium van je geboortejaar (niet je geboortejaar zelf), het aantal jaren buiten Nederland, je werkvorm en of je alleen of samen bent. Je naam, e-mailadres en exacte bedragen komen niet in dat overzicht. Ik gebruik deze gegevens alleen gecombineerd, bijvoorbeeld om te zeggen hoeveel procent van de bezoekers een AOW-gat heeft.",
        "**Je uitkomst per mail.** Om de uitkomst te zien vul je je e-mailadres in. Je antwoorden gaan dan naar de website, die de uitkomst opnieuw berekent en je antwoorden niet bewaart. Naar mijn mailsysteem Resend gaan alleen je e-mailadres en de mail met je uitkomst. Ik meet niet of je die mail opent of op links klikt. Je antwoorden en je adres komen niet in het overzicht met statistieken. Zonder vinkje kom je niet op mijn mailinglijst; je mail staat dan alleen 30 dagen in het verzendoverzicht van Resend. Vink je het vakje voor tips, inspiratie en uitnodigingen aan, dan krijg je eerst een mail om dat te bevestigen. Pas na die bevestiging kom je op mijn mailinglijst, en afmelden kan altijd onderaan elke mail.",
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
              [
                "Resend",
                "Je uitkomst mailen, en tips, inspiratie en uitnodigingen voor trainingen als je je daarvoor aanmeldt",
                "E-mailadres en de inhoud van de mail, zoals je uitkomst",
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
              ["Verzonden mails met je uitkomst (bij Resend)", "30 dagen, daarna verwijdert Resend ze"],
              ["E-mailadres op de mailinglijst", "Tot je je afmeldt, en uiterlijk 24 maanden na je laatste contact met mij. Na afmelden bewaar ik alleen dat je afgemeld bent, zodat je geen mail meer krijgt"],
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
        `Stuur daarvoor een e-mail naar [${email}](mailto:${email}). Ik kan eerst vragen wie je bent. Ik reageer binnen één maand.`,
        "Vind je dat ik niet goed met je gegevens omga? Neem dan eerst contact met mij op. Je kunt ook een klacht indienen bij de [Autoriteit Persoonsgegevens](https://www.autoriteitpersoonsgegevens.nl).",
        "Ik kan deze verklaring aanpassen, bijvoorbeeld als ik nieuwe tools of diensten gebruik. De datum bovenaan toont de laatste wijziging.",
      ],
    },
  ],
};
