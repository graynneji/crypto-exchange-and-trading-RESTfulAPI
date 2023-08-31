const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();
//middlewares
// Middleware to collect client's IP address and browser information
router.use('/', (req, res, next) => {
  const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const clientBrowser = req.headers['user-agent'];

  req.clientIP = clientIP;
  req.clientBrowser = clientBrowser;

  next();
});
// auth routes
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

module.exports = router;
