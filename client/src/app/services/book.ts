import {BaseApiService} from './baseApi';
import {Book} from '../models/book';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';
import {LocalStorageService} from './localStorage';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService extends BaseApiService {
    private _storageKey: string;

    constructor(http: Http, options: RequestOptions, private _localStorageService: LocalStorageService) {
        super(http, options);

        this._storageKey = 'books';
    }

    public list(): Observable<Array<Book>> {
        return this._localStorageService.get(this._storageKey);
    }

    public add(book: Book): Observable<void> {
        return this._localStorageService.get(this._storageKey)
            .flatMap((books) => {
                books.push(book);
                return this._localStorageService.set(this._storageKey, books);
            });
    }

    public update(book: Book): Observable<any> {
        return this._localStorageService.get(this._storageKey)
            .flatMap((books) => {
                let bookIndex = books.findIndex((cBook) => cBook.id === book.id);
                if (bookIndex >= 0) {
                    books[bookIndex] = book;
                }
                else {
                    books.push(book);
                }
                return this._localStorageService.set(this._storageKey, books);
            });
    }

    public sync(): Observable<Array<Book>> {
        return this._localStorageService.get('books')
            .flatMap((books) => {
                return this.post('books/sync', books)
                    .map(res => res.json());
            })
            .flatMap((books) => {
                return this._localStorageService.set(this._storageKey, books);
            })
            .flatMap(() => this.list());
    }
}
