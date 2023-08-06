const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Wine = require('./wine');
const { errors } = require('../utils/errors');
const responseMessages = require('../utils/response-message');

const producerSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  founded: {
    type: Number,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

producerSchema.pre('findOneAndDelete', async function (next) {
  const query = this.getQuery();
  const producer = await Producer.findOne(query);
  if (producer) {
    const wines = await Wine.find({ producer: producer._id });
    if (wines.length > 0) {
      throw errors.CONFLICT(responseMessages.ASSOCIATED_TABLE);
    } else {
      next();
    }
  } else {
    next();
  }
});

const Producer = mongoose.model('Producer', producerSchema, 'producer');

module.exports = Producer;
