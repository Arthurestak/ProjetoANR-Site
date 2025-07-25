const express = require('express');
const router = express.Router();
const controller = require('../controllers/dashboardController');
const uploader = require('../controllers/dashboardController').uploader;

router.get('/', controller.index);
router.get('/upload', controller.uploadForm);
router.post('/upload/pdf', uploader, controller.addPDF);
router.post('/upload/video', controller.addVideo);

module.exports = router;