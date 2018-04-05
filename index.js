// Libraries
const path = require('path');
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');
const WindowsToaster = require('node-notifier').WindowsToaster;

// Port Number
const port = process.env.PORT || 3000;
// Express app
const app = express();

// body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Fake Data
var WorkTime = 16; // change this time to test different working hours

// current time
var date = new Date();
var current_hour = date.getHours();

// Server Setup
const server = app.listen(port,()=>{
  console.log("Listenting to Port : " + port );
})

// Socket Setup
const io = socket(server);

console.log("time substractoon is :" ,WorkTime-current_hour);


if((WorkTime-current_hour)==1){
  var notifier = new WindowsToaster({
    withFallback: false,
    customPath: void 0,
  });

  notifier.notify(
    {
      title: "work housa",
      message: "60 minutes",
      icon: void 0,
      sound: true
    },
    function(error, response) {
      console.log(response);
    }
  );

}
