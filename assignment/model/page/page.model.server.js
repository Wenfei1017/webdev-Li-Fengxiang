var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");

var pageModel = mongoose.model('pageModel', pageSchema);

var websiteModel = require("../website/website.model.server");

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(websiteId, page) {
  page._website = websiteId;
  return pageModel.create(page).then(
    function (resPage) {
      websiteModel.findWebsiteById(resPage._website).then(
        function (website) {
          website.pages.push(resPage);
          // the newly created one will not be added into websites without this line
          return website.save();
        });
      return resPage;
    },
    function (err) {
      console.log(err);
    });
}

function findAllPagesForWebsite(websiteId) {
  return pageModel.find({_website: websiteId});
}

function findPageById(pageId) {
  return pageModel.findById(pageId);
}

function updatePage(pageId, page) {
  return pageModel.update(
    {
      _id: pageId
    }, {
      _website: page._website,
      name: page.name,
      title: page.title,
      description: page.description,
      widgets: page.widgets,
    }
  );
}

function deletePage(pageId) {
  pageModel.findById(pageId).then(
    function (page) {
      websiteModel.findWebsiteById(page._website).then(
        function (website) {
          website.pages.pull({_id: pageId});
          website.save();
        })
    });
  return pageModel.remove({_id: pageId});
}


