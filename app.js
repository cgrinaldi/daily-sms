/**
 * @overview Setup dependencies and run app to schedule text messages to
 * be sent at various times throughout the day.
 * @author Chris Rinaldi <cgrinaldi@gmail.com>
 */

// Add app dependencies
var config = require('./config.js');
var twilio = require('twilio');
var client = twilio(config.ACCOUNT_SID, config.AUTH_TOKEN);
var cronJob = require('cron').CronJob;
var reminders = require('./reminders.js');
var helpers = require('./helpers.js');

/**
 * Creates a cronJob that will send a SMS message at the desired time.
 *
 * @param {string} cronTime - recurring time for message to be sent
 * @param {string} message - content of SMS message to be sent
 * @returns {undefined}
 */
var scheduleText = function(cronTime, message) {
  new cronJob(cronTime, function() {
    client.sendMessage({
      to: config.myPhoneNumber,
      from: config.twilioPhoneNumber,
      body: message
    }, function(err, data){});
  }, null, true);
};

/**
 * Schedule any number of messages to be sent throughout the day at random
 * times. This is the main workhorse function that performs scheduling
 * and outputs the cron times the messages will go out at.
 *
 * @param {number} n - number of messages to schedule
 * @param {string[]} messages - array of messages to select from when scheduling
 * @returns {array}
 */
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
console.log(scheduleMessages(4, reminders.stoicReminders));
console.log(scheduleMessages(2, reminders.dreamingReminders));
console.log('server time is:', new Date());

