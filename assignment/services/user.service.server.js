module.exports = function (app, models) {

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
    console.log("testUser");

    var createdUser = req.body;
    console.log(models);
    models.userModel.createUser(createdUser).then(
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
    console.log("test");
    console.log(userId);
    models.userModel.findUserById(userId).then(
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
    console.log("test");
    console.log(models);
    if (username && password){
      models.userModel.findUserByCredentials(username, password).then(
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
      models.userModel.findUserByUsername(username).then(
        function successCallback(user){
          if(user){
            res.status(200).json(user);
          } else{
            res.status(404).send("User not found by username.");
          }
        },
        function errorCallback(error){
          res.status(400).send(error);
        }
      );
    }
  }

  function updateUserById(req, res){
    var userId = req.params['userId'];
    var newUser = req.body;
    models.userModel.updateUser(userId, newUser).then(
      function successCallback(user){
        if(user){
          res.status(200).json(user);
        } else{
          res.status(404).send("User not found when update.");
        }
      },
      function errorCallback(error){
        res.status(400).send(error);
      }
    );

  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    if(userId){
      model.userModel.deleteUser(uid).then(
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
