const data = require('./data')
const mockdata = require('./mockdata')
const indicators = require('./indicators')
const overlays = require('./overlays')

module.exports = function(isAuthenticated, backtest) {
  var api = {}
  
  if (isAuthenticated) {
    api.notifier = {
      sendText(number, message) {
        twilioClient.messages.create({
          body: message,
          to: number, 
          from: twilioNumber
        })
      }
    }  
  }
  
  api.indicators = {
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
  
  api.overlays = {
    movingAverage: function(data, period, callback) {
      tulind.indicators.sma.indicator([data], [period], function(err, results) {
        callback(results[0])
      });
    },
    weightedMovingAverage: function(data, period, callback) {
      tulind.indicators.wma.indicator([data], [period], function(err, results) {
        callback(results[0])
      });
    },
    exponentialMovingAverage: function(data, period, callback) {
      tulind.indicators.ema.indicator([data], [period], function(err, results) {
        callback(results[0])
      })
    },
    volumeWeightedMovingAverage: function(close, volume, period, callback) {
      tulind.indicators.vwma.indicator([close, volume], [period], function(err, results) {
        callback(results[0])
      })
    },
    linearRegression: function(data, period, callback) {
      tulind.indicators.linreg.indicator([data], [period], function(err, results) {
        callback(results[0])
      })
    },
    bollingerBands: function(data, period, stddev, callback) {
      tulind.indicators.bbands.indicator([data], [period, stddev], function(err, results) {
        callback({
          lower: results[0],
          middle: results[1],
          upper: results[2]
        })
      })
    }
  }

  if (backtest) {
    api.data = mockdata
  } else {
    api.data = data
  }
  
  return api  
}
