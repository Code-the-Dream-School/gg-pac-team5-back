const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  vendor: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor'
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client'
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'Client',
  }
},
  { timestamps: true }); // comes in the response

module.exports = mongoose.model('Appointment', AppointmentSchema);
