const paymentService = require('../services/paymentService');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

const getPayments = async (req, res, next) => {
  try {
    const payments = await paymentService.getPayments(req.user?._id);
    return sendSuccess(res, 'Payments fetched successfully', payments);
  } catch (error) {
    return sendError(res, error.message, 500);
  }
};

const processPayment = async (req, res, next) => {
  try {
    const { paymentId } = req.body;
    const payment = await paymentService.processPayment(paymentId);
    return sendSuccess(res, 'Payment processed and DBT credited successfully', payment);
  } catch (error) {
    return sendError(res, error.message, 400);
  }
};

module.exports = {
  getPayments,
  processPayment
};
