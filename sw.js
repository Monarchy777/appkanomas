const CACHE_NAME = 'kanomas-cache-v13-back-fix';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/logo-kanomas-3d-192.png',
  '/assets/logo-kanomas-3d-512.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Precache partial fallback:', err);
      });
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
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
