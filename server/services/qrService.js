const { generateQRCode } = require('../utils/generateQR');
const Booking = require('../models/Booking');

class QRService {
  async generateBookingQR(bookingId, tokenId, farmerName) {
    const payload = {
      bookingId,
      tokenId,
      farmerName,
      issuedAt: new Date().toISOString()
    };
    return await generateQRCode(payload);
  }

  async verifyQRData(qrPayload) {
    let data;
    try {
      data = typeof qrPayload === 'string' ? JSON.parse(qrPayload) : qrPayload;
    } catch (e) {
      throw new Error('Invalid QR payload format');
    }

    if (!data.tokenId && !data.bookingId) {
      throw new Error('QR payload missing tokenId or bookingId');
    }

    const booking = await Booking.findOne({
      $or: [{ tokenId: data.tokenId }, { bookingId: data.bookingId }]
    }).populate('farmer centre');

    if (!booking) {
      throw new Error('No matching booking found for this QR code');
    }

    return booking;
  }
}

module.exports = new QRService();
