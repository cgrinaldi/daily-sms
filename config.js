// Load API configuration info (if local). Otherwise, get the necessary
// information from the Heroku environment.
try {
  var private = require('./private.js');
} catch (e) {
  var private = {};
}

var ACCOUNT_SID = private.ACCOUNT_SID || process.env.ACCOUNT_SID;
var AUTH_TOKEN = private.AUTH_TOKEN || process.env.AUTH_TOKEN;
var twilioPhoneNumber = private.twilioPhoneNumber || process.env.twilioPhoneNumber;
var myPhoneNumber = private.myPhoneNumber || process.env.myPhoneNumber;

module.exports.ACCOUNT_SID = ACCOUNT_SID;
module.exports.AUTH_TOKEN = AUTH_TOKEN;
module.exports.twilioPhoneNumber = twilioPhoneNumber;
module.exports.myPhoneNumber = myPhoneNumber;
