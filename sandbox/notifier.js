const dotenv = require('dotenv').config()
const twilio = require('twilio')

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN
const twilioNumber = process.env.TWILIO_NUMBER
const twilioClient = new twilio(twilioAccountSid, twilioAuthToken)

module.exports =  {
  sendText(number, message) {
    twilioClient.messages.create({
      body: message,
      to: number, 
      from: twilioNumber
    })
  }
} 
