var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var LOCAL_DATABASE_URL = "postgres://bibcnlyezwlkhl:gdhvCdkdw5znI-LjSspT6wKOfR@ec2-54-225-223-40.compute-1.amazonaws.com:5432/davktp8lndlj83"+'?ssl=true';

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
app.get('/insertMenu', function(request, response) {
  response.render('pages/insertMenu');
});
app.get('/searchResult', function(request, response) {
  response.render('pages/search_result_page');
});

//this one is dummy page for prototype
app.get('/filterSearchResult', function(request, response) {
  response.render('pages/dummyFilterSearchPage');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var pg = require('pg');

app.get('/db', function (request, response) {
  console.log("database URL = "+(process.env.DATABASE_URL || LOCAL_DATABASE_URL));
  pg.connect((process.env.DATABASE_URL || LOCAL_DATABASE_URL), function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

// render a page
app.get('/db_meal', function (request, response) {
  //console.log("database URL = "+(process.env.DATABASE_URL || LOCAL_DATABASE_URL));
  pg.connect((process.env.DATABASE_URL || LOCAL_DATABASE_URL), function(err, client, done) {
    client.query('SELECT * FROM meal', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { console.log(JSON.stringify(result.rows)); response.render('pages/db_meal', {status:"SUCCESS", result:JSON.stringify(result.rows)}); }
    });
  });
});

// returns json object
app.get('/meal/all', function (request, response) {
  //console.log("database URL = "+(process.env.DATABASE_URL || LOCAL_DATABASE_URL));
  pg.connect((process.env.DATABASE_URL || LOCAL_DATABASE_URL), function(err, client, done) {
    client.query('SELECT * FROM meal', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.json({"status":"SUCCESS", "result":result.rows}); }
    });
  });
});


/*
req.body =
{
    "restaurant":"GRB",
    "category":"chef's recommendations",
    "name":"spagetti",
    "picture_url":"www.placebear.com/800/600",
    "price":28.5,
    "offeredBreakfast":false,
    "offeredLunch":true,
    "offeredDinner":true

}


*/

//TODO: insert tasteTypeInfo, and foodTypeInfo
app.post('/uploadMeal', function (request, response) {
  console.log("req.body = "+request.body);
  console.log("restaurant id  = "+ request.body.restaurant_name);
  console.log("offeredTimes = "+request.body.offeredTimes);
  pg.connect((process.env.DATABASE_URL || LOCAL_DATABASE_URL), function(err, client, done) {
    client.query("INSERT INTO meal"+
                  "(location, restaurantNameId, name, price, picture_url, "+
                  "deliverySpeed, offeredTimes, "+
                  "cuisineTypeId, rating)"+
                  " values ($1,$2,$3,$4,$5,$6,$7,$8,$9)",
                  [request.body.location, request.body.restaurant_name, request.body.name,
                    request.body.price, request.body.picture_url, request.body.deliverySpeed,
                    request.body.offeredTimes, request.body.cuisineType, request.body.rating],
                  function(err, result) {

      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.json({"status":"SUCCESS"}); }
    });
    done();
  });
  /*var restaurant = request.body.restaurant;
  var category = request.body.category;
  var name = request.body.name;
  var picture_url = request.body.picture_url;

  var price = request.body.price;

  var offeredBreakfast = request.body.offeredBreakfast;
  var offeredLunch = request.body.offeredLunch;
  var offeredDinner = request.body.offeredDinner;

  pg.connect((process.env.DATABASE_URL || LOCAL_DATABASE_URL), function(err, client, done) {
    client.query('INSERT INTO meal'+
                  '(restaurant, category, name, picture_url, price, offeredBreakfast, offeredLunch, offeredDinner)'+
                  ' values ($1,$2,$3,$4,$5,$6,$7,$8)',
                  [restaurant, category, name, picture_url, price, offeredBreakfast, offeredLunch, offeredDinner],
                  function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.json({"status":"SUCCESS"}); }
    });
  });*/
  //response.json({"status":"SUCCESS", "result":request.body});
});
