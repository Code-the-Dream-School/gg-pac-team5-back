const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController.js');

router.get('/:id', appointmentController.getAppointment);
router.post('/', appointmentController.createAppointment);

module.exports = router;
