const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
  console.log(req.body);
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;
    const clientIP = req.clientIP;
    const clientBrowser = req.clientBrowser;
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      res.status(400);
      throw new Error('All fields are required!');
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
      res.status(400);
      throw new Error('An account is associated with this email!');
    }
    if (password !== confirmPassword) {
      res.status(400);
      throw new Error('Passwords not the same!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      clientIP,
      clientBrowser,
    });
    if (user) {
      res.status(201).json({
        status: 'Success',
        data: {
          _id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          clientIP: user.clientIP,
          clientBrowser: user.clientBrowser,
        },
      });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({
      status: 'Fail',
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('All fields are required');
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: 'Fail',
        message: 'No account was found with this user!',
      });
    }
    //compare users
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: '1h' }
      );
      const { password, ...others } = user._doc;
      res.status(200).json({
        status: 'Success',
        // _id: user.id,

        // email: user.email,
        others,
        accessToken,
      });
    }
  } catch (err) {
    // res.status(401).json({
    //   status: 'Fail',
    //   message: err.message,
    // });

    // If the password doesn't match, send an authentication error response
return res.status(401).json({
  status: 'Fail',
  message: 'Authentication failed. Incorrect password.',
});
  }
};
