/**
 * Created by jla on 7/29/17.
 */

exports.run = function () {
    var name = "Underscore 1";
    var status = "ERR";

    console.log("Module: " + name + "...");

    /** BEGIN **/
    var us = require('underscore');
    // us.mixin({
    //     betterWithNode: function(str) {
    //         return str + ' is better with Node';
    //     }
    // });

    var obj = {
        strPrefix: "I think that...",
        print: function() {
            return this.strPrefix + ' ' + this.strSuffix
        }
    };

    us.extendOwn(obj, {strPrefix: "I thought that...", strSuffix: 'Already'});

    console.log(obj.print());
    /** END **/

    status = "OK";

    return status;
};