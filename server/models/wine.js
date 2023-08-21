const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wineSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  alcoholPercentage: {
    type: Number,
    required: true
  },
  liters: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  image: {
    data: Buffer,
    contentType: String
  },
  producer: { type: Schema.Types.ObjectId, ref: 'Producer' }
});

const Wine = mongoose.model('Wine', wineSchema, 'wine');

module.exports = Wine;
