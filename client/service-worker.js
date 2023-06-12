// Import the necessary modules
import { offlineFallback, warmStrategyCache } from 'workbox-recipes';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';

// Define the array of files to precache
const precacheFiles = self.__WB_MANIFEST || [
  './index.html',
  './src/images/icon.png',
  './src/js/editor.js',
  './src/js/database.js',
  './src/js/index.js',
  './src/css/style.css',
];

// Precache and route the specified files using the precacheFiles array
precacheAndRoute(precacheFiles);

// Create a CacheFirst strategy for caching HTML pages
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache expiration time: 30 days
    }),
  ],
});

// Warm up the cache with specific URLs using the pageCache strategy
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

// Register a route for navigating to HTML pages, using the pageCache strategy
registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// Implement asset caching strategy using StaleWhileRevalidate
registerRoute(
  ({ request }) => request.destination === 'style' || request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 7 * 24 * 60 * 60, // Cache expiration time: 7 days
      }),
    ],
  })
);
