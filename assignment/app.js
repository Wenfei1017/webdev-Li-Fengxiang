module.exports = function (app){
  var mongoose = require('mongoose');
  var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGODB_URI ||
    'mongodb://localhost:27017/webdev';

  var conn = mongoose.createConnection(uristring, function (err) {
    if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + uristring);
    }
  });

  var models = require("./model/models.server.js")(mongoose, conn);

  require("./services/user.service.server.js")(app, models);
  require("./services/website.service.server.js")(app, models);
  require("./services/page.service.server.js")(app, models);
  require("./services/widget.service.server.js")(app, models);
}



