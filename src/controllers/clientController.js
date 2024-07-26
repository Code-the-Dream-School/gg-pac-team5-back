const Client = require('../models/Client')

const clientController = {};

clientController.getClient = async (req, res) => {
  const { params: { id: clientId } } = req;

  const client = await Client.findOne({ _id: clientId });

  if (!client) {
    console.log(`No address with ID : ${clientId}`);
  }
  res.status(200).json({ client })
};

clientController.createClient = async (req, res) => {
  // req.body.createdBy = req.user.userID;
  const client = await Client.create(req.body);
  res.status(201).json({ client });
};

module.exports = clientController;
