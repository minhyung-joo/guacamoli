//////////////////////////////////////////////////////////
// configurations
//////////////////////////////////////////////////////////
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('./webpack.config')
var express = require('express');
var bodyParser = require("body-parser");
var fs = require('fs');
var pg = require('pg');
var app = express();


var server_ip_address = process.env.OPENSHIFT_NODEJS_IP; // only for openshift
var DATABASE_URL;

//////////////// on openshift
if (process.env.OPENSHIFT_NODEJS_PORT) {
  DATABASE_URL = process.env.OPENSHIFT_POSTGRESQL_DB_URL;//"postgresql://adminmnvdci3:72fAHfuEN5q6";

  app.set('port', (process.env.OPENSHIFT_NODEJS_PORT || 8080));
  app.listen(app.get('port'), server_ip_address, function() {
    console.log('Node (openshift) app is running on port', app.get('port'));
  });
}
/////////////// on heroku or local
else {
  DATABASE_URL = process.env.DATABASE_URL
    || "postgres://bibcnlyezwlkhl:gdhvCdkdw5znI-LjSspT6wKOfR@ec2-54-225-223-40.compute-1.amazonaws.com:5432/davktp8lndlj83"+'?ssl=true';

  app.set('port', (process.env.PORT || 5000));
  app.listen(app.get('port'), function() {
    console.log('Node (heroku & local) app is running on port', app.get('port'));
  });
}

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
  res.sendFile(__dirname + '/index.html')
});




//////////////////////////////////////////////////////////////
// admin routes
/////////////////////////////////////////////////////////////


app.get('/admin_only_menu_list', function (req, res) {
  console.log("menu_list");
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("SELECT id, name FROM meal",
                  function(err, result) {
      if (err){
        console.error(err); res.send("Error " + err);
      }
      else{
        console.log(result.rows);
        res.render('pages/menu_list', {results: result.rows});
      }
    });
    done();
  });
});

/*
app.get('/menu/:menuId', function (req, res) {
  console.log("/menu/params menuID = " + req.params.menuId);
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("SELECT * FROM meal "+
                  "WHERE meal.id = $1",
                  [req.params.menuId],
                  function(err, result) {
      if (err)
      {
        console.error(err); res.send("Error " + err);
      }
      else
      {
        console.log("menu select result");
        console.log(result.rows);
        res.render('pages/menu', {result: result.rows[0]});
      }
    });
    done();
  });
});*/

app.get('/admin_only_update_menu/:menuId', function (req, res) {
  console.log("/admin_only_update_menu/params menuID = " + req.params.menuId);
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("SELECT * FROM meal "+
                  "WHERE meal.id = $1",
                  [req.params.menuId],
                  function(err, result) {
      if (err)
      {
        console.error(err); res.send("Error " + err);
      }
      else
      {
        console.log("menu select result");
        console.log(result.rows);
        res.render('pages/updateMenu', {result: result.rows[0]});
      }
    });
    done();
  });
});

app.get('/admin_only_insert_menu', function(request, response) {
  response.render('pages/insertMenu');
});





////////////////////////////////////////////
//      REST APIs
///////////////////////////////////////////
// returns json object
app.get('/meal/all', function (request, response) {
  //console.log("database URL = "+(process.env.DATABASE_URL || LOCAL_DATABASE_URL));
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM meal', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.json({"status":"SUCCESS", "result":result.rows}); }
    });
  });
});









///////////////////POST////////////////////////

//TODO: insert tasteTypeInfo, and foodTypeInfo
app.post('/uploadMeal', function (request, response) {
  //console.log("req.body = "+request.body);
  //console.log("restaurant id  = "+ request.body.restaurant_name);
  //console.log("offeredTimes = "+request.body.offeredTimes);
  if (!request.body.name || !request.body.picture_url) {
    console.log("upload meal failed: required fields null");
    response.json({"status":"FAIL: required fields null"});
    return;
  }
  if (!request.body.price) {
    request.body.price = 0;
  }
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("INSERT INTO meal"+
                  "(restaurantId, name, chineseName, category, price, picture_url, "+
                  "cuisineTypeId, deliverySpeedId, offeredTimesId, "+
                  "tasteTypesId, ingredientTypesId, sauceTypesId, ingredientsDescription)"+
                  " values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
                  [request.body.restaurant_name, request.body.name,
                    request.body.chineseMealName, request.body.category,
                    request.body.price, request.body.picture_url,
                    request.body.cuisineType, request.body.deliverySpeed,
                    request.body.offeredTimes, request.body.tasteTypes,
                    request.body.foodTypes, request.body.sauceTypes, request.body.ingredientsDescription],
                  function(err, result) {
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.json({"status":"SUCCESS"}); }
    });
    done();
  });

});



app.post('/admin_only_update_menu', function (req, res) {
  console.log("/admin_only_update_menu menuID = " + req.body.menuId);
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("UPDATE meal SET ingredientsDescription = $2 "+
                  "WHERE meal.id = $1",
                  [req.body.menuId, req.body.ingredientsDescription],
                  function(err, result) {
      if (err)
      {
        console.error(err); res.send("Error " + err);
      }
      else
      {
        console.log("menu update result");
        console.log(result.rows);
        res.json({"status":"SUCCESS"});
      }
    });
    done();
  });
});


//
app.post('/deleteMeal', function (request, response) {
  //console.log("req.body = "+request.body);
  //console.log("restaurant id  = "+ request.body.restaurant_name);
  //console.log("offeredTimes = "+request.body.offeredTimes);
  if (!request.body.id) {
    console.log("delete meal failed: required fields null");
    response.json({"status":"FAIL: required fields null"});
    return;
  }
  if (!request.body.price) {
    request.body.price = 0;
  }
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("DELETE FROM meal WHERE id = $1",
                  [request.body.id],
                  function(err, result) {
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.json({"status":"SUCCESSS"}); }
    });
    done();
  });

});
