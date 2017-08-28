/**
 * regex
 * ([\w|\:]+)\t([\d|\.|\,]+)\t([\d|\.|\,]+)
 * ["$1", $2, $3],
 */

var folios = {
    ibkr: [
        ["AIG", 13.00, 61.96],
        ["CELG", 6.00, 127.88],
        ["CL", 11.00, 71.41],
        ["CS", 54.00, 14.74],
        ["CSX", 17.00, 48.74],
        ["DD", 10.00, 81.30],
        ["DOW", 12.00, 63.43],
        ["ETN", 11.00, 72.31],
        ["EWW", 14.00, 56.32],
        ["GLW", 26.00, 28.44],
        ["GSK", 20.00, 39.02],
        ["GT", 25.00, 30.62],
        ["HAS", 8.00, 99.11],
        ["IWM", 6.00, 137.97],
        ["JCI", 20.00, 39.10],
        ["KMB", 7.00, 121.49],
        ["LPL", 60.00, 12.78],
        ["MDT", 10.00, 83.87],
        ["MYL", 26.00, 30.19],
        ["NFLX", 5.00, 166.58],
        ["NKE", 14.00, 57.57],
        ["NWL", 16.00, 50.04],
        ["PM", 7.00, 115.44],
        ["SKM", 31.00, 25.89],
        ["SPG", 5.00, 153.99],
        ["TEL", 10.00, 77.90],
        ["UTX", 7.00, 117.02],
        ["VMC", 7.00, 116.89],
        ["VRSK", 10.00, 81.05],
        ["VTI", 6.00, 124.63],
        ["WDC", 9.00, 83.36],
        ["WFC", 15.00, 52.75],
        ["XLE", 12.00, 62.43],
        ["XLK", 14.00, 57.22],
        ["XOM", 10.00, 76.48],
        ["SPAXX", 122427.00, 1.00],
    ],
    ms: [
        ["ABBV", 42.00, 60.77],
        ["ACN", 24.00, 119.80],
        ["ADBE", 31.00, 109.50],
        ["ALGN", 17.00, 94.67],
        ["GOOGL", 3.00, 777.22],
        ["GOOG", 4.00, 760.16],
        ["MO", 39.00, 64.21],
        ["AEP", 11.00, 59.39],
        ["AZN", 63.00, 28.33],
        ["T", 80.00, 38.79],
        ["ADP", 35.00, 96.71],
        ["BCE", 60.00, 43.25],
        ["BP", 38.00, 35.13],
        ["SPAXX", 1492.96, 1.00],
        ["CM", 7.00, 86.56],
        ["CELG", 27.00, 118.47],
        ["CVX", 20.00, 110.38],
        ["KO", 60.00, 41.25],
        ["ED", 9.00, 70.33],
        ["CCI", 23.00, 85.51],
        ["DG", 26.00, 77.19],
        ["D", 30.00, 74.52],
        ["DUK", 25.00, 74.05],
        ["XOM", 27.00, 87.17],
        ["FB", 30.00, 118.21],
        ["IT", 20.00, 103.39],
        ["GIS", 16.00, 59.64],
        ["GSK", 55.00, 39.15],
        ["KMB", 10.00, 115.00],
        ["MA", 11.00, 101.77],
        ["MRK", 26.00, 61.22],
        ["MSFT", 17.00, 71.84],
        ["NGG", 34.00, 62.63],
        ["NSRGY", 33.00, 67.28],
        ["NKE", 63.00, 50.36],
        ["OXY", 23.00, 67.06],
        ["ORCL", 67.00, 40.18],
        ["ORLY", 13.00, 248.00],
        ["PEP", 6.00, 100.57],
        ["PM", 25.00, 88.65],
        ["PBDPX", 1060.96, 10.17],
        ["PTTPX", 1093.06, 10.00],
        ["PPL", 43.00, 34.02],
        ["PCLN", 2.00, 1503.06],
        ["PG", 16.00, 82.70],
        ["PEG", 19.00, 44.73],
        ["PSA", 5.00, 207.94],
        ["O", 10.00, 55.59],
        ["REGN", 8.00, 382.55],
        ["SNY", 41.00, 40.34],
        ["SO", 20.00, 47.13],
        ["SBUX", 58.00, 58.01],
        ["TOT", 30.00, 51.47],
        ["UPS", 5.00, 112.66],
        ["VTR", 17.00, 61.03],
        ["VZ", 71.00, 49.14],
        ["V", 53.00, 77.34],
        ["VOD", 105.00, 24.72],
        ["HCN", 16.00, 63.18],
    ],
    fidelity: [
        ["SPAXX", 28348.82, 1.00],
        ["ARTRX", 834.38, 23.97],
        ["DBLSX", 475.61, 10.05],
        ["FAGIX", 2002.42, 10.16],
        ["FCNTX", 173.97, 114.96],
        ["FIVFX", 1046.57, 19.11],
        ["FOSFX", 426.99, 46.84],
        ["FPBFX", 648.51, 30.84],
        ["FSEAX", 526.87, 37.96],
        ["FTEMX", 1616.82, 12.37],
        ["JAFIX", 406.87, 10.28],
        ["JAHYX", 145.47, 8.52],
        ["MAPIX", 1118.15, 18.03],
        ["MAPTX", 729.40, 27.42],
        ["MGGPX", 1054.85, 18.96],
        ["MQIFX", 227.83, 15.59],
        ["MSFBX", 862.46, 23.22],
        ["MSIQX", 187.06, 15.00],
        ["NBHIX", 142.57, 12.48],
        ["OPGIX", 350.14, 57.12],
        ["PIMIX", 346.86, 12.12],
        ["PONDX", 1636.18, 12.33],
        ["PRRIX", 162.66, 11.03],
        ["TCMPX", 1325.38, 15.09],
        ["TGEIX", 431.98, 8.17],
        ["TPYYX", 400.13, 8.89],
    ],
    vanguard: [
        ["RNWGX", 709.43, 62.25],
        ["BRHYX", 9506.25, 7.78],
        ["DODIX", 436.36, 13.87],
        ["FCNTX", 152.16, 117.14],
        ["NBSLX", 494.01, 37.05],
        ["PFORX", 567.62, 10.63],
        ["PRGTX", 1082.09, 17.61],
        ["PRSVX", 446.13, 45.88],
        ["VIEIX", 226.83, 75.74],
        ["VGSLX", 75.78, 117.74],
        ["VTSNX", 384.18, 114.26],
    ],
    misc: [
        ["BABA", 8.00, 135.00],
        ["EEM", 34.00, 43.71],
        ["SPAXX", 36.17, 1.00],
        ["SPAXX", 42.17, 1.00],
        ["SPAXX", 21.96, 1.00],
        ["VEA", 30.00, 42.33],
        ["VWO", 11.00, 42.74],
    ],
    starone: [
        ["SPAXX", 30869.05, 1.00],
    ]
};


var folioHelper = {
    xs: 0,
    inc: 20,
    delay: 350,
    folio: null,
    slr: null,

    setFolio: function(id) {
        this.folio = folios[id];

        return this.folio;
    },

    init: function(reset) {
        this.slr = document.getElementsByClassName("nv-manual-edit-table-minheight-wrapper")[0];

        if(reset) {
            this.xs = 0;
        }
        else {
            var gls = this.slr.getElementsByClassName('gainloss');

            this.xs = Math.floor(gls.length / this.inc);
        }

        return this.xs;
    },

    isFilled: function() {
        var elems = this.slr.getElementsByClassName('gainloss');

        return elems.length >= this.folio.length;
    },

    addMoreRows: function(n, delay) {
        n = n || this.inc;
        delay = delay || this.delay;

        var slr = this.slr;
        var elems = document.getElementsByClassName('nv-manual-edit-add-more-rows');
        var elem = elems.length && elems[0];

        if(elem) {
            var job = {
                count: 0,
                run: function() {
                    console.log('add:job:count: ' + this.count);

                    elem.firstElementChild.click();

                    slr.scrollTop = slr.scrollHeight;

                    var ts = slr.getElementsByClassName('ticker');
                    var us = slr.getElementsByClassName('units')
                    var cs = slr.getElementsByClassName('costBasis')

                    if(ts[ts.length-1].className && ts[ts.length-1].className.indexOf('clickable') < 0) {
                        var t = ts[ts.length-1].firstElementChild;

                        t.focus();
                        t.value = "";
                        t.blur();
                    }

                    var u = us[us.length-1].firstElementChild;

                    u.focus();
                    u.value = "";
                    u.setAttribute('class', "");
                    u.blur();

                    var c = cs[cs.length-1].firstElementChild;

                    c.focus();
                    c.value = "";
                    c.setAttribute('class', "");
                    c.blur();

                    this.count++;

                    if(this.count >= n) {
                        console.log('job done');

                        return;
                    }

                    setTimeout(job.run.bind(this), delay);
                }
            }

            console.log('adding ' + n + ' rows, 1 at a time...');

            job.run();
        }
    },

    check: function(n) {
        n = n || this.inc;

        var inc = this.inc;
        var slr = this.slr;

        var ts = slr.getElementsByClassName('ticker');
        var tickers = Array.prototype.slice.call(ts, Math.max(0, ts.length - inc), Math.max(0, ts.length - inc) + inc);
        var us = slr.getElementsByClassName('units')
        var units = Array.prototype.slice.call(us, Math.max(0, us.length - inc), Math.max(0, us.length - inc) + inc);
        var cs = slr.getElementsByClassName('costBasis')
        var costs = Array.prototype.slice.call(cs, Math.max(0, cs.length - inc), Math.max(0, cs.length - inc) + inc);

        for(var i=0; i<n; i++) {
            var sym = this.folio[this.xs * inc + i];

            if(!sym) { break; }

            var t = (tickers[i] && tickers[i].firstChild);
            var u = units[i].firstChild;
            var c = costs[i].firstChild;

            console.log(sym[0], (t && (t.value || t.textContent || 'na'))+ '->' + sym[0], u.value + '->' + sym[1], c.value + '->' + sym[2]);
        }

    },

    fill: function(n) {
        n = n || this.inc;

        var inc = this.inc;
        var slr = this.slr;

        var ts = slr.getElementsByClassName('ticker');
        var tickers = Array.prototype.slice.call(ts, Math.max(0, ts.length - inc), Math.max(0, ts.length - inc) + inc);
        var us = slr.getElementsByClassName('units')
        var units = Array.prototype.slice.call(us, Math.max(0, us.length - inc), Math.max(0, us.length - inc) + inc);
        var cs = slr.getElementsByClassName('costBasis')
        var costs = Array.prototype.slice.call(cs, Math.max(0, cs.length - inc), Math.max(0, cs.length - inc) + inc);

        for(var i=0; i<n; i++) {
            var sym = this.folio[this.xs * inc + i];

            if(!sym) { break; }

            var t = (tickers[i] && tickers[i].firstChild);
            var u = units[i].firstChild;
            var c = costs[i].firstChild;

            console.log(sym[0]);

            if(tickers[i].className && tickers[i].className.indexOf('clickable') < 0) {
                t.value = sym[0];
            }

            u.value = sym[1];
            c.value = sym[2];
        }

        this.xs++;
    },

    submit: function() {
        var btns = document.getElementsByClassName("nvui-form nvui-skin-lime");
        var btn = btns[0];

        btn.click();
    }
};

var fh = folioHelper;
