import {Http, Response, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

export abstract class BaseApiService {
    private apiRoot: string;

    constructor(private _http: Http, private _options: RequestOptions) {
        this.apiRoot = 'http://localhost:8090/';
    }

    protected get(urlSuffix: string, resolveResponse: boolean = true): Observable<any> {

        let responseObservable = this._http.get(`${this.apiRoot}${urlSuffix}`, this._options);

        if (resolveResponse)
            responseObservable = responseObservable.map(res => res.json());

        return responseObservable;
    }

    protected post(urlSuffix: string, payload: any): Observable<Response> {
        return this._http.post(`${this.apiRoot}${urlSuffix}`, payload, this._options);
    }

    protected put(urlSuffix: string, payload: any): Observable<Response> {
        return this._http.put(`${this.apiRoot}${urlSuffix}`, payload, this._options);
    }
}
