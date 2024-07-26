const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const VendorSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide the company name'],
    maxlength: 50
  },
  email: {
    type: String,
    required: [true, 'Please provide the company email'],
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
  services: {
    type: [Schema.Types.ObjectId],
    required: [true, 'Please select services'],
    maxlength: 200
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'Vendor',
  },
  password: {
    type: String,
    required: [true, 'Please provide the password'],
    minlength: 6
  }
},
  { timestamps: true });

VendorSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
});

VendorSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  )
};

VendorSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
};

module.exports = mongoose.model('Vendor', VendorSchema);
