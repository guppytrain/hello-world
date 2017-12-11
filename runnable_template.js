/**
 * Created by jla on 6/17/17.
 */

exports.run = function (req, res) {
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