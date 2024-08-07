const Appointment = require('../models/Appointment')

const appointmentController = {};

appointmentController.getAppointment = async (req, res) => {
  const { params: { id: appointmentId } } = req;

  const appointment = await Appointment.findOne({ _id: appointmentId });

  if (!appointment) {
    console.log(`No address with ID : ${appointmentId}`);
  }
  res.status(200).json({ appointment })
};

appointmentController.createAppointment = async (req, res) => {
  // req.body.createdBy = req.user.userID;
  const appointment = await Appointment.create(req.body);
  res.status(201).json({ appointment });
};

module.exports = appointmentController;
