var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google-oauth20').Strategy;

var FacebookStrategy = require('passport-facebook').Strategy;

var bcrypt = require("bcrypt-nodejs");
var cookieParser = require('cookie-parser');
var session = require('express-session');

// var googleConfig = {
//   clientID: process.env.GOOGLE_CLIENT_ID,
//   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//   callbackURL: process.env.GOOGLE_CALLBACK_URL
// };

var facebookConfig = {
  clientID : process.env.FACEBOOK_CLIENT_ID,
  clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
  callbackURL : process.env.FACEBOOK_CALLBACK_URL,
};

module.exports = function (app) {

  var userModel = require("../model/user/user.model.server");

  app.put("/api/user/:userId", updateUserById);
  app.post("/api/user", createUser);
  app.get("/api/user/hello", helloUser);
  app.get("/api/user/:userId", findUserById);
  app.get("/api/user", findUser);
  app.delete("/api/user/:userId", deleteUser);

  // Passport config
  // app.post('/api/login', passport.authenticate('LocalStrategy'), login);
  app.post ('/api/login', passport.authenticate('local'), login);
  app.post('/api/logout', logout);
  app.post('/api/register', regitser);
  app.get('/api/loggedin', loggedin);

  app.get ('/facebook/login', passport.authenticate('facebook', { scope : 'email' }));

  app.get('/auth/facebook/callback', passport.authenticate(
    'facebook', {
      successRedirect: '/#/profile',
      failureRedirect: '/#/login'
  }));

  passport.use('LocalStrategy', new LocalStrategy(localStrategy));
  passport.use(new GoogleStrategy(googleConfig, googleStrategy));

  passport.serializeUser(serializeUser);
  passport.deserializeUser(deserializeUser);

  // app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
  // app.get('/auth/google/callback',
  //   passport.authenticate('google', {
  //     successRedirect: '/assignment/#!/profile',
  //     failureRedirect: '/assignment/#!/login'
  //   }));

  function serializeUser(user, done) {
    done(null, user);
  }

  function deserializeUser(user, done) {
    model
      .userModel
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
    model
      .userModel
      .findUserByCredentials(username, password)
      .then(function (user) {
        if (user.username === username && user.password === password) {
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

  function deserializeUser(user, done) {
    developerModel
      .findDeveloperById(user._id)
      .then(
        function(user){
          done(null, user);
        },
        function(err){
          done(err, null);
        }
      );
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
    userModel.createUser(user).then(
      function (user) {
        if(user){
            req.login(user, function(err) {
              if(err) {
                res.status(400).send(err);
              } else {
                res.json(user);
              }
          });
        }
      }
      );
  }

  function facebookStrategy(token, refreshToken, profile, done) {
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
    res.send(req.isAuthenticated()?req.user : '0');
  }

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
