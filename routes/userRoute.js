const express = require('express');
const userController = require('../controllers/userController');
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require('../verifyToken');
const router = express.Router();
//middlewares
// Middleware to collect client's IP address and browser information
// router.use('/', (req, res, next) => {
//   const clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
//   const clientBrowser = req.headers['user-agent'];

//   req.clientIP = clientIP;
//   req.clientBrowser = clientBrowser;

//   next();
// });

// router.route('/register').post(userController.register);
// router.route('/login').post(userController.login);
router.route('/').get(verifyTokenAndAdmin, userController.getAllUsers);
router
  .route('/:id')
  .patch(verifyTokenAndAuthorization, userController.update)
  .get(userController.getAUser);

module.exports = router;
