/**
 * Created by jla on 7/29/17.
 */

exports.run = function () {
    var mod_name = "readline";
    var status = "ERR";

    console.log("Starting " + mod_name + "...\n");

    var mod = require(mod_name);

    /** BEGIN **/
    let rl = mod.createInterface(process.stdin, process.stdout);

    rl.question(">>Login: ", function(ans) {
        console.log("You said: " + ans);
        rl.setPrompt(">> ");
        rl.prompt();
    });

    function closeInterface() {
        rl.close();
        console.log('Leaving Readline');
    }

    rl.on('line', function(cmd) {
        if(cmd.trim() == '.leave') {
            closeInterface();
            return;
        }

        console.log('repeating commmand: ' + cmd);
        rl.prompt();
    });

    rl.on('close', function() {
        // closeInterface();
        console.log('closing...');
    });

    /** END **/

    console.log("\nFinishing " + mod_name + "...");

    status = "OK";

    return status;
};