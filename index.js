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

// Fake Data: change this time to test different working hours
var WorkTime = 16; 

// current time
var date = new Date();
var current_hour = date.getHours();

// Server Setup
const server = app.listen(port,()=>{
  console.log("Listening to Port : " + port );
})

// Socket Setup
const io = socket(server);

// Notification if 60 mins left towards next work shift
function OnehourLeftNotification(){

    var notifier = new WindowsToaster({
      withFallback: false,
      customPath: void 0,
    });

    notifier.notify(
      {
        title: "Working Notification",
        message: "You have a work in 60 minutes",
        icon: void 0,
        sound: true
      },
      function(error, response) {
        console.log(response);
      }
    );
}

if((WorkTime-current_hour)==1){
  OnehourLeftNotification();
}

// Make Connection
io.on('connection',function(socket){
  console.log('connection is made with id : ', socket.id);

  // check every 60mins for sending notification
  setInterval(()=>{
    if((WorkTime-current_hour)==1){
      OnehourLeftNotification();
    }
  }, 3600000);
})
