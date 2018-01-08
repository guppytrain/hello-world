#######################
# CUSTOM INPUTS/DEFs #
#######################
input num_bars_near_mid = 1;

input showOuters = 0;
input showMids = 0;

input showMidOuter = 0;
input showMid = 0;
input showMidNear = 1;

# Color mapping
plot Colors = Double.NaN;

Colors. DefineColor("upper", Color. WHITE);
Colors. DefineColor("lower", Color. WHITE);

Colors. DefineColor("near_upper", Color. CYAN);
Colors. DefineColor("near_lower", Color. CYAN);

Colors. DefineColor("mid_outer", Color. LIGHT_GRAY);
Colors. DefineColor("mid", CreateColor(51, 102, 204));
Colors. DefineColor("mid_near", Color. CYAN);

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

def band_width = Round(ATRFactorBand * range);
def upper = Round(ATRFactorUpper * range);
def lower = Round(ATRFactorLower * range);

def applyVolRange = yes;
def default_vol = 0.236;
def volty = Min(if !IsNaN(imp_volatility(period = tf)) then imp_volatility(period = tf) else default_vol, 1.00);
def vol_range = Round(range * (if applyVolRange then volty else 0));

def bandUpper =  closes + band_width;
def bandLower = closes - band_width;
def nearUpper =  bandUpper - ((ATRFactorVol * range) - vol_range);
def nearLower = bandLower + ((ATRFactorVol * range) - vol_range);

# atr channel/bands values
def vAtrBandUpper = MovingAverage(averageType, bandUpper, ATRBandPeriod);
def vAtrBandLower = MovingAverage(averageType, bandLower, ATRBandPeriod);
def vAtrBandMidOuter = Round((vAtrBandUpper + vAtrBandLower) / 2);

def vAtrBandMid = MovingAverage(averageType, Round((bandUpper + bandLower) / 2), ATRBandPeriodMid);

def vAtrBandUpperNear = MovingAverage(averageType, Round(bandUpper - ((ATRFactorVol * range) - vol_range)), ATRBandPeriodNear);
def vAtrBandLowerNear = MovingAverage(averageType, Round(bandLower + ((ATRFactorVol * range) - vol_range)), ATRBandPeriodNear);
def vAtrBandMidNear = Round((vAtrBandUpperNear + vAtrBandLowerNear) / 2);

##########
# CUSTOM #
##########
# outer/near band plots
plot AtrBandUpper = if showOuters then vAtrBandUpper else Double.NaN;
plot AtrBandLower = if showOuters then vAtrBandLower else Double.NaN;

plot AtrBandNearUpper = if showOuters then vAtrBandUpperNear else Double.NaN;
plot AtrBandNearLower = if showOuters then vAtrBandLowerNear else Double.NaN;

AtrBandUpper. SetDefaultColor(Colors. Color("upper"));
AtrBandLower. SetDefaultColor(Colors. Color("lower"));

AtrBandNearUpper. SetDefaultColor(Colors. Color("near_upper"));
AtrBandNearLower. SetDefaultColor(Colors. Color("near_lower"));

plot AtrBandMidOuter = if (showMids or showMidOuter) then vAtrBandMidOuter else Double.NaN;
plot AtrBandMid = if (showMids or showMid) then vAtrBandMid else Double.NaN;
plot AtrBandMidNear = if (showMids or showMidNear) then vAtrBandMidNear else Double.NaN;

AtrBandMidOuter. SetDefaultColor(Colors. Color("mid_outer"));
AtrBandMid. SetDefaultColor(Colors. Color("mid"));
AtrBandMidNear. SetDefaultColor(Colors. Color("mid_near"));

