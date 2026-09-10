const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    bookingId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    tokenId: {
      type: String,
      required: true,
      unique: true,
      index: true
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
    farmerId: {
      type: String,
      required: true
    },
    centre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Centre',
      required: true
    },
    centreName: {
      type: String,
      required: true
    },
    slotDate: {
      type: String, // YYYY-MM-DD
      required: true,
      index: true
    },
    timeSlot: {
      type: String,
      required: true
    },
    estimatedQuantity: {
      type: Number, // in quintals
      required: true
    },
    crop: {
      type: String,
      required: true
    },
    vehicleNo: {
      type: String,
      default: 'PB-10-CZ-4419'
    },
    status: {
      type: String,
      enum: ['Booked', 'In Queue', 'Quality Verified', 'Weight Logged', 'Procurement Completed', 'Cancelled'],
      default: 'Booked'
    },
    qrCodeUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
