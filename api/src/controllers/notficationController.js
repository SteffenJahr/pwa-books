'use strict';

const request = require('request');
const endpoint = 'https://fcm.googleapis.com/fcm/send';
const authHeader = 'key=AIzaSyAPLFk-MEy4WD8OjdCD8BCGivH7Pn0QFnE';

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

const notification = (req, response, next) => {

    let data = {
        registration_ids: registrations
    };
    let options = {
        url: endpoint,
        headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json'
        },
        body: data,
        json: true
    };
    request.post(options, (err, res, body) => {
        response.writeHead(200);
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
