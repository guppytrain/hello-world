/**
 * Created by jla on 7/29/17.
 */

exports.run = function () {
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