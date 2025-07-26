const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboardController');


router.get('/', controller.index);
router.get('/upload', controller.show);
router.post('/upload/pdf', controller.addPDF);
router.post('/upload/video', controller.addVideo);
router.post('/upload/questao', controller.addQuestao);

module.exports = router;