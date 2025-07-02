const express = require('express');
const router = express.Router();
const ebookController = require('../controllers/ebookController');

router.get('/ebook', ebookController.index);
router.get('/ebook/:id', ebookController.show);

module.exports = router;
