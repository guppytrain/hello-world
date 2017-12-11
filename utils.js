/**
 * Created by jla on 6/17/17.
 */

exports.clog = function () {
    console.log.apply(this, arguments);
};

exports.cerr = function () {
    console.error.apply(this, arguments);
};

exports.cwarn = function () {
    console.warn.apply(this, arguments);
};
