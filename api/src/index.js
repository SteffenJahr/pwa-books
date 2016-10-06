'use strict';

const
    server = require('./server'),
    port = process.env.PORT || 8090;

server.on('uncaughtException', (req, res, route, err) => {
    console.log(`API encountered an error handling route '${route.methods} ${route.name}': ${err.toString()}`);
});

server.listen(port, (err) => {
    if (err) {
        console.log(`Error starting API: ${err.toString()}`);
    } else {
        console.log(`API is ready and listening at port ${port}`);
    }
});
