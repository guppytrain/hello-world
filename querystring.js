/**
 *
 */

exports.run = function (req, res) {
    var name = "querystring";
    var status = "ERR";

    var qs = require('querystring');
    var qsObj = qs.parse(req.url);

    console.log("Starting " + name + "...");

    /** BEGIN **/
    for(var i in qsObj) {
        console.log(i + '=' + qsObj[i]);
    }

    /** END **/

    console.log(name + " DONE.");

    status = "OK";

    return status;
};