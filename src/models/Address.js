const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
  street: {
    type: String,
    required: [true, 'Please provide the street']
  },
  city: {
    type: String,
    required: [true, 'Please provide the city']
  },
  state: {
    type: String,
    maxlength: 2,
    required: [true, 'Please provide the state']
  },
  zip: {
    type: String,
    required: [true, 'Please provide the zip code']
  },
  country: {
    type: String,
    required: [true, 'Please provide the country']
  }
},
  { timestamps: true }); // comes in the response

module.exports = mongoose.model('Address', AddressSchema);
