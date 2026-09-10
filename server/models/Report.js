const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['Daily', 'Monthly', 'Centre', 'District', 'State', 'Payment'],
      required: true
    },
    state: {
      type: String,
      default: 'Punjab'
    },
    district: {
      type: String,
      default: 'Ludhiana'
    },
    centre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Centre'
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    },
    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    fileUrl: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Report', reportSchema);
