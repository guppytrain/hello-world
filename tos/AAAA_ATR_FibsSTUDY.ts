#######################
# CUSTOM INPUTS/DEFs #
#######################
#input num_bars_near_mid = 1;

input showBands = 1;

# Color mapping
plot Colors = Double.NaN;

Colors. DefineColor("super", Color. RED);
Colors. DefineColor("outer", Color. LIGHT_RED);
Colors. DefineColor("inner", Color. PINK);
Colors. DefineColor("near", Color. LIME);
Colors. DefineColor("golden", Color. YELLOW);
Colors. DefineColor("mid", Color. LIGHT_GRAY);
Colors. DefineColor("short", Color. GRAY);

#######################
#  CORE / COMMON #
#######################

# common price and period inputs/defs
def averageType = AverageType.EXPONENTIAL;

input useTF = no;
input timeFrame = AggregationPeriod.DAY;
def showOnlyToday = yes;

# CHANGE
def curTimeFrame = GetAggregationPeriod();
def cur_period_close = Fundamental(fundamentalType = FundamentalType. VWAP, period = curTimeFrame);

def tf = if (useTF and timeFrame >= curTimeFrame) then timeFrame else curTimeFrame;
def tf_close = Fundamental(fundamentalType = FundamentalType. VWAP, period = tf);

def highs = high(period = tf);
def lows = low(period = tf);
def opens = open(period = tf);
def closes = close(period = tf);
def hlc3s = hlc3(period = tf);
def vwaps = vwap(period = tf);

input priceX_type = { default vwap, close, hlc3, mid, oc, hl };

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

###################
## ATR FIB BANDS ##
###################

# atr stuff
input trailType = { default modified, unmodified };

input ATRPeriod = 21;

def AtrAverageType = AverageType.WILDERS;

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

def applyVolRange = yes;
def default_vol = 0.236;
def volty = Min(if !IsNaN(imp_volatility(period = tf)) then imp_volatility(period = tf) else default_vol, 1.00);
def vol_range = Round(range * (if applyVolRange then volty else 0));

# fib const
def ATRFibPeriodSuper = 34;
def ATRFibPeriodOuter = 26;
def ATRFibPeriodInner = 20;
def ATRFibPeriodNear = 13;
def ATRFibPeriodGolden = 8;
def ATRFibPeriodMid = 5;
def ATRFibPeriodShort = 3;

def AtrFibFactorSuper = 1.786;
def AtrFibFactorOuter = 1.618;
def AtrFibFactorInner = 1.272;
def AtrFibFactorNear = 1.000;
def AtrFibFactorGolden = 0.618;
def AtrFibFactorMid = 0.500;
def AtrFibFactorShort = 0.382;

# fib calcs
def fibRange = if !IsNaN(range) then (range + vol_range) else 0;

def super = Round(AtrFibFactorSuper * fibRange);
def outer = Round(AtrFibFactorOuter * fibRange);
def inner = Round(AtrFibFactorInner * fibRange);
def near = Round(AtrFibFactorNear * fibRange);
def golden = Round(AtrFibFactorGolden * fibRange);
def mid = Round(AtrFibFactorMid * fibRange);
def short = Round(AtrFibFactorShort * fibRange);

def apply_band_pad = 1;

def height = Round(highs - lows);
#def pad = height + (fibRange * 2);
#def pad = height + (fibRange * 1);
def pad = (range + fibRange);

def bandPad = if apply_band_pad 
    then 
        pad
    else 
        0
;

def fibPrice = vwaps;

# atr channel/bands values
def vBandSuperUpper = MovingAverage(averageType, fibPrice + super + bandPad, ATRFibPeriodSuper);
def vBandSuperLower = MovingAverage(averageType, fibPrice - super - bandPad, ATRFibPeriodSuper);

def vBandOuterUpper = MovingAverage(averageType, fibPrice + outer + bandPad, ATRFibPeriodOuter);
def vBandOuterLower = MovingAverage(averageType, fibPrice - outer - bandPad, ATRFibPeriodOuter);

def vBandInnerUpper = MovingAverage(averageType, fibPrice + inner + bandPad, ATRFibPeriodInner);
def vBandInnerLower = MovingAverage(averageType, fibPrice - inner - bandPad, ATRFibPeriodInner);

def vBandNearUpper = MovingAverage(averageType, fibPrice + near + bandPad, ATRFibPeriodNear);
def vBandNearLower = MovingAverage(averageType, fibPrice - near - bandPad, ATRFibPeriodNear);

def vBandGoldenUpper = MovingAverage(averageType, fibPrice + golden + bandPad, ATRFibPeriodGolden);
def vBandGoldenLower = MovingAverage(averageType, fibPrice - golden - bandPad, ATRFibPeriodGolden);

def vBandMidUpper = MovingAverage(averageType, fibPrice + mid + bandPad, ATRFibPeriodMid);
def vBandMidLower = MovingAverage(averageType, fibPrice - mid - bandPad, ATRFibPeriodMid);

def vBandShortUpper = MovingAverage(averageType, fibPrice + short + bandPad, ATRFibPeriodShort);
def vBandShortLower = MovingAverage(averageType, fibPrice - short - bandPad, ATRFibPeriodShort);

##########
# CUSTOM #
##########

# atr fib band plots
plot BandSuperUpper = if showBands then vBandSuperUpper else Double.NaN;
plot BandSuperLower = if showBands then vBandSuperLower else Double.NaN;

plot BandOuterUpper = if showBands then vBandOuterUpper else Double.NaN;
plot BandOuterLower = if showBands then vBandOuterLower else Double.NaN;

plot BandInnerUpper = if showBands then vBandInnerUpper else Double.NaN;
plot BandInnerLower = if showBands then vBandInnerLower else Double.NaN;

plot BandNearUpper = if showBands then vBandNearUpper else Double.NaN;
plot BandNearLower = if showBands then vBandNearLower else Double.NaN;

plot BandGoldenUpper = if showBands then vBandGoldenUpper else Double.NaN;
plot BandGoldenLower = if showBands then vBandGoldenLower else Double.NaN;

plot BandMidUpper = if showBands then vBandMidUpper else Double.NaN;
plot BandMidLower = if showBands then vBandMidLower else Double.NaN;

plot BandShortUpper = if showBands then vBandShortUpper else Double.NaN;
plot BandShortLower = if showBands then vBandShortLower else Double.NaN;

BandSuperUpper. SetDefaultColor(Colors. Color("super"));
BandSuperLower. SetDefaultColor(Colors. Color("super"));

BandOuterUpper. SetDefaultColor(Colors. Color("outer"));
BandOuterLower. SetDefaultColor(Colors. Color("outer"));

BandInnerUpper. SetDefaultColor(Colors. Color("inner"));
BandInnerLower. SetDefaultColor(Colors. Color("inner"));

BandNearUpper. SetDefaultColor(Colors. Color("near"));
BandNearLower. SetDefaultColor(Colors. Color("near"));

BandGoldenUpper. SetDefaultColor(Colors. Color("golden"));
BandGoldenLower. SetDefaultColor(Colors. Color("golden"));

BandMidUpper. SetDefaultColor(Colors. Color("mid"));
BandMidLower. SetDefaultColor(Colors. Color("mid"));

BandShortUpper. SetDefaultColor(Colors. Color("short"));
BandShortLower. SetDefaultColor(Colors. Color("short"));

