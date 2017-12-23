'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')
const sandbox = require('./sandbox')

const PORT = 8080
const HOST = '0.0.0.0'

const app = express()

app.use(bodyParser.json())
app.use(helmet())
app.use(cors())
app.disable('x-powered-by')

app.post('/script', (req, res) => {
  try {
  	var execution = sandbox.execute(req.body.script, req.body.authenticated, req.body.authentication)
  	var result = execution.result
  	var cpuTimeUsed = execution.cpuTimeUsed
  } catch (e) {
  	var result = e.message
  	var cpuTimeUsed = 0
  }
  var response = {
    result: result,
    cpuTimeUsed: cpuTimeUsed
  }
  console.log(response)
  res.json(response)
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
