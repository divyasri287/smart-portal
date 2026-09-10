const express = require('express');
const router = express.Router();
const qrController = require('../controllers/qrController');

router.post('/generate', qrController.generateQR);
router.post('/verify', qrController.verifyQR);

module.exports = router;
