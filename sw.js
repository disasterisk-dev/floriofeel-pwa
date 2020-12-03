const staticCacheName = 'site-static';
const assets = [
    '/',
    '/index.html',
    '/pages/home.html',
    '/pages/nudges.html',
    '/pages/info.html',
    '/pages/history.html',
    '/js/app.js',
    '/js/scripts.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/Floriofeel logo.png',
    '/img/HiResMeadow.jpg',
    '/img/roses.png',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'https://use.fontawesome.com/releases/v5.13.0/css/all.css'
];

// install service worker
self.addEventListener('install', evt => {
    //console.log('service worker installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );
    
});

//activate event
self.addEventListener('activate', evt => {
    //console.log('service worker has been activated');
});

//fetch event
self.addEventListener('fetch', evt => {
    //console.log('fetch event', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request);
        })
    );
});