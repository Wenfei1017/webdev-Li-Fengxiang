var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");


module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");

  var facebookConfig = {
    clientID : 245376276032051,
    // 232954744112434
    // clientID : 232954744112434,
    clientSecret : '59f7031c39559cf1a66ce700d880ec14',
    // clientSecret: '4afc85323b92bfd913d34abb73a55992',
    // callbackURL : 'https://valeryfardeli-webdev.herokuapp.com/auth/facebook/callback',
    // callbackURL : 'https://localhost:3200/auth/facebook/callback',
    callbackURL : 'https://webdev-fengxiang-li.herokuapp.com/auth/facebook/callback',

  };

  app.put("/api/user/:userId", updateUserById);
  app.post("/api/user", createUser);
  app.get("/api/user/hello", helloUser);
  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUser);
  app.delete("/api/user/:userId", deleteUser);

  // Passport config
  app.post("/api/login", passport.authenticate('local'), login);
  app.post("/api/logout", logout);
  app.post("/api/register", register);
  app.post("/api/loggedIn", loggedin);


  app.get("/facebook/login", passport.authenticate('facebook', { scope: 'email' }));

  app.get("/auth/facebook/callback",
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function (req, res) {
      const url = 'https://webdev-fengxiang-li.herokuapp.com/user/' + req.user._id;
      res.redirect(url);
    }
  );

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
    console.log("loginFrom");
    var user = req.user;
    res.json(user);
  }

  function logout(req, res) {
    req.logOut();
    res.sendStatus(200);
  }


  function register (req, res) {
    console.log("userHere");
    var user = req.body;
    console.log(user);
    userModel.createUser(user).then(
      function (user) {
        console.log(user);
        console.log("success Create");
        if(user){
          console.log("success User is");
          console.log(req.login);
            req.login(user, function(err) {
              if(err) {
                console.log(user);
                console.log("falseReq");
                res.status(400).send(err);
              } else {
                console.log(user);
                console.log("trueReq");
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
    console.log("tests");
    model
      .userModel
      .findUserByGoogleId(profile.id)
      .then(
        function (user) {
          if (user) {
            return done(null, user);
          } else {
            var email = profile.emails[0].value;
            var emailParts = email.split("@");
            var newFacebookUser = {
              username: emailParts[0],
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
              email: email,
              websites: [],
              google: {
                id: profile.id,
                token: token
              }
            };
            return model.userModel.createUser(newFacebookUser);
          }
        },
        function (err) {
          if (err) {
            return done(err);
          }
        }
      )
      .then(
        function (user) {
          return done(null, user);
        },
        function (err) {
          if (err) {
            return done(err);
          }
        }
      );
  }

  function loggedin(req, res) {
    // console.log("isloggedin?");
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
