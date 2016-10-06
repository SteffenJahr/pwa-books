'use strict';

const books = [
    {
        id: 1,
        title: 'Buch 1',
        read: false
    },
    {
        id: 2,
        title: 'Buch 2',
        read: true
    }];

let lastBookId = 2;

const list = (req, res, next) => {
    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(books));

    return next();
};

const add = (req, res, next) => {
    let book = req.params;
    book.id = ++lastBookId;
    books.push(req.params);

    res.end();
    return next();
};

const update = (req, res, next) => {

    let bookIndex = books.findIndex((book) => book.id === req.params.id);

    if (bookIndex >= 0) {
        books[bookIndex] = req.params;
    }
    res.end();
    return next();
};

const setup = (server) => {
    server.get('/books', list);
    server.put('/book', add);
    server.post('/book', update);
};

module.exports = {
    setup: setup,
};
