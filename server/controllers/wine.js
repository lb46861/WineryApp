const generalController = require('./general');
const Wine = require('../models/wine');
const collectionName = Wine.collection.collectionName;
const responseMessages = require('../utils/response-message');

module.exports.getAll = async (_req, res) => {
  const users = await generalController.getAllModels(Wine);
  res.json({ users });
};

module.exports.getOne = async (req, res) => {
  const wine = await generalController.getModelById(req, Wine);
  res.json({ wine });
};

module.exports.update = async (req, res) => {
  await generalController.updateModelById(req, Wine);
  res.json({ message: responseMessages.UPDATE_SUCCESS(collectionName) });
};

module.exports.delete = async (req, res) => {
  const wine = await generalController.deleteModelById(req, Wine);
  res.json({ message: responseMessages.DELETE_SUCCESS(collectionName), wine });
};

module.exports.create = async (req, res) => {
  const wine = await generalController.createModel(req, Wine);
  res.json({ message: responseMessages.CREATE_SUCCESS(collectionName), wine });
};
