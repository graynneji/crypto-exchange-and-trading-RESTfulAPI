const express = require('express');

const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require('../verifyToken');
const dashboardController = require('../controllers/dashboardController');

const router = express.Router();

router.route('/dashboard').get(verifyToken, dashboardController.dashboard);

module.exports = router;
