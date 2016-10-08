import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/mergeMap';

export class LocalStorageService {
    private readonly STORAGE_KEY: string = 'angular_pwa_demo';

    public get(key: string): Observable<any> {
        const item = localStorage.getItem(this.buildKey(key));
        const result = item ? JSON.parse(item) : void 0;

        return Observable.of(result);
    }

    public set(key: string, value: any): Observable<any> {
        localStorage.setItem(this.buildKey(key), JSON.stringify(value));

        return Observable.of(Observable.empty);
    }

    public clear(): Observable<void> {
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);

            if (key.startsWith(this.STORAGE_KEY)) {
                localStorage.removeItem(key);
            }
        }

        return Observable.of(void 0);
    }

    private buildKey(key: string): string {
        return `${this.STORAGE_KEY}.${key}`;
    }
}
