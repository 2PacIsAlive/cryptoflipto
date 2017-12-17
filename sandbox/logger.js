module.exports = {
  info: function (message) {
    this._log(message, 'INFO')
  },
  debug: function (message) {
  	this._log(message, 'DEBUG')
  },
  warn: function (message) {
  	this._log(message, 'WARN')
  },
  error: function (message) {
  	this._log(messsage, 'ERROR')
  },
  _log: function (message, level) {
  	this._logs.push(`[${level}] ${message}`)
  },
  _logs: []
}