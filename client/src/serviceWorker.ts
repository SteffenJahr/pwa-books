const appShellFiles = [
    '/',
    '/index.html',
    '/css/materialize.min.css',
    '/css/material-icons.css',
    '/resources/launcher-icon.png',
    '/resources/launcher-icon-96.png',
    '/resources/launcher-icon-144.png',
    '/resources/launcher-icon-152.png',
    '/resources/launcher-icon-192.png',
    '/resources/launcher-icon-256.png',
    '/fonts/MaterialIcons-Regular.eot',
    '/fonts/MaterialIcons-Regular.ijmap',
    '/fonts/MaterialIcons-Regular.svg',
    '/fonts/MaterialIcons-Regular.ttf',
    '/fonts/MaterialIcons-Regular.woff',
    '/fonts/MaterialIcons-Regular.woff2',
    '/fonts/roboto/Roboto-Bold.eot',
    '/fonts/roboto/Roboto-Bold.ttf',
    '/fonts/roboto/Roboto-Bold.woff',
    '/fonts/roboto/Roboto-Bold.woff2',
    '/fonts/roboto/Roboto-Light.eot',
    '/fonts/roboto/Roboto-Light.ttf',
    '/fonts/roboto/Roboto-Light.woff',
    '/fonts/roboto/Roboto-Light.woff2',
    '/fonts/roboto/Roboto-Medium.eot',
    '/fonts/roboto/Roboto-Medium.ttf',
    '/fonts/roboto/Roboto-Medium.woff',
    '/fonts/roboto/Roboto-Medium.woff2',
    '/fonts/roboto/Roboto-Regular.eot',
    '/fonts/roboto/Roboto-Regular.ttf',
    '/fonts/roboto/Roboto-Regular.woff',
    '/fonts/roboto/Roboto-Regular.woff2',
    '/fonts/roboto/Roboto-Thin.eot',
    '/fonts/roboto/Roboto-Thin.ttf',
    '/fonts/roboto/Roboto-Thin.woff',
    '/fonts/roboto/Roboto-Thin.woff2',
    '/manifest.json'
];

const angularFiles = [
    '/app/components/app/app.js',
    '/app/components/dashboard/dashboard.js',
    '/app/components/add/add.js',
    '/app/models/book.js',
    '/app/services/baseApi.js',
    '/app/services/book.js',
    '/app/services/notification.js',
    '/app/services/serviceWorker.js',
    '/app/services/localStorage.js',
    '/app/appRoutes.js',
    '/app/main.js',
    '/app/module.js',
    '/systemSetup.js',
    '/lib/shim.js',
    '/lib/system.src.js',
    '/lib/rxjs/Rx.js',
    '/lib/zone.js',
    '/lib/@angular/core/bundles/core.umd.js',
    '/lib/@angular/compiler/bundles/compiler.umd.js',
    '/lib/@angular/common/bundles/common.umd.js',
    '/lib/@angular/router/bundles/router.umd.js',
    '/lib/@angular/platform-browser/bundles/platform-browser.umd.js',
    '/lib/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    '/lib/@angular/http/bundles/http.umd.js',
    '/lib/@angular/forms/bundles/forms.umd.js'
];

const appShellCacheName = 'angular_pwa_app_shell_cache_v1.3';
const angularCacheName = 'angular_pwa_app_cache_v1.3';

self.addEventListener('install', (event) => {
    console.log('[ServiceWorker] Install ServiceWorker');
    event.waitUntil((
        self.caches.open(appShellCacheName)
            .then((cache) => {
                return cache.addAll(appShellFiles);
            })
            .then(() => {
                return self.caches.open(angularCacheName);
            })
            .then((appCache) => {
                return appCache.addAll(angularFiles);
            })
            .then(() => {
                return self.skipWaiting();
            })
    ));
});

self.addEventListener('activate', (event) => {
    console.log('[ServiceWorker] Activate');
    event.waitUntil(
        self.caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== appShellCacheName && key !== angularCacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return self.caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();
});

self.addEventListener('push', (event) => {
    console.log('[ServiceWorker] Push message received', event);

    event.waitUntil(
        self.registration.showNotification('Notification', {
            body: 'You received a notification.'
        }));
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        self.caches.match(e.request).then(function (response) {

            if(response){
                console.log('[ServiceWorker] Respond from Cache')
            }

            return response || self.fetch(e.request);
        })
    );
});
