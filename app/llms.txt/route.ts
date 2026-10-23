import { home, site } from "@/content/site";
import { aowGat, pensioencheck } from "@/content/tools";
import { trainingen, trainingHref } from "@/content/trainingen";

// /llms.txt: plain-text summary for AI assistants (ChatGPT, Claude, Perplexity), built from the same
// copy as the homepage so it never drifts. Static: generated once at build time.
export const dynamic = "force-static";

// Headings mark the highlighted word with *word*; AI readers don't need that
const plain = (text: string) => text.replaceAll("*", "");

export function GET() {
  const body = `# ${site.name}

> ${site.description}

${home.hero.title.map((lines) => lines.join(" ")).join(" ")}

${home.hero.intro}

## ${home.forWhom.eyebrow}: ${plain(home.forWhom.title)}

${home.forWhom.items.map((i) => `- ${i.title} ${i.text}`).join("\n")}

## ${plain(home.what.title)}

${home.what.intro}

${home.what.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join("\n")}

### ${home.what.not.title}

${home.what.not.text}

## Gratis tools

Twee gratis rekenhulpen, zonder account en zonder dat je naam of e-mail nodig is:

${[pensioencheck, aowGat].map((t) => `- [${t.title}](${site.url}${t.path}): ${t.description}`).join("\n")}

Uitgangspunten: ${pensioencheck.fine}

## Training

${trainingen.items
  .map(
    (t) => `### [${t.title}](${site.url}${trainingHref(t)})

${t.lede} ${t.when}.

${t.intro.join("\n\n")}

${t.benefitsTitle}:
${t.benefits.map((b) => `- ${b}`).join("\n")}

${t.facts.map((f) => `- ${f.label}: ${f.value}`).join("\n")}${t.footnote ? `\n\n${t.footnote}` : ""}`,
  )
  .join("\n\n")}

## ${home.who.eyebrow}

${home.who.body.join("\n\n")}

## ${home.booking.eyebrow}

${home.booking.text}

- Afspraak plannen: ${site.url}/${site.booking.href}
- E-mail: ${site.email}
${site.social.map((s) => `- ${s.label}: ${s.href}`).join("\n")}

## Disclaimer

${site.disclaimer}
`;

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

