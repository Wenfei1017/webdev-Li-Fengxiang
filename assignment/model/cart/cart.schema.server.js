var mongoose = require("mongoose");
var productSchema = require('../product/product.schema.server');

var cartSchema = mongoose.Schema({
  _id: String,
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: productSchema,
  title: String,
  quantity: Number,
  description: String,
  dateCreated: {
    type: Date,
    default: Date.now()
  }
}, {collection: 'cart'});

module.exports = cartSchema;
