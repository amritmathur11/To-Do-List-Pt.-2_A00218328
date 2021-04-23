function swInstall(event) {

    console.info('Service Worker Installing....');
}

self.addEventListener('install', swInstall);

//Cache First
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (cacheResponse) {
            if (cacheResponse) {
                return cacheResponse;
            } else {
                return fetch(event.request).then((netResp) => netResp)
            }

        })
    )
})
const filesToCache = [
    '/',
    '/css/site.css',
    '/js/site.js',
    '/js/sweetalert.min.js',
    '/js/sweet-alert.css'

];
debugger
const staticCacheName = 'pages-cache-v1';

self.addEventListener('install', event => {
    console.log('Attempting to install service worker and cache static assets');
    event.waitUntil(
        caches.open(staticCacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
});
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('airhorner').then(function (cache) {
            return cache.addAll([
                './css/site.css',
                './js/site.js',
                './Home/Index.cshtml'
            ]);
        })
    );
});