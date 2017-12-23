const tulind = require('tulind')

module.exports = {
    moneyFlowIndex: function(candles, period, callback) {
      tulind.indicators.mfi.indicator([ 
          candles.map(function(candle) { return candle.high }),
          candles.map(function(candle) { return candle.low }),
          candles.map(function(candle) { return candle.close }),
          candles.map(function(candle) { return candle.volume })
        ], [period], function(err, results) {
        // above 80 = overbought, below 20 = oversold
        // use 14 day period
        callback(results[0])
      })
    },
    trix: function(data, period, callback) {
      tulind.indicators.trix.indicator([data], [period], function(err, results) {
        callback(results[0])
      })
    },
    macd: function(data, shortPeriod, longPeriod, signalPeriod, callback) {
      tulind.indicators.macd.indicator([data], [shortPeriod, longPeriod, signalPeriod], function(err, results) {
        callback({
          macd: results[0],
          macd_signal: results[1],
          macd_histogram: results[2]
        })
      })
    },
    volatility: function(data, period, callback) {
      tulind.indicators.volatility.indicator([data], [period], function(err, results) {
        callback(results[0])
      })
    },
    momentum: function(data, period, callback) {
      tulind.indicators.mom.indicator([data], [period], function(err, results) {
        callback(results[0])
      })
    },
    relativeStrengthIndex: function(data, period, callback) {
      tulind.indicators.rsi.indicator([data], [period], function(err, results) {
        callback(results[0])
      })
    }
} 
