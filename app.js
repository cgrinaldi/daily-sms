// Load API configuration info
// var config = require('./config.js');

// Add app dependencies
var twilio = require('twilio');
var client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
var cronJob = require('cron').CronJob;

// Create Stoic reminder messages
var thoughtReminders = [
  'What is the worst thing that could have happened to you at this point in the day?',
  'Where could you be working right now that is much worse than your current job?',
  'Imagine if a living loved one all of a sudden died. How would you feel?',
  'Are you dreaming right now? How do you know?'
];

// `scheduleText()` will create a cronJob that will send the input text
// at the desired time.
var scheduleText = function(cronTime, message) {
  new cronJob(cronTime, function() {
    client.sendMessage({
      to: process.env.myPhoneNumber,
      from: process.env.twilioPhoneNumber,
      body: message
    }, function(err, data){});
  }, null, true);
};

// `randomTime()` will create a random time that is within waking hours
// (in cron format).
var randomTime = function(beginHour, endHour) {
  var minute = Math.floor(Math.random() * 60);
  var hour = Math.floor(Math.random() * (endHour - beginHour)) + beginHour;
  return [minute, hour, '*', '*', '*'].join(' ');
};

// `randomMessage()` will select a random message.
var randomMessage = function(messages) {
  var idx = Math.floor(Math.random() * messages.length);
  return messages[idx];
};

// Helper functions to display when the times are scheduled.
var convertCronTime = function(cronStr) {
  var arrNums = cronStr.split(' ');
  return arrNums[1] + arrNums[0];
};

var sortCronTimes = function(a, b){
  return Number(convertCronTime(a) - convertCronTime(b));
};

// Schedule n different messages throughout the day.
var scheduleMessages = function(n) {
  var times = [];
  for (var i = 0; i < n; i++) {
    var message = randomMessage(thoughtReminders);
    var time = randomTime(18, 17);
    scheduleText(time, message);
    times.push(time);
  }

  // Return the scheduled times of the messages.
  times.sort(sortCronTimes);
  return times;
};

// Schedule 100 messages to be sent.
console.log(scheduleMessages(100));

