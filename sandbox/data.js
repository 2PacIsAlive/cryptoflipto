const request = require('sync-request')

const cryptowatch = 'https://api.cryptowat.ch'

module.exports = {
    candles: function(pair, market, period) {
      var response = JSON.parse(request('GET', `${cryptowatch}/markets/${market}/${pair}/ohlc\?periods=${period}`).getBody('utf8'))
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
      return response.result
        .filter(function (result) {
          return result.active    
        }).reduce(function(markets, marketPair) {
          if (markets[marketPair.market]) {
            markets[marketPair.market].push(marketPair.pair)
          } else {
            markets[marketPair.market] = [marketPair.pair]
          }
          return markets
        })
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
