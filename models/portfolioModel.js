const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Asset',
      required: true,
    },
    balance: { type: Number, default: 0 },
    // Add more fields as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model('Portfolio', portfolioSchema);
