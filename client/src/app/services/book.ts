import {BaseApiService} from './baseApi';
import {Book} from '../models/book';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService extends BaseApiService {
    constructor(http: Http, options: RequestOptions) {
        super(http, options);
    }

    public list(): Observable<Array<Book>> {
        return this.get('books')
            .flatMap((response) => Observable.of(response));
    }

    public add(book: Book): Observable<any> {
        return this.put('book', book);
    }

    public update(book: Book): Observable<any> {
        return this.post('book', book);
    }

}
