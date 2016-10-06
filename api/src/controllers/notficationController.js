'use strict';

const restify = require('restify');

const registrations = [];

const list = (req, res, next) => {

    res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8'
    });
    res.end(JSON.stringify(registrations));

    return next();
};

const register = (req, res, next) => {

    if (registrations.indexOf(req.params.id) < 0) {
        registrations.push(req.params.id);
    }

    res.end();
    return next();
};

const notification = (request, response, next) => {

    let client = restify.createHttpClient({
        url: 'https://fcm.googleapis.com'
    });

    let data = {
        registration_ids: registrations
    };

    client.post('/fcm/send', JSON.stringify(data), (err, req, res, obj) => {
        response.end();
    });

    return next();
};

const setup = (server) => {
    server.get('/notification/registrations', list);
    server.get('/notification', notification);
    server.post('/notification/register', register);
};

module.exports = {
    setup: setup,
};
