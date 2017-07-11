/**
 * Created by jla on 6/17/17.
 */

exports.run = function (req, res) {
    var name = "simple module";
    var status = "ERR";

    console.log("Starting " + name + "...");

    /** BEGIN **/
    var gt_utils = require("gt_utils").GT_Utils;

    gt_utils.echo("Hello Node World!");

    /** END **/

    console.log(name + " DONE.");

    status = "OK";

    return status;
};