'use strict';

const
    restify = require('restify'),
    corsMiddleware = require('restify-cors-middleware'),
    controllers = require('require-dir')('./controllers'),

    server = restify.createServer({}),
    cors = corsMiddleware({});

server
    .pre(cors.preflight)
    .use(cors.actual)
    .use(restify.queryParser())
    .use(restify.bodyParser())
;

for (let controllerName in controllers) {
    console.log(`Registering controller '${controllerName}'`);

    let controller = controllers[controllerName];
    if (!controller.setup) {
        console.log(`Error: Controller '${controllerName}' cannot be set up.`);
    }
    controller.setup(server);
}

module.exports = server;
