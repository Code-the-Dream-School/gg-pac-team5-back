const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController.js');

router.post('/', addressController.createAddress);
router.route('/:id').get(addressController.getAddress).patch(addressController.updateAddress);

module.exports = router;
