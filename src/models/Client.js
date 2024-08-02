const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const ClientSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please provide your first name'],
    maxlength: 50
  },
  lastName: {
    type: String,
    required: [true, 'Please provide your last name'],
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address'
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'Contact'
  },
  appointments: {
    type: [Schema.Types.ObjectId],
    ref: 'Appointment'
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Please provide your first name'],
  },
  password: {
    type: String,
    required: [true, 'Please provide the password'],
    minlength: 6
  }
},
  { timestamps: true });

ClientSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
});

ClientSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.firstName },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
};

ClientSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
};

module.exports = mongoose.model('Client', ClientSchema);
