module.exports = function (app, models) {

  var multer = require('multer'); // npm install multer --save
  var upload = multer({ dest: __dirname + '/../../src/assets/uploads' });

  app.post("/api/page/:pageId/widget", createWidget);
  app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
  app.get("/api/widget/:widgetId", findWidgetById);
  app.put("/api/widget/:widgetId", updateWidget);
  app.delete("/api/widget/:widgetId", deleteWidget);
  app.post ("/api/upload", upload.single('myFile'), uploadImage);

  var WIDGETS = require("./widget.mock.server.js");

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

    models.widgetModel.createWidget(pageId, widget).then(
      function (newWidget){
        res.status(200).json(newWidget);
      },
      function (error){
        res.status(500).json("Widget creation failed. " + error);
      }
    );
  }

  // function getWidgetsForPageId(pageId) {
  //   var widgets=[];
  //
  //   for(var i = 0; i < WIDGETS.length; i++) {
  //     if (WIDGETS[i].pageId === pageId) {
  //       widgets.push(WIDGETS[i]);
  //     }
  //   }
  //   return widgets;
  // }

  function findAllWidgetsForPage(req, res) {
    var pageId = req.params["pageId"];
    models.widgetModel.findAllWidgetsForPage(pageId).then(
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
    models.widgetModel.findWidgetById(widgetId).then(
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

  // function getWidgetById(widgetId){
  //   for(var i = 0; i < WIDGETS.length; i++) {
  //     if (WIDGETS[i]._id === widgetId) {
  //       return WIDGETS[i];
  //     }
  //   }
  // }

  function updateWidget(req,res) {
    var widgetId = req.params['widgetId'];
    var newWidget = req.body;

    models.widgetModel.updateWidget(widgetId, newWidget).then(
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
    models.widgetModel.deleteWidget(widgetId).then(
      function (status) {
        res.status(status);
      },
      function (err) {
        res.status(400).json(error);
      }
    )
  }
}
