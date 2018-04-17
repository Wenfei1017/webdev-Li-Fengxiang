var mongoose = require("mongoose");

var productSchema = mongoose.Schema({
  _id: String,
  title: String,
  brand: String,
  price: Number,
  description: String,
  image: String,
  dateCreated: {
      type: Date,
      default: Date.now()
  }

}, {collection: 'product'});

module.exports = productSchema;
