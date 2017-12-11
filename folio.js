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
        ["AGN", 10, 174.88],
        ["BBY", 18, 55.236],
        ["BK", 20, 51.69],
        ["BSX", 35, 28.489],
        ["BUD", 10, 115.24],
        ["CMG", 4, 279.66],
        ["DAL", 20, 49.81],
        ["EPD", 42, 24.584],
        ["GOLD", 10, 90.7],
        ["GSK", 30, 35.174],
        ["HAS", 10, 97.41],
        ["IBM", 10, 148.57],
        ["INFO", 23, 43.084],
        ["JCI", 28, 35.786],
        ["KHC", 20, 80.09],
        ["MON", 10, 118.44],
        ["MRK", 18, 55.206],
        ["NOK", 200, 5.045],
        ["NWL", 36, 28.018],
        ["PFE", 50, 35.38],
        ["PM", 10, 102.66],
        ["SNP", 15, 70.217],
        ["SYMC", 36, 27.923],
        ["TLT", 10, 124.6],
        ["TSLA", 15, 321.247],
        ["SPAXX", 118828, 1],
    ],

    /**
     * tos:
     * ([\w]+)\,([\d|\.]+)\,([\d|\.]+)\,.+
     * ([\w]+)\,([\d|\.]+)\,\$?([\d|\.|\,]+)
     * ["$1", $2, $3],
     */
    ms1: [
        ["ABBV", 20, 1216.31],
        ["ACN", 24, 2875.18],
        ["ADBE", 31, 3394.57],
        ["ALGN", 13, 1239.7],
        ["GOOGL", 2, 1554.44],
        ["GOOG", 4, 3040.63],
        ["MO", 44, 2826.57],
        ["AEP", 11, 653.25],
        ["AZN", 63, 1785.01],
        ["T", 92, 3513.52],
        ["ADP", 35, 3385.01],
        ["BCE", 60, 2594.82],
        ["BP", 43, 1518.18],
        ["BTI", 13, 865.13],
        ["SPAXX", 1605.61, 1],
        ["CM", 15, 1326.3],
        ["CELG", 27, 3198.79],
        ["CVX", 21, 2328.06],
        ["KO", 60, 2475.11],
        ["CCI", 22, 1882.89],
        ["DG", 26, 2007.05],
        ["D", 30, 2235.74],
        ["DUK", 25, 1851.17],
        ["XOM", 31, 2676.09],
        ["FB", 30, 3546.28],
        ["IT", 20, 2067.74],
        ["GIS", 23, 1334.89],
        ["GSK", 58, 2275.07],
        ["KMB", 10, 1150],
        ["MA", 11, 1119.45],
    // ],
    //
    // ms2: [
        ["MRK", 26, 1591.64],
        ["MSFT", 35, 2546.25],
        ["NGG", 34, 2129.36],
        ["NSRGY", 33, 2220.31],
        ["NKE", 63, 3172.38],
        ["OXY", 29, 1937.9],
        ["ORCL", 76, 3123.83],
        ["ORLY", 13, 3224.03],
        ["PEP", 6, 603.42],
        ["PM", 25, 2216.18],
        ["PBDPX", 1060.955, 10788.96],
        ["PTTPX", 1093.058, 10935.97],
        ["PPL", 43, 1462.68],
        ["PCLN", 2, 3006.11],
        ["PG", 16, 1323.16],
        ["PEG", 19, 849.81],
        ["PSA", 6, 1257.18],
        ["O", 10, 555.86],
        ["REGN", 7, 2680.47],
        ["SNY", 27, 1089.19],
        ["SO", 20, 942.54],
        ["SBUX", 58, 3364.37],
        ["TOT", 34, 1762.82],
        ["UPS", 5, 563.32],
        ["VTR", 17, 1037.58],
        ["VZ", 71, 3488.96],
        ["V", 40, 3093.77],
        ["VOD", 105, 2596.03],
        ["HCN", 16, 1010.93],
        ["ZTS", 18, 1262.06],
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
        ["SPAXX", 1042.45, 1],
        ["AAXJ", 33, 75.38],
        ["ARKK", 45, 34.86],
        ["ARTRX", 869.434, 24],
        ["DBLSX", 478.636, 10.05],
        ["EWA", 108, 23.12],
        ["EWG", 76, 32.93],
        ["EWH", 98, 25.52],
        ["EWU", 71, 35.13],
        ["EWZ", 42, 41.89],
        ["FAGIX", 2021.1, 10.16],
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
        ["JAFIX", 409.775, 10.28],
        ["JAHYX", 147.572, 8.52],
        ["MAPIX", 1123.439, 18.04],
        ["MAPTX", 729.395, 27.42],
        ["MGGPX", 1054.852, 18.96],
        ["MQIFX", 230.32, 15.59],
        ["MSFBX", 862.46, 23.22],
        ["MSIQX", 187.059, 15.00],
        ["NBHIX", 143.794, 12.49],
        ["OPGIX", 350.14, 57.12],
        ["PIMIX", 351.526, 12.12],
        ["PONDX", 1656.706, 12.33],
        ["PRRIX", 163.365, 11.03],
        ["SMH", 15, 98.35],
        ["TCMPX", 1325.381, 15.09],
        ["TGEIX", 437.594, 8.17],
        ["TPYYX", 402.571, 8.89],
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
        ["RNWGX", 709.398, 60.11],
        ["BRHYX", 9639.252, 7.81],
        ["DODIX", 439.427, 13.85],
        ["FCNTX", 152.243, 114.57],
        ["NBSLX", 494.114, 37.79],
        ["PFORX", 569.444, 10.59],
        ["PRGTX", 1082.434, 17.01],
        ["PRSVX", 447.026, 46.85],
        ["VIEIX", 227.443, 77.47],
        ["VGSLX", 76.555, 120.37],
        ["VTSNX", 386.262, 112.50]
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
    xs: 0,
    inc: 20,
    delay: 350,
    folio: null,
    slr: null,

    setFolio: function(id) {
        this.folio = folios[id];

        return this.folio;
    },

    init: function(id, reset) {
        this.slr = document.getElementsByClassName("nv-manual-edit-table-minheight-wrapper")[0];

        this.setFolio(id);

        if(reset != false) {
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

    addMoreRows: function(n, delay, fillWhenDone) {
        n = n || this.inc;
        delay = delay || this.delay;

        var dis = this;
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

                        if (fillWhenDone) {
                            dis.fill(n);
                        }
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
