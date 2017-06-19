/**
 * Created by jla on 6/17/17.
 */

exports.run = function () {
    var fs = require('fs');

    this.version = 2;

    try {
        var data = fs.readFileSync('./apples.txt', 'utf8');
        console.log(data);

        var adjData = data.replace(/[A|a]pple/g, 'oranges and apples');

        console.log('Writing to new file: ' + adjData);
        fs.writeFileSync('./oranges.txt', adjData);

        var confirmedData = fs.readFileSync('./oranges.txt', 'utf8');

        console.log('Wrote: ' + confirmedData);

        return confirmedData;
    } catch (err) {
        console.error(err);

        return err;
    }
};

exports.version = 1;

