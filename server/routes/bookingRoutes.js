const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');
const { bookingValidation } = require('../validators/bookingValidator');
const { validate } = require('../middleware/validation');

router.use(protect);

router.get('/', bookingController.getBookings);
router.post('/', bookingValidation, validate, bookingController.createBooking);
router.delete('/:bookingId', bookingController.cancelBooking);

module.exports = router;
