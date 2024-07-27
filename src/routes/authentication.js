const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/authenticationController.js');

router.post('/vendor-register', authenticationController.vendorRegister);
router.post('/vendor-login', authenticationController.vendorLogin)
router.post('/client-register', authenticationController.clientRegister);
router.post('/client-login', authenticationController.clientLogin)

module.exports = router;
