import { home, site } from "@/content/site";

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

