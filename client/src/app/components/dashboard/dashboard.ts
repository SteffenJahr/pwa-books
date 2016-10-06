import {Component, Injectable} from '@angular/core';
import {NotificationService} from '../../services/notification';

@Component({
    moduleId: __moduleName,
    selector: 'dashboard',
    templateUrl: 'dashboard.html'
})
@Injectable()
export class DashboarcComponent {

    constructor(private _notificationService: NotificationService) {
    }

    public sendNotification(): void {
        this._notificationService.send().subscribe(()=>{});
    }
}
