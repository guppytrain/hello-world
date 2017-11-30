/**
 * Created by jla on 7/29/17.
 */

exports.run = function () {
    let name = "path";
    let status = "ERR";

    console.log("Starting " + name + "...\n");

    let fs = require("fs");
    let util = require('util');

    /** BEGIN **/
    let filename = './sandbox/read.txt';
    let pms = new Promise((resolve, reject) => {
        fs.stat(filename, function(err, stats) {
        if (err) {
            return reject(err);
        }

        let size = parseInt(stats.size) || 0;

        resolve(size);
    })});

    pms.then((value) => {
        // console.log(value);
        fs.open(filename, 'r', 0x666, (err, fd) => {
            if(err) return console.error(err);

            let buf = new Buffer(value);
            fs.read(fd, buf, 0, buf.length, 0, (error, bytes, buffer) => {
                if(error) return console.error(error);

                console.log(buffer.toString('utf8'));
            });
        });
    }, (err) => {
        console.error(err);
    });

    // fs.open('./sandbox/read.txt', 'r', 0x666, function(err, fd) {
    //     if (err) return console.error(err);
    //
    //     fs.read(fd, )
    // })
    /** END **/

    console.log("\nFinishing " + name + "...");

    status = "OK";

    return status;
};