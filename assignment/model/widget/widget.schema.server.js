var mongoose = require('mongoose');

var widgetSchema = mongoose.Schema({
  _page: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
    required: true
  },
  widgetType: {
    type: String,
    enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'],
    default: 'HEADING'
  },
  name: {type: String, required: true},
  text: String,
  placeholder: String,
  description: String,
  url: String,
  width: String,
  height: String,
  rows: Number,
  size: Number,
  class: String,
  icon: String,
  deletable: {
    type: Boolean,
    default: true
  },
  formatted: {
    type: Boolean,
    default: true
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
}, {collection: 'widget'});

module.exports = widgetSchema;
