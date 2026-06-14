/* ENT Academy service worker — offline-first app shell.
   Lets the app open instantly on any network (hospital Wi-Fi, weak cellular,
   or fully offline) after the first successful load. Bump CACHE on each release. */
const CACHE = 'ent-academy-v11';
const SHELL = [
  './',
  './index.html',
  './icon_192.png',
  './icon_512.png',
  './apple_touch_180.png',
  './logo_transparent.png',
  './hero_anatomy.webp',
  'https://unpkg.com/three@0.160.0/build/three.min.js'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // Cache the shell but never let one failed URL abort the whole install.
      Promise.allSettled(SHELL.map((u) => c.add(u)))
    )
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const isApi = /api\.(anthropic|openai|elevenlabs)\.com/.test(url.host);
  // Never cache API calls (auth/streaming) — always go to network.
  if (isApi) return;

  // HTML: ALWAYS fetch fresh from the network when online (bypassing the browser HTTP
  // cache with {cache:'no-store'}), so a new deploy is never masked by a stale copy.
  // Only fall back to the cached page when the network is genuinely unavailable (offline).
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(req.url, { cache: 'no-store' }).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put('./index.html', copy)).catch(() => {});
        return res;
      }).catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // Everything else: cache-first, then network (and cache the result).
  e.respondWith(
    caches.match(req).then((hit) =>
      hit || fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => hit)
    )
  );
});
