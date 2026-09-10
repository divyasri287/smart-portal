const Payment = require('../models/Payment');

class PaymentRepository {
  async findById(id) {
    return await Payment.findById(id).populate('procurement farmer');
  }

  async findByPaymentId(paymentId) {
    return await Payment.findOne({ paymentId }).populate('procurement farmer');
  }

  async findByFarmer(farmerId) {
    return await Payment.find({ farmer: farmerId }).sort({ createdAt: -1 });
  }

  async findAll(query = {}) {
    return await Payment.find(query).populate('procurement farmer').sort({ createdAt: -1 });
  }

  async create(data) {
    return await Payment.create(data);
  }

  async updateStatus(paymentId, status, bankRefNo = null) {
    const update = { status };
    if (bankRefNo) update.bankRefNo = bankRefNo;
    return await Payment.findOneAndUpdate({ paymentId }, update, { new: true });
  }
}

module.exports = new PaymentRepository();
