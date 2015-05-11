// Load API configuration info
var config = require('./config.js');

// Add app dependencies
var twilio = require('twilio');
var client = twilio(config.ACCOUNT_SID, config.AUTH_TOKEN);
var cronJob = require('cron').CronJob;

// Schedule a SMS to be sent
var textJob = new cronJob('27 15 * * *', function() {
  client.sendMessage({
    to: config.myPhoneNumber,
    from: config.twilioPhoneNumber,
    body: 'Hello, World! Hope you are having a great day!'
  }, function(err, data) {
    if (err) {
      console.error('error is', err);
      console.log('data is', data);
    }
  });
}, null, true);
