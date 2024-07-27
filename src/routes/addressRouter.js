const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController.js');

router.get('/:id', addressController.getAddress);
router.post('/', addressController.createAddress);

module.exports = router;
