'use strict';

let books = [{
    id: 1,
    title: 'Erben des Imperiums',
    isbn: '978-3442269143',
    read: true
}];
let lastBookId = 0;

const list = (req, res, next) => {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(books));

    return next();
};

const sync = (req, res, next) => {
    let newBooks = req.params;


    for (let i = 0; i < books.length; i++) {
        for (let e = 0; e < newBooks.length; e++) {
            if (books[i].id === newBooks[e].id) {
                books[i] = newBooks[e];
                newBooks.splice(e, 1);
            }
        }
    }

    for (let i = 0; i < newBooks.length; i++) {
        if (!newBooks[i].id) {
            newBooks[i].id = ++lastBookId;
            books.push(newBooks[i]);
        }
    }

    res.end(JSON.stringify(books));
    return next();
};

const setup = (server) => {
    server.get('/books', list);
    server.post('/books/sync', sync);
};

module.exports = {
    setup: setup,
};
