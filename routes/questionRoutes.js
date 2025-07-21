const questionController = require('../controllers/questionController');
const express = require('express');
const router = express.Router();

router.get('/questions', questionController.index);
router.post('/questions-list', questionController.filter)
module.exports = router;