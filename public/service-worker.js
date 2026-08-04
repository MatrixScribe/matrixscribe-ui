self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", () => {
  clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Allow API calls to bypass the service worker
  if (url.pathname.startsWith("/api/")) {
    return; // Let the browser send the request normally
  }

  // Everything else still goes through the service worker
  event.respondWith(fetch(event.request));
});

