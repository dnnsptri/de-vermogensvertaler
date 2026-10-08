# De VermogensVertaler

Website for Alberta Opoku's financial literacy practice: two free scans (Pensioenpot-check, AOW-gatscan) as the entry point, then a free intro call, masterclass, one-day proeverij (€600), ten-month group track (€7,500) and one-on-one coaching.

Built by Dennis Petri, visual identity by Studio Menno van der Veen.

## Status

Simple homepage (October 2026), after Alberta's colour choice and Menno's sketch: hero, voor wie, wat ik doe, over Alberta, success photo, kennismaken (Cal.com). Copy partly dummy (marked `[Dummytekst]`).

Parked, not deleted (git tags):

- `wireframe-7blocks`: 7-block homepage, 4 detail pages (scans, proeverij, groepstraject), dummy scans, nav
- `decorated-v1`: the decorated style (Shrikhand, dashed lines, tilted ticker, illustrations)

Not wired up yet:

- Heading font: Young Serif is a stand-in until Menno names his font
- Booking: set `site.calLink` in `content/site.ts` once Alberta's Cal.com account exists (placeholder until then)
- Payments, scans and email capture come back with the parked pages

## Stack

Next.js 16 (App Router), Tailwind CSS 4, TypeScript. Hosted on Vercel.

```bash
npm install
npm run dev
```

## Where things live

- `content/site.ts`: **all copy**, Cal.com link, booking label. Text changes happen here only; `*word*` in a heading marks the emphasised word.
- `app/page.tsx`: the homepage sections
- `components/ui.tsx`: logo and mark (SVG), background pattern, buttons, emphasis
- `components/CalEmbed.tsx`: Cal.com iframe or placeholder
- `public/photos/`: the three shoot photos (resized from `_shoot/003_065`, `002_077`, `005_135`). After replacing an image, give it a new filename so caches don't serve the old one.
- `app/globals.css`: brand tokens (ink, forest, mustard, cream), fonts (Young Serif headings, Inter body), hero photo fade, scroll reveal

## SEO

- Title template, descriptions, canonical URLs, Open Graph image (`app/opengraph-image.tsx`), `robots.txt`, `sitemap.xml`, JSON-LD
- Only indexable when `VERCEL_ENV=production`. Set `NEXT_PUBLIC_SITE_URL` if the domain differs from `https://devermogensvertaler.nl`.
