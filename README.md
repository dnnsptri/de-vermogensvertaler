# De VermogensVertaler

Website for Alberta Opoku's financial literacy practice: two free scans (Pensioenpot-check, AOW-gatscan) as the entry point, then a free intro call, masterclass, one-day proeverij (€600), ten-month group track (€7,500) and one-on-one coaching.

Built by Dennis Petri, visual identity by Studio Menno van der Veen.

## Status

Wireframe phase: black and white, dummy copy (marked `[Dummytekst]`), hand-drawn illustrations generated with Krea. Menno's identity replaces the colours and type later.

Not wired up yet:

- Payments: pay buttons link to `#` until Alberta's Stripe account exists (iDEAL, card, installments for the group track)
- Booking: Cal.com placeholder at `#kennismaken`
- Scans: one dummy dropdown each; Alberta's real scoring logic and Google Sheets capture come next
- Email capture: the free test (scans) will collect email; no separate newsletter

## Stack

Next.js 16 (App Router), Tailwind CSS 4, TypeScript. Hosted on Vercel.

```bash
npm install
npm run dev
```

## Where things live

- `content/site.ts`: **all copy**, navigation, offer and the four detail pages. Text changes happen here only.
- `app/page.tsx`: homepage in 7 blocks (hero, herkenning, werken met mij, over mij, testimonial, gratis test, kennismaken)
- `app/[slug]/page.tsx`: one template for all detail pages; the slot shows a scan or a price block
- `components/`: shared UI (`ui.tsx`), scan, nav, back-to-top
- `public/illustrations/`: transparent line-art PNGs. After replacing an image, give it a new filename so caches don't serve the old one.
- `app/globals.css`: wireframe tokens (Inter only). The parked "decorated" style (Shrikhand, dashed lines, tilted ticker, organic shapes) is in git tag `decorated-v1`.

## SEO

- Title template, descriptions, canonical URLs, Open Graph image (`app/opengraph-image.tsx`), `robots.txt`, `sitemap.xml`, JSON-LD
- Only indexable when `VERCEL_ENV=production`. Set `NEXT_PUBLIC_SITE_URL` if the domain differs from `https://devermogensvertaler.nl`.
