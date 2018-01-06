#######################
# CUSTOM INPUTS/DEFs #
#######################
input num_bars_near_mid = 1;

# Color mapping
plot Colors = Double.NaN;

Colors. DefineColor("over_sold", Color. PINK);
Colors. DefineColor("over_bot", Color. PINK);

Colors. DefineColor("turn_up", Color. CYAN);
Colors. DefineColor("turn_down", Color. CYAN);

Colors. DefineColor("rsi_rally", Color. BLUE);
Colors. DefineColor("rsi_retreat", Color. BLUE);

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
## RSI ##
##############
#def num_bars_rsi_cross = 1;
def rsi_over_sold = 30;
def rsi_over_bot = 70;
def rsi_price = vwaps;

def rsi_length = 14;
def rsi_ave_length = 9;

def NetChgAvg = MovingAverage(AverageType.EXPONENTIAL, rsi_price - rsi_price[1], rsi_length);
def TotChgAvg = MovingAverage(AverageType.EXPONENTIAL, AbsValue(rsi_price - rsi_price[1]), rsi_length);
def ChgRatio = if TotChgAvg != 0 then NetChgAvg / TotChgAvg else 0;

def RSI = 50 * (ChgRatio + 1);
def RSIAvg = Average(RSI, rsi_ave_length);

# over sold/bot
def isRSIOverSold;
def isRSIOverBot;

# rsi
if (RSI < rsi_over_sold or RSIAvg < rsi_over_sold) {
    isRSIOverSold = yes;
    isRSIOverBot = no;
}
else if (RSI > rsi_over_bot or RSIAvg > rsi_over_bot) {
    isRSIOverSold = no;
    isRSIOverBot = yes;
} else {
    isRSIOverSold = no;
    isRSIOverBot = no;
}

# crosses over sold/bot
def isRSIBreakdown;
def isRSIBreakout;

# rsi
if ((RSI crosses below rsi_over_sold or RSIAvg crosses below rsi_over_sold)) {
    isRSIBreakdown = yes;
    isRSIBreakout = no;
}
else if ((RSI crosses above rsi_over_bot or RSIAvg crosses above rsi_over_bot)) {
    isRSIBreakdown = no;
    isRSIBreakout = yes;
} else {
    isRSIBreakdown = no;
    isRSIBreakout = no;
}

# crosses rsi avg
def isRSIRally;
def isRSIRetreat;

# rsi
if (RSI[2] < rsi_over_sold or RSI[1] < rsi_over_sold or RSIAvg[2] < rsi_over_sold or RSIAvg[1] < rsi_over_sold) and (RSI crosses above rsi_over_sold or RSIAvg crosses above rsi_over_sold) {
    isRSIRally = yes;
    isRSIRetreat = no;
}
else if (RSI[2] > rsi_over_bot or RSI[1] > rsi_over_bot or RSIAvg[2] > rsi_over_bot or RSIAvg[1] > rsi_over_bot) and (RSI crosses below rsi_over_bot or RSIAvg crosses below rsi_over_bot) {
    isRSIRally = no;
    isRSIRetreat = yes;
} else {
    isRSIRally = no;
    isRSIRetreat = no;
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
def ATRFactorVol = 1.0;
def ATREntryRetracePct = 0.382;
def ATRRetracePct = 0.618;
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

def band_width = Round(ATRFactorBand * range);
def upper = Round(ATRFactorUpper * range);
def lower = Round(ATRFactorLower * range);

def applyVolRange = yes;
def default_vol = 0.236;
def volty = Min(if !IsNaN(imp_volatility(period = tf)) then imp_volatility(period = tf) else default_vol, 1.00);
def vol_range = Round(range * (if applyVolRange then volty else 0));

def bandUpper;
def bandLower;
def nearUpper;
def nearLower;

if (!IsNaN(range)) {
    bandUpper =  closes + band_width;
    bandLower = closes - band_width;
    nearUpper =  bandUpper - ((ATRFactorVol * range) - vol_range);
    nearLower = bandLower + ((ATRFactorVol * range) - vol_range);
} else {
    bandUpper = Double.NaN;
    bandLower = Double.NaN;
    nearUpper = Double.NaN;
    nearLower = Double.NaN;
}

# atr channel/bands values
def vAtrBandUpper = MovingAverage(averageType, bandUpper, ATRBandPeriod);
def vAtrBandLower = MovingAverage(averageType, bandLower, ATRBandPeriod);
def vAtrBandMidOuter = Round((vAtrBandUpper + vAtrBandLower) / 2);

def vAtrBandMid = MovingAverage(averageType, Round((bandUpper + bandLower) / 2), ATRBandPeriodMid);

def vAtrBandUpperNear = MovingAverage(averageType, Round(bandUpper - ((ATRFactorVol * range) - vol_range)), ATRBandPeriodNear);
def vAtrBandLowerNear = MovingAverage(averageType, Round(bandLower + ((ATRFactorVol * range) - vol_range)), ATRBandPeriodNear);
def vAtrBandMidNear = Round((vAtrBandUpperNear + vAtrBandLowerNear) / 2);

#################
# Marks Display #
#################

# shared defs
def areMidsLinedUp = (vAtrBandMidNear > vAtrBandMid) and (vAtrBandMid > vAtrBandMidOuter);
def areMidsLinedDown = (vAtrBandMidNear < vAtrBandMid) and (vAtrBandMid < vAtrBandMidOuter);

def areNearsLinedUp = (vAtrBandMidNear > vAtrBandMid) and (priceXup - vAtrBandMidNear >= vol_range);
def areNearsLinedDown = (vAtrBandMidNear < vAtrBandMid) and (vAtrBandMidNear - priceXdown >= vol_range);

def isPriceFalling = (priceXdown[1] > priceXdown);
def isPriceRising = (priceXup[1] < priceXup);

# oversold/bot
#def atrXval = range + vol_range;
def atrXval = range;
#def atrXval = vol_range;

def vOverSold = no
    or ((isRSIOverSold or isRSIBreakdown or areMidsLinedDown or areNearsLinedDown) and (((vAtrBandMidNear - lows >= atrXval) or (vAtrBandMidNear - highs >= vol_range)) crosses above 0 within num_bars_near_mid bars))
#    or ((isRSIOverSold or isRSIBreakdown or areMidsLinedDown or areNearsLinedDown) and ((vAtrBandMidNear - lows >= atrXval) or (vAtrBandMidNear - highs >= vol_range)))
;

def vOverBot = no 
    or ((isRSIOverBot or isRSIBreakout or areMidsLinedUp or areNearsLinedUp) and (((highs - vAtrBandMidNear >= atrXval) or (lows - vAtrBandMidNear >= vol_range)) crosses above 0  within num_bars_near_mid bars))
#    or ((isRSIOverBot or isRSIBreakout or areMidsLinedUp or areNearsLinedUp) and ((highs - vAtrBandMidNear >= atrXval) or (lows - vAtrBandMidNear >= vol_range)))
;

plot OverSold = vOverSold;
plot OverBot = vOverBot;

OverSold. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
OverSold. SetDefaultColor(Colors. Color("over_sold"));

OverBot. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
OverBot. SetDefaultColor(Colors. Color("over_bot"));

def vSuperSold = no
    or ((vOverSold or ((isRSIOverSold or isRSIBreakdown or areMidsLinedDown or areNearsLinedDown) and ((vAtrBandMidNear - lows >= atrXval) or (vAtrBandMidNear - highs >= vol_range)))) and isPriceFalling)
;

def vSuperBot = no 
    or ((vOverBot or ((isRSIOverBot or isRSIBreakout or areMidsLinedUp or areNearsLinedUp) and ((highs - vAtrBandMidNear >= atrXval) or (lows - vAtrBandMidNear >= vol_range)))) and isPriceRising)
;

plot SuperTurnUp = (vSuperSold[2] or vSuperSold[1]) and (isPriceRising crosses above 0 within num_bars_near_mid bars);
plot SuperTurnDown = (vSuperBot[2] or vSuperBot[1]) and (isPriceFalling crosses above 0 within num_bars_near_mid bars);

SuperTurnUp. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
SuperTurnUp. SetDefaultColor(Colors. Color("turn_up"));

SuperTurnDown. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
SuperTurnDown. SetDefaultColor(Colors. Color("turn_down"));

# rsi atr rally / retreat
plot RSIMidRally = ((isRSIRally or isRSIRally[1] or isRSIRally[2]) and isPriceRising crosses above 0 within num_bars_near_mid bars);
plot RSIMidRetreat = ((isRSIRetreat or isRSIRetreat[1] or isRSIRetreat[2]) and isPriceFalling crosses above 0 within num_bars_near_mid bars);

RSIMidRally. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
RSIMidRally. SetDefaultColor(Colors. Color("rsi_rally"));

RSIMidRetreat. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
RSIMidRetreat. SetDefaultColor(Colors. Color("rsi_retreat"));

