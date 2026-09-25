# Legends website (v2 — investor-first)

Next.js (App Router) + React. No CSS framework; all styles live in `app/globals.css`.

## Run locally

```bash
npm install
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Pages

| Route | File |
|---|---|
| `/` | `app/page.jsx` |
| `/how` | `app/how/page.jsx` |
| `/membership` | `app/membership/page.jsx` |
| `/events` | `app/events/page.jsx` |
| `/events/after-20-investments-what-makes-me-say-yes` | `app/events/after-20-investments-what-makes-me-say-yes/page.jsx` |
| `/knowledge` | `app/knowledge/page.jsx` |
| `/about` | `app/about/page.jsx` |
| `/apply` | `app/apply/page.jsx` |
| `/login` | `app/login/page.jsx` |

Hidden (not routed, kept for later): `app/_hidden/deals` (Deal flow). To bring it back, move it to `app/deals` and uncomment it in `components/Header.jsx`.

## Structure

- `components/` — shared sections (Founder, HowSteps, Benefits, Tracks, Stance, Proof, Inside, Band, ApplyFaq, Footer)
  and client components (Header, Hero, HeroNetwork, MatchEngine, HowFlow, ApplyForm, Reveal).
- `data/events.js` — events (from belegends.club/events). `upcoming: true` puts an event in the Upcoming block; events with `slug` link to an internal page, others to their live URL.
- `data/knowledge.js` — essays (from belegends.club/blog); cards link to the live blog.
- `public/brand/` — founder photo and symbol.

## TODO

- Official SVG logo for light backgrounds in `Header.jsx` / `Footer.jsx`.
- Investor-facing text from Yanis in `Founder.jsx`.
- Sample deals in `Benefits.jsx` and `app/deals/page.jsx` are placeholders.
- `ApplyForm.jsx` and login only show the prototype state — connect to the backend.
- Event covers, gallery video and testimonial photos are hot-linked from belegends.club / lumacdn; copy them into `public/` for production.
