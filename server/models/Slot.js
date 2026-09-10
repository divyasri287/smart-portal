const mongoose = require('mongoose');

const slotSchema = new mongoose.Schema(
  {
    centre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Centre',
      required: true,
      index: true
    },
    date: {
      type: String, // YYYY-MM-DD
      required: true,
      index: true
    },
    timeSlot: {
      type: String, // e.g. "09:00 AM - 11:00 AM"
      required: true
    },
    maxCapacity: {
      type: Number,
      default: 50
    },
    bookedCount: {
      type: Number,
      default: 0
    },
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

slotSchema.index({ centre: 1, date: 1, timeSlot: 1 }, { unique: true });

module.exports = mongoose.model('Slot', slotSchema);
