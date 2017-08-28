/**
 * Created by jla on 6/17/17.
 */

var http = require('http'),
    fs = require('fs'),
    mime = require('mime'),
    path = require('path'),
    base = __dirname + '/public_html';

http.createServer(function(req, res) {
    var pathname = path.normalize(base + req.url);

    console.log('pathname: ' + pathname);

    fs.stat(pathname, function(err, stats) {
        if(err) {
            console.log('stat err: ', err);
            res.writeHead(404);
            res.write('Resource missing 404\n');
            res.end();
        }
        else if(stats.isFile()) {
            var type = mime.lookup(pathname);
            console.log(type);

            res.setHeader('Content-Type', type);

            var file = fs.createReadStream(pathname);

            file.on('open', function() {
                res.statusCode = 200;
                file.pipe(res);
            });

            file.on('error', function(err) {
                console.log('stream err:', err);
                res.writeHead(403);
                res.write('file missing or permission problem');
                res.end();
            })
        }
        else {
            res.writeHead(403);
            res.write('Directory access not allowed');
            res.end();
        }
    })
}).listen(8124);

console.log('Server running at http://localhost:8124');