var express = require('express');
var path = require('path');

var app = new express();

var port = process.env.PORT || 3000;


const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


var server = app.listen(port, function () {
  console.log("Started on " + port);
});