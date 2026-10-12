// Calculations and behaviour for the two tools (Pensioencheck, AOW-gatscan).
// Framework-free on purpose: the site runs it through components/tools/ToolInit.tsx, and
// scripts/export-tools.mjs inlines this same file into the standalone HTML exports. So: no imports,
// and only erasable TypeScript (Node runs this file directly for the export's sanity checks).
// The markup is server-rendered (components/tools); this script only fills [data-out] slots and
// toggles [data-note] blocks. Sentences that bend with the answers live here, fixed copy in content/tools.ts.

// ---- Figures. Check per 1 January and 1 July (AOW) and per 1 January (tax). ----
export const AOW_BRUTO = { alleen: 1662.16, samen: 1139.39 }; // per month, from 1 July 2026 (SVB)
const ZVW = 0.0485; // income-related Zvw contribution, derived from the SVB net amounts 2026

// Income tax for someone past AOW age, 2026. G = gross per year.
export function belasting(G: number, alleen: boolean) {
  let tax = 0.1785 * Math.min(G, 38883);
  if (G > 38883) tax += 0.3756 * (Math.min(G, 78426) - 38883);
  if (G > 78426) tax += 0.495 * (G - 78426);
  const ahk = Math.max(0, 1556 - 0.03195 * Math.max(0, G - 29736));
  const ok = G <= 46002 ? 2067 : Math.max(0, 2067 - 0.15 * (G - 46002));
  const ako = alleen && ok > 0 ? 540 : 0;
  return Math.max(0, tax - ahk - ok - ako);
}

export function nettoPerMaand(brutoMnd: number, alleen: boolean) {
  const G = brutoMnd * 12;
  return (G - belasting(G, alleen) - ZVW * G) / 12;
}

// AOW builds up 2% per insured year in the 50 years before AOW age, so roughly from age 17.
// Shared by both tools, so they can never disagree about the gap.
export const AOW_START = 17;
export function aowGat(jarenBuiten: number) {
  return Math.min(100, Math.max(0, jarenBuiten) * 2);
}

export function persoon(jarenBuiten: number, pensioenBruto: number, alleen: boolean) {
  const volle = alleen ? AOW_BRUTO.alleen : AOW_BRUTO.samen;
  const gat = aowGat(jarenBuiten);
  const aowBruto = volle * (1 - gat / 100);
  const net = nettoPerMaand(aowBruto + pensioenBruto, alleen);
  const netVol = nettoPerMaand(volle + pensioenBruto, alleen);
  return { gat, aowBruto, pensioenBruto, net, verlies: netVol - net };
}

export function aowLeeftijd(geboortejaar: number) {
  if (geboortejaar <= 1960) return { jaren: 67, maanden: 0, vast: true };
  if (geboortejaar <= 1963) return { jaren: 67, maanden: 3, vast: true };
  return { jaren: 67, maanden: 3, vast: false }; // not fixed yet: rises with life expectancy
}

// ---- Behaviour ----

const eur = (n: number) =>
  new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.round(n));

const klasse = (n: number, grenzen: [number, string][]) => grenzen.find(([max]) => n <= max)?.[1] ?? "";

// Helpers bound to one tool's root element
function scope(root: HTMLElement) {
  const field = (id: string) => root.querySelector<HTMLInputElement>(`#${id}`)!;
  return {
    field,
    // Empty input = NaN, so "0" stays a valid answer; accepts a Dutch decimal comma
    num: (id: string) => {
      const v = field(id).value.trim();
      return v === "" ? NaN : Number(v.replace(",", "."));
    },
    out: (name: string, text: string) =>
      root.querySelectorAll(`[data-out="${name}"]`).forEach((el) => (el.textContent = text)),
    note: (name: string, show: boolean) =>
      root.querySelectorAll<HTMLElement>(`[data-note="${name}"]`).forEach((el) => (el.hidden = !show)),
    // The message moves under the field it is about, and focus goes there: on a phone the field
    // can be a full screen above the button, so an error next to the button would go unseen.
    error: (msg: string, id: string) => {
      const el = root.querySelector<HTMLElement>("[data-error]")!;
      root.querySelectorAll("[aria-invalid]").forEach((f) => f.removeAttribute("aria-invalid"));
      const f = field(id);
      f.setAttribute("aria-invalid", "true");
      f.setAttribute("aria-describedby", el.id);
      f.closest("[data-field]")!.append(el);
      el.textContent = msg;
      f.focus();
      root.querySelector<HTMLElement>("[data-result]")!.hidden = true;
    },
    show: () => {
      root.querySelector("[data-error]")!.textContent = "";
      root.querySelectorAll("[aria-invalid]").forEach((f) => f.removeAttribute("aria-invalid"));
      const result = root.querySelector<HTMLElement>("[data-result]")!;
      result.hidden = false;
      // Focus moves to the result so screen readers read it; scrolling follows separately (smooth)
      result.focus({ preventScroll: true });
      result.scrollIntoView({ behavior: "smooth", block: "start" });
    },
  };
}

// Anonymous, grouped statistics: no name, e-mail, amounts or birth year.
// ?test=1 in the address = not counted; utm_source/utm_campaign measure per flyer or channel.
function log(root: HTMLElement, payload: Record<string, string | number>) {
  const url = root.dataset.logUrl;
  const q = new URLSearchParams(location.search);
  if (!url || q.get("test")) return;
  const params = new URLSearchParams({
    ...Object.fromEntries(Object.entries(payload).map(([k, v]) => [k, String(v)])),
    utm_source: q.get("utm_source") || "",
    utm_campaign: q.get("utm_campaign") || "",
  });
  // Logging must never break the tool, so failures stay silent
  fetch(`${url}?${params}`, { mode: "no-cors", keepalive: true }).catch(() => {});
}

const decennium = (gb: number) => {
  const d = Math.floor(gb / 10) * 10;
  return `${d}-${d + 9}`;
};

function pensioencheck(root: HTMLElement, signal: AbortSignal) {
  const { field, num, out, note, error, show } = scope(root);
  const val = (id: string) => field(id).value;
  const hide = (id: string, hidden: boolean) => ((root.querySelector<HTMLElement>(`#${id}`)!).hidden = hidden);

  // Partner and amount fields only appear when they apply
  const updateUI = () => {
    const samen = val("woon") === "samen";
    const mee = samen && field("partnerMee").checked;
    hide("partnerBox", !samen);
    hide("partnerFields", !mee);
    hide("bedragBox", val("pensioenKeuze") !== "bedrag");
    hide("pBedragBox", val("pPensioenKeuze") !== "bedrag");
    out(
      "wensLabel",
      !samen
        ? "Wat wil je later per maand netto kunnen uitgeven?"
        : mee
          ? "Wat willen jullie later samen per maand netto kunnen uitgeven?"
          : "Wat wil je later per maand netto kunnen uitgeven? Vul alleen jouw deel in.",
    );
  };
  for (const id of ["woon", "partnerMee", "pensioenKeuze", "pPensioenKeuze"])
    field(id).addEventListener("change", updateUI, { signal });
  updateUI();

  root.querySelector("form")!.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      const jaar = new Date().getFullYear();
      const gb = num("geboortejaar");
      const werk = val("werk");
      const woon = val("woon");
      const jaren = num("jaren");
      const keuze = val("pensioenKeuze");
      const bedrag = keuze === "bedrag" ? num("bedrag") : 0;
      const wens = num("wens");
      const samen = woon === "samen";
      const mee = samen && field("partnerMee").checked;

      if (!(gb >= 1950 && gb <= 2008)) return error("Vul een geboortejaar tussen 1950 en 2008 in.", "geboortejaar");
      if (!werk) return error("Kies hoe je werkt.", "werk");
      if (!woon) return error("Kies hoe je woont.", "woon");
      if (isNaN(jaren) || jaren < 0 || jaren > 50)
        return error("Vul het aantal jaren buiten Nederland in (0 als je altijd in Nederland woonde).", "jaren");
      if (jaren > Math.max(0, jaar - gb - AOW_START))
        return error("Dat zijn meer jaren dan je sinds je 17e hebt geleefd. Controleer je invoer.", "jaren");
      if (keuze === "bedrag" && (isNaN(bedrag) || bedrag < 0))
        return error('Vul je verwachte pensioen per maand in, of kies "Weet ik niet".', "bedrag");
      if (isNaN(wens) || wens <= 0) return error("Vul in wat je later per maand wilt kunnen uitgeven.", "wens");

      let pJaren = 0;
      let pKeuze = "geen";
      let pBedrag = 0;
      if (mee) {
        pJaren = num("pJaren");
        pKeuze = val("pPensioenKeuze");
        pBedrag = pKeuze === "bedrag" ? num("pBedrag") : 0;
        if (isNaN(pJaren) || pJaren < 0 || pJaren > 50)
          return error("Vul bij je partner het aantal jaren buiten Nederland in.", "pJaren");
        if (pKeuze === "bedrag" && (isNaN(pBedrag) || pBedrag < 0))
          return error('Vul het pensioen van je partner in, of kies "Weet ik niet".', "pBedrag");
      }

      const ik = persoon(jaren, bedrag, !samen);
      const partner = mee ? persoon(pJaren, pBedrag, false) : null;
      const net = ik.net + (partner?.net ?? 0);
      const verlies = ik.verlies + (partner?.verlies ?? 0);
      const tekort = wens - net;
      const ikOnbekend = keuze === "onbekend";
      const pOnbekend = mee && pKeuze === "onbekend";
      const onbekend = ikOnbekend || pOnbekend;

      const al = aowLeeftijd(gb);
      const aowJaar = gb + al.jaren + (al.maanden >= 6 ? 1 : 0);

      out(
        "kicker",
        onbekend
          ? `Alleen op basis van AOW ${mee ? "houden jullie" : "houd je"} later ongeveer over`
          : `Naar schatting ${mee ? "houden jullie" : "houd je"} later over`,
      );
      out("net", eur(net));
      out(
        "verdict",
        tekort > 0 ? `Er ontbreekt ongeveer ${eur(tekort)} per maand` : `Je komt op papier ${eur(-tekort)} per maand uit`,
      );
      out(
        "onbekendWie",
        ikOnbekend && pOnbekend
          ? "Jullie aanvullende pensioenen zijn"
          : ikOnbekend
            ? "Je aanvullend pensioen is"
            : "Het aanvullend pensioen van je partner is",
      );
      note("onbekend", onbekend);
      out("wensWie", mee ? "Jullie wens" : "Jouw wens");
      out("wens", eur(wens));
      out("aow", eur(ik.aowBruto + (partner?.aowBruto ?? 0)));
      out("pensioen", eur(ik.pensioenBruto + (partner?.pensioenBruto ?? 0)));
      out(
        "gatTekst",
        mee ? "Door jaren buiten Nederland lopen jullie AOW mis." : `Je mist ${ik.gat}% van je AOW door jaren buiten Nederland (2% per jaar).`,
      );
      out("verlies", eur(verlies));
      note("verlies", verlies >= 1);
      note("zzp", werk !== "loondienst" && keuze === "geen");
      out(
        "aowTekst",
        aowJaar <= jaar
          ? "Je AOW is naar verwachting al ingegaan of gaat dit jaar in. Controleer in Mijn SVB wat je precies ontvangt."
          : al.vast
            ? `Je AOW gaat naar verwachting rond ${aowJaar} in, op ${al.jaren} jaar${al.maanden ? ` en ${al.maanden} maanden` : ""}.`
            : `Je AOW-leeftijd staat voor jouw geboortejaar nog niet vast. Die stijgt mee met de levensverwachting. Reken op z'n vroegst op rond ${aowJaar}, op ${al.jaren} jaar en ${al.maanden} maanden of later.`,
      );
      show();

      log(root, {
        tool: "pensioencheck",
        gemisteJaren: jaren, // keeps the Apps Script's existing columns working
        gatPercentage: ik.gat,
        status: woon,
        decennium: decennium(gb),
        werk,
        partner: mee ? "ja" : samen ? "niet-meegenomen" : "nee",
        pensioen: keuze,
        jarenKlasse: klasse(jaren, [[0, "0"], [5, "1-5"], [10, "6-10"], [20, "11-20"], [99, "21+"]]),
        tekort: tekort <= 0 ? "geen" : klasse(tekort, [[250, "1-250"], [500, "251-500"], [1000, "501-1000"], [Infinity, "1000+"]]),
        onbekend: onbekend ? "ja" : "nee",
      });
    },
    { signal },
  );
}

function aowGatscan(root: HTMLElement, signal: AbortSignal) {
  const { field, num, out, note, error, show } = scope(root);

  root.querySelector("form")!.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      const jaar = new Date().getFullYear();
      const gb = num("geboortejaar");
      const verhuis = num("verhuisleeftijd");
      const woon = field("woon").value;

      if (!(gb >= 1950 && gb <= 2008)) return error("Vul een geboortejaar tussen 1950 en 2008 in.", "geboortejaar");
      if (isNaN(verhuis) || verhuis < 0) return error("Vul in op welke leeftijd je in Nederland kwam wonen.", "verhuisleeftijd");
      if (verhuis > jaar - gb) return error("Die leeftijd ligt na je huidige leeftijd. Controleer je invoer.", "verhuisleeftijd");
      if (!woon) return error("Kies hoe je woont bij je pensioen.", "woon");

      const jaren = Math.max(0, verhuis - AOW_START);
      const gat = aowGat(jaren);
      const gemisMaand = Math.round((gat / 100) * (woon === "alleen" ? AOW_BRUTO.alleen : AOW_BRUTO.samen));

      note("geenGat", jaren === 0);
      note("gat", jaren > 0);
      out("gat", String(gat));
      out("opgebouwd", String(100 - gat));
      out("jaren", `${jaren} niet-verzekerde ${jaren === 1 ? "jaar" : "jaren"}`);
      out("gemisMaand", eur(gemisMaand));
      out("gemisJaar", eur(gemisMaand * 12));
      show();

      log(root, { tool: "aow-gatscan", gemisteJaren: jaren, gatPercentage: gat, status: woon, decennium: decennium(gb) });
    },
    { signal },
  );
}

const tools: Record<string, (root: HTMLElement, signal: AbortSignal) => void> = {
  pensioencheck,
  "aow-gat": aowGatscan,
};

// Wires every [data-tool] on the page. Returns a cleanup, so React's double effect in dev doesn't double-bind.
export function initTools() {
  const ac = new AbortController();
  document.querySelectorAll<HTMLElement>("[data-tool]").forEach((root) => tools[root.dataset.tool!]?.(root, ac.signal));
  return () => ac.abort();
}
