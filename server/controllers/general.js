const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-message');

exports.createModel = async (req, Model) => {
  const model = new Model(req.body);

  await model.save();
  return model;
};
