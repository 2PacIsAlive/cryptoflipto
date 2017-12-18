const {NodeVM, VMScript} = require('vm2')
const api = require('./api')

module.exports = {
  execute: function (script) {
  	const vm = new NodeVM({
      sandbox: {
      	api: api
      }
    })
    const sandboxFunction = new VMScript(script)
    executor = vm.run(sandboxFunction)
    cpuTimeUsed = vm.run('module.exports = function() { return api._cpuTimeUsed }')()
    return {
      result: executor(),
      cpuTimeUsed: cpuTimeUsed
    }	
  }
}
