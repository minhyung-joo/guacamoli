#!/bin/env node
//  OpenShift sample Node application
var express = require('express');
var fs      = require('fs');
var pg = require('pg');
var bodyParser = require("body-parser");
var app = express();

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var conString = "postgres://admin5bxzk4e:7t32Pgi5GR_e@localhost/guacamoliii";
/*
var SampleApp = function() {

    //  Scope.
    var self = this;

    self.setupVariables = function() {
        //  Set the environment variables we need.
        self.ipaddress = process.env.OPENSHIFT_NODEJS_IP;
        self.port      = process.env.OPENSHIFT_NODEJS_PORT || 8080;

        if (typeof self.ipaddress === "undefined") {
            //  Log errors on OpenShift but continue w/ 127.0.0.1 - this
            //  allows us to run/test the app locally.
            console.warn('No OPENSHIFT_NODEJS_IP var, using 127.0.0.1');
            self.ipaddress = "127.0.0.1";
        };
    };


    self.populateCache = function() {
        if (typeof self.zcache === "undefined") {
            self.zcache = { 'index.html': '' };
        }

        //  Local cache for static content.
        self.zcache['index.html'] = fs.readFileSync('./index.html');
    };



    self.cache_get = function(key) { return self.zcache[key]; };


    self.terminator = function(sig){
        if (typeof sig === "string") {
           console.log('%s: Received %s - terminating sample app ...',
                       Date(Date.now()), sig);
           process.exit(1);
        }
        console.log('%s: Node server stopped.', Date(Date.now()) );
    };


    self.setupTerminationHandlers = function(){
        //  Process on exit and signals.
        process.on('exit', function() { self.terminator(); });

        // Removed 'SIGPIPE' from the list - bugz 852598.
        ['SIGHUP', 'SIGINT', 'SIGQUIT', 'SIGILL', 'SIGTRAP', 'SIGABRT',
         'SIGBUS', 'SIGFPE', 'SIGUSR1', 'SIGSEGV', 'SIGUSR2', 'SIGTERM'
        ].forEach(function(element, index, array) {
            process.on(element, function() { self.terminator(element); });
        });
    };


    self.createRoutes = function() {
        self.routes = { };

        self.routes['/asciimo'] = function(req, res) {
            var link = "http://i.imgur.com/kmbjB.png";
            res.send("<html><body><img src='" + link + "'></body></html>");
        };

        self.routes['/'] = function(req, res) {
            console.log("/ route");
            res.setHeader('Content-Type', 'text/html');
            res.send(self.cache_get('index.html') );
        };

        self.routes['/index'] = function(req, res) {
            console.log("/index route");
            res.setHeader('Content-Type', 'text/html');
            //res.render('views/pages/index.html');
            res.send(self.cache_get('/var/lib/openshift/5715d7274058f3835f00055f/app-root/repo/index.html'));
        };
    };


    self.initializeServer = function() {
        self.createRoutes();
        self.app = express.createServer();

        //  Add handlers for the app (from the routes).
        for (var r in self.routes) {
            self.app.get(r, self.routes[r]);
        }
    };


    self.initialize = function() {
        self.setupVariables();
        self.populateCache();
        self.setupTerminationHandlers();

        // Create the express server and routes.
        self.initializeServer();
    };


    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.port, self.ipaddress, function() {
            console.log('%s: Node server started on %s:%d ...',
                        Date(Date.now() ), self.ipaddress, self.port);
        });
    };

};
*/


app.set('port', (process.env.OPENSHIFT_NODEJS_PORT || 8080));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.listen(app.get('port'), server_ip_address, function() {
  console.log('Node app is running on port', app.get('port'));
});

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/menu_list', function (req, res) {
  console.log("menu_list");
  pg.connect((conString), function(err, client, done) {
    if (err) {
      console.error(err); res.send("Error " + err);
      return;
    }
    client.query("SELECT id, name FROM meal",
                  function(err, result) {
      if (err)
      {
        console.error(err); res.send("Error " + err);
      }
      else
      {
        console.log(result.rows);
        res.render('pages/menu_list', {results: result.rows});
      }
    });
    done();
  });
});


/*
var zapp = new SampleApp();
zapp.initialize();
zapp.start();
*/
