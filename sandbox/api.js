const request = require("sync-request")
const logger = require("./logger")

const cryptowatch = "https://api.cryptowat.ch"

module.exports = {
  log: logger,
  _cpuTimeUsed: 0,
  getAssets: function() {
    console.log('GETTING ASSETS')
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
  	console.log(`GETTING ASSET: ${asset}`)
  	var response = JSON.parse(request('GET', `${cryptowatch}/assets/${asset}`).getBody('utf8'))
  	this._cpuTimeUsed += response.allowance.cost
  	return response.result.markets.base.map(function (result) {
      return {
        market: result.exchange,
        pair: result.pair
      }
    })
  },
  getMarkets: function(): {
    console.log('GETTING MARKETS')
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
  	console.log(`GETTING MARKET: ${market}`)
  	var response = JSON.parse(request('GET', `${cryptowatch}/markets/${market}`).getBody('utf8'))
  	this._cpuTimeUsed += response.allowance.cost
  	return response.result.map(function (result) {
      return result.pair
    })
  },
  getPrice: function(pair, market) {
  	console.log(`GETTING PRICE FOR: ${pair} AT ${market}`)
  	var response = JSON.parse(request('GET', `${cryptowatch}/markets/${market}/${pair}/price`).getBody('utf8'))
  	this._cpuTimeUsed += response.allowance.cost
  	return response.result.price
  }
}