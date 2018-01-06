##############
## AVERAGES ##
##############

# Custom Color holder hack
plot Colors = Double.NaN;

Colors. DefineColor("avg_cur", Color. MAGENTA);
Colors. DefineColor("avg_base", Color. GRAY);
Colors. DefineColor("avg_rising", Color. GREEN);
Colors. DefineColor("avg_declining", Color. RED);
Colors. DefineColor("avg_cur_cross_up", Color. LIGHT_GRAY);
Colors. DefineColor("avg_cur_cross_down", Color. LIGHT_GRAY);

# HI PRIORITY INPUTS
input price_type = FundamentalType. VWAP;
input use_price_type = 1;

#input num_bars_avg_dir = 1;
input num_bars_avg_cross = 1;

input avgDirPeriod = 26;

input showAvgBase = 1;
input showMarks = 0;

def up_price = if use_price_type then Fundamental(price_type) else Max(open, close);
def down_price = if use_price_type then Fundamental(price_type) else Min(open, close);

# AVERAGES
script DoubleAvg {
    input price_type = FundamentalType. VWAP;
    input averageType = AverageType.EXPONENTIAL;
    input sym = "default";
    input avgLength = 9;

    input allowIntraDayTF = no;
    input timeFrame = AggregationPeriod.DAY;

    def curTimeFrame = GetAggregationPeriod();
    def tf = if (allowIntraDayTF or curTimeFrame > timeFrame) then curTimeFrame else timeFrame;

    def price = Fundamental(price_type, if sym == "default" then GetSymbol() else sym, period = tf);

    def numAvgs = 4;
    def avgLength1 = 20;
    def avgLength2 = 50;
    def avgLength3 = 100;
    def avgLength4 = 200;

    def avg1 = MovingAverage(averageType, price, avgLength1);
    def avg2 = MovingAverage(averageType, price, avgLength2);
    def avg3 = MovingAverage(averageType, price, avgLength3);
    def avg4 = MovingAverage(averageType, price, avgLength4);

    plot avg = MovingAverage(averageType, ((avg1 * 1) + (avg2 * 1) + (avg3 * 1) + (avg4 * 1)) / numAvgs, avgLength);

}

plot avg_base = if (GetAggregationPeriod() < AggregationPeriod.DAY and showAvgBase) then DoubleAvg(price_type = FundamentalType. VWAP, averageType = AverageType.EXPONENTIAL, allowIntraDayTF = no)."avg" else Double.NaN;

avg_base. SetDefaultColor(Colors. Color("avg_base"));
avg_base. SetLineWeight(3);

plot avg_cur = DoubleAvg(price_type = FundamentalType. VWAP, averageType = AverageType.EXPONENTIAL, allowIntraDayTF = yes)."avg";

avg_cur. SetDefaultColor(Colors. Color("avg_cur"));
avg_cur. SetLineWeight(3);

def avgRising = IsDescending(avg_cur, avgDirPeriod);
def avgDeclining = IsAscending(avg_cur, avgDirPeriod);

avg_cur. AssignValueColor(if avgRising then Colors. Color("avg_rising") else if avgDeclining then Colors. Color("avg_declining") else Colors. Color("avg_cur"));

#def avgRisingX = avgRising crosses above 0 within num_bars_avg_dir bars;
#def avgDecliningX = avgDeclining crosses above 0 within num_bars_avg_dir bars;

# marks display
plot PriceXAvgUp = if showMarks then
    if !IsNaN(close[-1]) then
        (up_price crosses above avg_cur)
    else
        (up_price crosses above avg_cur within num_bars_avg_cross bars)
    else
        Double.NaN
;

plot PriceXAvgDown = if showMarks then
    if !IsNaN(close[-1]) then
        (down_price crosses below avg_cur)
    else
        (down_price crosses below avg_cur within num_bars_avg_cross bars)
    else
        Double.NaN
;

PriceXAvgUp. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_UP);
PriceXAvgUp. SetDefaultColor(Colors. Color("avg_cur_cross_up"));
PriceXAvgUp. SetLineWeight(1);

PriceXAvgDown. SetPaintingStrategy(PaintingStrategy.BOOLEAN_ARROW_DOWN);
PriceXAvgDown. SetDefaultColor(Colors. Color("avg_cur_cross_down"));
PriceXAvgDown. SetLineWeight(1);
