// Copyright 2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License')
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict'

// Import the Dialogflow module from the Actions on Google client library.
const {dialogflow, Table, SignIn} = require('actions-on-google')

// Import Custome Helpers
const {createRows , tableLog} = require('./lib/richResponses')


// Import the firebase-functions package for deployment.
const functions = require('firebase-functions')

// Instantiate the Dialogflow client.
const app = dialogflow({
    debug: true,
    clientId: '975660232612-vjvdcsqpkrutaegemvc0vsait4rd1l3p.apps.googleusercontent.com'
})

// Handle the Dialogflow intent named 'Default Welcome Intent'.
app.intent('Default Welcome Intent', (conv) => {
    conv.ask(new SignIn('To get your account details'))
})

// Create a Dialogflow intent with the `actions_intent_SIGN_IN` event
app.intent('Get Signin', (conv, params, signin) => {
    if (signin.status === 'OK') {
      
      const payload = conv.user.profile.payload
      const log = tableLog(payload)

      conv.ask(`here ready to help you master  ${payload.name} what is  your favorite Color ? `)
      conv.ask(`your account details.`)
      conv.ask(log)   
    } else {
      conv.ask(`I won't be able to save your data, but what do you want to do next?`)
    }
  })



// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('favorite color', (conv, {color}) => {
    const luckyNumber = color.length
    // Respond with the user's lucky number and end the conversation.
    conv.ask('Your lucky number is ' + luckyNumber)
    conv.ask(new Table({
        dividers: true,
        columns: ['Key', 'Value'],
        rows: [
          ['color', color],
        ]
      }))       
})


// Handle the Dialogflow intent named 'Unrecognized Deep Link'.
// The intent collects a parameter named 'any'.
app.intent('Unrecognized Deep Link', (conv, {any}) => {
    conv.ask(`Sorry, I am not sure about ${any} . What's your favorite color 👽 ?`)
           
})

// Handle the Dialogflow intent named 'Two Params'.
// The intent collects the parameters named 'color , date'.
app.intent('Two Params', (conv, {color, date}) => {
    conv.ask('I am looking for the results')
  
        conv.ask('Here are the results : ')
        conv.ask(new Table({
            dividers: true,
            columns: ['Key', 'Value'],
            rows: [
              ['color', color],
              ['date', date]
            ],
          }))

        conv.ask(tableLog(date))                  
})






// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app)
