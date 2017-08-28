/**
 * Created by jla on 6/17/17.
 */

var http = require('http');
var qs = require('querystring');

var server = http.createServer().listen(8124);

var postedData = null;

server.on('request', function(req, res) {
    if(req.method == "POST") {
        var body = '';

        req.on('data', function(data) {
            body += data;
        });

        req.on('end', function() {
            var post = qs.parse(body);

            res.writeHead(200, {'Content-Type': 'text/plain'});

            console.log(post);

            postedData = body;

            res.end('Post Data received: ' + body);
        })
    }
    else if(req.method = 'GET') {
        if(postedData != null) {
            res.writeHead(200, {'Content-Type': 'text/html'})

            res.end('<html><body>Received Msg: ' + postedData + '</body></html>');
        }
    }
});

console.log('Server running at http://localhost:8124');