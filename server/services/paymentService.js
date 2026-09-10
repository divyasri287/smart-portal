const Payment = require('../models/Payment');
const Farmer = require('../models/Farmer');

class PaymentService {
  async getPayments(farmerUserId = null) {
    if (farmerUserId) {
      const farmer = await Farmer.findOne({ $or: [{ user: farmerUserId }, { farmerId: farmerUserId }] });
      if (farmer) {
        return await Payment.find({ farmer: farmer._id }).sort({ createdAt: -1 });
      }
    }
    return await Payment.find().sort({ createdAt: -1 });
  }

  async processPayment(paymentId) {
    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      throw new Error('Payment record not found');
    }
    payment.status = 'DBT Credited';
    payment.disbursementDate = new Date().toISOString().split('T')[0];
    await payment.save();
    return payment;
  }
}

module.exports = new PaymentService();
