/**
 * Created by jla on 7/29/17.
 */

exports.run = function () {
    var name = "os";
    var status = "ERR";

    console.log("Starting " + name + "...\n");

    var os = require("os");

    /** BEGIN **/
    console.log("EOL: " + os.EOL);
    console.log("endianness: " + os.endianness());
    console.log("tmpdir: " + os.tmpdir());
    console.log("homedir: " + os.homedir());

    /** END **/

    console.log("\nFinishing " + name + "...");

    status = "OK";

    return status;
};