// Auto-generate cache version based on timestamp (cache busting)
const CACHE_VERSION = `v${Date.now()}`; // Dynamic version for each deploy
const CACHE_NAME = `emoji-alchemy-${CACHE_VERSION}`;
const urlsToCache = [
  '/',
  './index.html',
  './game.js',
  './admin.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/pixi.js/7.3.2/pixi.min.js'
];

// Install event - cache resources and skip waiting
self.addEventListener('install', (event) => {
  console.log('SW: Installing new version', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
  );
});

// Fetch event - Aggressive network first for app files
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Always network first for app files (HTML, JS, functions)
  if (event.request.mode === 'navigate' || 
      url.pathname.endsWith('.html') ||
      url.pathname.endsWith('.js') ||
      url.pathname.includes('/functions/') ||
      url.pathname.includes('/admin')) {
    
    console.log('SW: Network first for:', url.pathname);
    
    event.respondWith(
      fetch(event.request, {
        cache: 'no-cache', // Force fresh fetch
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache'
        }
      })
        .then((response) => {
          console.log('SW: Fresh fetch successful for:', url.pathname);
          // Don't cache HTML/JS files to ensure freshness
          return response;
        })
        .catch((error) => {
          console.log('SW: Network failed, trying cache for:', url.pathname);
          // Fallback to cache only if network completely fails
          return caches.match(event.request);
        })
    );
  } 
  // Cache first only for external assets (CDN, images, etc.)
  else {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request)
            .then((fetchResponse) => {
              // Cache external assets
              if (fetchResponse.status === 200) {
                const responseClone = fetchResponse.clone();
                caches.open(CACHE_NAME)
                  .then((cache) => {
                    cache.put(event.request, responseClone);
                  });
              }
              return fetchResponse;
            });
        })
    );
  }
});

// Activate event - clean up old caches and claim clients
self.addEventListener('activate', (event) => {
  console.log('SW: Activating new version', CACHE_VERSION);
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('SW: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ])
  );
});

// Listen for messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    console.log('SW: Clearing all caches');
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log('SW: Deleting cache', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      console.log('SW: All caches cleared');
      self.clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'CACHE_CLEARED' });
        });
      });
    });
  }
});
