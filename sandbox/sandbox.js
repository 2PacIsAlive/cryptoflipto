const {NodeVM, VMScript} = require('vm2')
const api = require('./api')

module.exports = {
  execute: function (script, isAuthenticated, authentication) {
    const vm = new NodeVM()
    vm.freeze(api(isAuthenticated), 'api')
    const sandboxFunction = new VMScript(script)
    executor = vm.run(sandboxFunction)
    return {
      result: executor()
    }	
  },
  backtest: function (script) {
    const vm = new NodeVM()
    vm.freeze(api(false), 'api')
    const sandboxFunction = new VMScript(script)
    executor = vm.run(sandboxFunction)
    return {
      result: executor()
    }	
  }
}
