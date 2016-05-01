////////////////////////////////////////////
//      configurations
///////////////////////////////////////////
var express = require('express');
var bodyParser = require("body-parser");
var cloudinary = require("cloudinary");
var fs = require('fs');
var pg = require('pg');
var app = express();

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var DATABASE_URL = "postgresql://"+process.env.OPENSHIFT_POSTGRESQL_DB_HOST+":"+process.env.OPENSHIFT_POSTGRESQL_DB_PORT;

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

////////////////////////////////////////////
//      page views
///////////////////////////////////////////
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

////////////////////////////////////////////
//      page views - render ejs
///////////////////////////////////////////


app.get('/menu_list', function (req, res) {
  console.log("menu_list");
  pg.connect(DATABASE_URL, function(err, client, done) {
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

app.get('/menu/:menuId', function (req, res) {
  console.log("/menu/params menuID = " + req.params.menuId);
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("SELECT * FROM meal "+
                  "INNER JOIN restaurant ON meal.restaurantId = restaurant.id "+
                  "INNER JOIN offeredTime ON offeredTime.id = ANY(meal.offeredTimesId) "+
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
        res.send(result.rows);
        //res.render('pages/menu', {result: result.rows[0]});
      }
    });
    done();
  });
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
                  "tasteTypesId, ingredientTypesId, sauceTypesId)"+
                  " values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
                  [request.body.restaurant_name, request.body.name,
                    request.body.chineseMealName, request.body.category,
                    request.body.price, request.body.picture_url,
                    request.body.cuisineType, request.body.deliverySpeed,
                    request.body.offeredTimes, request.body.tasteTypes,
                    request.body.foodTypes, request.body.sauceTypes],
                  function(err, result) {

      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.json({"status":"SUCCESS"}); }
    });
    done();
  });

});

//////////////////////////////////////////////////////////////////////
/// Image upload
//////////////////////////////////////////////////////////////////////
var cloudinary  =   require('cloudinary')
var multer      =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname + '-' + Date.now());
  }
});
var upload      =   multer({storage:storage}).single('image');

cloudinary.config({
  cloud_name: 'hdgw6ruas',
  api_key: '965541217938815',
  api_secret: 'h_2qUkQAXWPeZdW95rb_C9lv0z8'
});


app.post('/uploadPhoto', function(req, res){
  console.log('/uploadPhoto');
  upload(req, res, function(err) {
    if(err) {
      console.log("uploadphoto has an error ");
      return res.json({error: "uploadphoto has an error:\n"+err});
    }
    else {
      console.log("upload to server complete, file = ");
      console.log(req.file);
      res.json({Filepath: req.file});
      //var filename = "./public/uploads/" + req.file.filename;

      //res.json({Filepath: filename});
      /*cloudinary.uploader.upload(filename, function(result) {
  	    if (result.error) {
  		    return res.json({error: "Something went wrong with cloudinary upload"});
  	    }
        else {
          fs.unlinkSync(filename);
          res.json({Filepath: result.url});
        }
  	  });*/
    }
  });
});
