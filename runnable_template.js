/**
 * Created by jla on 6/17/17.
 */

exports.run = function (req, res) {
    var name = "runnable";
    var status = "ERR";

    console.log("Starting " + name + "...");

    /** BEGIN **/
    res.write("");

    /** END **/

    console.log(name + " DONE.");

    status = "OK";

    return status;
};