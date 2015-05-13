// Load API configuration info (if local)
try {
  var config = require('./config.js');
} catch (e) {
  var config = {};
}

var ACCOUNT_SID = config.ACCOUNT_SID || process.env.ACCOUNT_SID;
var AUTH_TOKEN = config.AUTH_TOKEN || process.env.AUTH_TOKEN;

// Add app dependencies
var twilio = require('twilio');
var client = twilio(ACCOUNT_SID, AUTH_TOKEN);
var cronJob = require('cron').CronJob;
var reminders = require('./reminders.js');
var helpers = require('./helpers.js');

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

// `scheduleMessages()` will schedule n different messages throughout the day.
// This is the main workhorse function that does all of the work (along with
// reporting what cron times those messages will go out).
var scheduleMessages = function(n, messages) {
  var times = [];
  for (var i = 0; i < n; i++) {
    var message = helpers.randomMessage(messages);
    var time = helpers.randomTime(8, 20);
    scheduleText(time, message);
    times.push(time);
  }

  // Return the scheduled times of the messages.
  times.sort(helpers.sortCronTimes);
  return times;
};

// Schedule messages to be sent. This runs once per day, automatically,
// with Heroku.
console.log(scheduleMessages(2, reminders.stoicReminders));
console.log(scheduleMessages(2, reminders.dreamingReminders));

// Seeing what the server time is.
console.log('server time is:', new Date());

