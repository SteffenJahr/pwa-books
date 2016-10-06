import {Component, Injectable} from '@angular/core';
import {ServiceWorkerService} from '../../services/serviceworker/serviceWorker';

@Component({
    moduleId: __moduleName,
    selector: 'app-root',
    templateUrl: 'app.html'
})
@Injectable()
export class AppComponent {

    constructor(private _serviveWorker: ServiceWorkerService) {
        _serviveWorker.register();
    }
}
