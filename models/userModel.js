const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please fill in your name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please fill in your name'],
    },

    email: {
      type: String,
      required: [true, 'Enter your email'],
    },
    password: { type: String, required: [true, 'Please insert your password'] },
    clientIP: {
      type: String,
    },
    funds: {
      available: { type: Number, default: 0 },
      reserved: { type: Number, default: 0 },
    },
    clientBrowser: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    activation: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
