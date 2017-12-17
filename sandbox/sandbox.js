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
    return executor()
  }
}