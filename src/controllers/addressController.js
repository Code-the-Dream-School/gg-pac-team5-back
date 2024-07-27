const Address = require('../models/Address')

const addressController = {};

addressController.getAddress = async (req, res) => {
  const { params: { id: addressId } } = req;

  const address = await Address.findOne({ _id: addressId });

  if (!address) {
    console.log(`No address with ID : ${addressId}`);
  }
  res.status(200).json({ address })
};

addressController.createAddress = async (req, res) => {
  // req.body.createdBy = req.user.userID;
  const address = await Address.create(req.body);
  res.status(201).json({ address });
};

module.exports = addressController;
