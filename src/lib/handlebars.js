const format = require('timeago.js');

const timeago = (savedTimestamp) => {
  return format(savedTimestamp);
};

module.exports = timeago;
