const mongoose = require('mongoose');

const assetSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    blockchain: { type: String, required: true }, // Example: "Ethereum", "Binance Smart Chain", etc.
    contractAddress: { type: String, required: true }, // Smart contract address for the token
  },
  { timestamps: true }
);

module.exports = mongoose.model('Asset', assetSchema);
