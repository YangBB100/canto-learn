const CACHE_NAME = "canto-sound-lab-20260915d";
const SHELL = [
  "./",
  "index.html",
  "styles.css?v=20260915d",
  "course.js?v=20260915d",
  "app.js?v=20260915d",
  "manifest.webmanifest",
  "icon.svg",
  "icon-512.png",
  "apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("canto-sound-lab-") && key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (url.pathname.includes("/audio/")) {
    event.respondWith(serveAudio(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (response.ok) {
            try {
              const cache = await caches.open(CACHE_NAME);
              await cache.put("index.html", response.clone());
            } catch (_) {
              // A cache write failure must not block the online response.
            }
          }
          return response;
        })
        .catch(() => caches.match("index.html")),
    );
    return;
  }

  event.respondWith(
    fetch(request)
      .then(async (response) => {
        if (response.ok) {
          try {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, response.clone());
          } catch (_) {
            // A cache write failure must not block the online response.
          }
        }
        return response;
      })
      .catch(() => caches.match(request)),
  );
});

async function serveAudio(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request.url);
  if (cached) return cached;

  // Media elements often ask for a byte range. A 206 response cannot be saved
  // with Cache Storage, so fetch one full 200 response and cache that instead.
  const headers = new Headers(request.headers);
  headers.delete("range");
  const fullRequest = new Request(request.url, {
    method: "GET",
    headers,
    mode: request.mode,
    credentials: request.credentials,
    redirect: request.redirect,
    referrer: request.referrer,
    referrerPolicy: request.referrerPolicy,
    integrity: request.integrity,
    cache: "no-store",
  });
  const response = await fetch(fullRequest);
  if (response.ok && response.status === 200) await cache.put(request.url, response.clone());
  return response;
}
