var express = require('express');
var fx = require("fs");
var path = require("path");

var app = express();


console.log(__dirname);
app.use(express.static(__dirname + '/../../imageStorage'));

app.set('port', (8282));
app.listen(app.get('port'), function() {
  console.log('Image provider service is running on port', app.get('port'));
});
