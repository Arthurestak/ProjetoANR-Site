const materiasController = require('../controllers/materiasController');
const express = require('express');
const router = express.Router();

router.get('/materias', materiasController.index);
router.get('/conteudos/:id', materiasController.contentScreen);
router.get('/questao/:id_content/:id_question', materiasController.questionScreen);
router.post('/answer',  materiasController.answerTretment);
router.post('/change/:id', materiasController.indexQuestion)

module.exports = router;