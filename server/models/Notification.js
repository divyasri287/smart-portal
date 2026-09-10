const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      index: true
    },
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Farmer'
    },
    title: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    channel: {
      type: String,
      enum: ['SMS', 'Email', 'Push'],
      default: 'SMS'
    },
    status: {
      type: String,
      enum: ['Pending', 'Sent', 'Failed'],
      default: 'Sent'
    },
    sentAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Notification', notificationSchema);
