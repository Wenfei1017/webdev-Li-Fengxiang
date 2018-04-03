module.exports = function (app, models) {

  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname + '/../../src/assets/uploads' });

  var widgetModel = require('../model/widget/widget.model.server');

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.post ("/api/upload", upload.single('myFile'), uploadImage);

  function uploadImage(req, res) {
    console.log("uploadImage");
    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var myFile        = req.file;
    var userId = req.body.userId;
    var websiteId = req.body.websiteId;
    var pageId = req.body.pageId;

    if(myFile == null) {
      res.redirect("http://localhost:4201/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
      return;
    }

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    if (!widgetId) {
      var tobeCreated = {_id: new Date().getTime().toString(), widgetType: 'IMAGE', pageId: pageId, size: size, text: 'text', width:'100%',
        url:'/uploads/' + filename, formatted: false};
      WIDGETS.push(tobeCreated);
    } else {
      var foundWidget = WIDGETS.find(function (widget) {
        return widget._id === widgetId;
      });
      foundWidget.url = "/uploads/" + filename;
    }
    console.log("test");
    res.redirect("http://localhost:4201/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
  }

  function createWidget(req,res) {
    var pageId = req.params["pageId"];
    var widget = req.body;

    widgetModel.createWidget(pageId, widget).then(
      function (newWidget){
        res.status(200).json(newWidget);
      },
      function (error){
        res.status(500).json("Widget creation failed. " + error);
      }
    );
  }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params["pageId"];
    widgetModel.findAllWidgetsForPage(pageId).then(
      function (widgets){
        res.status(200).send(widgets);
      },
      function (error){
        res.status(400).send(error);
      }
    );
  }

  function findWidgetById(req,res) {
    var widgetId = req.params["widgetId"];
    console.log("findWidget");
    console.log(widgetId);
    widgetModel.findWidgetById(widgetId).then(
      function (widget) {
        if(widget){
          res.status(200).json(widget);
        }else{
          res.status(404).send("Widget not found by id!");
        }
      },
      function (err) {
        res.status(400).json(err);
      }
    )
  }

  function updateWidget(req,res) {
    var widgetId = req.params['widgetId'];
    var newWidget = req.body;

    widgetModel.updateWidget(widgetId, newWidget).then(
      function (widget) {
        if(widget) {
          res.status(200).json(widget);
        }else{
          res.status(404).send("Widget not found when update.");
        }
      },
      function (err) {
        res.status(400).json(error);
      }
    )
  }

  function deleteWidget(req,res) {
    var widgetId = req.params['widgetId'];
    widgetModel.deleteWidget(widgetId).then(
      function (status) {
        res.status(200).json(status);
      },
      function (err) {
        res.status(400).json(error);
      }
    )
  }
}
