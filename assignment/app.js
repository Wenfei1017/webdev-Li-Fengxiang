module.exports = function (app){
  require("./services/user.service.server")(app);
  require("./services/website.service.server.js")(app);
  require("./services/page.service.server.js")(app);
  require("./services/widget.service.server")(app);

  var db = require("./model/models.server");
}
