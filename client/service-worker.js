import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching';

// Precache and route the specified files
precacheAndRoute(self.__WB_MANIFEST || []);


// Cache strategy for HTML pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm up the cache with specific URLs
registerRoute(({ request }) => request.mode === 'navigate', pageCache);
pageCache.precache(['/index.html', '/']);

// Cache strategy for assets (stylesheets and scripts)
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new CacheFirst({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60, // Adjust the cache expiration time as needed
      }),
    ],
  })
);
