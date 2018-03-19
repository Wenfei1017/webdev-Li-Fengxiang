module.exports = function (app) {
  var PAGES = require("./page.mock.server");

  app.post("/api/website/:websiteId/page", createPage);
  app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
  app.get("/api/page/:pageId", findPageById);
  app.put("/api/page/:pageId", updatePage);
  app.delete("/api/page/:pageId", deletePage);

  function createPage(req,res) {
    var websiteId = req.params["websiteId"];
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.webSiteId = websiteId;
    PAGES.push(page);
    var pages = getPagesForWebsiteId(websiteId);
    res.json(pages);
  }

  function findAllPagesForWebsite(req,res) {
    var websiteId = req.params["websiteId"];
    var pages = getPagesForWebsiteId(websiteId);
    res.json(pages);
  }

  function findPageById(req,res) {
    var pageId = req.params["pageId"];
    res.json(getPageById(pageId));
  }

  function getPageById(pageId) {
    for(var i = 0; i < PAGES.length; i++) {
      if (PAGES[i]._id === pageId) {
        return PAGES[i];
      }
    }
  }

  function updatePage(req,res) {
    var pageId = req.params['pageId'];
    var newPage = req.body;
    for(var i = 0; i < PAGES.length; i++) {
      if (PAGES[i]._id === pageId) {
        PAGES[i] = newPage;
        break;
      }
    }
    res.json(getPageById(pageId));
  }

  function deletePage(req, res) {
    var pageId = req.params['pageId'];
    var websiteId = req.params["websiteId"];
    for(var i = 0; i < PAGES.length; i++) {
      if (PAGES[i]._id === websiteId) {
        PAGES.splice(i, 1);
        var pages = getPagesForWebsiteId(websiteId);
        res.json(pages);
        return;
      }
    }
  }

  function getPagesForWebsiteId(websiteId) {
    var pages=[];

    for(var i = 0; i < PAGES.length; i++) {
      if (PAGES[i].webSiteId === websiteId) {
        websites.push(PAGES[i]);
      }
    }
    return pages;
  }

}
