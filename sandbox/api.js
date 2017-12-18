const request = require("sync-request")
const logger = require("./logger")

const cryptowatch = "https://api.cryptowat.ch"

module.exports = {
  log: logger,
  _cpuTimeUsed: 0,
  getAsset: function(asset) {
  	console.log(`GETTING ASSET: ${asset}`)
  	var response = JSON.parse(request('GET', `${cryptowatch}/assets/${asset}`).getBody('utf8'))
  	this._cpuTimeUsed += response.allowance.cost
  	return response.result
  },
  getMarket: function(market) {
  	console.log(`GETTING MARKET: ${market}`)
  	var response = JSON.parse(request('GET', `${cryptowatch}/markets/${market}`).getBody('utf8'))
  	this._cpuTimeUsed += response.allowance.cost
  	return response.result
  },
  getPrice: function(pair, market) {
  	console.log(`GETTING PRICE FOR: ${pair} AT ${market}`)
  	var response = JSON.parse(request('GET', `${cryptowatch}/markets/${market}/${pair}/price`).getBody('utf8'))
  	this._cpuTimeUsed += response.allowance.cost
  	return response.result.price
  }
}