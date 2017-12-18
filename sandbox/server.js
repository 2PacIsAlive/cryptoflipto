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
  	var result = sandbox.execute(req.body.script)
  } catch (e) {
  	var result = e.message
  }
  res.json(result)
})

app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)
