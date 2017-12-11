/**
 * Created by jla on 6/17/17.
 */

let clog = require('./utils').clog;

let net = require('net');
let fs = require('fs');

const port = 8124;
const socket = '/tmp/echo.sock';

let client = new net.Socket();

client.setEncoding('utf8');

// connect to port
client.connect(port, 'localhost', () => {
    clog('connected to server');
    client.write('written by client to ...?');
});

// connect to socket
// client.connect(socket, () => {
//     clog('connected to server');
//     client.write('written by client to ...?');
// });

process.stdin.on('data', (data) => {
    client.write(data);
});

client.on('data', (data) => {
    clog('client received: ' + data);
})

client.on('close', () => {
    clog('connection is closed')
});
