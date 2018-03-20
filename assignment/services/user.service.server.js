
module.exports = function (app) {

  app.put("/api/user/:userId", updateUserById);

  app.post("/api/user", createUser);
  app.get("/api/user/hello", helloUser);
  app.get("/api/user/:userId", findUserById);
  //app.get("/api/user", findAllUsers);
  app.get("/api/user", findUser);
  app.delete("/api/user/:userId", deleteUser);

  var users = [
    {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonderland"  },
    {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
  ];

  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  function findUserById(req, res){
    var userId = req.params["userId"];
    var user = users.find(function (user) {
       return user._id === userId;
    });
    res.json(user);
  }

  function findAllUsers(req, res){
    res.json(users);
  }

  function findUser(req, res){
    var username = req.query["username"];
    var password = req.query["password"];

    var user = null;

    if (username && password){
      user = users.find(function (user) {
          return user.username === username && user.password === password;
      });
    } else {
      user = users.find(function (user) {
        return user.username === username;
      });
    }
    if (!user){
      res.status("401");
    }
    res.json(user);
  }

  function updateUserById(req, res){
    var userId = req.params['userId'];
    var user = req.body;

    for(var i = 0; i < users.length; i++) {
      if (users[i]._id === userId) {
        users[i].firstName = user.firstName;
        users[i].lastName = user.lastName;

        res.status(200).send(user);
        return;
      }
    }
    res.status(404).send("not found user!");
  }

  function deleteUser(req, res) {
    var userId = req.params["userId"];
    for (const i in users) {
      if (users[i]._id === userId) {
        const j = +i;
        users.splice(j, 1);
      }
      res.send("success");
    }
  }

  function createUser(req, res) {
    console.log("testUser");
    var createdUser = req.body;

    var user = users.find(function (user) {
      return user.username === createdUser.username;
    });
    if (user){
      res.status(403).send("username repetition!!");
    }else {
      // use String here to consist what User be defined in client side
      createdUser._id = new Date().getTime().toString();
      users.push(createdUser);
      res.json(createdUser);
    }
  }
}
