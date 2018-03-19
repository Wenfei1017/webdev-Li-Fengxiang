module.exports = function (app) {

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);


  var WIDGETS = require("./widget.mock.server.js");
  function createWidget(req,res) {
    var pageId = req.params["pageId"];
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = pageId;
    WIDGETS.push(widget);
    var widgets = getWidgetsForPageId(pageId);
    res.json(widgets);
  }

  function getWidgetsForPageId(pageId) {
    var widgets=[];

    for(var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i].pageId === pageId) {
        widgets.push(WIDGETS[i]);
      }
    }
    return widgets;

  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params["pageId"];
    var widgets = getWidgetsForPageId(pageId);
    res.json(widgets);
  }

  function findWidgetById(req,res) {
    var widgetId = req.params["widgetId"];
    var widget = getWidgetById(widgetId);
    res.json(widget);
  }

  function getWidgetById(widgetId){
    for(var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i]._id === widgetId) {
        return WIDGETS[i];
      }
    }
  }

  function updateWidget(req,res) {
    var widgetId = req.params['widgetId'];
    var newWidget = req.body;
    for(var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i]._id === widgetId) {
        WIDGETS[i] = newWidget;
        break;
      }
    }
    res.json(getWidgetById(widgetId));
  }

  function deleteWidget(req,res) {
    var widgetId = req.params['widgetId'];
    for(var i = 0; i < WIDGETS.length; i++) {
      if (WIDGETS[i]._id === websiteId) {
        WIDGETS.splice(i, 1);
        var widgets = getWidgetsForPageId(websiteId);
        res.json(widgets);
        return;
      }
    }
  }
}
