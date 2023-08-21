const Wine = require('../models/wine');
const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-message');

exports.createWine = async (req) => {
  const { name, price, alcoholPercentage, color, liters, type, producer } = req.body;
  const wine = new Wine({
    name,
    price,
    alcoholPercentage,
    color,
    liters,
    type,
    producer,
    image: {
      data: req.file.buffer,
      contentType: req.file.mimetype
    }
  });

  await wine.save();
  return wine;
};

exports.updateWine = async (req) => {
  const id = req.params.id;
  const updateData = {};
  if (req.file) {
    updateData['image.data'] = req.file.buffer;
    updateData['image.contentType'] = req.file.mimetype;
  }

  const bodyKeys = Object.keys(req.body);
  for (const key of bodyKeys) {
    updateData[key] = req.body[key];
  }

  const wine = await Wine.findByIdAndUpdate(id, updateData, { new: true });

  if (!wine) {
    throw errors.NOT_FOUND(responseMessages.NOT_FOUND(Wine.collection.collectionName));
  }
};
