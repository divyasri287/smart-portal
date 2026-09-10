const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema(
  {
    farmerId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    name: {
      type: String,
      required: true
    },
    aadhaar: {
      type: String,
      required: true
    },
    mobile: {
      type: String,
      required: true
    },
    cropType: {
      type: String,
      required: true
    },
    acreage: {
      type: Number,
      required: true
    },
    district: {
      type: String,
      required: true,
      index: true
    },
    state: {
      type: String,
      required: true,
      index: true
    },
    bankAccount: {
      type: String,
      required: true
    },
    bankIFSC: {
      type: String,
      default: 'SBIN0001234'
    },
    landRecordNo: {
      type: String,
      default: 'LR-2026-88190'
    },
    address: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Farmer', farmerSchema);
