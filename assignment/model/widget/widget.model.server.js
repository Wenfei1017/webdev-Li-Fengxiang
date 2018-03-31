module.exports = function(mongoose, conn, models) {
    var widgetSchema = require('./widget.schema.server.js')(mongoose);
    var widgetModel = conn.model('Widget', widgetSchema);

    var api = {
        'createWidget': createWidget,
        'findAllWidgetsForPage': findAllWidgetsForPage,
        'findWidgetById': findWidgetById,
        'updateWidget': updateWidget,
        'deleteWidget': deleteWidget
    }
    return api;

    function createWidget(pageId, widget){
        widget._page = pageId;

        return widgetModel.create(widget).then(
          function(resWidget) {
            models.pageModel.findPageById(resWidget._page).then(
              function (page) {
                page.widgets.push(resWidget);
                return page.save();
              }
            )
            return resWidget;
          }
        );
    }

    function findAllWidgetsForPage(pageId){
        return widgetModel.find({_page : pageId});
    }

    function findWidgetById(widgetId){
        return widgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget){
        widgetModel.findWidgetById(widgetId).then(
          function (foundWidget) {
            models.pageModel.findPageById(foundWidget._page).then(
              function (page) {
                for (var i = 0; i < page.widgets.length; i++) {
                  if (String(page.widgets[i]._id) === String(widgetId)) {
                    page.widgets[i] = widget;
                  }
                }
                page.save();
              }
            )
          }
        );
        return widgetModel.update({_id: widgetId}, widget);
    }

    function deleteWidget(widgetId){
        widgetModel.findById(widgetId).then(
          function (widget){
            models.pageModel.findPageById(widget._page).then(
              function (page) {
                page.widgets.pull({_id: widgetId});
                page.save();
              })}
        );

        return widgetModel.remove({_id : widgetId });
    }
}
