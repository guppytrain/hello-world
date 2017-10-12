/**
 * regex
 * ([\w|\:]+)\t([\d|\.|\,]+)\t([\d|\.|\,]+)
 * ["$1", $2, $3],
 */

var folios = {
    ibkr: [
    ],
    ms: [
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
    ],
    misc: [
    ],
    starone: [
    ]
};


var folioHelper = {
    inc: 20,
    delay: 350,
    folio: null,
    cntr: null,

    init: function(fid) {
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
        var num_rows = this.getRowCount();

        return num_rows >= this.folio.length;
    },

    addMoreRows: function(n, delay) {
        n = n || this.inc;
        delay = delay || this.delay;

        var fh = this;
        var slr = this.getContainer();
        var addCtrl = this.getAddRowsCtrl();

        if(addCtrl) {
            var job = {
                count: 0,
                run: function() {
                    console.log('add:job:count: ' + this.count);

                    fh.click(addCtrl);

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

    appendData: function(n) {
        var cntr = this.getContainer();

        var tickers = this.getTickerElements();
        var units = this.getSharesElements();
        var costs = this.getCostElements();

        n = n || Math.min(this.getRowCount(), tickers.length);

        for(var i=0; i < n; i++) {
            var sym = this.folio[i];

            if(!sym || !tickers[i]) { break; }

            console.log(sym[0]);

            var t = this.getNode(tickers[i]);
            t.value = sym[0];

            var u = this.getNode(units[i]);
            u.value = sym[1];

            var c = this.getNode(costs[i]);
            c.value = sym[2];
        }
    },

    submit: function() {
        var ctrl = this.getSubmitCtrl();

        this.click(ctrl);
    },

    click: function(element) {
        if(element.click) {
            element.cick();
        }
        else {
            element.firstElementChild && element.firstElementChild.click();
        }
    },

    // START BROKER SPECIFIC PORTFOLIO API
    // CLS_ID : {
    //     container: "wlentries"
    // },

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

    },

    getSubmitCtrl: function() {
        var btns = document.getElementsByClassName('buttonsCell')[0];
        var elem = btns.firstElementChild;

        return elem;
    },

    getNode: function(elem) {
        return elem.firstElementChild || elem;
    }
};

var fh = folioHelper;
