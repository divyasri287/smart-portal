const Booking = require('../models/Booking');

class BookingRepository {
  async findById(id) {
    return await Booking.findById(id).populate('farmer centre');
  }

  async findByBookingId(bookingId) {
    return await Booking.findOne({ bookingId }).populate('farmer centre');
  }

  async findByTokenId(tokenId) {
    return await Booking.findOne({ tokenId }).populate('farmer centre');
  }

  async findByFarmer(farmerId) {
    return await Booking.find({ farmer: farmerId }).sort({ createdAt: -1 });
  }

  async findAll(query = {}) {
    return await Booking.find(query).sort({ createdAt: -1 });
  }

  async create(bookingData) {
    return await Booking.create(bookingData);
  }

  async updateStatus(bookingId, status) {
    return await Booking.findOneAndUpdate({ bookingId }, { status }, { new: true });
  }
}

module.exports = new BookingRepository();
