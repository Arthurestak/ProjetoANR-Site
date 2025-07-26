const contatoController = require('../controllers/contatoController');
const express = require('express');
const router = express.Router();

router.get('/contato', contatoController.index);

module.exports = router;