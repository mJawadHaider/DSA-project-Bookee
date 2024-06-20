'use strict';

const app = require('./index');
const http = require('http');

const server = http.Server(app);
const port = 3000;
server.listen(port);

server.on('listening', function () {
    global.log.info(`Server listening on http://localhost:${this.address().port}`);
});
