const mongoose = require('mongoose');

const procurementSchema = new mongoose.Schema(
  {
    procurementId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
      required: true
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farmer',
      required: true,
      index: true
    },
    centre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Centre',
      required: true
    },
    officer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    commodity: {
      type: String,
      required: true
    },
    grossWeight: {
      type: Number, // in Quintals / Kgs
      required: true
    },
    tareWeight: {
      type: Number,
      default: 0
    },
    netWeight: {
      type: Number,
      required: true
    },
    moistureLevel: {
      type: Number, // percentage, e.g., 12.5%
      default: 12.0
    },
    foreignMatter: {
      type: Number, // percentage
      default: 0.5
    },
    qualityGrade: {
      type: String,
      enum: ['A', 'B', 'C', 'Grade A', 'FAQ', 'Under Grade'],
      default: 'Grade A'
    },
    ratePerQuintal: {
      type: Number,
      required: true
    },
    totalAmount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Approved'
    },
    inspectionImages: [
      {
        type: String
      }
    ],
    receiptUrl: {
      type: String
    },
    verifiedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Procurement', procurementSchema);
