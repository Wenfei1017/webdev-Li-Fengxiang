var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost:27017/webdev-project', {useMongoClient: true});

// var db = mongoose.connect('mongodb://adminWeb:adminWeb@ds263707.mlab.com:63707/heroku_f1xvv3gp', {useMongoClient: true});
module.exports = db;
