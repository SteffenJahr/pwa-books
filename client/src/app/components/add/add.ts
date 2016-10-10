import {BookService} from '../../services/book';
import {Book} from '../../models/book';
import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    moduleId: __moduleName,
    selector: 'add',
    templateUrl: 'add.html'
})
export class AddComponent {
    public book: Book;
    public titleFocus: boolean;

    constructor(private _bookService: BookService, private _router: Router) {
        this.book = new Book();
        this.book.id = (new Date()).getTime() * -1;
    }

    public save() {
        this._bookService.add(this.book)
            .subscribe(() => this._router.navigate(['']));
    }

    public cancel() {
        this._router.navigate(['']);
    }
}
