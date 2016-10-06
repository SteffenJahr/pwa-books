import {BaseApiService} from './baseApi';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

@Injectable()
export class NotificationService extends BaseApiService {
    constructor(http: Http, options: RequestOptions) {
        super(http, options);
    }

    public register(notificationId: string): Observable<any> {
        return this.post('notification/register', { id: notificationId });
    }

    public send(): Observable<any> {
        return this.get('notification');
    }

}
