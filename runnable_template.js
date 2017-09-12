/**
 * Created by jla on 6/17/17.
 */

exports.run = function (req, res) {
    var name = "runnable";
    var status = "ERR";

    console.log("Starting " + name + "...\n");

    /** BEGIN **/
    console.log("");

    /** END **/

    console.log("\nFinishing " + name + "...");

    status = "OK";

    return status;
};