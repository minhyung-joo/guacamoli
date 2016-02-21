var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});
app.get('/lg1', function(request, response) {
  response.render('pages/lg1');
});
app.get('/lg7', function(request, response) {
  response.render('pages/lg7');
});
app.get('/cafe', function(request, response) {
  response.render('pages/cafe');
});
app.get('/lsk', function(request, response) {
  response.render('pages/lsk');
});
app.get('/rankings', function(request, response) {
  response.render('pages/index');
  //$('.ranking_link').trigger('click');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect((process.env.DATABASE_URL || "postgres://bibcnlyezwlkhl:gdhvCdkdw5znI-LjSspT6wKOfR@ec2-54-225-223-40.compute-1.amazonaws.com:5432/davktp8lndlj83"), function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
})
