const timeago = (savedTimestamp) => {
  return new Date(savedTimestamp).toISOString();
};

module.exports = timeago;
