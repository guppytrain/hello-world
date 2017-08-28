/**
 * Created by jla on 6/17/17.
 */

var program = require('commander');

program
    .arguments('msg')
    .action(handleArgs)
    .parse(process.argv);

function handleArgs(msg) {
    console.log('Starting Client');

    var http = require('http');
    var qs = require('querystring');

    var postData = qs.stringify({
        'msg': msg || 'Default Client Message'
    });

    var options = {
        hostname: 'localhost',
        port: 8124,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    console.log('Client running...');

    var req = http.request(options, function(res) {
        console.log('status: ' + res.statusCode);
        console.log('headers: ' + JSON.stringify(res.headers));

        res.setEncoding('utf8');

        res.on('data', function(chunk) {
            console.log('body: ' + chunk);
        });

        res.on('end', function() {
            console.log('no more data in response');
        });
    });

    req.on('error', function(e) {
        console.log('problem with request: ' + e.message);
    });

    req.write(postData);
    req.end();
}