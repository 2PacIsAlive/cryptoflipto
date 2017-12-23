const tulind = require('tulind')

module.exports = {
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
