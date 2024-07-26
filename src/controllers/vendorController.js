const Vendor = require('../models/Vendor')

const vendorController = {};

vendorController.getVendor = async (req, res) => {
  const { params: { id: vendorId } } = req;

  const vendor = await Vendor.findOne({ _id: vendorId });

  if (!vendor) {
    console.log(`No vendor with ID : ${vendorId}`);
  }
  res.status(200).json({ vendor })
};

vendorController.createVendor = async (req, res) => {
  // req.body.createdBy = req.user.userID;
  const vendor = await Vendor.create(req.body);
  res.status(201).json({ vendor });
};

module.exports = vendorController;
