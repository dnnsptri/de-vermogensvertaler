// Server only (imported by the API routes): the result mail, the opt-in confirmation and its signed link. Sent through Resend
// (app/api/uitkomst, app/api/bevestig). Env vars, set in Vercel:
//   RESEND_API_KEY  Resend API key (sending access is enough for the mails, full access for the contacts)
//   MAIL_SECRET     long random string; signs the confirmation links so nobody can sign up someone else
import { createHmac, timingSafeEqual } from "node:crypto";
import { Resend } from "resend";
import { site } from "@/content/site";
import { aowGat, pensioencheck, toolCta, toolMail } from "@/content/tools";
import type { Uitkomst } from "@/lib/tools";

// Sender on her own domain (verified in Resend with DNS records at Mijndomein); replies go to her inbox
export const from = `${site.name} <uitkomst@devermogensvertaler.nl>`;
export const replyTo = site.email;

let client: Resend | null = null;
export function resend() {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY ontbreekt");
  return (client ??= new Resend(process.env.RESEND_API_KEY));
}

// ---- Signed confirmation link: address, issue time and an HMAC over both, no database needed ----
// The link expires, so an old one can't resubscribe someone who unsubscribed later.

const LINK_DAYS = 7;
const sign = (email: string, t: string) => {
  if (!process.env.MAIL_SECRET) throw new Error("MAIL_SECRET ontbreekt");
  return createHmac("sha256", process.env.MAIL_SECRET).update(`${email.toLowerCase()}|${t}`).digest("base64url");
};
export function confirmUrl(email: string) {
  const t = String(Date.now());
  return `${site.url}/bevestig?${new URLSearchParams({ e: email, t, s: sign(email, t) })}`;
}
export function verify(email: string, t: string, s: string) {
  const age = Date.now() - Number(t);
  if (!(age >= 0 && age < LINK_DAYS * 24 * 60 * 60 * 1000)) return false;
  const a = Buffer.from(sign(email, t));
  const b = Buffer.from(s);
  return a.length === b.length && timingSafeEqual(a, b);
}

// ---- Mail HTML: inline styles, tables only where mail apps need them ----

const c = { forest: "#275139", deep: "#173326", mustard: "#e3b63f", cream: "#eef0e5", ink: "#151610", muted: "#5b5d55" };
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// The site's inline markup (**bold**, [label](url), {slot}) as mail HTML. Copy is ours, slots are our own
// calculated values; both are escaped anyway.
function rich(text: string, out: Record<string, string> = {}) {
  return esc(text)
    .replace(/\{(\w+)\}/g, (_, k) => esc(out[k] ?? ""))
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\[(.+?)\]\((.+?)\)/g, (_, label, href) => `<a href="${href.startsWith("/") ? site.url + href : href}" style="color:${c.forest}">${label}</a>`); // site links are relative
}

const p = (html: string, style = "") => `<p style="margin:0 0 16px;font-size:16px;line-height:1.5;color:${c.ink};${style}">${html}</p>`;
const button = (href: string, label: string) =>
  `<a href="${esc(href)}" style="display:inline-block;background:${c.mustard};color:${c.deep};font-weight:600;font-size:16px;text-decoration:none;padding:14px 26px;border-radius:999px">${esc(label)}</a>`;

function layout(body: string) {
  return `<!doctype html><html lang="nl"><body style="margin:0;background:${c.cream};font-family:Helvetica,Arial,sans-serif">
<div style="max-width:560px;margin:0 auto;padding:32px 16px">
<p style="margin:0 0 20px;font-family:Georgia,serif;font-size:20px;color:${c.deep}">${esc(site.name)}</p>
<div style="background:#ffffff;border-radius:24px;padding:32px 24px">${body}</div>
<p style="margin:20px 0 0;font-size:13px;line-height:1.5;color:${c.muted}">${esc(site.name)} · <a href="${site.url}" style="color:${c.muted}">${site.url.replace(/^https:\/\//, "")}</a></p>
</div></body></html>`;
}

const figure = (value: string, unit: string) =>
  `<p style="margin:0 0 8px;font-family:Georgia,serif;font-size:48px;line-height:1;color:${c.forest}">${esc(value)}${unit.startsWith("%") ? "" : " "}<span style="font-family:Helvetica,Arial,sans-serif;font-size:18px;color:${c.muted}">${esc(unit)}</span></p>`;

function pensioencheckBody(u: Uitkomst) {
  const r = pensioencheck.result;
  const rows = Object.entries(r.rows)
    .map(
      ([k, label]) =>
        `<tr><td style="padding:10px 0;border-top:1px solid #d9ddd0;color:${c.muted};font-size:15px">${rich(label, u.out)}</td><td style="padding:10px 0;border-top:1px solid #d9ddd0;text-align:right;font-weight:600;font-size:15px;white-space:nowrap">${esc(u.out[k] ?? "")}</td></tr>`,
    )
    .join("");
  const note = (k: keyof typeof r.notes) => (u.notes[k] ? p(rich(r.notes[k], u.out)) : "");
  return [
    p(esc(u.out.kicker), `color:${c.muted}`),
    figure(u.out.net, r.perMonth),
    p(esc(u.out.verdict), `font-family:Georgia,serif;font-size:24px;line-height:1.25;color:${c.forest}`),
    note("onbekend"),
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;border-bottom:1px solid #d9ddd0">${rows}</table>`,
    note("verlies"),
    note("zzp"),
    p(esc(u.out.aowTekst)),
    p(rich(r.notes.vermogen)),
  ].join("");
}

function aowGatBody(u: Uitkomst) {
  const r = aowGat.result;
  return u.notes.geenGat
    ? p(rich(r.geenGat, u.out))
    : [figure(u.out.gat, r.unit), p(rich(r.opbouw, u.out)), p(rich(r.gemis, u.out))].join("");
}

const tools = {
  pensioencheck: { copy: pensioencheck, body: pensioencheckBody },
  "aow-gat": { copy: aowGat, body: aowGatBody },
} as const;
export type MailTool = keyof typeof tools;
export const isMailTool = (t: unknown): t is MailTool => typeof t === "string" && t in tools;

export function resultMail(tool: MailTool, u: Uitkomst) {
  const { copy, body } = tools[tool];
  return {
    subject: `Je uitkomst van ${copy.title}`,
    html: layout(
      [
        p(esc(toolMail.intro)),
        body(u),
        `<div style="margin:24px 0;padding-top:24px;border-top:1px solid #d9ddd0">${p(esc(toolMail.ctaIntro))}${button(site.url + toolCta.href, toolCta.label)}</div>`,
        p(esc(copy.fine), `font-size:13px;color:${c.muted};margin:24px 0 0`),
      ].join(""),
    ),
  };
}

export function confirmMail(email: string) {
  const t = toolMail.confirm;
  return {
    subject: t.subject,
    html: layout(p(esc(t.body)) + `<div style="margin:24px 0">${button(confirmUrl(email), t.button)}</div>` + p(rich(t.after), `font-size:14px;color:${c.muted};margin:0`)),
  };
}
