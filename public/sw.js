const staticCacheName = 'site-static-v12';
const dynamicCacheName = 'site-dynamic-v10';
const assets = [
    '/',
    '/index.html',
    '/pages/fallback.html',
    '/js/app.js',
    '/js/scripts.js',
    '/js/materialize.min.js',
    '/css/styles.css',
    '/css/materialize.min.css',
    '/img/Floriofeel logo.png',
    '/img/HiResMeadow.jpg',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'https://use.fontawesome.com/releases/v5.13.0/css/all.css'
];

// install service worker
self.addEventListener('install', evt => {
    evt.waitUntil(
        //caching essential assets on first install of service worker, for access to homepage offline
        caches.open(staticCacheName).then(cache => {
            console.log('caching shell assets');
            cache.addAll(assets);
        })
    );

});

//activate event
self.addEventListener('activate', evt => {
    //console.log('service worker has been activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            //dynamically caching all other assets as the user accesses them
            return Promise.all(keys
                .filter(key => key !== staticCacheName && key !== dynamicCacheName)
                .map(key => caches.delete(key)))
        })
    )
});

//fetch event
self.addEventListener('fetch', evt => {
    if (evt.request.url.indexOf('firestore.googleapis.com') === -1) {
        evt.respondWith(
            caches.match(evt.request).then(cacheRes => {
                //pulls content from cache if server can't be reached
                return cacheRes || fetch(evt.request).then(fetchRes => {
                    return caches.open(dynamicCacheName).then(cache => {
                        cache.put(evt.request.url, fetchRes.clone());
                        return fetchRes;
                    })
                });
                //loads fallback page if the user does not have an important page cached
            }).catch(() => {
                if (evt.request.url.indexOf('.html') > -1)
                    return caches.match('/pages/fallback.html')
            })
        );
    }

});