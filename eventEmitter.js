/**
 * Created by jla on 6/19/17.
 */

var EventEmitter = require('events').EventEmitter;
var util = require('util');

exports.run = function(req, res) {
    var status = "N/A";

    var tickerHelper = {
        total: 3250,
        add: function (sym, price) {
            var shares = Math.round(this.total / price);
            return {
                sym: sym,
                price: price,
                shares: Math.round(this.total / price),
                value: Math.round((price * shares) * 100) / 100
            };
        }
    };

    var symbols = [];

    symbols.push(tickerHelper.add('rwx', 39.33));
    symbols.push(tickerHelper.add('rem', 48.37));
    symbols.push(tickerHelper.add('angl', 29.64));
    symbols.push(tickerHelper.add('emb', 115.45));
    symbols.push(tickerHelper.add('xlu', 53.93));
    symbols.push(tickerHelper.add('vgk', 56.25));
    symbols.push(tickerHelper.add('dvy', 94.5));
    symbols.push(tickerHelper.add('vea', 41.95));
    symbols.push(tickerHelper.add('vdc', 145.25));
    symbols.push(tickerHelper.add('vwo', 41.02));
    symbols.push(tickerHelper.add('xli', 69.1));
    symbols.push(tickerHelper.add('xlb', 54.45));
    symbols.push(tickerHelper.add('xlf', 24.54));
    symbols.push(tickerHelper.add('xlk', 56.07));
    symbols.push(tickerHelper.add('xly', 90.84));
    symbols.push(tickerHelper.add('aaxj', 67.92));
    symbols.push(tickerHelper.add('smh', 85.64));

    function SymbolHandler(data) {
        this.list = data
    }

    util.inherits(SymbolHandler, EventEmitter);

    SymbolHandler.prototype.display = function() {
        console.log('Event: ' + data);
    };

    var sh = new SymbolHandler(symbols);

    sh.on('show', function(evt) {
        console.log('Event: ' + evt.evtName);
        // res.write("Event: " + evt.evtName);

        res.write(JSON.stringify(this.list))
    });

    var cmd = require("url").parse(req.url, true).query.cmd;

    if(cmd === undefined) return "Nothing to do";

    if(cmd === "show") {
        sh.emit('show', { evtName: cmd });
    }

    return "OK";
};