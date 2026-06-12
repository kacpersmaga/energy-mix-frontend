# UK Energy Mix — Frontend

React 19 + TypeScript + Tailwind. Three pie charts for the 3-day generation mix, plus a planner that finds the cleanest EV charging window.

`npm run dev` · `npm test` · expects the backend at `http://localhost:5197` (override with `VITE_API_URL`).

## Design decisions

- **Today's chart covers the full day (00:00–23:30 UTC)**, not just from now on, so the three days are comparable. Past intervals are actuals, future ones forecast.
- **Timestamps are UTC from the backend**, rendered in the browser's locale.
- **No auto-refresh** — the source data only updates every 30 min, so a manual reload is enough.
- **`VITE_API_URL` is baked in at build time** (Vite), so it must be a build arg, not a runtime env var.
