/**
 * Created by jla on 7/13/17.
 */

var program = require('commander');
var runmode = require('./runmode');
var ver = '0.0.1';

program
    .version(ver)
    .option('-c, --cmd', 'Cmd Runmode')
    .option('-w, --web', 'Web Runmode')
    .arguments('[env]')
    .action(handleArgs)
    .parse(process.argv);

function handleArgs(env) {
    switch(env) {
        case runmode.WEB:
            console.log('runmode: ' + env);

            require('./web_runner');
            break;

        default:
            console.log('Unsupported mode: ' + env);
            console.log('Defaulting to: ' + runmode.CMD);

        case runmode.CMD:
            if(env.match(new RegExp('/^(' + runmode.CMD + '|' + runmode.WEB + ')$/', 'i'))) {
                console.log('runmode: ' + env);
            }

            require('./cl_runner');
            break;
    }
}

if(program.cmd === true) {
    handleArgs(runmode.CMD);
}
else if(program.web === true) {
    handleArgs(runmode.WEB);
}
