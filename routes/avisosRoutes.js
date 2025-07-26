const avisosController = require('../controllers/avisosController');
const express = require('express');
const router = express.Router();

router.get('/avisos', avisosController.index);

module.exports = router;