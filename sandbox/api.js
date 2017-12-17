const request = require("sync-request")
const logger = require("./logger")

const cryptowatch = "https://api.cryptowat.ch"

module.exports = {
  log: logger,
  getAsset: function(asset) {
  	console.log(`GETTING ASSET: ${asset}`)
  	return JSON.parse(request('GET', `${cryptowatch}/assets/${asset}`).getBody('utf8'))
  },
  getMarket: function(market) {
  	console.log(`GETTING MARKET: ${market}`)
  	return JSON.parse(request('GET', `${cryptowatch}/markets/${market}`).getBody('utf8')).result
  },
  getPrice: function(pair, market) {
  	console.log(`GETTING PRICE FOR: ${pair} AT ${market}`)
  	return JSON.parse(request('GET', `${cryptowatch}/markets/${market}/${pair}/price`).getBody('utf8')).result.price
  }
}