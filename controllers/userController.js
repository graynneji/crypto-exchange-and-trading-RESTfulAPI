const User = require('../models/userModel');

//Get Users
exports.getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  // const { password, ...others } = allUsers._doc;
  res.status(200).json({
    status: 'Success',
    allUsers,
  });
};

//Get user
exports.getAUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  //if no user
  if(!user){
    res.status(400).json({
      status: 'Fail',
      message: 'You are not logged in!'
    })
  }
  const { password, ...others } = user._doc;
  res.status(200).json({
    status: 'Success',
    others,
  });
};
//Update user
exports.update = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.id);
    if (!currentUser) {
      res.status(404);
      throw new Error('User not found');
    }
    //updating the user
    if (currentUser._id.toString() !== req.params.id) {
      res.status(403);
      throw new Error('User dont have permission to update');
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'Success',
      data: {
        updateUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Fail',
      message: err.message,
    });
  }
};
