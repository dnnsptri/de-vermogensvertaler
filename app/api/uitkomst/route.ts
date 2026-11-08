import { confirmMail, from, isMailTool, replyTo, resend, resultMail } from "@/lib/mail";
import { geldigAdres, rekenaars, type Antwoorden } from "@/lib/tools";

// POST from the tools (lib/tools.ts): mails the result, plus the opt-in confirmation when the box is ticked.
// The form never talks to Resend or the Google script directly, and the key stays on the server.
// The result is recalculated here from the answers, so a mail can only ever contain our own result text.

// Rate limits: per visitor (IP) enough to try a few scenarios, per address so nobody can fill someone else's
// inbox (Alberta asked for 1 a day; 3 lets a visitor correct a typo in their answers and still get the mail).
// ponytail: in memory per server instance, so a determined sender spread over instances gets more;
// add Cloudflare Turnstile (Alberta's choice, 4 Nov 2026) if abuse ever shows up in Resend's logs.
const HOUR = 60 * 60 * 1000;
const hits = new Map<string, number[]>();
function limited(key: string, max: number, window: number) {
  const now = Date.now();
  // Memory cap: drop the oldest key, not everything, so a flood of new keys can't reset the limits.
  // ponytail: a shared store (Upstash) if it ever matters
  if (hits.size > 10_000) hits.delete(hits.keys().next().value!);
  const recent = (hits.get(key) ?? []).filter((t) => now - t < window);
  hits.delete(key); // re-insert, so the Map's order is least recently used first and eviction drops the stalest key
  hits.set(key, [...recent, now]);
  return recent.length >= max;
}

export async function POST(request: Request) {
  // Only this site's own pages: a browser always sends Origin, and it must match the host it posts to
  const origin = request.headers.get("origin");
  if (!origin || new URL(origin).host !== request.headers.get("host")) return new Response("Niet toegestaan", { status: 403 });

  const body = await request.json().catch(() => null);
  const tool = body?.tool;
  const a = body?.antwoorden as Antwoorden | undefined;
  if (!isMailTool(tool) || !a || typeof a !== "object") return new Response("Ongeldig verzoek", { status: 400 });
  const email = String(a.email ?? "").trim().toLowerCase();
  if (!geldigAdres(email)) return new Response("Ongeldig e-mailadres", { status: 400 });
  if (a.website) return new Response(null, { status: 204 }); // honeypot: pretend all went well

  // x-real-ip is set by Vercel itself; the first x-forwarded-for entry is only a fallback for local dev
  const ip = request.headers.get("x-real-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "onbekend";
  // Per inbox: +tags (naam+1@...) land in the same inbox, and so do Gmail's dot variants (n.aam@gmail.com)
  const [local, domain] = email.replace(/\+[^@]*@/, "@").split("@");
  const gmail = domain === "gmail.com" || domain === "googlemail.com";
  const inbox = gmail ? `${local.replaceAll(".", "")}@gmail.com` : `${local}@${domain}`;
  if (limited(`ip:${ip}`, 5, HOUR) || limited(`to:${inbox}`, 3, 24 * HOUR))
    return new Response("Te veel verzoeken", { status: 429 });

  const u = rekenaars[tool](a, new Date().getFullYear());
  if ("error" in u) return new Response(u.error, { status: 400 });

  try {
    const mails = [{ from, replyTo, to: email, ...resultMail(tool, u) }];
    if (a.optin === "on") mails.push({ from, replyTo, to: email, ...confirmMail(email) });
    const { error } = await resend().batch.send(mails);
    if (error) throw new Error(error.message);
  } catch (err) {
    console.error("uitkomst-mail mislukt", err);
    return new Response("Mailen mislukt", { status: 502 });
  }
  return new Response(null, { status: 204 });
}
