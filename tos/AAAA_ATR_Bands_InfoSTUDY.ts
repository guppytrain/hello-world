#######################
#  CORE / COMMON #
#######################

# common price and period inputs/defs
input priceX_type = { oc, close, hlc3, midbody, default vwap };

def averageType = AverageType.EXPONENTIAL;

def allowIntraDayTF = yes;
def timeFrame = AggregationPeriod.DAY;
def showOnlyToday = yes;

def curTimeFrame = GetAggregationPeriod();
def cur_period_close = Fundamental(fundamentalType = FundamentalType. VWAP, period = curTimeFrame);

def tf = if (allowIntraDayTF or curTimeFrame > timeFrame) then curTimeFrame else timeFrame;
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
case oc:
    priceXup = Min(opens, closes);
    priceXdown = Max(opens, closes);
case close:
    priceXup = closes;
    priceXdown = closes;
case hlc3:
    priceXup = hlc3s;
    priceXdown = hlc3s;
case midbody:
    priceXup = (opens + closes) / 2;
    priceXdown = (opens + closes) / 2;
case vwap:
    priceXup = vwaps;
    priceXdown = vwaps;
}

##############
## ATR BAND ##
##############

input trailType = { default modified, unmodified };

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

def applyVolRange = yes;

Assert(ATRFactorUpper > 0, "'atr factor upper' must be positive: " + ATRFactorUpper);
Assert(ATRFactorLower > 0, "'atr factor lower' must be positive: " + ATRFactorLower);

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

##########
# CUSTOM #
##########

def showMarks = yes;
def showLabel = yes;

##############
## PIVOTS   ##
##############

def pvtTF = if (curTimeFrame > AggregationPeriod.WEEK) then AggregationPeriod.MONTH else if (curTimeFrame < AggregationPeriod.WEEK) then AggregationPeriod.DAY else AggregationPeriod.WEEK;

def R3;
def R2;
def R1;
def PP;
def S1;
def S2;
def S3;

if showOnlyToday and !IsNaN(close(period = pvtTF)[-1])
then {
    R1 = Double.NaN;
    R2 = Double.NaN;
    R3 = Double.NaN;
    PP = Double.NaN;
    S1 = Double.NaN;
    S2 = Double.NaN;
    S3 = Double.NaN;
} else {
    PP = (high(period = pvtTF)[1] + low(period = pvtTF)[1] + close(period = pvtTF)[1]) / 3;
    R1 = 2 * PP - low(period = pvtTF)[1];
    R2 = PP + high(period = pvtTF)[1] - low(period = pvtTF)[1];
    R3 = R2 + high(period = pvtTF)[1] - low(period = pvtTF)[1];
    S1 = 2 * PP - high(period = pvtTF)[1];
    S2 = PP - high(period = pvtTF)[1] + low(period = pvtTF)[1];
    S3 = S2 - high(period = pvtTF)[1] + low(period = pvtTF)[1];
}

# value displays
def curEntryPrice = closes;
def curEntryProfitPrice = Round(curEntryPrice + upper);
def curEntryStopPrice = Round(curEntryPrice - lower);
def curpvtEntryProfitPrice = 
    if curEntryProfitPrice > R1 then 
        if curEntryProfitPrice > R2 then 
            if curEntryProfitPrice > R3 then curEntryProfitPrice else Round((curEntryProfitPrice + R3) / 2)
        else Round((curEntryProfitPrice + R2) / 2)
    else Round((curEntryProfitPrice + R1) / 2);
def curpvtEntryStopPrice = 
    if curEntryStopPrice < S1 then 
        if curEntryStopPrice < S2 then 
            if curEntryStopPrice < S3 then curEntryStopPrice else Round((curEntryStopPrice + S3) / 2)
        else Round((curEntryStopPrice + S2) / 2)
    else Round((curEntryStopPrice + S1) / 2);

def longEntryPrice = Round(closes - ((if useRetracePct then retracePct else ATRRetracePct) * range));
def longEntryProfitPrice = Round(longEntryPrice + upper);
def longEntryStopPrice = Round(longEntryPrice - lower);
def longpvtEntryPrice = if longEntryPrice > PP then Round((longEntryPrice + PP) / 2) else longEntryPrice;
#def longpvtEntryPrice = longEntryPrice;
def longpvtEntryProfitPrice = 
    if longEntryProfitPrice > R1 then 
        if longEntryProfitPrice > R2 then 
            if longEntryProfitPrice > R3 then longEntryProfitPrice else Round((longEntryProfitPrice + R3) / 2)
        else Round((longEntryProfitPrice + R2) / 2)
    else Round((longEntryProfitPrice + R1) / 2);
def longpvtEntryStopPrice = 
    if longEntryStopPrice < S1 then 
        if longEntryStopPrice < S2 then 
            if longEntryStopPrice < S3 then longEntryStopPrice else Round((longEntryStopPrice + S3) / 2)
        else Round((longEntryStopPrice + S2) / 2)
    else Round((longEntryStopPrice + S1) / 2);

def shortEntryPrice = Round(closes + ((if useRetracePct then retracePct else ATRRetracePct) * range));
def shortEntryProfitPrice = Round(shortEntryPrice - upper);
def shortEntryStopPrice = Round(shortEntryPrice + lower);
def shortpvtEntryPrice = if shortEntryPrice < PP then Round((shortEntryPrice + PP) / 2) else shortEntryPrice;
#def shortpvtEntryPrice = shortEntryPrice;
def shortpvtEntryProfitPrice = 
    if shortEntryProfitPrice < S1 then 
        if shortEntryProfitPrice < S2 then 
            if shortEntryProfitPrice < S3 then shortEntryProfitPrice else Round((shortEntryProfitPrice + S3) / 2)
        else Round((shortEntryProfitPrice + S2) / 2)
    else Round((shortEntryProfitPrice + S1) / 2);
def shortpvtEntryStopPrice = 
    if shortEntryStopPrice > R1 then 
        if shortEntryStopPrice > R2 then 
            if shortEntryStopPrice > R3 then shortEntryStopPrice else Round((shortEntryStopPrice + R3) / 2)
        else Round((shortEntryStopPrice + R2) / 2)
    else Round((shortEntryStopPrice + R1) / 2);

plot ValueBandsUpper;
plot ValueBandsLower;

plot EntryUpper;
plot EntryLower;

plot LongEntry;
plot LongEntryUpper;
plot LongEntryLower;

if showOnlyToday and !IsNaN(closes[-1])
then {
    ValueBandsUpper = Double.NaN;
    ValueBandsLower = Double.NaN;
    EntryUpper = Double.NaN;
    EntryLower = Double.NaN;
    LongEntry = Double.NaN;
    LongEntryUpper = Double.NaN;
    LongEntryLower = Double.NaN;
}
else {
    if !IsNaN(closes[-1])
    then {
        ValueBandsUpper = Double.NaN;
        ValueBandsLower = Double.NaN;
        EntryUpper = Double.NaN;
        EntryLower = Double.NaN;
        LongEntry = Double.NaN;
        LongEntryUpper = Double.NaN;
        LongEntryLower = Double.NaN;
    }
    else {
        ValueBandsUpper = if is_near_tf then Round(closes + band_width) else Double.NaN;
        ValueBandsLower = if is_near_tf then Round(closes - band_width) else Double.NaN;
        EntryUpper = curpvtEntryProfitPrice;
        EntryLower = curpvtEntryStopPrice;
        LongEntry = longpvtEntryPrice;
        LongEntryUpper = longpvtEntryProfitPrice;
        LongEntryLower = longpvtEntryStopPrice;
    }
}

ValueBandsUpper. SetPaintingStrategy(PaintingStrategy. HORIZONTAL);
ValueBandsLower. SetPaintingStrategy(PaintingStrategy. HORIZONTAL);

ValueBandsUpper. SetHiding(!showMarks);
ValueBandsLower. SetHiding(!showMarks);

ValueBandsUpper. SetDefaultColor(Color. LIGHT_GRAY);
ValueBandsLower. SetDefaultColor(Color. LIGHT_GRAY);

EntryUpper. SetPaintingStrategy(PaintingStrategy. HORIZONTAL);
EntryLower. SetPaintingStrategy(PaintingStrategy. HORIZONTAL);

LongEntry. SetPaintingStrategy(PaintingStrategy. HORIZONTAL);
LongEntryUpper. SetPaintingStrategy(PaintingStrategy. HORIZONTAL);
LongEntryLower. SetPaintingStrategy(PaintingStrategy. HORIZONTAL);

EntryUpper. SetHiding(!showMarks);
EntryLower. SetHiding(!showMarks);

LongEntry. SetHiding(!showMarks);
LongEntryUpper. SetHiding(!showMarks);
LongEntryLower. SetHiding(!showMarks);

EntryUpper. SetDefaultColor(Color. PINK);
EntryLower. SetDefaultColor(Color. PINK);

LongEntry. SetDefaultColor(Color. LIGHT_GRAY);
LongEntryUpper. SetDefaultColor(Color. ORANGE);
LongEntryLower. SetDefaultColor(Color. ORANGE);

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
