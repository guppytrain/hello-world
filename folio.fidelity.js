/**
 * regex:
 * unknown:
 * ([\w|\:]+)\t([\d|\.|\,]+)\t([\d|\.|\,]+)
 * ["$1", $2, $3],
 *
 * fidelity:
 * ([\w]+)\,([\d|\.]+)\,\$?([\d|\.|\,]+)
 */

var folios = {
    ibkr: [
    ],
    ms: [
    ],
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
    vanguard: [
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
