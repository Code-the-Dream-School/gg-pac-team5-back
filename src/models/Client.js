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
    required: [true, 'Please provide the company email'],
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email'],
    minLength: 10,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Please provide the password'],
    match: [
      /^(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
      "Password should be at least 8 characters long and contain at least one special character"
    ],
    minlength: 8,
    maxLength: 100
  },
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
    maxlength: 5,
    match: [/\d{5}/, 'Please provide a valid zip code'],
    required: [true, 'Please provide the zip code']
  },
  country: {
    type: String,
    required: [true, 'Please provide the country']
  },
  phone: {
    type: Number,
    maxlength: 10,
    match: [/\d{10}/, 'Please provide a valid phone number'],
    required: [true, 'Please provide the phone number']
  },
  extension: {
    type: Number,
    maxlength: 5,
  },
  contactEmail: {
    type: String,
    match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email']
  },
  contactName: {
    type: String
  },
  appointments: {
    type: [Schema.Types.ObjectId],
    ref: 'Appointment'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Please provide the user']
  },
  updatedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
  },
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
