const signUpControllers = require('../controllers/signUp');
const express = require('express');
const router = express.Router();


router.get('/signup', signUpControllers.index);
router.post('/signup', signUpControllers.show);
module.exports=router;