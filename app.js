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

// Create Stoic reminder messages
var stoicReminders = [
  'What is the worst thing that could have happened to you at this point in the day?',
  'Where could you be working right now that is much worse than your current job?',
  'Imagine if a living loved one all of a sudden died. How would you feel?',
  'Imagine what your life would be like if you lost your sense of sight.',
  'Image what your life would be like if you were homeless and living on the streets in the dead of winter.',
  'Remember when you say goodbye to a friend, it could be the last time that you see them.',
  'What if today was your last day to live?',
  'What would your life be like if all of your financial accounts were emptied?',
  'Imagine what your life would be like if you were paralyzed from the neck down.',
  'What would your work place be like if you had the world\'s worst boss?',
  'How could your current job be worse?',
  'Imagine that WWIII broke out, and you were drafted to fight. How would you feel?'
];

var dreamingReminders = [
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
  var hourOffset = 4;
  var hour = Math.floor(Math.random() * (endHour - beginHour)) + beginHour + hourOffset;
  hour = hour % 24;
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
var scheduleMessages = function(n, messages) {
  var times = [];
  for (var i = 0; i < n; i++) {
    var message = randomMessage(messages);
    var time = randomTime(8, 20);
    scheduleText(time, message);
    times.push(time);
  }

  // Return the scheduled times of the messages.
  times.sort(sortCronTimes);
  return times;
};

// Schedule messages to be sent. This runs once per day, automatically,
// with Heroku.
console.log(scheduleMessages(2, stoicReminders));
console.log(scheduleMessages(2, dreamingReminders));

// Seeing what the server time is.
console.log('server time is:', new Date());

