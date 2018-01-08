#######################
# CUSTOM INPUTS/DEFs #
#######################
input num_bars_near_mid = 1;

# Color mapping
plot Colors = Double.NaN;

Colors. DefineColor("turn_up", CreateColor(158, 45, 143));
Colors. DefineColor("turn_down", CreateColor(158, 45, 143));

Colors. DefineColor("cross_up", CreateColor(242, 70, 218));
Colors. DefineColor("cross_down", CreateColor(242, 70, 218));

Colors. DefineColor("nears_turn_up", CreateColor(232, 156, 4));
Colors. DefineColor("nears_turn_down", CreateColor(232, 156, 4));

Colors. DefineColor("nears_cross_up", CreateColor(255, 225, 109));
Colors. DefineColor("nears_cross_down", CreateColor(255, 225, 109));

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

#def is_near_tf = if (curTimeFrame < timeFrame) then (cur_period_close == tf_close) else yes;

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

### basic defs, trends and snapshots
#def atrXval = range * 0.618;
#def isTall = (highs - lows) >= range * 0.618;
#def isLong = AbsValue(closes - opens) >= (highs - lows) * 0.764;
#def isThin = (BodyHeight() < (highs - lows) * 0.236);
#def isUpBlip = isTall and isThin and ((highs - Max(opens, closes)) < (highs - lows) * 0.236);
#def isDownBlip = isTall and isThin and ((highs - Max(opens, closes)) > (highs - lows) * 0.764);

def areMidsLinedUp = (vAtrBandMidNear > vAtrBandMid) and (vAtrBandMid > vAtrBandMidOuter);
def areMidsLinedDown = (vAtrBandMidNear < vAtrBandMid) and (vAtrBandMid < vAtrBandMidOuter);

def areNearsLinedUp = (vAtrBandMidNear > vAtrBandMid) and (priceXup - vAtrBandMidNear >= vol_range);
def areNearsLinedDown = (vAtrBandMidNear < vAtrBandMid) and (vAtrBandMidNear - priceXdown >= vol_range);

#def isPriceFalling = (priceXdown[1] > priceXdown);
#def isPriceRising = (priceXup[1] < priceXup);

### bands movement
def vUpRange1 = vAtrBandMidNear - vAtrBandMid;
def vUpRange2 = vAtrBandMid - vAtrBandMidOuter;
def vDownRange1 = vAtrBandMidOuter - vAtrBandMid;
def vDownRange2 = vAtrBandMid - vAtrBandMidNear;

def vUpPrice = priceXup - priceXup[1];
def vDownPrice = priceXdown[1] - priceXdown;

def isUpRangeFalling = (vUpRange1[1] > vUpRange1) and (vUpRange2[1] > vUpRange2);
def isDownRangeRising = (vDownRange1[1] > vDownRange1) and (vDownRange2[1] > vDownRange2);

def isUpNearsFalling = (vUpRange1[1] > vUpRange1) and (vUpPrice[1] > vUpPrice);
def isDownNearsRising = (vDownPrice[1] > vDownPrice) and (vDownRange2[1] > vDownRange2);

def isUpRangeRising = (vUpRange1[1] < vUpRange1) and (vUpRange2[1] < vUpRange2);
def isDownRangeFalling = (vDownRange1[1] < vDownRange1) and (vDownRange2[1] < vDownRange2);

def isUpNearsRising = (vUpRange1[1] < vUpRange1) and (vUpPrice[1] < vUpPrice);
def isDownNearsFalling = (vDownPrice[1] < vDownPrice) and (vDownRange2[1] < vDownRange2);

def areMidsFlaredUp = (areMidsLinedUp[1] and areMidsLinedUp) and (isUpRangeRising[1] and isUpRangeRising);
def areMidsFlaredDown = (areMidsLinedDown[1] and areMidsLinedDown) and (isDownRangeFalling[1] and isDownRangeFalling);

def areNearsFlaredUp = (areNearsLinedUp[1] and areNearsLinedUp) and (isUpNearsRising[1] and isUpNearsRising);
def areNearsFlaredDown = (areNearsLinedDown[1] and areNearsLinedDown) and (isDownNearsFalling[1] and isDownNearsFalling);

# down/up bands reversing
def areDownMidsRising = (areMidsFlaredDown[2] or areMidsFlaredDown[1]) and isDownRangeRising crosses above 0 within num_bars_near_mid bars;
def areUpMidsFalling = (areMidsFlaredUp[2] or areMidsFlaredUp[1]) and isUpRangeFalling crosses above 0 within num_bars_near_mid bars;

def areDownNearsRising = (areNearsFlaredDown[2] or areNearsFlaredDown[1]) and isDownNearsRising crosses above 0 within num_bars_near_mid bars;
def areUpNearsFalling = (areNearsFlaredUp[2] or areNearsFlaredUp[1]) and isUpNearsFalling crosses above 0 within num_bars_near_mid bars;

def areDownMidsCrossUp = (areMidsFlaredDown[2] or areMidsFlaredDown[1]) and (vAtrBandMidNear >= vAtrBandMid) crosses above 0 within num_bars_near_mid bars;
def areUpMidsCrossDown = (areMidsFlaredUp[2] or areMidsFlaredUp[1]) and (vAtrBandMidNear <= vAtrBandMid) crosses above 0 within num_bars_near_mid bars;

def areDownNearsCrossUp = (areNearsFlaredDown[2] or areNearsFlaredDown[1]) and (priceXup >= vAtrBandMidNear) crosses above 0 within num_bars_near_mid bars;
def areUpNearsCrossDown = (areNearsFlaredUp[2] or areNearsFlaredUp[1]) and (priceXdown <= vAtrBandMidNear) crosses above 0 within num_bars_near_mid bars;

### marks display
# mids turn up/down
def vDownMidsRising = no
    or areDownMidsRising;

def vUpMidsFalling = no
    or areUpMidsFalling;

plot DownMidsRising = vDownMidsRising;
plot UpMidsFalling = vUpMidsFalling;

DownMidsRising. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
DownMidsRising. SetDefaultColor(Colors. Color("turn_up"));
#DownMidsRising. Hide();

UpMidsFalling. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
UpMidsFalling. SetDefaultColor(Colors. Color("turn_down"));
#UpMidsFalling. Hide();

# mids cross up/down
def vDownMidsCrossUp = no
    or areDownMidsCrossUp;

def vUpMidsCrossDown = no
    or areUpMidsCrossDown;

plot DownMidsCrossUp = vDownMidsCrossUp;
plot UpMidsCrossDown = vUpMidsCrossDown;

DownMidsCrossUp. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
DownMidsCrossUp. SetDefaultColor(Colors. Color("cross_up"));
#DownMidsCrossUp. Hide();

UpMidsCrossDown. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
UpMidsCrossDown. SetDefaultColor(Colors. Color("cross_down"));
#DownMidsCrossDown. Hide();

# nears turn up/down
def vDownNearsRising = no
    or areDownNearsRising;

def vUpNearsFalling = no
    or areUpNearsFalling;

plot DownNearsRising = vDownNearsRising;
plot UpNearsFalling = vUpNearsFalling;

DownNearsRising. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
DownNearsRising. SetDefaultColor(Colors. Color("nears_turn_up"));
#DownNearsRising. Hide();

UpNearsFalling. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
UpNearsFalling. SetDefaultColor(Colors. Color("nears_turn_down"));
#UpNearsFalling. Hide();

# nears cross up/down
def vDownNearsCrossUp = no
    or areDownNearsCrossUp;

def vUpNearsCrossDown = no
    or areUpNearsCrossDown;

plot DownNearsCrossUp = vDownNearsCrossUp;
plot UpNearsCrossDown = vUpNearsCrossDown;

DownNearsCrossUp. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
DownNearsCrossUp. SetDefaultColor(Colors. Color("nears_cross_up"));
#DownNearsCrossUp. Hide();

UpNearsCrossDown. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
UpNearsCrossDown. SetDefaultColor(Colors. Color("nears_cross_down"));
#DownNearsCrossDown. Hide();

