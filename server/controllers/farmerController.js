const Farmer = require('../models/Farmer');
const Booking = require('../models/Booking');
const Procurement = require('../models/Procurement');
const Payment = require('../models/Payment');
const { generateQRCode } = require('../utils/generateQR');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

const getFarmerProfile = async (req, res, next) => {
  try {
    const farmer = await Farmer.findOne({
      $or: [{ user: req.user?._id }, { farmerId: req.params.farmerId }]
    }) || await Farmer.findOne();

    if (!farmer) {
      return sendError(res, 'Farmer profile not found', 404);
    }
    return sendSuccess(res, 'Farmer profile fetched successfully', farmer);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

const updateFarmerProfile = async (req, res, next) => {
  try {
    const farmer = await Farmer.findOneAndUpdate(
      { $or: [{ user: req.user?._id }, { farmerId: req.body.farmerId }] },
      req.body,
      { new: true, upsert: true }
    );
    return sendSuccess(res, 'Farmer profile updated successfully', farmer);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

const getFarmerToken = async (req, res, next) => {
  try {
    const booking = await Booking.findOne().sort({ createdAt: -1 });
    if (!booking) {
      return sendError(res, 'No token available', 404);
    }
    return sendSuccess(res, 'Token fetched successfully', {
      tokenId: booking.tokenId,
      bookingId: booking.bookingId,
      status: booking.status,
      slotDate: booking.slotDate,
      timeSlot: booking.timeSlot
    });
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

const getFarmerQR = async (req, res, next) => {
  try {
    const booking = await Booking.findOne().sort({ createdAt: -1 });
    if (!booking) {
      const defaultQr = await generateQRCode({ message: 'Smart Procurement Portal Farmer Token' });
      return sendSuccess(res, 'Default QR code generated', { qrCodeUrl: defaultQr });
    }
    return sendSuccess(res, 'QR code fetched successfully', {
      qrCodeUrl: booking.qrCodeUrl,
      tokenId: booking.tokenId,
      bookingId: booking.bookingId
    });
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

const getProcurementStatus = async (req, res, next) => {
  try {
    const procurements = await Procurement.find().sort({ createdAt: -1 });
    return sendSuccess(res, 'Procurement status fetched successfully', procurements);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

const getPaymentStatus = async (req, res, next) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    return sendSuccess(res, 'Payment status fetched successfully', payments);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

module.exports = {
  getFarmerProfile,
  updateFarmerProfile,
  getFarmerToken,
  getFarmerQR,
  getProcurementStatus,
  getPaymentStatus
};
