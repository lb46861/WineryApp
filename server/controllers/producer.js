const generalController = require('./general');
const Producer = require('../models/producer');
const collectionName = Producer.collection.collectionName;
const responseMessages = require('../utils/response-message');

module.exports.getAll = async (_req, res) => {
  const data = await generalController.getAllModels(Producer);
  res.status(200).json({ data });
};

module.exports.getOne = async (req, res) => {
  const data = await generalController.getModelById(req, Producer);
  res.status(200).json({ data });
};

module.exports.update = async (req, res) => {
  await generalController.updateModelById(req, Producer);
  res.status(200).json({ message: responseMessages.UPDATE_SUCCESS(collectionName) });
};

module.exports.delete = async (req, res) => {
  const data = await generalController.deleteModelById(req, Producer);
  res.status(200).json({ message: responseMessages.DELETE_SUCCESS(collectionName), data });
};

module.exports.create = async (req, res) => {
  const data = await generalController.createModel(req, Producer);
  res.status(200).json({ message: responseMessages.CREATE_SUCCESS(collectionName), data });
};
