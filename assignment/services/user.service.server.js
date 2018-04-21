var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");


module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");

  var facebookConfig = {
    clientID : 789222517955181,
    // 232954744112434
    // clientID : 232954744112434,
    clientSecret : '994a779ee2dcd248942a8c06ed36479d',
    // clientSecret: '4afc85323b92bfd913d34abb73a55992',
    // callbackURL : 'https://valeryfardeli-webdev.herokuapp.com/auth/facebook/callback',
    // callbackURL : 'https://localhost:3200/auth/facebook/callback',
    callbackURL : 'https://webdevprojectfx.herokuapp.com/auth/facebook/callback',
  };

  app.put("/api/user/:userId", updateUserById);
  app.post("/api/user", createUser);
  app.get("/api/user/hello", helloUser);
  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUser);
  app.get("/api/allUser", findAllUser);
  app.delete("/api/user/:userId", deleteUser);

  // Passport config
  app.post("/api/login", passport.authenticate('local'), login);
  app.post("/api/logout", logout);
  app.post("/api/register", register);
  app.post("/api/loggedIn", loggedin);


  app.get("/facebook/login", passport.authenticate('facebook', { scope: 'email' }));

  // auth with Facebook
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      successRedirect: '/user',
      failureRedirect: '/login'
    }));

  passport.use(new LocalStrategy(localStrategy));
  passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
      userModel
      .findUserById(user._id)
      .then(
        function (user) {
          done(null, user);
        },
        function (err) {
          done(err, null);
        }
      );
  }


  function localStrategy(username, password, done) {
      userModel
      .findUserByUsername(username)
      .then(function (user) {
        if (user && bcrypt.compareSync(password, user.password) ) {
          console.log("loginUser");
          console.log(user);
          done(null, user);
        } else {
          done(null, false);
        }
      }, function (error) {
        if(error) {
          return done(error);
        }
      });
  }

  function login(req, res) {
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
  }


  function register (req, res) {
    var user = req.body;
    console.log("jjjjjjj");
    user.password = bcrypt.hashSync(user.password);
    userModel.createUser(user).then(
      function (user) {
        console.log("userCreated");
        console.log(user);
        if(user){
            req.login(user, function(err) {
              if(err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
          });
        }
      },
      function (err) {
        res.status(200).json(err);
      }
    );
  }

  function facebookStrategy(token, refreshToken, profile, done) {
    console.log("facebookHere!!");
    userModel
      .findUserByFacebookId(profile.id)
      .then(
        function(user) {

          // check if user corresponding to this fb account exist
          if(user) {
            return done(null, user);
          }

          // create a new one if do not exist
          else {
            var names = profile.displayName.split(" ");
            var newFacebookUser = {
              username: 'username',
              lastName:  names[1],
              firstName: names[0],
              email:     profile.emails ? profile.emails[0].value : "",
              facebook: {
                id:    profile.id,
                token: token,
                displayName: names[0] + ' ' + names[1]
              }
            };
            return userModel.createUser(newFacebookUser);
          }
        },
        function(err) {
          if (err) { return done(err); }
        }
      )
      .then(
        function(user){
          return done(null, user);
        },
        function(err){
          if (err) { return done(err); }
        }
      );
  }

  function loggedin(req, res) {
    res.send(req.isAuthenticated()?req.user : '0');
  }

  function helloUser(req, res) {
    res.send("Hello from user service!");
  }

  function createUser(req, res) {

    var createdUser = req.body;
    createdUser.password = bcrypt.hashSync(createdUser.password);
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
          console.log(newUser);
          console.log("TTTT");
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
            res.json(status);
          },
          function (error){
            res.status(400).send(error);
          }
        );
    } else{
      res.status(412);
    }
  }

  function findAllUser(req, res) {
    console.log("test");
    userModel.findAllUser().then(
      function (users) {
        console.log(users);
        res.status(200).json(users);
      },
      function (error) {
        res.status(400).send(error);
      }
    )
  }
}
