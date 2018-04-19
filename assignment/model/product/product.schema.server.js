var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  _user: {
    type: String,
    ref: 'User',
    required: true,
  },
  title: String,
  brand: String,
  price: Number,
  description: String,
  imageUrl: String,
  dateCreated: {
      type: Date,
      default: Date.now()
  }

}, {collection: 'product'});

module.exports = productSchema;
