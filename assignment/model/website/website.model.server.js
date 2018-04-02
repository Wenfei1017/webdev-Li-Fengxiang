var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var websiteModel = mongoose.model('websiteModel', websiteSchema);

var userModel = require("../user/user.model.server");

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

function createWebsiteForUser(userId, website) {
  website._user = userId;
  console.log(website);
  return websiteModel.create(website).then(
    function (resWebsite) {
      userModel.findUserById(resWebsite._user).then(
        function (user) {
          user.websites.push(resWebsite);
          return user.save();
        }
      )
      return resWebsite;
    }
  );
}

function findAllWebsitesForUser(userId) {
  return websiteModel.find({_user: userId});
}

function findWebsiteById(websiteId) {
  return websiteModel.findById(websiteId);
}

function updateWebsite(websiteId, website) {
  return websiteModel.update(
    {
      _id: websiteId
    }, {
      _user: website._user,
      name: website.name,
      description: website.description,
      pages: website.pages,
    }
  );
}

function deleteWebsite(websiteId) {
  websiteModel.findById(websiteId).then(function (website) {
    userModel.findUserById(website._user)
      .then(function (user) {
        user.websites.pull({_id: websiteId});
        user.save();
      })
  });
  return websiteModel.remove({
    _id: websiteId
  });
}

function addPageToWebsite(websiteId, pageId) {
  websiteModel.findById(websiteId).then(
    function (website) {
      website.pages.push(pageId);
      website.save();
    },
    function (error) {
      console.log(error);
    }
  );
}

function removePageFromWebsite(websiteId, pageId) {
  websiteModel.findById(websiteId).then(
    function (website) {
      website.pages.pull(pageId);
      website.save();
    },
    function (error) {
      console.log(error);
    }
  );
}
