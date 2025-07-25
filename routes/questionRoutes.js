const questionController = require('../controllers/questionController');
const express = require('express');
const router = express.Router();

router.get('/questions', questionController.index);
module.exports = router;