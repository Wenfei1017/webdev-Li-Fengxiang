var mongoose = require('mongoose');
// var db = mongoose.connect('mongodb://localhost:27017/webdev-project', {useMongoClient: true});

var db = mongoose.connect('mongodb://projectAdmin:projectAdmin@ds119489.mlab.com:19489/heroku_jmtdw98s', {useMongoClient: true});
module.exports = db;


