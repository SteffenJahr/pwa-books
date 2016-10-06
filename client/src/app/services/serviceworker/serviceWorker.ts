// <reference path="../../../typings/globals/serviceworker/index.d.ts"/>

export class ServiceWorkerService {

    private _registration: any;

    public register() {
        if ('serviceWorker' in navigator) {
            // Script url is based on index.html and NOT to the url of the ServiceWorkerService
            // TODO: Merge own ServiceWorker with swCache
            // https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
            navigator.serviceWorker.register('./swCache.js')
                .then(() => navigator.serviceWorker.ready)
                .then((serviceWorkerRegistration) => {
                    this._registration = serviceWorkerRegistration;
                    console.log('Successfully registered service worker', serviceWorkerRegistration);
                    this._registration.pushManager
                        .subscribe({ userVisibleOnly: true })
                        .then(function (sub) {
                            console.log('endpoint:', sub.endpoint);
                        });
                })
                .catch(function (err) {
                    console.warn('Error whilst registering service worker', err);
                });
        }
    }
}
