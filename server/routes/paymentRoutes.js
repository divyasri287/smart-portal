const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', paymentController.getPayments);
router.post('/process', paymentController.processPayment);

module.exports = router;
