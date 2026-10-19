// Standalone HTML exports of the tools, generated from the built site so the site stays the single
// source of truth. Run: npm run export:tools [-- <output dir>]   (default: ./export)
// Each file is self-contained: the site's own CSS and fonts inlined, Next's scripts removed, and
// lib/tools.ts (the same code the site runs) inlined as plain JS. Links point to the live site.
import assert from "node:assert/strict";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import ts from "typescript";
import { site } from "../content/site.ts";
import { aowGat as aowGatCopy, pensioencheck } from "../content/tools.ts";
import { AOW_BRUTO, aowGat, persoon } from "../lib/tools.ts";

// Sanity checks first: never export broken numbers. 1985, moved here at 30 = 13 years = 26% (README check).
assert.equal(aowGat(30 - 17), 26);
assert.equal(aowGat(60), 100);
assert.equal(aowGat(-3), 0);
assert.equal(persoon(0, 500, true).verlies, 0);
assert.ok(persoon(10, 500, true).net < persoon(0, 500, true).net);
assert.ok(Math.abs(persoon(50, 0, true).aowBruto) < 1e-9 && AOW_BRUTO.alleen > AOW_BRUTO.samen);

const outDir = resolve(process.argv[2] ?? "export");
const nextDir = ".next";

// lib/tools.ts as browser JS, wrapped so nothing leaks into the host page's globals
const toolJs = ts
  .transpileModule(readFileSync("lib/tools.ts", "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext, removeComments: true },
  })
  .outputText.replace(/^export \{\};?$/gm, "")
  .replace(/^export /gm, "");
const toolScript = `<script>\n(() => {\n${toolJs}\ninitTools();\n})();\n</script>`;

// The site's stylesheet with its fonts as data URIs. Only the subsets the page preloads (latin) are kept;
// the other @font-face blocks (cyrillic, greek, ...) are dropped to keep the file small.
function inlineCss(href, preloaded) {
  const file = join(nextDir, href.replace(/^\/_next\//, ""));
  return readFileSync(file, "utf8").replace(/@font-face\s*\{[^}]*\}/g, (block) => {
    const url = block.match(/url\(([^)]+)\)/);
    if (!url) return block; // fallback faces use local() only
    if (!preloaded.has(url[1].split("/").pop())) return "";
    const data = readFileSync(resolve(dirname(file), url[1])).toString("base64");
    return block.replace(url[0], `url(data:font/woff2;base64,${data})`);
  });
}

mkdirSync(outDir, { recursive: true });
for (const { path } of [pensioencheck, aowGatCopy]) {
  let html = readFileSync(join(nextDir, "server/app", `${path}.html`), "utf8");
  const preloaded = new Set([...html.matchAll(/href="\/_next\/static\/media\/([^"]+)" as="font"/g)].map((m) => m[1]));

  html = html
    .replace(/<link rel="stylesheet" href="([^"]+)"[^>]*\/>/g, (_, href) => `<style>${inlineCss(href, preloaded)}</style>`)
    // Next's runtime, preloads and leftovers; JSON-LD stays
    .replace(/<script(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(/<link rel="preload"[^>]*\/>/g, "")
    .replace(/<meta name="(robots|next-size-adjust)"[^>]*\/>/g, "") // copies rely on the canonical link instead
    .replace(/<div hidden=""><!--\$--><!--\/\$--><\/div>/g, "")
    // Site-only parts (cookie settings), marked in the components
    .replace(/<(\w+)[^>]*data-export="remove"[^>]*>[\s\S]*?<\/\1>/g, "")
    // Site-relative links and icons point to the live site
    .replace(/(href|src)="\/(?!\/)/g, `$1="${site.url}/`)
    .replace("</body>", `${toolScript}</body>`);

  // A leftover reference to Next's assets would break offline; fail loudly instead
  assert.ok(!html.includes("/_next/"), `${path}: still references /_next/`);
  assert.ok(html.includes("data-tool="), `${path}: tool markup missing`);

  const file = join(outDir, `${path.slice(1)}.html`);
  writeFileSync(file, html);
  console.log(`${file}  ${(html.length / 1024).toFixed(0)} KB`);
}

// Read-me for Alberta, written with every export so the ZIP always explains itself
const tools = [pensioencheck, aowGatCopy];
const today = new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
writeFileSync(
  join(outDir, "LEESMIJ.txt"),
  `De Vermogensvertaler: Pensioencheck en AOW-gatscan
Export van ${today}

DE WEBSITE IS DE BRON
De tools staan op de website:
${tools.map((t) => `- ${t.title}: ${site.url}${t.path}`).join("\n")}
Uitgebreide handleiding: ${site.url}/handleiding

Deze HTML-bestanden zijn kopieën, gemaakt uit de website. Ze rekenen en loggen precies
hetzelfde als de pagina's op de site. Pas ze niet zelf aan: dan lopen site en kopie uit
elkaar. Wijzigingen (teksten, bedragen) gaan via de website, daarna volgt een nieuwe export.
De oude losse bestanden (zonder deze LEESMIJ) zijn vervangen en niet meer nodig.

GEBRUIK
- Dubbelklik een bestand om het in de browser te openen. Internet is alleen nodig voor de
  links en de logging.
- Elk bestand is compleet (huisstijl en lettertypes zitten erin), dus je kunt het ook
  mailen of op een andere plek zetten.
- De knop "Bespreek je uitkomst in een kennismaking" gaat naar de agenda op de website.

LOGGING (GOOGLE SHEET)
- Na elke berekening komt er een anonieme regel in je Google Sheet: gegroepeerde
  antwoorden, geen naam, e-mail, bedragen of geboortejaar. Zelfde kolommen als voorheen.
- Zet ?test=1 achter de link om te testen zonder dat het meetelt.
- Zet ?utm_source=...&utm_campaign=... achter de link om per flyer of kanaal te meten.

ELK HALFJAAR NAKIJKEN
- AOW-bedragen: per 1 januari en 1 juli (nu: per 1 juli 2026).
- Belastingcijfers: per 1 januari.
Geef nieuwe bedragen door; ze worden op één plek aangepast en gelden dan voor site én export.
`,
);
console.log(join(outDir, "LEESMIJ.txt"));

