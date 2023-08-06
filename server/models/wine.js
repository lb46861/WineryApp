const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wineSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  alcoholPercentage: {
    type: Number,
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
  producer: { type: Schema.Types.ObjectId, ref: 'Producer' }
});

const Wine = mongoose.model('Wine', wineSchema, 'wine');

module.exports = Wine;
