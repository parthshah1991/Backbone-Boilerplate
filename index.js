var express = require('express');
var path = require('path');

var app = new express();

app.set('port', (process.env.PORT || 8000));


const router = express.Router();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});