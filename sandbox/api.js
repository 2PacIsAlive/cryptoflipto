const request = require("sync-request")
const dns = require("dns")
const tulind = require('tulind')
const logger = require("./logger")

const cryptowatch = "https://api.cryptowat.ch"

module.exports = {
  log: logger,
  _cpuTimeUsed: 0,
  indicators: {
    moneyFlowIndex: function(high, low, close, volume, period, callback) {
      tulind.indicators.mfi.indicator([high, low, close, volume], [period], function(err, results) {
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
  },
  overlays: {
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
  },
  getCandles: function(pair, market, period) {
    var response = JSON.parse(request('GET', `${cryptowatch}/markets/${market}/${pair}/ohlc\?periods=${period}`).getBody('utf8'))
    this._cpuTimeUsed += response.allowance.cost
    return response.result[period.toString()].map(function (result) {
      return {
        time : result[0], // close time
        open : result[1], 
        high : result[2], 
        low : result[3],
        close : result[4],
        volume : result[5]
      }
    })
  },
  getAssets: function() {
    var response = JSON.parse(request('GET', `${cryptowatch}/assets`).getBody('utf8'))
    this._cpuTimeUsed += response.allowance.cost
    return response.result.map(function (result) {
      return {
        fiat: result.fiat,
        name: result.name,
        symbol: result.symbol
      }
    })
  },
  getAsset: function(asset) {
  	var response = JSON.parse(request('GET', `${cryptowatch}/assets/${asset}`).getBody('utf8'))
  	this._cpuTimeUsed += response.allowance.cost
  	return response.result.markets.base.map(function (result) {
      return {
        market: result.exchange,
        pair: result.pair
      }
    })
  },
  getMarkets: function() {
    var response = JSON.parse(request('GET', `${cryptowatch}/markets`).getBody('utf8'))
    this._cpuTimeUsed += response.allowance.cost
    var marketPairs = response.result.map(function (result) {
      if (result.active) {
        return {
          market: result.market,
          pair: result.pair
        }
      }  
    })
    var markets = {}
    for (var marketPair in marketPairs) {
      markets[marketPair.market].push(marketPair.pair)
    }
    return markets
  },
  getMarket: function(market) {
  	var response = JSON.parse(request('GET', `${cryptowatch}/markets/${market}`).getBody('utf8'))
  	this._cpuTimeUsed += response.allowance.cost
  	return response.result.map(function (result) {
      return result.pair
    })
  },
  getPrice: function(pair, market) {
  	var response = JSON.parse(request('GET', `${cryptowatch}/markets/${market}/${pair}/price`).getBody('utf8'))
  	this._cpuTimeUsed += response.allowance.cost
  	return response.result.price
  }
}