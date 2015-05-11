// Load API configuration info
var config = require('./config.js');

// Add app dependencies
var twilio = require('twilio');
var client = twilio(config.ACCOUNT_SID, config.AUTH_TOKEN);
var cronJob = require('cron').CronJob;
