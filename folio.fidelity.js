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
        ["AAXJ", 35, 74.74],
        ["ABX", 110, 14.01],
        ["AGG", 10, 109.66],
        ["ASML", 10, 172.15],
        ["AYX", 40, 24.97],
        ["BABA", 10, 174.13],
        ["BSX", 35, 28.49],
        ["EMB", 50, 115.67],
        ["EPD", 42, 24.58],
        ["EWH", 50, 25.43],
        ["EWZ", 35, 40.12],
        ["FB", 10, 172.45],
        ["FDN", 10, 106.87],
        ["FXI", 45, 45.49],
        ["GD", 10, 200.90],
        ["GOLD", 10, 90.70],
        ["GSK", 30, 35.17],
        ["JD", 50, 37.71],
        ["KHC", 20, 80.09],
        ["KWEB", 30, 55.93],
        ["MRK", 18, 55.21],
        ["MU", 25, 40.52],
        ["NFLX", 6, 182.54],
        ["NVDA", 16, 190.22],
        ["SMH", 20, 97.87],
        ["TLT", 10, 124.60],
        ["TSLA", 15, 321.25],
        ["TSM", 50, 38.94],
        ["TWX", 12, 89.30],
        ["VEA", 50, 44.11],
        ["VEU", 50, 53.50],
        ["VWO", 50, 43.62],
        ["WDC", 13, 76.95],
    ],

    /**
     * tos:
     * ([\w]+)\,([\d|\.]+)\,([\d|\.]+)\,.+
     * ([\w]+)\,([\d|\.]+)\,\$?([\d|\.|\,]+)
     * ["$1", $2, $3],
     */
    ms1: [
        ["ABBV", 20, 60.82],
        ["ACN", 24, 119.80],
        ["ADBE", 31, 109.50],
        ["ALGN", 13, 95.36],
        ["GOOGL", 2, 777.22],
        ["GOOG", 4, 760.16],
        ["MO", 44, 64.24],
        ["AEP", 11, 59.39],
        ["AZN", 63, 28.33],
        ["T", 92, 38.19],
        ["ADP", 35, 96.71],
        ["BCE", 60, 43.25],
        ["BP", 43, 35.31],
        ["BTI", 13, 66.55],
        ["SPAXX", 1753.58, 1.00],
        ["CM", 15, 88.42],
        ["CELG", 27, 118.47],
        ["CVX", 21, 110.86],
        ["KO", 60, 41.25],
        ["CCI", 22, 85.59],
        ["DG", 26, 77.19],
        ["D", 30, 74.52],
        ["DUK", 25, 74.05],
        ["XOM", 31, 86.33],
        ["FB", 30, 118.21],
        ["IT", 20, 103.39],
        ["GIS", 23, 58.04],
        ["GSK", 58, 39.23],
        ["KMB", 10, 115.00],
        ["MA", 11, 101.77],
    ],

    ms2: [
        ["MRK", 26, 61.22],
        ["MSFT", 35, 72.75],
        ["NGG", 34, 62.63],
        ["NSRGY", 33, 67.28],
        ["NKE", 63, 50.36],
        ["OXY", 29, 66.82],
        ["ORCL", 76, 41.10],
        ["ORLY", 13, 248.00],
        ["PEP", 6, 100.57],
        ["PM", 25, 88.65],
        ["PBDPX", 1060.955, 10.17],
        ["PTTPX", 1093.058, 10.00],
        ["PPL", 43, 34.02],
        ["PCLN",2, 1503.06],
        ["PG", 16, 82.70],
        ["PEG", 19, 44.73],
        ["PSA", 6, 209.53],
        ["O", 10, 55.59],
        ["REGN", 7, 382.92],
        ["SNY", 27, 40.34],
        ["SO", 20, 47.13],
        ["SBUX", 58, 58.01],
        ["TOT", 34, 51.85],
        ["UPS", 5, 112.66],
        ["VTR", 17, 61.03],
        ["VZ", 71, 49.14],
        ["V", 40, 77.34],
        ["VOD", 105, 24.72],
        ["HCN", 16, 63.18],
        ["ZTS", 18, 70.11],
    ],

    /**
     * login:
     * https://login.fidelity.com/ftgw/Fas/Fidelity/RtlCust/Login/Init?AuthRedUrl=https://oltx.fidelity.com/ftgw/fbc/ofsummary/defaultPage
     *
     * download:
     * https://oltx.fidelity.com/ftgw/fbc/ofpositions/snippet/portfolioPositions?ALL_ACCTS=N&SAVE_SETTINGS_WASH_SALE=N&UNADJUSTED_COST_BASIS_INFORMATION=&EXCLUDE_WASH_SALE_IND=&SHOW_FOREIGN_CURRENCY=&REFRESH_DATA=Y&REPRICE_FROM_CACHE=Y&ALL_POS=Y&ALL_ACCTS=Y&TXN_SORT_ORDER=0&TABLE_SORT_ORDER=0&TABLE_SORT_DIRECTION=A&SAVE_SETTINGS=N&pf=N&CSV=Y&TXN_COLUMN_SORT_JSON_INFO=&SORT_COL_IND=&IS_ACCOUNT_CHANGED=Y&DISP_FULL_DESC=N&FONT_SIZE=S&viewBy=&displayBy=&group-by=0&desc=0&NEXTGEN=Y&ACTION=&SHOW_FULL_SECURITY_NAME=N&REQUESTED_SHOW_TYPE_IND=All&REQUESTED_SHOW_TYPE_IND=Mutual+Funds&REQUESTED_SHOW_TYPE_IND=Stocks/ETFs&REQUESTED_SHOW_TYPE_IND=Cash
     *
     * watchlist:
     * https://watchlists.fidelity.com/ftgw/watchlists/goto/retail/getWatchlist
     *
     * fidelity:
     * ([\w]+)\,([\d|\.]+)\,\$?([\d|\.|\,]+)
     * ["$1", $2, $3],
     */
    fidelity: [
        ["SPAXX", 1042.51, 1.00],
        ["AAXJ", 33, 75.38],
        ["ARKK", 45, 34.86],
        ["ARTRX", 869.434, 24.03],
        ["DBLSX", 479.673, 10.05],
        ["EWA", 108, 23.12],
        ["EWG", 76, 32.93],
        ["EWH", 98, 25.52],
        ["EWU", 71, 35.13],
        ["EWZ", 42, 41.89],
        ["FAGIX", 2027, 10.16],
        ["FCNTX", 183.786, 115.33],
        ["FDN", 14, 105.77],
        ["FIVFX", 1081.965, 19.16],
        ["FOSFX", 431.721, 46.87],
        ["FPBFX", 648.508, 30.84],
        ["FSEAX", 531.606, 38.01],
        ["FTEMX", 1616.815, 12.37],
        ["FXI", 54, 46.65],
        ["INDA", 43, 34.61],
        ["IWM", 10, 150.33],
        ["JAFIX", 410.722, 10.28],
        ["JAHYX", 148.262, 8.52],
        ["MAPIX", 1154.635, 18.07],
        ["MAPTX", 738.41, 27.45],
        ["MGGPX", 1054.852, 18.96],
        ["MQIFX", 230.32, 15.59],
        ["MSFBX", 862.46, 23.22],
        ["MSIQX", 187.059, 15.00],
        ["NBHIX", 143.794, 12.49],
        ["OPGIX", 358.493, 57.34],
        ["PIMIX", 353.096, 12.13],
        ["PONDX", 1663.556, 12.33],
        ["PRRIX", 164.263, 11.03],
        ["SMH", 15, 98.35],
        ["TCMPX", 1325.381, 15.09],
        ["TGEIX", 439.754, 8.17],
        ["TPYYX", 404.199, 8.90],
        ["XLB", 26, 58.26],
        ["XLI", 21, 72.36],
    ],

    fidelity_etf: [
        ["AAXJ", 33, 75.38],
        ["ARKK", 45, 34.86],
        ["EWA", 108, 23.12],
        ["EWG", 76, 32.93],
        ["EWH", 98, 25.52],
        ["EWU", 71, 35.13],
        ["EWZ", 42, 41.89],
        ["FDN", 14, 105.77],
        ["FXI", 54, 46.65],
        ["INDA", 43, 34.61],
        ["IWM", 10, 150.33],
        ["SMH", 15, 98.35],
        ["XLB", 26, 58.26],
        ["XLI", 21, 72.36],
    ],

    fidelity_jt: [
        ["SPAXX", 1080.4, 1],
        ["AAXJ", 13, 75.35],
        ["ARKK", 29, 34.95],
        ["EWA", 43, 23.19],
        ["EWG", 30, 33.03],
        ["EWH", 39, 25.57],
        ["EWU", 29, 35.25],
        ["EWZ", 23, 42.96],
        ["FDN", 9, 106.00],
        ["FGMNX", 879.062, 11.46],
        ["FIVFX", 511.247, 19.56],
        ["FPBFX", 157.035, 31.84],
        ["FXI", 21, 46.78],
        ["HLMSX", 321.958, 15.53],
        ["INDA", 29, 34.64],
        ["IWM", 7, 150.53],
        ["MAPIX", 274.068, 18.33],
        ["NPFFX", 240.269, 41.62],
        ["PONDX", 2062.95, 12.34],
        ["SMH", 10, 98.38],
        ["TEMMX", 362.582, 13.79],
        ["THOPX", 883.325, 11.51],
        ["XLB", 17, 58.33],
        ["XLI", 14, 72.39],
    ],

    fidelity_jt_etf: [
        ["AAXJ", 13, 75.35],
        ["ARKK", 29, 34.95],
        ["EWA", 43, 23.19],
        ["EWG", 30, 33.03],
        ["EWH", 39, 25.57],
        ["EWU", 29, 35.25],
        ["EWZ", 23, 42.96],
        ["FDN", 9, 106.00],
        ["FXI", 21, 46.78],
        ["INDA", 29, 34.64],
        ["IWM", 7, 150.53],
        ["SMH", 10, 98.38],
        ["XLB", 17, 58.33],
        ["XLI", 14, 72.39],
    ],

    /**
     * login:
     * https://personal.vanguard.com/us/hnwnesc/nesc/LoginPage?TYPE=33554433&REALMOID=06-00054ca0-729e-18dd-9edc-8b160a96a05e&GUID=&SMAUTHREASON=0&METHOD=GET&SMAGENTNAME=personalprd01&TARGET=$SM$%2fus%2fMyHome
     *
     */
    vanguard: [
        ["RNWGX", 709.39, 60.11],
        ["BRHYX", 9682.29, 7.81],
        ["DODIX", 439.41, 13.85],
        ["FCNTX", 160.82, 114.57],
        ["NBSLX", 494.13, 37.79],
        ["PFORX", 570.00, 10.59],
        ["PRGTX", 1082.52, 17.01],
        ["PRSVX", 445.68, 46.85],
        ["VIEIX", 227.43, 77.47],
        ["VGSLX", 76.55, 120.37],
        ["VTSNX", 386.25, 112.50]
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
        ["SPAXX", 19000, 1.00],
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
