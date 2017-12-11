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

let client = dgram.createSocket("udp4");

process.stdin.on('data', (data) => {
    clog(data.toString('utf8'));

    client.send(data, 0, data.length, port, 'localhost', (err, bytes) => {
        if(err) {
            cerr('error: ' + err);
        }
        else {
            clog('successful');
        }

    });
    if(data == 'close')
        client.close(() => {
            clog('client connection is closed')
        });
});

// client.on('data', (data) => {
//     clog('client received: ' + data);
// })
//
// client.on('close', () => {
//     clog('client connection is closed')
// });
