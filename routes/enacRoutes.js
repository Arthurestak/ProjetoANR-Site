const enacController = require('../controllers/enacController');
const express = require('express');
const router = express.Router();

router.get('/enac2025-2', enacController.index);

module.exports = router;