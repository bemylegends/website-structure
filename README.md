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
| `/deals` | `app/deals/page.jsx` |
| `/membership` | `app/membership/page.jsx` |
| `/rooms` | `app/rooms/page.jsx` |
| `/rooms/alex-felman` | `app/rooms/alex-felman/page.jsx` |
| `/insights` | `app/insights/page.jsx` |
| `/about` | `app/about/page.jsx` |
| `/apply` | `app/apply/page.jsx` |
| `/login` | `app/login/page.jsx` |

## Structure

- `components/` — shared sections (Founder, HowSteps, Benefits, Tracks, Stance, Proof, Inside, Band, ApplyFaq, Footer)
  and client components (Header, Hero, HeroNetwork, RequestCard, EventsGrid, ApplyForm, Reveal).
- `data/events.js` — events list (from belegends.club/events). Add `slug` to an event to link it to `/rooms/<slug>`.
- `public/brand/` — founder photo and symbol.

## TODO

- Official SVG logo for light backgrounds in `Header.jsx` / `Footer.jsx`.
- Investor-facing text from Yanis in `Founder.jsx`.
- Sample deals in `Benefits.jsx` and `app/deals/page.jsx` are placeholders.
- `ApplyForm.jsx` and login only show the prototype state — connect to the backend.
- Event covers, gallery video and testimonial photos are hot-linked from belegends.club / lumacdn; copy them into `public/` for production.
