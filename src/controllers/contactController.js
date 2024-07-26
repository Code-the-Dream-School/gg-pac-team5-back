const Contact = require('../models/Contact')

const contactController = {};

contactController.getContact = async (req, res) => {
  const { params: { id: contactId } } = req;

  const contact = await Contact.findOne({ _id: contactId });

  if (!contact) {
    console.log(`No address with ID : ${contactId}`);
  }
  res.status(200).json({ contact })
};

contactController.createContact = async (req, res) => {
  // req.body.createdBy = req.user.userID;
  const contact = await Contact.create(req.body);
  res.status(201).json({ contact });
};

module.exports = contactController;
