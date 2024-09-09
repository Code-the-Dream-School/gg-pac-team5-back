const Vendor = require('../models/Vendor')

const vendorController = {};

vendorController.getVendorByName = async (req, res) => {
  const { name } = req.params
  const vendor = await Vendor.findOne({ name: name })
  res.status(200).json({ vendor })
}

vendorController.getAllVendors = async (req, res) => {
  const vendors = await Vendor.find({});
  res.status(200).json({ vendors })
};

vendorController.getVendor = async (req, res) => {
  const { params: { id: vendorId } } = req;

  const vendor = await Vendor.findOne({ _id: vendorId });

  if (!vendor) {
    console.log(`No vendor with ID : ${vendorId}`);
  }
  res.status(200).json({ vendor })
};

vendorController.createVendor = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const vendor = await Vendor.create(req.body);
  res.status(201).json({ vendor });
};

vendorController.updateVendor = async (req, res) => {
  const { user: { userId }, params: { id: vendorId } } = req;
  req.body.updatedBy = userId;
  const vendor = await Vendor.findOneAndUpdate({ _id: vendorId }, req.body, {
    new: true,
    runValidators: true
  });
  if (!vendor) {
    console.log(`No vendor with ID : ${vendorId}`);
  }
  res.status(200).json({ vendor })
};

vendorController.deleteVendor = async (req, res) => {
  const { user: { userId }, params: { id: vendorId } } = req;
  req.body.updatedBy = userId;
  const vendor = await Vendor.findOneAndDelete({ _id: vendorId });
  if (!vendor) {
    console.log(`No vendor with ID : ${vendorId}`);
  }
  res.status(200).json({ message: `Vendor ${vendor.name} deleted successfully` })
};

module.exports = vendorController;
