const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController.js');
const authenticateUser = require('../middleware/authentication.js');


router.get('/', serviceController.getAllServices)
router.get('/:id', serviceController.getService);
router.get('/vendorId/:id', serviceController.getServiceByVendorId);
router.post('/', authenticateUser, serviceController.createService);

module.exports = router;
