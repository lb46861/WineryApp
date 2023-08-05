const userService = require('../services/user');

module.exports.register = async (req, res) => {
  const user = await userService.register(req);

  res.json({ message: 'User successfully created!', user });
};
