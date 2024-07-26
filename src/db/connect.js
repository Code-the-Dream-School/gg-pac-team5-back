const mongoose = require('mongoose');

const connectDB = (url, callback) => {
  callback;
  return mongoose.connect(url);
};

module.exports = connectDB;
