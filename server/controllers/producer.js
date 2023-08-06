const generalController = require('./general');
const Producer = require('../models/producer');
const collectionName = Producer.collection.collectionName;
const responseMessages = require('../utils/response-message');

module.exports.getAll = async (_req, res) => {
  const users = await generalController.getAllModels(Producer);
  res.json({ users });
};

module.exports.getOne = async (req, res) => {
  const producer = await generalController.getModelById(req, Producer);
  res.json({ producer });
};

module.exports.update = async (req, res) => {
  await generalController.updateModelById(req, Producer);
  res.json({ message: responseMessages.UPDATE_SUCCESS(collectionName) });
};

module.exports.delete = async (req, res) => {
  const producer = await generalController.deleteModelById(req, Producer);
  res.json({ message: responseMessages.DELETE_SUCCESS(collectionName), producer });
};

module.exports.create = async (req, res) => {
  const producer = await generalController.createModel(req, Producer);
  res.json({ message: responseMessages.CREATE_SUCCESS(collectionName), producer });
};
