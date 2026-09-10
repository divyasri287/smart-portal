const qrService = require('../services/qrService');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

const generateQR = async (req, res, next) => {
  try {
    const { bookingId, tokenId, farmerName } = req.body;
    const qrDataUrl = await qrService.generateBookingQR(bookingId, tokenId, farmerName);
    return sendSuccess(res, 'QR Code generated successfully', { qrCodeUrl: qrDataUrl });
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

const verifyQR = async (req, res, next) => {
  try {
    const { qrData } = req.body;
    const booking = await qrService.verifyQRData(qrData);
    return sendSuccess(res, 'QR Code verified successfully', booking);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

module.exports = {
  generateQR,
  verifyQR
};
