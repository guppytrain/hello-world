/**
 * Created by jla on 6/17/17.
 */

let clog = require('./utils').clog;

let net = require('net');
let fs = require('fs');

const port = 8124;
const socket = '/tmp/echo.sock';

let server = net.createServer(function(conn){
    clog('connected');

    conn.on('data', function(data) {
        clog(data + ' from ' + conn.remoteAddress + ' ' + conn.remotePort);

        let conf;

        // noinspection JSAnnotator
        try {
            conf = JSON.parse(data);

            switch(conf.cmd) {
                case 'init':
                    if(conf.init_cfg) {
                        server.connMap.set(conf.init_cfg.id, conn);

                        server.connMap.get(conf.init_cfg.id).write('add succeeded...');

                        clog('connection added to map');
                    }
                    else {
                        clog('empty init cfg from client');
                    }

                    break;

                case 'msg':
                    if(conf.msg_cfg) {
                        let c = server.connMap.get(conf.msg_cfg.id);

                        clog('found connection: ' + c.remoteAddress);

                        c.write(conf.msg_cfg.txt);
                    }
                    else {
                        clog('empty msg cfg from client');
                    }
                    break;

                default:
                    clog('unhandled cmd: ' + conf.cmd);
            }
        }
        catch(e) {
            clog('error parsing client data: ' + e);
        }
    });

    conn.on('end', function() {
        clog('client disconnected');
    });

    conn.on('close', function() {
        clog('client closed connection');
    });

    conn.write('hello client!\n');

    // conn.pipe(conn);

}).listen(port, () => {
    clog('server bound at ' + port);

    server.endpoint = port;
});
// }).listen(socket, () => {
// clog('server bound at ' + socket);
//
// server.endpoint = socket;
// });

server.connMap = new Map();

server.on('listening', function() {
    clog('listening on ' + server.endpoint);
});

server.on('connection', (conn) => {
    clog('new connection...');

    server.getConnections((err, count) => {
        if (err) {
            console.warn(err);
        }
        else {
            clog('total connections: ' + count);
        }
    });
});

server.on('error', function(err) {
    if (err.code == 'EADDRINUSE') {
        console.warn('Address in use, retrying...');

        if (server.endpoint == port) {
            setTimeout(() => {
                server.close();
                server.listen(server.endpoint);
            }, 1000);
        }
        else if (server.endpoint == socket) {
            fs.unlink(server.endpoint, function() {
                server.close();
                server.listen(server.endpoint);
            });
        }
    }
    else {
        console.error(err);
    }
});

server.on('end', function() {
    clog('server disconnected');
});

server.on('close', function() {
    clog('server closed connection');
});

process.on('uncaughtException', (err) => {
    clog(err);
});

// echo '{"cmd":"foobar"}' | nc localhost 8124