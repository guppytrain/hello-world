/**
 * Created by jla on 5/20/17.
 */

var http = require("http");
var fs = require("fs");

http.createServer(function(req, res) {
    var name = require("url").parse(req.url, true).query.name;

    if(name === undefined) name = "World";

    if(name == "bird") {
        var file = "Jacket.aspx.jpeg";
        fs.stat(file, function(err, stat) {
            if(err) {
                console.error(err);
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end("Sorry, file not found\n");
            }
            else {
                var img = fs.readFileSync(file);
                res.contentType = "image/jpeg";
                res.contentLength = stat.size;
                res.end(img, "binary");
            }

        });
    }
    else {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello ' + name + '\n');
    }
}).listen(8124);

console.log("Server running at http://127.0.0.1:8124");
