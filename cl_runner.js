/**
 * Created by jla on 7/13/17.
 */

console.log('Running in console');

// var module = require('./underscore.1');
// var module = require('./os');
// var module = require('./stream');
// var module = require('./path');
// var module = require('./readline');
// var module = require('./socket.server');
var module = require('./dgram.server');

console.log('Start Module...\n');

var stat = module && module.run && module.run();

console.log('\n...Stop Module');
console.log('Status: ' + stat);
