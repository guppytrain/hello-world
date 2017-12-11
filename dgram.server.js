/**
 * Created by jla on 6/17/17.
 */

let clog = require('./utils').clog;
let cerr = require('./utils').clog;
let cwarn = require('./utils').clog;

let dgram = require('dgram');
// let fs = require('fs');

const port = 8124;
// const socket = '/tmp/echo.sock';

let server = dgram.createSocket("udp4", (msg, rinfo) => {
    clog('Message: ' + msg + ' from ' + rinfo.address + ':' + rinfo.port);
});

server.on('listening', () => {
    const addr = server.address();

    clog(`server listening ${addr.address}:${addr.port}`);
});

server.on('close', () => {
    clog('connection closed');
});

server.on('error', (err) => {
    clog('server error: ' + err.stack);
})

server.bind(port);

