#######################
# CUSTOM INPUTS/DEFs #
#######################
input num_bars_fibs = 1;

# Color mapping
plot Colors = Double.NaN;

Colors. DefineColor("atrib_over", Color. PINK);
#Colors. DefineColor("atrib_turn", CreateColor(51, 102, 204)); # baby blue
Colors. DefineColor("atrib_turn", Color. CYAN);

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

input priceX_type = { vwap, close, hlc3, mid, oc, default hl };

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

def AtrPrice = vwaps;
def AtrAverageType = AverageType.WILDERS;

def HiLo = Min(highs - lows, 1.5 * Average(highs - lows, ATRPeriod));
def HRef = if lows <= highs[1]
    then highs - AtrPrice[1]
    else (highs - AtrPrice[1]) - 0.5 * (lows - highs[1]);
def LRef = if highs >= lows[1]
    then AtrPrice[1] - lows
    else (AtrPrice[1] - lows) - 0.5 * (lows[1] - highs);

def trueRange;

switch (trailType) {
case modified:
    trueRange = Max(HiLo, Max(HRef, LRef));
case unmodified:
    trueRange = TrueRange(highs, AtrPrice, lows);
}

def tr = if !IsNaN(trueRange) then trueRange else 0;

def range = MovingAverage(AtrAverageType, tr, ATRPeriod);

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
def AtrFibFactorInner = 1.382;
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

input apply_band_pad = 0;

def pad = (fibRange * 3.5);

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

def markPriceUp = vBandInnerUpper;
def markPriceDown = vBandInnerLower;

# overbot/sold
plot AtribOverBot = no
    or ((priceXup > markPriceUp) crosses above 0 within num_bars_fibs bars)
;

plot AtribOverSold = no
    or ((priceXdown < markPriceDown) crosses above 0 within num_bars_fibs bars)
;

AtribOverBot. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
AtribOverSold. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

AtribOverBot. SetDefaultColor(Colors. Color("atrib_over"));
AtribOverSold. SetDefaultColor(Colors. Color("atrib_over"));

# turn up/down
plot AtribTurnDown = no
    or ((priceXup < markPriceUp) crosses above 0 within num_bars_fibs bars)
;

plot AtribTurnUp = no
    or ((priceXdown > markPriceDown) crosses above 0 within num_bars_fibs bars)
;

AtribTurnDown. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
AtribTurnUp. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);

AtribTurnDown. SetDefaultColor(Colors. Color("atrib_turn"));
AtribTurnUp. SetDefaultColor(Colors. Color("atrib_turn"));

