// Service Worker Installation (caching files)
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('pomodoro-cache').then((cache) => {
            // Cache the necessary files
            return cache.addAll([
                '/',               // Root of the app
                '/index.html',     // HTML file
                '/styles.css',     // CSS file
                '/script.js',      // JavaScript file
                '/manifest.json',  // Web app manifest
                '/icon.png'        // App icon (Make sure to add this image to your project)
            ]);
        })
    );
});

// Service Worker Activation (cleaning up old caches)
self.addEventListener('activate', (event) => {
    const cacheWhitelist = ['pomodoro-cache']; // Name of the cache we want to keep

    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName); // Delete old caches
                    }
                })
            );
        })
    );
});

// Fetch Event (serve cached files if offline)
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // If a match is found in the cache, return it
            return response || fetch(event.request); // Otherwise, fetch it from the network
        })
    );
});
