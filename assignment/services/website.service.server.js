module.exports = function(app){

  var websiteModel = require('../model/website/website.model.server');

  app.get("/api/user/:userId/website", findWebsiteForUser);
  app.post("/api/user/:userId/website", createWebsite);
  app.delete("/api/user/:userId/website/:websiteId", deleteWebsite);
  app.get("/api/user/:userId/website/:websiteId", findWebsiteById);
  app.put("/api/user/:userId/website/:websiteId", updateWebsiteById);

  function createWebsite(req, res){
    var userId = req.params['userId'];
    var newWebsite = req.body;
    websiteModel.createWebsiteForUser(userId, newWebsite).then(
      function (newWebsite){
        res.status(200).json(newWebsite);
      },
      function (error){
        res.status(500).send("Website careation failed. " + error);
      }
    );
  }

  function findWebsiteForUser(req, res) {
    var userId = req.params['userId'];
    websiteModel.findAllWebsitesForUser(userId).then(
      function successCallback(websites){
        res.status(200).json(websites);
      },
      function errorCallback(error){
        res.status(400).send(error);
      }
    );
  }

  function findWebsiteById(req, res){
    var websiteId = req.params['websiteId'];
    websiteModel.findWebsiteById(websiteId).then(
      function successCallback(website){
        if(website){
          res.status(200).json(website);
        }else{
          res.status(404).send("Website not found by id!");
        }
      },
      function errorCallback(error){
        res.status(400).send(error);
      }
    );
  }

  function updateWebsiteById(req, res){
    var websiteId = req.params['websiteId'];
    var newWebsite = req.body;

    websiteModel.updateWebsite(websiteId, newWebsite).then(
      function (website){
        if(website){
          res.status(200).json(website);
        } else{
          res.status(404).send("Website not found when update.");
        }
      },
      function (error){
        res.status(400).send(error);
      }
    );
  }

  function deleteWebsite(req, res){
    var websiteId = req.params['websiteId'];
    websiteModel.deleteWebsite(websiteId).then(
      function (website){
        res.json(website);
      },
      function (error){
        res.status(500).json(err);
      }
    );
  }
}
