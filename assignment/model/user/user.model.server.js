var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var userModel = mongoose.model("userModel", userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findUserByFacebookId = findUserByFacebookId;

module.exports = userModel;

function createUser(user) {
  return userModel.findOne({username: user.username}).then(
    function (existingUser) {
      if (existingUser == null || existingUser == undefined || existingUser == "") {
        return userModel.create(user);
      }
      else {
        return new Promise(function (resolve, reject) {
          reject('Username already exists.');
        });
      }
    },
    function (err) {
      return new Promise(function (resolve, reject) {
        reject(err);
      });
    }
  );
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function findUserByUsername(uname) {
  console.log("testUser!!");
  return userModel.findOne({username: uname})
}

function findUserByCredentials(uname, pswrd) {
  return userModel.findOne({
    username: uname,
    password: pswrd
  });
}

function updateUser(userId, user) {
  return userModel.update({_id: userId}, user)
}

function deleteUser(userId) {
  return userModel.deleteOne({_id: userId});
}

function findUserByFacebookId(facebookId) {
  return userModel.findOne({'facebook.id': facebookId});
}

