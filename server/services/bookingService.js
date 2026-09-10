const Booking = require('../models/Booking');
const Farmer = require('../models/Farmer');
const Centre = require('../models/Centre');
const Slot = require('../models/Slot');
const Queue = require('../models/Queue');
const { generateQRCode } = require('../utils/generateQR');

class BookingService {
  async createBooking(farmerUserId, bookingData) {
    const farmer = await Farmer.findOne({ $or: [{ user: farmerUserId }, { farmerId: farmerUserId }] }) ||
      await Farmer.findOne();

    if (!farmer) {
      throw new Error('Farmer record not found');
    }

    const centre = await Centre.findOne() || { _id: '65e000000000000000000001', name: bookingData.centreName || 'Ludhiana Mandi Centre 4' };

    const bookingCount = await Booking.countDocuments();
    const bookingId = `BK-2026-${String(bookingCount + 1).padStart(3, '0')}`;
    const tokenId = `TKN-A${901 + bookingCount}`;

    const qrPayload = {
      bookingId,
      tokenId,
      farmerId: farmer.farmerId,
      farmerName: farmer.name,
      crop: bookingData.crop || farmer.cropType,
      slotDate: bookingData.slotDate || new Date().toISOString().split('T')[0]
    };

    const qrCodeUrl = await generateQRCode(qrPayload);

    const booking = await Booking.create({
      bookingId,
      tokenId,
      farmer: farmer._id,
      farmerName: farmer.name,
      farmerId: farmer.farmerId,
      centre: centre._id,
      centreName: bookingData.centreName || centre.name || 'Ludhiana Mandi Centre 4',
      slotDate: bookingData.slotDate || new Date().toISOString().split('T')[0],
      timeSlot: bookingData.timeSlot || '09:00 AM - 11:00 AM',
      estimatedQuantity: bookingData.estimatedQuantity || 150,
      crop: bookingData.crop || farmer.cropType,
      vehicleNo: bookingData.vehicleNo || 'PB-10-CZ-4419',
      status: 'Booked',
      qrCodeUrl
    });

    await Queue.create({
      tokenNo: tokenId,
      booking: booking._id,
      farmer: farmer._id,
      farmerName: farmer.name,
      centre: centre._id,
      vehicleNo: booking.vehicleNo,
      commodity: booking.crop,
      status: 'In Queue',
      bayAssigned: 'Bay ' + ((bookingCount % 4) + 1)
    });

    return booking;
  }

  async getFarmerBookings(farmerUserId) {
    const farmer = await Farmer.findOne({ $or: [{ user: farmerUserId }, { farmerId: farmerUserId }] });
    if (!farmer) {
      return await Booking.find().sort({ createdAt: -1 });
    }
    return await Booking.find({ farmer: farmer._id }).sort({ createdAt: -1 });
  }

  async cancelBooking(bookingId) {
    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      throw new Error('Booking not found');
    }
    booking.status = 'Cancelled';
    await booking.save();
    return booking;
  }

  async getAllBookings() {
    return await Booking.find().sort({ createdAt: -1 });
  }
}

module.exports = new BookingService();
