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
        [".DJI", 1, 22861.42],
        ["AGG", 1, 109.57],
        ["EEM", 1, 46.295],
        ["EFA", 1, 69.3051],
        ["EMB", 1, 116.04],
        ["GDX", 1, 23.81],
        ["NDX", 1, 6083.0893],
        ["RUT", 1, 1506.9472],
        ["SPX", 1, 2553.85],
        ["TLT", 1, 124.825],
        ["USO", 1, 10.24],
        ["VIX", 1, 9.74]
    ],

    /**
     * tos:
     * ([\w|\.]+)\,([\d|\.|\,]+)\,([\d|\.|\,]+)
     * ["$1", $2, $3],
     */
    tos_alloc: [
        ["AAXJ", 1, 74.67],
        ["AGG", 1, 109.57],
        ["AMLP", 1, 11.3008],
        ["BKLN", 1, 23.2064],
        ["EEM", 1, 46.3],
        ["EFA", 1, 69.3092],
        ["EMB", 1, 116.0456],
        ["EWA", 1, 22.65],
        ["EWC", 1, 29.24],
        ["EWG", 1, 32.87],
        ["EWH", 1, 25.025],
        ["EWJ", 1, 56.77],
        ["EWT", 1, 37.55],
        ["EWU", 1, 35.29],
        ["EWW", 1, 52.67],
        ["EWY", 1, 72.215],
        ["EWZ", 1, 42.87],
        ["FXI", 1, 45.875],
        ["GDX", 1, 23.815],
        ["HYG", 1, 88.36],
        ["IEF", 1, 106.47],
        ["IEFA", 1, 64.955],
        ["IEI", 1, 123.35],
        ["IEMG", 1, 55.745],
        ["INDA", 1, 34.095],
        ["IVV", 1, 256.63],
        ["IWM", 1, 149.75],
        ["IYR", 1, 81.31],
        ["LQD", 1, 121.085],
 //       ["RSX", 1, 22.38],
        ["SHV", 1, 110.31],
        ["SHY", 1, 84.35],
        ["SMH", 1, 97],
        ["TIP", 1, 113.935],
        ["TLT", 1, 124.82],
//        ["USO", 1, 10.245],
        ["VCIT", 1, 87.98],
        ["VCSH", 1, 80.045],
        ["VEA", 1, 43.985],
        ["VEU", 1, 53.58],
        ["VNQ", 1, 84.46],
        ["VTI", 1, 131.38],
        ["VWO", 1, 44.8],
        ["XLB", 1, 58.119],
        ["XLE", 1, 68.11],
        ["XLF", 1, 26.18],
        ["XLI", 1, 72.2],
        ["XLK", 1, 60.405],
        ["XLP", 1, 54.45],
        ["XLU", 1, 54.555],
        ["XLV", 1, 82.6186],
        ["XLY", 1, 90.91]
    ],

    ibkr: [
    ],

    /**
     * tos:
     ([\w]+)\,([\d|\.]+)\,([\d|\.]+)\,.+
     * ["$1", $2, $3],
     */
    ms1: [
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
    ],

    ms2: [
        ["UPS", 5, 112.664],
        ["VTR", 17, 61.034],
        ["VZ", 71, 49.14],
        ["V", 40, 77.344],
        ["VOD", 105, 24.724],
        ["HCN", 16, 63.183],
        ["PBDPX", 1060.955, 10.169],
        ["PTTPX", 1093.058, 10.005],
        ["SPAXX", 3790.65, 1],
    ],

    /**
     * fidelity:
     * ([\w]+)\,([\d|\.]+)\,\$?([\d|\.|\,]+)
     * ["$1", $2, $3],
     */
    fidelity: [
        ["SPAXX", 2800.73, 1.00],
        ["AAXJ", 33, 75.38],
        ["ARKK", 45, 34.86],
        ["ARTRX", 834.376, 23.97],
        ["DBLSX", 477.611, 10.05],
        ["EWA", 108, 23.12],
        ["EWG", 76, 32.93],
        ["EWH", 98, 25.52],
        ["EWU", 71, 35.13],
        ["FAGIX", 2014.802, 10.16],
        ["FCNTX", 173.974, 114.96],
        ["FDN", 14, 105.77],
        ["FIVFX", 1046.572, 19.11],
        ["FOSFX", 426.985, 46.84],
        ["FPBFX", 648.508, 30.84],
        ["FSEAX", 526.87, 37.96],
        ["FTEMX", 1616.815, 12.37],
        ["FXI", 54, 46.65],
        ["INDA", 43, 34.61],
        ["IWM", 10, 150.33],
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
        ["SMH", 15, 98.35],
        ["TCMPX", 1325.381, 15.09],
        ["TGEIX", 435.709, 8.17],
        ["TPYYX", 401.622, 8.89],
        ["XLB", 26, 58.26],
        ["XLI", 21, 72.36],
    ],

    fidelity_jt: [
        ["SPAXX", 1074.11, 1.00],
        ["AAXJ", 13, 75.35],
        ["ARKK", 29, 34.95],
        ["EWA", 43, 23.19],
        ["EWG", 30, 33.03],
        ["EWH", 39, 25.57],
        ["EWU", 29, 35.25],
        ["EWZ", 23, 42.96],
        ["FDN", 9, 106.00],
        ["FGMNX", 877.549, 11.46],
        ["FIVFX", 511.247, 19.56],
        ["FPBFX", 157.035, 31.84],
        ["FXI", 21, 46.78],
        ["HLMSX", 321.958, 15.53],
        ["INDA", 29, 34.64],
        ["IWM", 7, 150.53],
        ["MAPIX", 274.068, 18.33],
        ["NPFFX", 240.269, 41.62],
        ["PONDX", 2054.468, 12.34],
        ["SMH", 10, 98.38],
        ["TEMMX", 362.582, 13.79],
        ["THOPX", 883.325, 11.51],
        ["XLB", 17, 58.33],
        ["XLI", 14, 72.39],
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
        ["BABA", 8.00, 135.00],
        ["EEM", 34.00, 43.71],
        ["SPAXX", 36.17, 1.00],
        ["SPAXX", 42.17, 1.00],
        ["SPAXX", 21.96, 1.00],
        ["VEA", 30.00, 42.33],
        ["VWO", 11.00, 42.74],
    ],

    starone: [
        ["SPAXX", 25869.05, 1.00],
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
                rowCount: 0,
                run: function() {
                    this.count++;

                    console.log('add:job:count: ' + this.count);
                    
                    if(this.rowCount) {
                    	// cannot add any more rows, quit
                    	if(this.rowCount == this.fh.getRowCount()) {
		                    console.log('cannot add any more rows, quit');
		                    
		                    return;
                    	}
                    }

                    this.fh.appendData();

                    if(this.fh.isFilled()) {
                        console.log('folio filled');

                        return;
                    }

					this.rowCount = this.fh.getRowCount();
					
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
            
            if(this.config.touchNodes) {
            	this.touchNodes(t, u, c);
            }
            
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
        touchNodes: true,
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
    },
    
    touchNodes: function(tickerNode, sharesNode, costNode) {
    	tickerNode.onchange();
    },
};

var fh = folioHelper;
