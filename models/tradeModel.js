const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  plan: { type: String, required: [true, 'Plan is required'] },
  email: { type: String, required: [true, 'Email is required'] },
  // startDate:{type: },
  status: { type: String, default: 'inactive' },
  amount: { type: Number, required: [true, 'You need to credit your account'] },
  dividendAmount: { type: Number, default: 0.0 },
  formattedStartDate: { type: String, required: true },
  formattedEndDate: { type: String, required: true },
  withdrawalDate: { type: Date },
  features: { type: String, required: true },

  roi: { type: Number, required: true },
  dividendsPercentage: { type: Number, required: true },
});
module.exports = mongoose.model('Trade', tradeSchema);
