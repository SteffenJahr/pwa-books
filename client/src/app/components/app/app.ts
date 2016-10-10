import {Component, Injectable} from '@angular/core';
import {ServiceWorkerService} from '../../services/serviceWorker';
import {Router} from '@angular/router';

@Component({
    moduleId: __moduleName,
    selector: 'app-root',
    templateUrl: 'app.html'
})
@Injectable()
export class AppComponent {

    constructor(private _serviveWorker: ServiceWorkerService, private _router: Router) {
        _serviveWorker.register();
    }

    public addBook() {
        this._router.navigate(['add']);
    }
}
