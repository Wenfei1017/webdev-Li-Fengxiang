module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");

  app.put("/api/user/:userId", updateUserById);
  app.post("/api/user", createUser);
  app.get("/api/user/hello", helloUser);
  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUser);
  app.delete("/api/user/:userId", deleteUser);

  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  function createUser(req, res) {

    var createdUser = req.body;
    userModel.createUser(createdUser).then(
      function (user){
        res.status(200).json(user);
      },
      function (error){
        res.status(400).send("User creation failed. " + error);
      }
    );
  }

  function findUserById(req, res){
    var userId = req.params["userId"];
    userModel.findUserById(userId).then(
      function (user){
        if(user){
          res.status(200).json(user);
        }else{
          res.status(404).send("User not found by id!");
        }
      },
      function (error){
        res.status(400).send(error);
      }
    );
  }

  function findUser(req, res){
    var username = req.query["username"];
    var password = req.query["password"];

    var user = null;
    if (username && password){
      userModel.findUserByCredentials(username, password).then(
        function (user){
          if(user){
            res.status(200).json(user);
          } else{
            res.status(404).send("Wrong username or password!");
          }
        },
        function (error){
          res.status(400).send(error);
        }
      );
    } else {
      userModel.findUserByUsername(username).then(
        function (user){
          if(user){
            res.status(200).json(user);
          } else{
            res.status(404).send("User not found by username.");
          }
        },
        function (error){
          res.status(400).send(error);
        }
      );
    }
  }

  function updateUserById(req, res){
    var userId = req.params['userId'];
    var newUser = req.body;
    userModel.updateUser(userId, newUser).then(
      function (user){
        if(user){
          console.log("testUser");
          console.log(user);
          res.status(200).json(user);
        } else{
          res.status(404).send("User not found when update.");
        }
      },
      function (error){
        res.status(400).send(error);
      }
    );

  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    if(userId){
      userModel.deleteUser(userId).then(
          function (status){
            res.status(200);
          },
          function (error){
            res.status(400).send(error);
          }
        );
    } else{
      res.status(412);
    }
  }
}
