self.addEventListener('install', (e) => {
    console.info('Install serviceworker');
    self.skipWaiting();
});

self.addEventListener('activate', (e) => {
    console.info('Activate serviceworker');
});

self.addEventListener('fetch', (e) => {
    //Load data from cache
    console.info('fetch', e.request.url);
});

self.addEventListener('push', function(event) {
    console.log('Push message', event);

});
