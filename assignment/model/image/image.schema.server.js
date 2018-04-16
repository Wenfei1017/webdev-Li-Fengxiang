var mongoose = require('mongoose');

var imageSchema = mongoose.Schema({
  _user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // widgetType: {
  //   type: String,
  //   enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'TEXT'],
  //   default: 'HEADING'
  // },
  name: {type: String, required: true},
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

module.exports =imageSchema;
