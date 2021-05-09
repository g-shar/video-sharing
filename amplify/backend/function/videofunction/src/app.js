/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())


// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
});

const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient();

function id () {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
/**********************
 * Example get method *
 **********************/

app.get('/video', async (req, res) => {
  // Add your code here
  console.log('app.get(video) called')
  let params = {
    TableName: process.env.STORAGE_VIDEOTABLE_NAME
  }
  docClient.scan(params, (err, data) => {
    if (err) {
      res.json(err)
    } else {
      res.json(data)
    }
  })
});

app.post('/video', async(req, res) => {
  let params = {
    TableName: process.env.STORAGE_VIDEOTABLE_NAME,
    Item: {
      id: id(),
      title: req.body.title,
      date_created: new Date().toString(),
      url: req.body.url
    }
  }
  docClient.put(params, (err, data) => {
    if (err) res.json(err)
    else res.json(data)
  })
})

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
