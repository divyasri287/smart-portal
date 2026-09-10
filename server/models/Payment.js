const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    procurement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Procurement'
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farmer',
      required: true,
      index: true
    },
    farmerName: {
      type: String,
      required: true
    },
    quantityQuintals: {
      type: Number,
      required: true
    },
    mspPerQuintal: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    bankRefNo: {
      type: String,
      required: true,
      unique: true
    },
    disbursementDate: {
      type: String, // YYYY-MM-DD
      default: () => new Date().toISOString().split('T')[0]
    },
    status: {
      type: String,
      enum: ['Pending Processing', 'Processing', 'DBT Credited', 'Failed'],
      default: 'DBT Credited'
    },
    transactionDetails: {
      bankName: { type: String, default: 'State Bank of India' },
      accountNoMasked: { type: String, default: 'xxxx5678' },
      ifsc: { type: String, default: 'SBIN0001234' }
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Payment', paymentSchema);
