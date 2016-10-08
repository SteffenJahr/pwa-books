import {Component, Injectable, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification';
import {BookService} from '../../services/book';
import {Book} from '../../models/book';

@Component({
    moduleId: __moduleName,
    selector: 'dashboard',
    templateUrl: 'dashboard.html'
})
@Injectable()
export class DashboarcComponent implements OnInit {

    public books: Array<Book>;

    constructor(private _notificationService: NotificationService, private _bookService: BookService) {
    }

    public ngOnInit() {
        this._bookService.list()
            .subscribe((books) => this.books = books,
                (err) => {
                    this.books = [];
                });
    }

    public sendNotification() {
        this._notificationService.send().subscribe(() => {
        });
    }

    public sync() {
        this._bookService.sync()
            .subscribe((books) => {
                this.books = books;
            });
    }

    public updateBook(book, read) {
        book.read = read;
        this._bookService.update(book)
            .subscribe(() => {});
    }
}
