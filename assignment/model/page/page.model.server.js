module.exports = function(mongoose, conn, models) {
    var pageSchema = require('./page.schema.server.js')(mongoose);
    // var webSiteSchema = require('../website/website.model.server.js')(mongoose);

    var pageModel = conn.model('Page', pageSchema);
    // var websiteModel = conn.model('Website',webSiteSchema);

    var api = {
        'createPage': createPage,
        'findAllPagesForWebsite': findAllPagesForWebsite,
        'findPageById': findPageById,
        'updatePage': updatePage,
        'deletePage': deletePage,
        'addWidgetToPage': addWidgetToPage,
        'removeWidgetFromPage': removeWidgetFromPage
    }

    return api;

    function createPage(websiteId, page){
       page._website = websiteId;
       return pageModel.create(page).then(
         function (resPage) {
           models.websiteModel.findWebsiteById(resPage._website).then(
             function(website) {
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

    function findAllPagesForWebsite(websiteId){
        return pageModel.find({_website : websiteId});
    }

    function findPageById(pageId){
        return pageModel.findById(pageId);
    }

    function updatePage(pageId, page){
        return pageModel.update(
            {   _id: pageId
            }, {
                _website: page._website,
                name : page.name,
                title: page.title,
                description: page.description,
                widgets: page.widgets,
            }
        );
    }

    function deletePage(pageId){
      pageModel.findById(pageId).then(
        function(page) {
          models.websiteModel.findWebsiteById(page._website).then(
            function(website) {
              website.pages.pull({_id: pageId});
              website.save();
            })
        });
      return pageModel.remove({_id: pageId});
    }

    function addWidgetToPage(pid, wgid){
        pageModel.findById(pid).then(
            function(page){
                page.widgets.push(wgid);
                page.save();
            },
            function(error){
                console.log(error);
            }
        );
    }

    function removeWidgetFromPage(pid, wgid){
        pageModel.findById(pid).then(
            function(page){
                page.widgets.pull(wgid);
                page.save();
            },
            function(error){
                console.log(error);
            }
        );
    }
}
