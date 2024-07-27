const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController.js');

router.get('/:id', contactController.getContact);
router.post('/', contactController.createContact);

module.exports = router;
