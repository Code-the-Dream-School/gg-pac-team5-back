const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController.js');

router.get('/:id', serviceController.getService);
router.post('/', serviceController.createService);

module.exports = router;
