//////////////////////////////////////////////////////////
// app dependencies
//////////////////////////////////////////////////////////
var RUNNING_ON_ITSC_SERVER = false;
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var pg = require('pg');

var app = express();

var path = require("path");

//////////////////////////////////////////////////////////
// set DATABASE URI to either heroku or localhost database
//////////////////////////////////////////////////////////
var DATABASE_URL;
if (RUNNING_ON_ITSC_SERVER) {
  process.chdir("/home/guacamoli/guacamoli");
  DATABASE_URL = "postgres://guacamoli:1234@localhost:5432/guacamoli";
  app.set('port', 80);
  app.listen(app.get('port'), function() {
    console.log('Node (ust.hk) app is running on port', app.get('port'));
  });
}
else {
  DATABASE_URL = process.env.DATABASE_URL
                || "postgres://bibcnlyezwlkhl:gdhvCdkdw5znI-LjSspT6wKOfR@ec2-54-225-223-40.compute-1.amazonaws.com:5432/davktp8lndlj83"+'?ssl=true';

  app.set('port', (process.env.PORT || 5000));
  app.listen(app.get('port'), function() {
    console.log('Node (heroku & local) app is running on port', app.get('port'));
  });
}

//////////////////////////////////////////////////////////
// initialize app
//////////////////////////////////////////////////////////
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname+'/index.html'));
  //res.sendFile(__dirname + '/index.html')
});


//////////////////////////////////////////////////////////////
// routes and APIs
/////////////////////////////////////////////////////////////
require("./backend_APIs/admin_routes.js").init(app, DATABASE_URL);
require("./backend_APIs/admin_APIs.js").init(app, DATABASE_URL);
require("./backend_APIs/front_APIs.js").init(app, DATABASE_URL);

app.post('/uploadHandler', upload.single('file'), function (req, res, next) {
  if (req.file && req.file.originalname) {
    console.log(`Received file ${req.file.originalname}`);
    console.log(req.file);
    console.log(req.body);
  }

  res.send({ responseText: req.file.path }); // You can send any response to the user here
});
