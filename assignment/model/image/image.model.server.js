var mongoose = require("mongoose");
var imageSchema = require("./image.schema.server");
var imageModel = mongoose.model('imageModel', imageSchema);

imageModel.createImage = createImage;
imageModel.findAllImagesForUser = findAllImagesForUser;
imageModel.findImageById = findImageById;
imageModel.updateImage = updateImage;
imageModel.deleteImage = deleteImage;
// imageModel.sortImages = sortImages;

module.exports = imageModel;

function createImage(userId, image) {
  image._user = userId;

  return imageModel.create(image).then(
    function (resImage) {
      userModel.findUserById(resImage._user).then(
        function (user) {
          user.images.push(resImage);
          return user.save();
        }
      );
      return resImage;
    }
  );
}

function findAllImagesForUser(userId) {
  return userModel.findUserById(userId)
    .then(function(user) {
      return user.images;
    });
}

function findImageById(imageId) {
  return imageModel.findById(imageId);
}

function updateImage(imageId, image) {
  imageModel.findImageById(imageId).then(
    function (foundImage) {
      userModel.findUserById(foundImage._user).then(
        function (user) {
          for (var i = 0; i < user.images.length; i++) {
            if (String(user.images[i]._id) === String(imageId)) {
              user.images[i] = image;
            }
          }
          user.save();
        }
      )
    }
  );
  return imageModel.update({_id: imageId}, image);
}

function deleteImage(imageId) {
  imageModel.findById(imageId).then(
    function (image) {
      userModel.findUserById(image._user).then(
        function (user) {
          user.images.pull({_id: imageId});
          user.save();
        })
    }
  );
  return imageModel.remove({_id: imageId});
}

// function sortWidgets(pageId, start, end) {
//   return pageModel.findPageById(pageId)
//     .then(function(page) {
//       const widgetToModify = page.widgets[start];
//       page.widgets.splice(start, 1);
//       page.widgets.splice(end, 0, widgetToModify);
//       return page.save();
//     });
// }


