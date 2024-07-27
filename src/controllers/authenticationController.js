const Client = require('../models/Client.js');
const Vendor = require('../models/Vendor.js');

const authenticationController = {};

authenticationController.vendorRegister = async (req, res) => {
  const vendor = await Vendor.create({ ...req.body });
  const token = vendor.createJWT()
  res.status(201).json({ vendor: { name: vendor.name }, token });
};

authenticationController.vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Please provide email and password');
  };

  const vendor = await Vendor.findOne({ email })
  if (!vendor) {
    console.log('Invalid Credentials');
  };

  const isPasswordCorrect = await vendor.comparePassword(password);
  if (!isPasswordCorrect) {
    console.log('Invalid Credentials');
  };

  const token = vendor.createJWT()
  res.status(200).json({ user: { name: vendor.name }, token });
};

authenticationController.clientRegister = async (req, res) => {
  const client = await Client.create({ ...req.body });
  const token = client.createJWT()
  res.status(201).json({ client: { name: client.firstName }, token });
};

authenticationController.clientLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log('Please provide email and password');
  };

  const client = await Client.findOne({ email })
  if (!client) {
    console.log('Invalid Credentials');
  };

  const isPasswordCorrect = await client.comparePassword(password);
  if (!isPasswordCorrect) {
    console.log('Invalid Credentials');
  };

  const token = client.createJWT()
  res.status(200).json({ user: { name: client.firstName }, token });
};

module.exports = authenticationController;
