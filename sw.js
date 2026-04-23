const CACHE_NAME = 'drivenav-cache-v1';
const URLS = ['/', '/manifest.webmanifest', '/icon-192.png', '/icon-512.png', '/maskable-512.png', '/favicon-32.png'];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(URLS)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(resp => resp || fetch(event.request)));
});
