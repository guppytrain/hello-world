/**
 * regex:
 * unknown:
 * ([\w|\:]+)\t([\d|\.|\,]+)\t([\d|\.|\,]+)
 * ["$1", $2, $3],
 */

var folios = {
    /**
     * tos:
     * ([\w|\.]+)\,([\d|\.|\,]+)\,([\d|\.|\,]+)
     * ["$1", $2, $3],
     */
    tos_mkt: [
        [".DJI", 22861.42, 1],
        ["AGG", 109.57, 1],
        ["EEM", 46.295, 1],
        ["EFA", 69.3051, 1],
        ["EMB", 116.04, 1],
        ["GDX", 23.81, 1],
        ["NDX", 6083.0893, 1],
        ["RUT", 1506.9472, 1],
        ["SPX", 2553.85, 1],
        ["TLT", 124.825, 1],
        ["USO", 10.24, 1],
        ["VIX", 9.74, 1]
    ],

    /**
     * tos:
     * ([\w|\.]+)\,([\d|\.|\,]+)\,([\d|\.|\,]+)
     * ["$1", $2, $3],
     */
    tos_alloc: [
        ["AAXJ", 74.67, 1],
        ["AGG", 109.57, 1],
        ["AMLP", 11.3008, 1],
        ["BKLN", 23.2064, 1],
        ["EEM", 46.3, 1],
        ["EFA", 69.3092, 1],
        ["EMB", 116.0456, 1],
        ["EWA", 22.65, 1],
        ["EWC", 29.24, 1],
        ["EWG", 32.87, 1],
        ["EWH", 25.025, 1],
        ["EWJ", 56.77, 1],
        ["EWT", 37.55, 1],
        ["EWU", 35.29, 1],
        ["EWW", 52.67, 1],
        ["EWY", 72.215, 1],
        ["EWZ", 42.87, 1],
        ["FXI", 45.875, 1],
        ["GDX", 23.815, 1],
        ["HYG", 88.36, 1],
        ["IEF", 106.47, 1],
        ["IEFA", 64.955, 1],
        ["IEI", 123.35, 1],
        ["IEMG", 55.745, 1],
        ["INDA", 34.095, 1],
        ["IVV", 256.63, 1],
        ["IWM", 149.75, 1],
        ["IYR", 81.31, 1],
        ["LQD", 121.085, 1],
        ["RSX", 22.38, 1],
        ["SHV", 110.31, 1],
        ["SHY", 84.35, 1],
        ["SMH", 97, 1],
        ["TIP", 113.935, 1],
        ["TLT", 124.82, 1],
        ["USO", 10.245, 1],
        ["VCIT", 87.98, 1],
        ["VCSH", 80.045, 1],
        ["VEA", 43.985, 1],
        ["VEU", 53.58, 1],
        ["VNQ", 84.46, 1],
        ["VTI", 131.38, 1],
        ["VWO", 44.8, 1],
        ["XLB", 58.119, 1],
        ["XLE", 68.11, 1],
        ["XLF", 26.18, 1],
        ["XLI", 72.2, 1],
        ["XLK", 60.405, 1],
        ["XLP", 54.45, 1],
        ["XLU", 54.555, 1],
        ["XLV", 82.6186, 1],
        ["XLY", 90.91, 1]
    ],

    ibkr: [
    ],

    /**
     * tos:
     ([\w]+)\,([\d|\.]+)\,([\d|\.]+)\,.+
     * ["$1", $2, $3],
     */
    ms: [
        ["ABBV", 34, 60.778],
        ["ACN", 24, 119.799],
        ["ADBE", 31, 109.502],
        ["ALGN", 13, 95.362],
        ["GOOGL", 2, 777.22],
        ["GOOG", 4, 760.158],
        ["MO", 44, 64.24],
        ["AEP", 11, 59.386],
        ["AZN", 63, 28.333],
        ["T", 80, 38.794],
        ["ADP", 35, 96.715],
        ["BCE", 60, 43.247],
        ["BP", 43, 35.307],
        ["SPAXX", 3790.65, 1],
        ["CM", 7, 86.56],
        ["CELG", 27, 118.474],
        ["CVX", 20, 110.383],
        ["KO", 60, 41.252],
        ["ED", 9, 70.327],
        ["CCI", 23, 85.505],
        ["DG", 26, 77.194],
        ["D", 30, 74.525],
        ["DUK", 25, 74.047],
        ["XOM", 27, 87.168],
        ["FB", 30, 118.209],
        ["IT", 20, 103.387],
        ["GIS", 20, 59.002],
        ["GSK", 58, 39.225],
        ["KMB", 10, 115],
        ["MA", 11, 101.768],
        ["MRK", 26, 61.217],
        ["MSFT", 35, 72.75],
        ["NGG", 34, 62.628],
        ["NSRGY", 33, 67.282],
        ["NKE", 63, 50.355],
        ["OXY", 23, 67.063],
        ["ORCL", 76, 41.103],
        ["ORLY", 13, 248.002],
        ["PEP", 6, 100.57],
        ["PM", 25, 88.647],
        ["PBDPX", 1060.955, 10.169],
        ["PTTPX", 1093.058, 10.005],
        ["PPL", 43, 34.016],
        ["PCLN", 2, 1503.055],
        ["PG", 16, 82.698],
        ["PEG", 19, 44.727],
        ["PSA", 5, 207.942],
        ["O", 10, 55.586],
        ["REGN", 7, 382.924],
        ["SNY", 33, 40.34],
        ["SO", 20, 47.127],
        ["SBUX", 58, 58.006],
        ["TOT", 34, 51.848],
        ["UPS", 5, 112.664],
        ["VTR", 17, 61.034],
        ["VZ", 71, 49.14],
        ["V", 40, 77.344],
        ["VOD", 105, 24.724],
        ["HCN", 16, 63.183]
    ],

    /**
     * fidelity:
     * ([\w]+)\,([\d|\.]+)\,\$?([\d|\.|\,]+)
     * ["$1", $2, $3],
     */
    fidelity: [
        ["SPAXX", 28352.14, 1.00],
        ["ARTRX", 834.376, 23.97],
        ["DBLSX", 477.611, 10.05],
        ["FAGIX", 2014.802, 10.16],
        ["FCNTX", 173.974, 114.96],
        ["FIVFX", 1046.572, 19.11],
        ["FOSFX", 426.985, 46.84],
        ["FPBFX", 648.508, 30.84],
        ["FSEAX", 526.87, 37.96],
        ["FTEMX", 1616.815, 12.37],
        ["JAFIX", 408.883, 10.28],
        ["JAHYX", 146.823, 8.52],
        ["MAPIX", 1123.439, 18.04],
        ["MAPTX", 729.395, 27.42],
        ["MGGPX", 1054.852, 18.96],
        ["MQIFX", 230.32, 15.59],
        ["MSFBX", 862.46, 23.22],
        ["MSIQX", 187.059, 15.00],
        ["NBHIX", 143.794, 12.49],
        ["OPGIX", 350.14, 57.12],
        ["PIMIX", 349.966, 12.12],
        ["PONDX", 1649.895, 12.33],
        ["PRRIX", 162.988, 11.03],
        ["TCMPX", 1325.381, 15.09],
        ["TGEIX", 435.709, 8.17],
        ["TPYYX", 401.622, 8.89]
    ],

    fidelityJT: [
        ["SPAXX", 15029.98, 1.0],
        ["FGMNX", 874.545, 11.46],
        ["FIVFX", 511.247, 19.56],
        ["FPBFX", 157.035, 31.84],
        ["HLMSX", 321.958, 15.53],
        ["MAPIX", 272.777, 18.33],
        ["NPFFX", 240.269, 41.62],
        ["PONDX", 2037.393, 12.34],
        ["TEMMX", 362.582, 13.79],
        ["THOPX", 875.657, 11.51]
    ],

    vanguard: [
        ["RNWGX", 709.398, 62.25],
        ["BRHYX", 9593.793, 7.78],
        ["DODIX", 439.339, 13.87],
        ["FCNTX", 152.154, 117.14],
        ["NBSLX", 494.074, 37.05],
        ["PFORX", 568.799, 10.63],
        ["PRGTX", 1082.309, 17.61],
        ["PRSVX", 445.928, 45.88],
        ["VIEIX", 227.443, 75.74],
        ["VGSLX", 76.555, 117.74],
        ["VTSNX", 386.262, 114.26]
    ],

    misc: [
    ],

    starone: [
    ]
};


var folioHelper = {
    cursor: 0,
    inc: 10,
    delay: 2000,
    folio: null,
    cntr: null,

    init: function(fid) {
        fid = fid || (this.config.useDefaultID && this.config.defaultID);

        if (fid) {
            this.setFolio(fid);
        }

        return this.folio;
    },

    /**
     * sets the current portfolio by id
     * @param id
     * @returns {folio}
     */
    setFolio: function(id) {
        this.folio = folios[id];

        return this.folio;
    },

    isFilled: function() {
        return this.cursor >= this.folio.length;
    },

    fillFolio: function(delay) {
        delay = delay || this.delay;

        var addCtrl = this.getAddRowsCtrl();

        if(addCtrl) {
            var job = {
                fh: this,
                count: 0,
                run: function() {
                    this.count++;

                    console.log('add:job:count: ' + this.count);

                    this.fh.appendData();

                    if(this.fh.isFilled()) {
                        console.log('folio filled');

                        return;
                    }

                    this.fh.click(addCtrl);

                    setTimeout(job.run.bind(this), delay);
                }
            }

            console.log('start filling folio...');

            job.run();
        }
    },

    appendData: function() {
        var tickers = this.getTickerElements();
        var units = this.getSharesElements();
        var costs = this.getCostElements();

        var n = Math.min(this.getRowCount(), tickers.length);

        for(var i=this.cursor; i < n; i++) {
            var sym = this.folio[i];

            if(!sym || !tickers[i]) { break; }

            console.log(sym[0]);

            var t = this.getNode(tickers[i]);
            t.value = sym[0];

            var u = this.getNode(units[i]);
            u.value = sym[1];

            var c = this.getNode(costs[i]);
            c.value = sym[2];

            this.cursor++;
        }

        return this.cursor;
    },

    submit: function() {
        var ctrl = this.getSubmitCtrl();

        this.click(ctrl);
    },

    click: function(element) {
        if(element.click) {
            element.click();
        }
        else {
            element.firstElementChild && element.firstElementChild.click();
        }
    },

    getNode: function(elem) {
        return elem.firstElementChild || elem;
    },

    // START BROKER SPECIFIC PORTFOLIO API

    config: {
        useDefaultID: true,
        defaultID: 'fidelity',
    },

    getContainer: function() {
        var cntr = document.getElementsByClassName("wlentries")[0];

        return cntr;
    },

    getRows: function() {
        var cntr = this.getContainer();
        var rows = cntr.getElementsByTagName('tr');
        var visible_rows = Array.prototype.filter.call(
            rows,
            function(row) {
                return row.getAttribute('style') != "display: none;";
            }
        );

        return visible_rows;
    },

    getRowCount: function() {
        var visible_rows = this.getRows();

        return visible_rows.length;
    },

    getTickerElements: function() {
        var visible_rows = this.getRows();
        var elems = [];

        visible_rows.forEach(function(v, i, a) {
            var elem = v.children[1].firstElementChild;

            if (elem.name.indexOf("SYMBOL_") == 0) {
                elems.push(elem);
            }
        });

        return elems;
    },

    getSharesElements: function() {
        var visible_rows = this.getRows();
        var elems = [];

        visible_rows.forEach(function(v, i, a) {
            var elem = v.children[2].firstElementChild;

            if (elem.name.indexOf("QTY_") == 0) {
                elems.push(elem);
            }
        });

        return elems;
    },

    getCostElements: function() {
        var visible_rows = this.getRows();
        var elems = [];

        visible_rows.forEach(function(v, i, a) {
            var elem = v.children[3].firstElementChild;

            if (elem.name.indexOf("PURCHASE_PRICE_") == 0) {
                elems.push(elem);
            }
        });

        return elems;
    },

    getAddRowsCtrl: function() {
        var ctrl = document.getElementById('addMoreLink');

        return ctrl;
    },

    getSubmitCtrl: function() {
        var btns = document.getElementsByClassName('buttonsCell')[0];
        var elem = btns.firstElementChild;

        return elem;
    }
};

var fh = folioHelper;
