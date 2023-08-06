const generalController = require('./general');
const Producer = require('../models/producer');
const collectionName = Producer.collection.collectionName;
const responseMessages = require('../utils/response-message');

module.exports.getAllProducers = async (_req, res) => {
  const users = await generalController.getAllModels(Producer);
  res.json({ users });
};

module.exports.getProducer = async (req, res) => {
  const producer = await generalController.getModelById(req, Producer);
  res.json({ producer });
};

module.exports.updateProducer = async (req, res) => {
  await generalController.updateModelById(req, Producer);
  res.json({ message: responseMessages.UPDATE_SUCCESS(collectionName) });
};

module.exports.deleteProducer = async (req, res) => {
  const producer = await generalController.deleteModelById(req, Producer);
  res.json({ message: responseMessages.DELETE_SUCCESS(collectionName), producer });
};

module.exports.createProducer = async (req, res) => {
  const user = await generalController.createModel(req, Producer);

  res.json({ message: responseMessages.CREATE_SUCCESS(collectionName), user });
};
