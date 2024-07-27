const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  phone: {
    type: String
  },
  email: {
    type: String
  }
},
  { timestamps: true }); // comes in the response

module.exports = Contact = mongoose.model('Contact', ContactSchema);
