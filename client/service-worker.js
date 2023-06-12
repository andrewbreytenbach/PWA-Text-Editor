// Import the necessary modules
const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

// Define the array of files to precache
const precacheFiles = [
  // Add the list of files to be precached here
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
