const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  street: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String,
    maxlength: 2
  },
  zip: {
    type: String
  },
  country: {
    type: String,
    maxlength: 2
  }
},
  { timestamps: true }); // comes in the response

module.exports = mongoose.model('Address', AddressSchema);
