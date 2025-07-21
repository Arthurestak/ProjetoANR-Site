const mentoriaController = require('../controllers/mentoriaController');
const express = require('express');
const router = express.Router();

router.get('/mentoria', mentoriaController.index);

module.exports = router;