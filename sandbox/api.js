const data = require('./data')
const mockdata = require('./mockdata')
const notifier = require('./notifier')
const indicators = require('./indicators')
const overlays = require('./overlays')

module.exports = function(isAuthenticated, backtest) {
  var api = {}
  
  if (isAuthenticated) {
    api.notifier = notifier
  }
  
  api.indicators = indicators
  
  api.overlays = overlays 

  if (backtest) {
    api.data = mockdata
  } else {
    api.data = data
  }
  
  return api  
}
