/**
 * Created by jla on 6/17/17.
 */

exports.cmd = function () {
    var name = "commander";
    var status = "ERR";

    console.log("Starting " + name + "...");

    /** BEGIN **/
    var program = require('commander');

    program
        .version('0.0.1')
        .option('-s, --source [web site]', 'Source web site')
        .option('-f, --file [file name]', 'File name')
        .parse(process.argv);

    console.log(program.source);
    console.log(program.file);

    /** END **/

    console.log(name + " DONE.");

    status = "OK";

    return status;
};