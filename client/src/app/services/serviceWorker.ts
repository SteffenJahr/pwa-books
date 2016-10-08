// <reference path="../../../typings/globals/serviceworker/index.d.ts"/>
import {NotificationService} from './notification';
import {Injectable} from '@angular/core';

@Injectable()
export class ServiceWorkerService {
    private _registration: any;

    constructor(private _notificationService: NotificationService) {
    }

    public register() {
        if ('serviceWorker' in navigator) {
            // Script url is based on index.html and NOT to the url of the ServiceWorkerService
            navigator.serviceWorker.register('./serviceWorker.js')
                .then(() => navigator.serviceWorker.ready)
                .then((serviceWorkerRegistration) => {
                    this._registration = serviceWorkerRegistration;
                    console.log('Successfully registered service worker');
                    this._registration.pushManager
                        .subscribe({ userVisibleOnly: true })
                        .then((sub) => {
                            // sub.endpoint
                            let splittedEndpoint = sub.endpoint.split('/');
                            this._notificationService.register(splittedEndpoint[splittedEndpoint.length - 1])
                                .subscribe(() => {});
                        });
                })
                .catch(function (err) {
                    console.warn('Error whilst registering service worker', err);
                });
        }
    }

    public unregister() {
        if (this._registration) {

        }
    }
}
