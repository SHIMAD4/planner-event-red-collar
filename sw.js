const staticCache = 's-app-v1';
const assetUrls = [
    'index.html',
    '/src/app/index.tsx',
    '/src/shared/styles/main.scss',
    '/public/fonts/Redcollar.woff2',
    '/public/fonts/TTCommons.otf',
];
self.addEventListener('install', async (event) => {
    console.log('[SW]: install');

    const cache = await caches.open(staticCache);
    await cache.addAll(assetUrls);
});

self.addEventListener('activate', async (event) => {
    console.log('[SW]: activate');

    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.filter((name) => name !== staticCache).map((name) => caches.delete(name)),
    );
});

self.addEventListener('fetch', (event) => {
    console.log('[SW]: Fetch', event.request.url);

    event.respondWith(cacheFirst(event.request));
});

async function cacheFirst(request) {
    const cached = await caches.match(request);
    return cached ?? (await fetch(request));
}
