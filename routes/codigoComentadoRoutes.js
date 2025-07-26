const codigoComentadoController = require('../controllers/codigoComentadoController');
const express = require('express');
const router = express.Router();

router.get('/codigoComentado', codigoComentadoController.index);

module.exports = router;