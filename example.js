module.exports = function() {
  const capital = 100.00
  const prices = {
    ltcusd: {
      gdax: api.getPrice("ltcusd", "gdax")
    }, 
    btcusd: {
      gdax: api.getPrice("btcusd", "gdax")
    },
    ltcbtc: {
      kraken: api.getPrice("ltcbtc", "kraken")
    }
  }
  const ltcQty = capital / prices.ltcusd.gdax
  const btcQty = ltcQty * prices.ltcbtc.kraken
  const usdQty = btcQty * prices.btcusd.gdax 
  return {
    opportunity: {
      trades: [
        {
          pair: "ltcusd",
          side: "buy",
          exchange: "gdax",
          cost: capital,
          quantity: ltcQty,
          price: prices.ltcusd.gdax
        },{
          pair: "ltcbtc",
          side: "sell",
          exchange: "kraken",
          quantity: btcQty,
          cost: ltcQty,
          price: prices.ltcbtc.kraken
        }, {
          pair: "btcusd",
          side: "sell",
          exchange: "gdax",
          quantity: usdQty,
          cost: btcQty,
          price: prices.btcusd.gdax
        }
      ],  
      result: {
        asset: "usd",
        quantity: usdQty,
        profit: usdQty - capital,
        exchange: "gdax"
      }
    }
  }
}