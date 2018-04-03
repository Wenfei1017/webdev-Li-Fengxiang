var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var widgetModel = mongoose.model('widgetModel', widgetSchema);

var pageModel = require("../page/page.model.server");

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;

module.exports = widgetModel;

function createWidget(pageId, widget) {
  widget._page = pageId;


  return widgetModel.create(widget).then(
    function (resWidget) {
      pageModel.findPageById(resWidget._page).then(
        function (page) {
          page.widgets.push(resWidget);
          return page.save();
        }
      )
      return resWidget;
    }
  );
}

function findAllWidgetsForPage(pageId) {
  return widgetModel.find({_page: pageId});
}

function findWidgetById(widgetId) {
  return widgetModel.findById(widgetId);
}

function updateWidget(widgetId, widget) {
  widgetModel.findWidgetById(widgetId).then(
    function (foundWidget) {
      pageModel.findPageById(foundWidget._page).then(
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

function deleteWidget(widgetId) {
  widgetModel.findById(widgetId).then(
    function (widget) {
      pageModel.findPageById(widget._page).then(
        function (page) {
          page.widgets.pull({_id: widgetId});
          page.save();
        })
    }
  );
  return widgetModel.remove({_id: widgetId});
}

