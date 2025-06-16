const materiasController = require('./controllers/materiasController');
const express = require('express');
const router = express.Router();

router.get('/materias', materiasController.index);
router.get('/conteudos/:id', materiasController.contentScreen);
module.exports = router;