const Service = require('../models/Service')

const serviceController = {};

serviceController.getAllServices = async (req, res) => {
  const services = await Service.find({});
  return res.status(200).json(services)
}

serviceController.getServiceByVendorId = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  const services = await Service.find({ createdBy: id });
  return res.status(200).json(services);
}

serviceController.getService = async (req, res) => {
  const { params: { id: serviceId } } = req;

  const service = await Service.findOne({ _id: serviceId });

  if (!service) {
    console.log(`No address with ID : ${serviceId}`);
  }
  res.status(200).json({ service })
};

serviceController.createService = async (req, res) => {
  // req.body.createdBy = req.user.userID;
  const service = await Service.create(req.body);
  res.status(201).json({ service });
};

module.exports = serviceController;
