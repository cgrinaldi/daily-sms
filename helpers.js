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

module.exports.randomTime = randomTime;
module.exports.randomMessage = randomMessage;
module.exports.sortCronTimes = sortCronTimes;

