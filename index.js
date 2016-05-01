////////////////////////////////////////////
//      configurations
///////////////////////////////////////////
var express = require('express');
var bodyParser = require("body-parser");
var cloudinary = require("cloudinary");
var fs = require('fs');
var pg = require('pg');
var app = express();
<<<<<<< HEAD




if (process.env.PORT) {
  image_path = "https://guacamoli.herokuapp.com/uploads/";
}
else {
  image_path = "https://guacamoliii-hkust25.appcloud.ust.hk/uploads/";
}

//"http://guacamoliii-hkust25.appcloud.ust.hk/uploads/"
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
//var DATABASE_URL = "postgresql://"+process.env.OPENSHIFT_POSTGRESQL_DB_HOST+":"+process.env.OPENSHIFT_POSTGRESQL_DB_PORT;
var DATABASE_URL = "postgresql://admin5bxzk4e:7t32Pgi5GR_e@127.6.45.2:5432/guacamoliii";

app.set('port', (process.env.OPENSHIFT_NODEJS_PORT || 8080));
=======
var LOCAL_DATABASE_URL = "postgres://bibcnlyezwlkhl:gdhvCdkdw5znI-LjSspT6wKOfR@ec2-54-225-223-40.compute-1.amazonaws.com:5432/davktp8lndlj83"+'?ssl=true';

app.set('port', (process.env.PORT || 5000));
>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

<<<<<<< HEAD
app.listen(app.get('port'), server_ip_address, function() {
  console.log('Node app is running on port', app.get('port'));
});

=======
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2
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
<<<<<<< HEAD
  pg.connect(DATABASE_URL, function(err, client, done) {
=======
  pg.connect((process.env.DATABASE_URL || LOCAL_DATABASE_URL), function(err, client, done) {
>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2
    client.query("SELECT id, name FROM meal",
                  function(err, result) {
      if (err)
      {
        console.error(err); res.send("Error " + err);
      }
      else
      {
        console.log(result.rows);
<<<<<<< HEAD
        //res.send(result.rows);
=======
>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2
        res.render('pages/menu_list', {results: result.rows});
      }
    });
    done();
  });
});

app.get('/menu/:menuId', function (req, res) {
  console.log("/menu/params menuID = " + req.params.menuId);
<<<<<<< HEAD
  pg.connect(DATABASE_URL, function(err, client, done) {
=======
  pg.connect((process.env.DATABASE_URL || LOCAL_DATABASE_URL), function(err, client, done) {
>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2
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
<<<<<<< HEAD
        //res.send(result.rows);
=======
>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2
        res.render('pages/menu', {result: result.rows[0]});
      }
    });
    done();
  });
});


<<<<<<< HEAD
=======




>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2
////////////////////////////////////////////
//      REST APIs
///////////////////////////////////////////
// returns json object
app.get('/meal/all', function (request, response) {
  //console.log("database URL = "+(process.env.DATABASE_URL || LOCAL_DATABASE_URL));
<<<<<<< HEAD
  pg.connect(DATABASE_URL, function(err, client, done) {
=======
  pg.connect((process.env.DATABASE_URL || LOCAL_DATABASE_URL), function(err, client, done) {
>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2
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

<<<<<<< HEAD
  pg.connect(DATABASE_URL, function(err, client, done) {
    client.query("INSERT INTO meal"+
                  "(restaurantId, name, chineseName, category, price, picture_url, "+
                  "cuisineTypeId, deliverySpeedId, offeredTimesId, "+
                  "tasteTypesId, ingredientTypesId, sauceTypesId)"+
                  " values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)",
=======
  pg.connect((process.env.DATABASE_URL || LOCAL_DATABASE_URL), function(err, client, done) {
    client.query("INSERT INTO meal"+
                  "(restaurantId, name, chineseName, category, price, picture_url, "+
                  "cuisineTypeId, deliverySpeedId, offeredTimesId, "+
                  "tasteTypesId, ingredientTypesId, sauceTypesId, rating)"+
                  " values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2
                  [request.body.restaurant_name, request.body.name,
                    request.body.chineseMealName, request.body.category,
                    request.body.price, request.body.picture_url,
                    request.body.cuisineType, request.body.deliverySpeed,
                    request.body.offeredTimes, request.body.tasteTypes,
<<<<<<< HEAD
                    request.body.foodTypes, request.body.sauceTypes],
=======
                    request.body.foodTypes, request.body.sauceTypes, request.body.rating],
>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2
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
<<<<<<< HEAD
//var cloudinary  =   require('cloudinary')
=======
var cloudinary  =   require('cloudinary')
>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2
var multer      =   require('multer');
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/uploads');
  },
  filename: function (req, file, callback) {
<<<<<<< HEAD
    callback(null, file.originalname/* + '-' + Date.now()*/);
  }
});
var upload      =   multer({storage:storage}).single('image');
/*
=======
    callback(null, file.originalname + '-' + Date.now());
  }
});
var upload      =   multer({storage:storage}).single('image');

>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2
cloudinary.config({
  cloud_name: 'hdgw6ruas',
  api_key: '965541217938815',
  api_secret: 'h_2qUkQAXWPeZdW95rb_C9lv0z8'
});
<<<<<<< HEAD
*/
=======

>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2

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
<<<<<<< HEAD
      res.json({Filepath: (image_path+req.file.filename)});
      //var filename = "./public/uploads/" + req.file.filename;

      //res.json({Filepath: filename});
      /*cloudinary.uploader.upload(filename, function(result) {
=======
      var filename = "./public/uploads/" + req.file.filename;

      //res.json({Filepath: filename});
      cloudinary.uploader.upload(filename, function(result) {
>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2
  	    if (result.error) {
  		    return res.json({error: "Something went wrong with cloudinary upload"});
  	    }
        else {
          fs.unlinkSync(filename);
          res.json({Filepath: result.url});
        }
<<<<<<< HEAD
  	  });*/
=======
  	  });
>>>>>>> 7208b39367d01d10bd8223950679aba0f3ca84c2
    }
  });
});
