// Load API configuration info
var config = require('./config.js');

// Add app dependencies
var twilio = require('twilio');
var client = twilio(config.ACCOUNT_SID, config.AUTH_TOKEN);
var cronJob = require('cron').CronJob;

// Create Stoic reminder messages
var thoughtReminders = [
  'What is the worst thing that could have happened to you at this point in the day?',
  'Where could you be working right now that is much worse than your current job?',
  'Imagine if a living loved one all of a sudden died. How would you feel?',
  'Are you dreaming right now? How do you know?'
];

var cronTimes = [
  '44 15 * * *',
  '44 15 * * *',
  '45 15 * * *',
  '45 15 * * *'
];

// `scheduleText()` will create a cronJob that will send the input text
// at the desired time.
var scheduleText = function(cronTime, message) {
  new cronJob(cronTime, function() {
    client.sendMessage({
      to: config.myPhoneNumber,
      from: config.twilioPhoneNumber,
      body: message
    }, function(err, data){});
  }, null, true);
};

// `randomTime()` will create a random time that is within waking hours
// (in cron format).
var randomTime = function() {
  var minute = Math.floor(Math.random() * 60);
  var hour = Math.floor(Math.random() * (20 - 8)) + 8;
  return [minute, hour, '*', '*', '*'].join(' ');
};

// `randomMessage()` will select a random message.
var randomMessage = function(messages) {
  var idx = Math.floor(Math.random() * messages.length);
  return messages[idx];
};

cronTimes.forEach(function(time, i){
  scheduleText(time, thoughtReminders[i]);
});
