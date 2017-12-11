/**
 * Created by jla on 7/29/17.
 */

exports.run = function () {
    var mod_name = "readline";
    var status = "ERR";

    console.log("Starting " + mod_name + "...\n");

    var mod = require(mod_name);

    /** BEGIN **/
    console.log("");

    /** END **/

    console.log("\nFinishing " + mod_name + "...");

    status = "OK";

    return status;
};