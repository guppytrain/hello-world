/**
 * Created by jla on 6/17/17.
 */

var http = require('http');

var example = require('./example.2-8');

http.createServer(function(req, res) {
    res.writeHead(200, { 'content-type': 'text/plain'});

    res.write('Start...\n');

    var data = example.run.apply(example);

    res.write('\nData: ' + data);

    res.end('\nDone...');

}).listen(8124);

console.log("Server running at http://127.0.0.1:8124");