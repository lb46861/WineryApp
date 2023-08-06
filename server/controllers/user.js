const generalController = require('./general');
const userService = require('../services/user');
const User = require('../models/user');
const collectionName = User.collection.collectionName;
const responseMessages = require('../utils/response-message');

module.exports.register = async (req, res) => {
  const user = await generalController.createModel(req, User);

  res.json({ message: responseMessages.CREATE_SUCCESS(collectionName), user });
};

module.exports.login = async (req, res) => {
  const [token, role] = await userService.login(req);

  res.json({ token, role });
};
