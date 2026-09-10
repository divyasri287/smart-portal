const bookingService = require('../services/bookingService');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

const getBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getAllBookings();
    return sendSuccess(res, 'Bookings fetched successfully', bookings);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

const createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.createBooking(req.user?._id, req.body);
    return sendSuccess(res, 'Slot booked successfully', booking, 201);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

const cancelBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.params;
    const booking = await bookingService.cancelBooking(bookingId);
    return sendSuccess(res, 'Booking cancelled successfully', booking);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

module.exports = {
  getBookings,
  createBooking,
  cancelBooking
};
