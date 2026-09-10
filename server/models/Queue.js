const mongoose = require('mongoose');

const queueSchema = new mongoose.Schema(
  {
    tokenNo: {
      type: String,
      required: true,
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
      required: true
    },
    farmerName: {
      type: String,
      required: true
    },
    centre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Centre',
      required: true,
      index: true
    },
    vehicleNo: {
      type: String,
      required: true
    },
    commodity: {
      type: String,
      required: true
    },
    gateEntryTime: {
      type: String,
      default: () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
    },
    status: {
      type: String,
      enum: ['In Queue', 'Quality Verified', 'Weight Logged', 'Completed'],
      default: 'In Queue'
    },
    bayAssigned: {
      type: String,
      default: 'Bay 1'
    },
    priority: {
      type: Number,
      default: 1
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Queue', queueSchema);
