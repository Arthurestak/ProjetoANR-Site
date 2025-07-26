const loginController = require('../controllers/loginController');
const express = require('express');
const router = express.Router();

router.get('/login', loginController.index);
router.post('/login', loginController.show);
module.exports = router;
