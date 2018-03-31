module.exports = function (app, models) {
  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  function createPage(req,res) {
    var websiteId = req.params["websiteId"];
    var page = req.body;

    models.pageModel.createPage(websiteId, page).then(
      function (page){
        res.status(200).json(page);
      },
      function (error){
        res.status(500).send("Page careation failed. " + error);
      }
    );
  }

  function findAllPagesForWebsite(req,res) {
    var websiteId = req.params["websiteId"];

    models.pageModel.findAllPagesForWebsite(websiteId).then(
      function (pages){
        res.status(200).json(pages);
      },
      function (error){
        res.status(400).send(error);
      }
    );
  }

  function findPageById(req,res) {
    var pageId = req.params["pageId"];

    models.pageModel.findPageById(pageId).then(
      function (page){
        if(page){
          res.status(200).json(page);
        } else {
          res.status(404).send("Page not found by id!");
        }
      },
      function (error){
        res.status(400).send(error);
      }
    );
  }

  function updatePage(req,res) {
    var pid = req.params['pageId'];
    var newPage = req.body;

    models.pageModel.updatePage(pid, newPage).then(
      function (page){
        if(page){
          res.status(200).json(page);
        } else{
          res.status(404).send("Page not found when update.");
        }
      },
      function (error){
        res.status(400).send(error);
      }
    );
  }

  function deletePage(req, res) {
    var pid = req.params.pageId;

    models.pageModel.deletePage(pid).then(
      function (status){
        res.json(status);
      },
      function (error){
        res.status(400).send(error);
      });
  }
}
