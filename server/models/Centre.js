const mongoose = require('mongoose');

const centreSchema = new mongoose.Schema(
  {
    centreCode: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    name: {
      type: String,
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
    address: {
      type: String,
      required: true
    },
    capacityQuintals: {
      type: Number,
      default: 10000
    },
    activeBays: {
      type: Number,
      default: 4
    },
    operatingHours: {
      type: String,
      default: '08:00 AM - 06:00 PM'
    },
    contactNumber: {
      type: String,
      default: '+91 161 2456789'
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive', 'Full'],
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Centre', centreSchema);
