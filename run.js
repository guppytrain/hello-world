/**
 * Created by jla on 6/17/17.
 */

var http = require('http');

// var module = require('./runnable_template');
// var module = require('./eventEmitter');
// var module = require('./example.2-8');
// var module = require('./example.2-9');
var module = require('./simple_module');

http.createServer(function(req, res) {
    res.writeHead(200, { 'content-type': 'text/plain'});

    res.write('Start...\n\n');

    var stat = module.run(req, res);

    res.write('Status: ' + stat);

    res.end('\n\nDone...');

}).listen(8124);

console.log("Server running at http://127.0.0.1:8124");