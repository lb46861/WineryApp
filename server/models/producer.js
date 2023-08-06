const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Wine = require('./wine');

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
  logoUrl: {
    type: String,
    required: true
  }
});

producerSchema.pre('remove', async function (next) {
  const wines = await Wine.find({ producer: this._id });
  if (wines.length > 0) {
    next(new Error('Cannot delete producer with associated wines'));
  } else {
    next();
  }
});

const Producer = mongoose.model('Producer', producerSchema, 'producer');

module.exports = Producer;
