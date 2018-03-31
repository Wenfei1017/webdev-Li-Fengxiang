module.exports = function(mongoose, conn){
    var models = {
        'userModel': require('./user/user.model.server.js')(mongoose, conn),
        'websiteModel': require('./website/website.model.server.js')(mongoose, conn),
        'pageModel': require('./page/page.model.server.js')(mongoose, conn),
        'widgetModel': require('./widget/widget.model.server.js')(mongoose, conn)
    };
    return models;
}
