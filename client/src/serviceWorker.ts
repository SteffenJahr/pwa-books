const appShellFiles = [
    '/',
    '/index.html',
    '/css/material.min.css',
    'resources/launcher-icon.png',
    'resources/launcher-icon-96.png',
    'resources/launcher-icon-144.png',
    'resources/launcher-icon-152.png',
    'resources/launcher-icon-192.png',
    'resources/launcher-icon-256.png',
    '/manifest.json'
];

const angularFiles = [
    '/app/components/app/app.js',
    '/app/components/dashboard/dashboard.js',
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

const appShellCacheName = 'angular_pwa_app_shell_cache_v1.26';
const angularCacheName = 'angular_pwa_app_cache_v1.26';

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
            return response || self.fetch(e.request);
        })
    );
});
