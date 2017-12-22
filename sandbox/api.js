const dotenv = require('dotenv').config()
const request = require('sync-request')
const dns = require('dns')
const tulind = require('tulind')
const twilio = require('twilio')

const cryptowatch = 'https://api.cryptowat.ch'

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_NUMBER

const twilioClient = new twilio(twilioAccountSid, twilioAuthToken)

module.exports = function(isAuthenticated) {
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

  api.data = {
    candles: function(pair, market, period) {
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
    assets: function() {
      var response = JSON.parse(request('GET', `${cryptowatch}/assets`).getBody('utf8'))
      return response.result.map(function (result) {
        return {
          fiat: result.fiat,
          name: result.name,
          symbol: result.symbol
        }
      })
    },
    asset: function(asset) {
    	var response = JSON.parse(request('GET', `${cryptowatch}/assets/${asset}`).getBody('utf8'))
    	return response.result.markets.base.map(function (result) {
        return {
          market: result.exchange,
          pair: result.pair
        }
      })
    },
    markets: function() {
      var response = JSON.parse(request('GET', `${cryptowatch}/markets`).getBody('utf8'))
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
    market: function(market) {
    	var response = JSON.parse(request('GET', `${cryptowatch}/markets/${market}`).getBody('utf8'))
    	return response.result.map(function (result) {
        return result.pair
      })
    },
    price: function(pair, market) {
    	var response = JSON.parse(request('GET', `${cryptowatch}/markets/${market}/${pair}/price`).getBody('utf8'))
    	return response.result.price
    }
  }
  
  return api  
}
