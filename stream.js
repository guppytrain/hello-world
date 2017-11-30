/**
 * Created by jla on 7/29/17.
 */

exports.run = function () {
    var name = "stream";
    var status = "ERR";

    console.log("Starting " + name + "...\n");

    var fs = require("fs");

    /** BEGIN **/
    // open read stream
    var rf = fs.createReadStream('./sandbox/read.txt');

    var data = '';

    rf.on('data', function(chunk) {
        data += chunk;
    });

    rf.on('end', function() {
        console.log(data);

        // wf.write(data);
    });

    // open write stream
    var wf = fs.createWriteStream('./sandbox/write.txt');

    // pipe read into write
    rf.pipe(wf);

    /** END **/

    console.log("\nFinishing " + name + "...");

    status = "OK";

    return status;
};