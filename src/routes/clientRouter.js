const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController.js');

router.route('/').get(clientController.getAllClients).post(clientController.createClient);
router.route('/:id').get(clientController.getClient).patch(clientController.updateClient).delete(clientController.deleteClient);

module.exports = router;
