var express = require('express');
var bodyParser = require("body-parser");
var cloudinary = require("cloudinary");
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
                  "(restaurantId, name, price, picture_url, "+
                  "cuisineTypeId, deliverySpeedId, offeredTimesId, "+
                  "tasteTypesId, foodTypesId, sauceTypesId)"+
                  " values ($1,$2,$3,$4,$5,$6,$7,$8,$9, $10)",
                  [request.body.restaurant_name, request.body.name,
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

// Static fileserver serving files in /public folder
//app.use(express.static(__dirname + '/public'))

/*app.use(multer({ dest: './public/uploads/',
  rename: function (fieldname, filename) {
      console.log("rename file, filename = "+filename);
      return filename+Date.now();               // Ensures uniqueness
  },
  /// @todo check if filetype is actually an image
  //  https://github.com/mscdex/mmmagic
  onFileUploadStart: function (file) {
    console.log(file.originalname + ' is starting ...');
  },
  onFileUploadComplete: function (file, req) {
    console.log(file.fieldname + ' uploaded to  ' + file.path)
    // Use dependency injection to pass on this variable
    req.filepath = file.path.replace("public/", "");
  }
}).single('image'));*/

app.post('/uploadPhoto', function(req, res){
  console.log('/uploadPhoto');
  upload(req, res, function(err) {
    if(err) {
      return res.json({error: "uploadphoto has an error:\n"+err});
    }
    console.log("upload to server complete, file = ");
    console.log(req.file);
    var filename = "./public/uploads/" + req.file.filename;
    //res.json({Filepath: filename});
    cloudinary.uploader.upload(filename, function(result) {
	    if (result.error) {
		    return res.json({error: "Something went wrong with cloudinary upload"});
	    }
      res.json({Filepath: result.url});
	  });
  });
});
