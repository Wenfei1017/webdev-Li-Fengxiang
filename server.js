/**
 * Created by sesha on 6/2/17.
 */

// Get the dependencies
const express = require('express');

// parse info when receive
// parse JSON file from HTTP response
const bodyParser = require('body-parser');
const app = express();

const path = require('path');
const http = require('http');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'src/assets/vendors')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const port = process.env.PORT || '3200';
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

require("./assignment/app")(app);

// For Build: Catch all other routes and return the index file -- BUILDING
app.get('*', function (req, res) {
  // res.sendFile(path.join(__dirname, 'dist/index.html'));
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

server.listen( port , function() {
  console.log('Node app is running on port', app.get('port'))
});







