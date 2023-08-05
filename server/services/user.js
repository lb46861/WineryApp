const User = require('../models/user');

exports.register = async (req) => {
  const { username, email, password } = req.body;

  const newUser = new User({
    username,
    email,
    password
  });

  await newUser.save();
  return newUser;
};
