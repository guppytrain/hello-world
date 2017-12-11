/**
 * Created by jla on 6/17/17.
 */

exports.run = function (req, res) {
    var name = "example.2-9";
    var status = "ERR";

    console.log("Starting " + name+ "...");

    /** BEGIN **/
    var fs = require("fs");

    fs.readFile('./sandbox/apples.txt', 'utf8', function(err, data) {
        if(err) {
            console.log(err);
        }
        else {
            var adjData = data.replace(/apple/g, 'orange');

            console.log('Writing: ' + adjData);

            fs.writeFile('./sandbox/oranges.txt', adjData, function(err) {
                if(err) {
                    console.log(err);
                }
            });


            fs.readFile('./sandbox/oranges.txt', 'utf8', function(err, data) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log('Wrote: ' + data);
                }
            });
        }
    });

    /** END **/

    console.log(name + " DONE.");

    status = "OK";

    return status;
};