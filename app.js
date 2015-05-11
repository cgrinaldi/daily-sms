// Load API configuration info
var config = require('./config.js');

// Add app dependencies
var twilio = require('twilio');
var client = twilio(config.ACCOUNT_SID, config.AUTH_TOKEN);
var cronJob = require('cron').CronJob;

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

scheduleText('38 15 * * *', 'Why hello!');


