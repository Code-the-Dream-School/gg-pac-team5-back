const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide the service name'],
    maxlength: 50
  },
  availableQuantity: {
    type: Number,
    required: [true, 'Please provide available quantity of the services'],
  },
  booked: {
    type: [String],
    default: ['']
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'Vendor',
  }
},
  { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
