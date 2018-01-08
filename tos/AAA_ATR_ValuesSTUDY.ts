#
# TD Ameritrade IP Company, Inc. (c) 2009-2017
# Modified 9/1/2017
#

declare lower;

input showLongs = no;
# input showShorts = no;

input showLabel = yes;

##############
## ATR BAND ##
##############

input trailType = { default modified, unmodified };
input priceX_type = { vwap, close, hlc3, mid, oc, default hl };

input ATRPeriod = 21;
input ATRBandPeriod = 34;
input ATRBandPeriodMid = 13;
input ATRBandPeriodNear = 5;
input ATRFactorBand = 3.5;
input ATRFactorUpper = 3.18;
input ATRFactorLower = 2.36;
#input ATRFactorStopUp = 3.18;
#input ATRFactorStopDown = 2.36;
def ATRFactorVol = 1.0;
def ATREntryRetracePct = 0.382;
def ATRRetracePct = 0.618;
def AtrAverageType = AverageType.WILDERS;

def useRetracePct = yes;
def retracePct = 1.0;

input useCurTF = yes;
input timeFrame = AggregationPeriod.DAY;
def showOnlyToday = yes;

def averageType = AverageType.EXPONENTIAL;
def applyVolRange = yes;

# CHANGE
def curTimeFrame = GetAggregationPeriod();
def cur_period_close = Fundamental(fundamentalType = FundamentalType. VWAP, period = curTimeFrame);

def tf = if (useCurTF or curTimeFrame > timeFrame) then curTimeFrame else timeFrame;
def tf_close = Fundamental(fundamentalType = FundamentalType. VWAP, period = tf);

def is_near_tf = if (curTimeFrame < timeFrame) then (cur_period_close == tf_close) else yes;

def highs = high(period = tf);
def lows = low(period = tf);
def opens = open(period = tf);
def closes = close(period = tf);
def hlc3s = hlc3(period = tf);
def vwaps = vwap(period = tf);

def priceXup;
def priceXdown;

switch (priceX_type) {
case vwap:
    priceXup = vwaps;
    priceXdown = vwaps;
case close:
    priceXup = closes;
    priceXdown = closes;
case hlc3:
    priceXup = hlc3s;
    priceXdown = hlc3s;
case mid:
    priceXup = (highs + lows) / 2;
    priceXdown = (highs + lows) / 2;
case oc:
    priceXup = Min(opens, closes);
    priceXdown = Max(opens, closes);
case hl:
    priceXup = Max(highs, lows);
    priceXdown = Min(highs, lows);
}


def HiLo = Min(highs - lows, 1.5 * Average(highs - lows, ATRPeriod));
def HRef = if lows <= highs[1]
    then highs - closes[1]
    else (highs - closes[1]) - 0.5 * (lows - highs[1]);
def LRef = if highs >= lows[1]
    then closes[1] - lows
    else (closes[1] - lows) - 0.5 * (lows[1] - highs);

def trueRange;

switch (trailType) {
case modified:
    trueRange = Max(HiLo, Max(HRef, LRef));
case unmodified:
    trueRange = TrueRange(highs, closes, lows);
}

def range = MovingAverage(AtrAverageType, trueRange, ATRPeriod);

def band_width = Round(ATRFactorBand * range);
def upper = Round(ATRFactorUpper * range);
def lower = Round(ATRFactorLower * range);

def default_vol = 0.236;
def hv = HistoricalVolatility(length = 20)."HV";
def hvFactor = Min(if !IsNaN(hv) then hv else default_vol, 1.00);
def ivFactor = Min(if !IsNaN(imp_volatility(period = tf)) then imp_volatility(period = tf) else default_vol, 1.00);
def volty = ((hvFactor + (ivFactor * 4)) / 5);
def vol_range = Round(range * (if applyVolRange then volty else 0));

def state = { default init, running };
def bandUpper;
def bandLower;
def nearUpper;
def nearLower;

switch (state[1]) {
case init:
    if (!IsNaN(band_width)) {
        state = state.running;
        bandUpper =  closes + band_width;
        bandLower = closes - band_width;
        nearUpper =  bandUpper - ((ATRFactorVol * range) - vol_range);
        nearLower = bandLower + ((ATRFactorVol * range) - vol_range);
    } else {
        state = state.init;
        bandUpper = Double.NaN;
        bandLower = Double.NaN;
        nearUpper = Double.NaN;
        nearLower = Double.NaN;
    }
case running:
    state = state.running;
    bandUpper = closes + band_width;
    bandLower = closes - band_width;
    nearUpper = bandUpper - ((ATRFactorVol * range) - vol_range);
    nearLower = bandLower + ((ATRFactorVol * range) - vol_range);
}

# atr channel/bands values
def vAtrBandUpper = MovingAverage(averageType, bandUpper, ATRBandPeriod);
def vAtrBandLower = MovingAverage(averageType, bandLower, ATRBandPeriod);
def vAtrBandMidOuter = Round((vAtrBandUpper + vAtrBandLower) / 2);

def vAtrBandMid = MovingAverage(averageType, Round((bandUpper + bandLower) / 2), ATRBandPeriodMid);

def vAtrBandNearUpper = MovingAverage(averageType, Round(bandUpper - ((ATRFactorVol * range) - vol_range)), ATRBandPeriodNear);
def vAtrBandNearLower = MovingAverage(averageType, Round(bandLower + ((ATRFactorVol * range) - vol_range)), ATRBandPeriodNear);
def vAtrBandNearMid = Round((vAtrBandNearUpper + vAtrBandNearLower) / 2);

AddLabel(showLabel, ""
        + "atr: " + Round(range) + ", "
        + "atr%: " + Round(range / vwaps * 100) + ", "
        + "vr: " + Round(vol_range) + ", "
        + "vty: " + Round(volty) + ", "
        + "",
        Color. GRAY);

AddLabel(showLabel, ""
        + "hi: " + Round(bandUpper) + ", "
        + "lo: " + Round(bandLower) + ", "
        + "bw: " + Round(band_width) + ", "
        + "bw%: " + Round(band_width / vwaps * 100),
        Color.LIGHT_GRAY);

#def curEntryPrice = closes - (ATREntryRetracePct * range);
def curEntryPrice = closes;
def longEntryPrice = closes - ((if useRetracePct then retracePct else ATRRetracePct) * range);
def shortEntryPrice = closes + ((if useRetracePct then retracePct else ATRRetracePct) * range);

input pot = 150000;
input exposure_pct = 1.00;
input risk_tol_pct = 5.00;
def exp_shares = Floor((pot * (exposure_pct / 100)) / (Round(curEntryPrice)));
def risk_tolerance = Round((pot * (exposure_pct / 100)) * (risk_tol_pct / 100), 0);
def risk_shares_x = Floor(risk_tolerance / (Round(curEntryPrice) - Round(curEntryPrice - lower)));
def risk_shares_l = Floor(risk_tolerance / (Round(longEntryPrice) - Round(longEntryPrice - lower)));
def risk_shares_s = Floor(risk_tolerance / (Round(shortEntryPrice + lower) - Round(shortEntryPrice)));

AddLabel(showLabel, ""
        + "N: " + exp_shares + ", "
        + "R: " + risk_tolerance + ", "
        + "X: " + risk_shares_x + "@[" + Round(curEntryPrice + upper) + ", " + Round(curEntryPrice) + ", " + Round(curEntryPrice - lower) + "], "
        + "L: " + risk_shares_l + "@[" + Round(longEntryPrice + upper) + ", " + Round(longEntryPrice) + ", " + Round(longEntryPrice - lower) + "], "
#        + "S: " + risk_shares_s + "@[" + Round(shortEntryPrice - upper) + ", " + Round(shortEntryPrice) + ", " + Round(shortEntryPrice + lower) + "]"
        + "",
        Color.PINK);

# plots
plot AtrPrice = closes;
AtrPrice. setDefaultColor(Color. CYAN);

plot Profit = Round(curEntryPrice + upper);
plot Stop = Round(curEntryPrice - lower);

plot LongEntry = if showLongs then Round(longEntryPrice) else Double.NaN;
#plot ShortEntry = if showShorts then Round(shortEntryPrice) else Double.NaN;

plot LongProfit = if showLongs then Round(longEntryPrice + upper) else Double.NaN;
#plot ShortProfit = if showShorts then Round(shortEntryPrice - upper) else Double.NaN;

plot LongStop = if showLongs then Round(longEntryPrice - lower) else Double.NaN;
#plot ShortStop = if showShorts then Round(shortEntryPrice + lower) else Double.NaN;

Profit.setDefaultColor(Color. GREEN);
Stop.setDefaultColor(Color. RED);

LongEntry.setDefaultColor(Color.RED);
#ShortEntry.setDefaultColor(Color.RED);

LongProfit.setDefaultColor(Color.GREEN);
#ShortProfit.setDefaultColor(Color.GREEN);

LongStop.setDefaultColor(Color.BLUE);
#ShortStop.setDefaultColor(Color.BLUE);

#plot AtrVal = Round(range);
#AtrVal.setHiding(yes);

#plot AtrPct = Round(range/closes * 100);
#AtrPct.setHiding(yes);
