// Service Worker for Aplikasi Kanomas PWA (Lightweight & Safe)
const CACHE_NAME = 'kanomas-cache-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Pass-through for non-GET or media files (never choke on audio/video)
  if (event.request.method !== 'GET') return;
  const url = event.request.url;
  if (url.includes('.mp4') || url.includes('.webm') || url.includes('.mp3')) {
    return; // Direct network fetch for media
  }

  // Network-first strategy for dynamic SPA pages
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cached) => {
          if (cached) return cached;
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
        });
      })
  );
});
