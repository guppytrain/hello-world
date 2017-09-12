/**
 * Created by jla on 7/13/17.
 */

console.log('Running in console');

// var module = require('./underscore.1');
var module = require('./os');

console.log('Start Module...\n');

var stat = module.run();

console.log('\n...Stop Module');
console.log('Status: ' + stat);
