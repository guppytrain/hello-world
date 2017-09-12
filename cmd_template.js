/**
 * Created by jla on 7/29/17.
 */

exports.run = function () {
    var name = "runnable";
    var status = "ERR";

    console.log("Starting " + name + "...");

    /** BEGIN **/
    console.log("");

    /** END **/

    console.log(name + " DONE.");

    status = "OK";

    return status;
};