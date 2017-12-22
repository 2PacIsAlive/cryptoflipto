const {NodeVM, VMScript} = require('vm2')
const api = require('./api')
const auth = require('./auth')

module.exports = {
  execute: function (script, isAuthenticated) {
  	const vm = new NodeVM()
    vm.freeze(api(isAuthenticated), 'api')
    const sandboxFunction = new VMScript(script)
    executor = vm.run(sandboxFunction)
    cpuTimeUsed = vm.run('module.exports = function() { return api._cpuTimeUsed }')()
    return {
      result: executor(),
      cpuTimeUsed: cpuTimeUsed
    }	
  }
}
