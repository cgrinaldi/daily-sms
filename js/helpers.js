/**
 * @overview Contains helper functions to be used by app.js .
 * @author Chris Rinaldi <cgrinaldi@gmail.com>

/**
 * @module helpers
 */

/**
 * Select a random time in cron format between two specified hours.
 *
 * @param {number} beginHour
 * @param {number} endHour
 * @returns {string}
 */
var randomTime = function(beginHour, endHour) {
  var minute = Math.floor(Math.random() * 60);
  var hourOffset = 4;
  var hour = Math.floor(Math.random() * (endHour - beginHour)) + beginHour + hourOffset;
  hour = hour % 24;
  return [minute, hour, '*', '*', '*'].join(' ');
};

/**
 * Select a random message from an array of messages.
 * @param {string[]} messages
 * @returns {string}
 */
var randomMessage = function(messages) {
  var idx = Math.floor(Math.random() * messages.length);
  return messages[idx];
};

/**
 * Convert cron time to more familiar hour-minute format
 * @param {string} cronStr
 * @returns {string}
 */
var convertCronTime = function(cronStr) {
  var arrNums = cronStr.split(' ');
  return arrNums[1] + arrNums[0];
};

/**
 * Sort strings of cron-formatted times.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
var sortCronTimes = function(a, b){
  return Number(convertCronTime(a)) - Number(convertCronTime(b));
};

module.exports.randomTime = randomTime;
module.exports.randomMessage = randomMessage;
module.exports.sortCronTimes = sortCronTimes;

