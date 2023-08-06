const generalController = require('./general');
const userService = require('../services/user');
const User = require('../models/user');
const collectionName = User.collection.collectionName;
const responseMessages = require('../utils/response-message');

module.exports.getAllUsers = async (_req, res) => {
  const users = await generalController.getAllModels(User);
  res.json({ users });
};

module.exports.getUser = async (req, res) => {
  const user = await generalController.getModelById(req, User);
  res.json({ user });
};

module.exports.updateUser = async (req, res) => {
  await generalController.updateModelById(req, User);
  res.json({ message: responseMessages.UPDATE_SUCCESS(collectionName) });
};

module.exports.deleteUser = async (req, res) => {
  const user = await generalController.deleteModelById(req, User);
  res.json({ message: responseMessages.DELETE_SUCCESS(collectionName), user });
};

module.exports.register = async (req, res) => {
  const user = await generalController.createModel(req, User);

  res.json({ message: responseMessages.CREATE_SUCCESS(collectionName), user });
};

module.exports.login = async (req, res) => {
  const [token, role] = await userService.login(req);

  res.json({ token, role });
};
