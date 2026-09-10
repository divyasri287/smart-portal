const express = require('express');
const router = express.Router();
const farmerController = require('../controllers/farmerController');
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/role');
const { bookingValidation } = require('../validators/bookingValidator');
const { validate } = require('../middleware/validation');

router.use(protect);

router.get('/profile', farmerController.getFarmerProfile);
router.get('/profile/:farmerId', farmerController.getFarmerProfile);
router.put('/profile', farmerController.updateFarmerProfile);

router.post('/book-slot', bookingValidation, validate, bookingController.createBooking);
router.delete('/cancel-slot/:bookingId', bookingController.cancelBooking);

router.get('/token', farmerController.getFarmerToken);
router.get('/qr', farmerController.getFarmerQR);

router.get('/booking-history', bookingController.getBookings);
router.get('/procurement-status', farmerController.getProcurementStatus);
router.get('/payment-status', farmerController.getPaymentStatus);

module.exports = router;
