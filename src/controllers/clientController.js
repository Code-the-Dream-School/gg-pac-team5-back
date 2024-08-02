const Client = require('../models/Client')

const clientController = {};

clientController.getAllClients = async (req, res) => {
  const clients = await Client.find({});
  res.status(200).json({ clients })
};

clientController.getClient = async (req, res) => {
  const { params: { id: clientId } } = req;

  const client = await Client.findOne({ _id: clientId });

  if (!client) {
    console.log(`No client with ID : ${clientId}`);
  }
  res.status(200).json({ client })
};

clientController.createClient = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const client = await Client.create(req.body);
  res.status(201).json({ client });
};

clientController.updateClient = async (req, res) => {
  const { user: { userId }, params: { id: clientId } } = req;
  req.body.updatedBy = userId;
  const client = await Client.findOneAndUpdate({ _id: clientId }, req.body, {
    new: true,
    runValidators: true
  });
  if (!client) {
    console.log(`No client with ID : ${clientId}`);
  }
  res.status(200).json({ client })
};

clientController.deleteClient = async (req, res) => {
  const { user: { userId }, params: { id: clientId } } = req;
  req.body.updatedBy = userId;
  const client = await Client.findOneAndDelete({ _id: clientId });
  if (!client) {
    console.log(`No client with ID : ${clientId}`);
  }
  res.status(200).json({ message: `Client ${client.firstName} deleted successfully` })
};

module.exports = clientController;
