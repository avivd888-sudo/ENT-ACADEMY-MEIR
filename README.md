# ENT Academy — Meir (upgraded)

Single-file ENT residency learning app (`index.html`). Open it in a browser, or
deploy the whole folder (keep the PNGs and the NCCN PDF alongside `index.html`).

## What changed in this upgrade
- **Cinematic summary video** for *every* chapter — animated, narrated recap
  (key points + pearls) with play/pause, prev/next, speed and keyboard control.
  Launch from the chapter's "Watch summary video" button or the "Summary video" tile.
- **Higher-level podcasts** — chapters without a hand-written script now get a richer,
  conversational two-host episode auto-built from their key points, pearls and takeaways.
- **My Research (department workspace)** — each project now has a Documents & data
  repository, an AI research assistant (abstract / literature plan / stats plan /
  next steps / notes summary), and Team & sharing (export/import projects, copy a
  status update).
- **Mobile** — 5-item bottom nav (Home · Chapters · Research · Practice · Search),
  16px inputs (no iOS zoom-on-focus), no horizontal overflow, fully responsive video player.
- **Works offline on any network** — a service worker (`sw.js`) caches the app on first
  load, so it opens instantly on hospital Wi-Fi, weak cellular, or with no signal at all
  (works only over HTTPS, e.g. GitHub Pages).

## Publish it (one time) so it works in Safari on any network
1. Open your repo `github.com/avivd888-sudo/ENT-ACADEMY-MEIR` → **Add file → Upload files**.
2. Drag in the updated **`index.html`** and the new **`sw.js`** (overwrite) → **Commit**.
3. **Settings → Pages → Deploy from a branch → `main` / root → Save**.
4. After ~1 minute open **https://avivd888-sudo.github.io/ENT-ACADEMY-MEIR/** in Safari →
   Share → **Add to Home Screen**. That URL works from any network, on any phone.

## Keys (optional, stored only in your browser)
- Anthropic key -> AI chapter Q&A and the research assistant.
- OpenAI / ElevenLabs key -> HD narration for podcasts and the summary video.
Without keys, narration uses the device's built-in voice.
  x
