const generalController = require('./general');
const wineService = require('../services/wine');
const Wine = require('../models/wine');
const collectionName = Wine.collection.collectionName;
const responseMessages = require('../utils/response-message');

module.exports.getAll = async (_req, res) => {
  const data = await generalController.getAllModels(Wine);
  res.json({ data });
};

module.exports.getOne = async (req, res) => {
  const data = await generalController.getModelById(req, Wine);
  res.json({ data });
};

module.exports.update = async (req, res) => {
  await wineService.updateWine(req);
  res.json({ message: responseMessages.UPDATE_SUCCESS(collectionName) });
};

module.exports.delete = async (req, res) => {
  const data = await generalController.deleteModelById(req, Wine);
  res.json({ message: responseMessages.DELETE_SUCCESS(collectionName), data });
};

module.exports.create = async (req, res) => {
  const data = await wineService.createWine(req);
  res.json({ message: responseMessages.CREATE_SUCCESS(collectionName), data });
};
