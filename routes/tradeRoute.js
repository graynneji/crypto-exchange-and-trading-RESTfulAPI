const express = require('express');

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require('../verifyToken');
const tradeController = require('../controllers/tradeController');

const router = express.Router();

router
  .route('/trade')
  .post(verifyToken, tradeController.createTrade)
  .get(tradeController.getAllTrades);

module.exports = router;
