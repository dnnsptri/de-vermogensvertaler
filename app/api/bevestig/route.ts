import { resend, verify } from "@/lib/mail";

// Second step of the double opt-in: the button on /bevestig posts here. A POST on purpose: mail scanners
// open every link in a mail (GET), and would otherwise confirm sign-ups nobody clicked.
// Confirmed addresses become contacts in Resend, where Alberta (or Dennis) sends the mailings from;
// Resend adds the unsubscribe link to those itself.
export async function POST(request: Request) {
  // Only the button on our own /bevestig page (same check as app/api/uitkomst)
  const origin = request.headers.get("origin");
  if (!origin || new URL(origin).host !== request.headers.get("host")) return new Response("Niet toegestaan", { status: 403 });
  const form = await request.formData();
  const [email, t, s] = ["e", "t", "s"].map((k) => String(form.get(k) ?? ""));
  const back = (q: string) => Response.redirect(new URL(`/bevestig?${q}`, request.url), 303);
  try {
    if (!email || !t || !s || !verify(email, t, s)) return back("fout=1");
    const contacts = resend().contacts;
    // Already a contact (signed up before, or unsubscribed earlier): subscribe again instead
    const { error } = await contacts.create({ email, unsubscribed: false });
    if (error) {
      const retry = await contacts.update({ email, unsubscribed: false });
      if (retry.error) throw new Error(retry.error.message);
    }
  } catch (err) {
    console.error("aanmelding mislukt", err);
    return back("fout=1");
  }
  return back("klaar=1");
}
