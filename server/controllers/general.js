const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-message');

// Create model
exports.createModel = async (req, Model) => {
  const model = new Model(req.body);

  await model.save();
  return model;
};

// Get all models
exports.getAllModels = async (Model) => {
  const models = await Model.find();
  return models;
};

// Get model by ID
exports.getModelById = async (req, Model) => {
  const id = req.params.id;
  const model = await Model.findById(id);
  if (!model) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(Model.collection.collectionName));
  return model;
};

// Update model by ID
exports.updateModelById = async (req, Model) => {
  const id = req.params.id;
  const update = req.body;
  const model = await Model.findByIdAndUpdate(id, update, { new: true });
  if (!model) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(Model.collection.collectionName));
  return model;
};

// Delete model by ID
exports.deleteModelById = async (req, Model) => {
  const id = req.params.id;
  const model = await Model.findByIdAndDelete(id);
  if (!model) throw errors.NOT_FOUND(responseMessages.NOT_FOUND(Model.collection.collectionName));
  return model;
};
