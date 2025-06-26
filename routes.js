const materiasController = require('./controllers/materiasController');
const express = require('express');
const router = express.Router();

router.get('/materias', materiasController.index);
router.get('/conteudos/:id', materiasController.contentScreen);
router.get('/questao/:id',  materiasController.questionScreen);
router.post('/answer',  materiasController.answerTretment)
module.exports = router;