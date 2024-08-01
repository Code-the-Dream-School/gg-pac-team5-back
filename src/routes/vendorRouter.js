const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController.js');
const authenticateUser = require('../middleware/authentication.js');

router.route('/').get(vendorController.getAllVendors).post(authenticateUser, vendorController.createVendor);
router.route('/:id').get(vendorController.getVendor).patch(authenticateUser, vendorController.updateVendor).delete(authenticateUser, vendorController.deleteVendor);

module.exports = router;
