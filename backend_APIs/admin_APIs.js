var IMAGE_PATH = "../imageStorage/";

var pg = require('pg');
var fs = require('fs');
var thumbnailGenerator = require("./thumbnailGenerator.js");
var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, '../imageStorage/');
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, Date.now()+"-"+file.originalname);
  }
})
var upload = multer({ storage: storage })
//var upload = multer({ dest: '../imageStorage/' })
try {
  var auth = JSON.parse(fs.readFileSync("../auth/auth.json"));
} catch(err) {
  console.log("WARNING: auth file not founc");
  console.log(err);
}


var init = function(app, DATABASE_URL) {

  /*
    NEW VERSION OF meal upload API
  */
  app.post('/uploadHandler', upload.single('file'), function (req, res, next) {
    console.log("POST /uploadHandler");

    //TODO:
    // add code here
    if (auth) {
      if (req.body.password!=auth.lg1 || req.body.password!=auth.apc ||
        req.body.password!=auth.grb || req.body.password!=auth.millano) {
        console.log("ERROR: authentication failed");
        res.send({status:"ERROR: authentication failed"});
        return;
      }
    }

    console.log(req.file);
    if (!req.file || !req.file.originalname) {
      res.send({status:"ERROR: image file not found"});
      return;
    }
    if (!req.body.name || !req.body.price) {
      res.send({status:"ERROR: required fields null"});
      return;
    }
    console.log(`Received file ${req.file.originalname}`);
    console.log(req.body);
    var img_name = req.file.filename;
    var img_ext = req.file.filename.split(".")[1];
    var img_name_without_ext = req.file.filename.split(".")[0];

    thumbnailGenerator.createThumbnails(IMAGE_PATH+img_name, IMAGE_PATH+img_name_without_ext, img_ext, function(image_path) {
      console.log("thumbnails created!");
      console.log(img_name);

      if (req.body.offeredTimes) {
        req.body.offeredTimes = req.body.offeredTimes.split(",");
      } else {
        req.body.offeredTimes=[];
      }
      if (req.body.tasteTypes) {
        req.body.tasteTypes = req.body.tasteTypes.split(",");
      } else {
        req.body.tasteTypes=[];
      }
      if (req.body.foodTypes) {
        req.body.foodTypes = req.body.foodTypes.split(",");
      } else {
        req.body.foodTypes=[];
      }
      if (req.body.sauceTypes) {
        req.body.sauceTypes = req.body.sauceTypes.split(",");
      } else {
        req.body.sauceTypes=[];
      }

      pg.connect(DATABASE_URL, function(err, client, done) {
        client.query("INSERT INTO meal"+
                      "(restaurantId, name, chineseName, category, price, picture_url, "+
                      "cuisineTypeId, deliverySpeedId, offeredTimesId, "+
                      "tasteTypesId, ingredientTypesId, sauceTypesId, ingredientsDescription, rating, rating_count)"+
                      " values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
                      [req.body.restaurant_name, req.body.name,
                        req.body.chineseMealName, req.body.category,
                        req.body.price, req.body.picture_url,
                        req.body.cuisineType, req.body.deliverySpeed,
                        req.body.offeredTimes, req.body.tasteTypes,
                        req.body.foodTypes, req.body.sauceTypes, req.body.ingredientsDescription,
                        req.body.rating, 0
                      ],
                      function(err, result) {
          if (err)
           { console.error(err); res.send("Error " + err); }
          else
           { console.log("MEAL UPLOAD SUCCESS"); res.status(200).send({"status":"SUCCESS"}); }
        });
        done();
      });
    });

    //res.send({ responseText: req.file.path }); // You can send any response to the user here
  });


  app.post('/api/auth/lg1', function (req, res) {
    console.log("POST /api/auth/lg1");
    if (!auth) {
      res.send("SUCCESS");
      return;
    }
    if (auth) {
      if (auth.lg1 == req.body.password) {
        res.send("SUCCESS");
      } else {
        return;
      }
    }
  });
  app.post('/api/auth/grb', function (req, res) {
    console.log("POST /api/auth/grb");
    if (!auth) {
      res.send("SUCCESS");
      return;
    }
    if (auth) {
      if (auth.grb == req.body.password) {
        res.send("SUCCESS");
      } else {
        return;
      }
    }
  });
  app.post('/api/auth/apc', function (req, res) {
    console.log("POST /api/auth/apc");
    if (!auth) {
      res.send("SUCCESS");
      return;
    }
    if (auth) {
      if (auth.apc == req.body.password) {
        res.send("SUCCESS");
      } else {
        return;
      }
    }
  });
  app.post('/api/auth/millano', function (req, res) {
    console.log("POST /api/auth/millano");
    if (!auth) {
      res.send("SUCCESS");
      return;
    }
    if (auth) {
      if (auth.millano == req.body.password) {
        res.send("SUCCESS");
      } else {
        return;
      }
    }
  });


  /*
    NEW VERSION OF meal update API
  */
  app.post('/updateMeal', function (req, res, next) {
    console.log("POST /updateMeal");

    //TODO:
    // add code here
    if (auth) {
      if (req.body.password!=auth.lg1 || req.body.password!=auth.apc ||
        req.body.password!=auth.grb || req.body.password!=auth.millano) {
        console.log("ERROR: authentication failed");
        res.send({status:"ERROR: authentication failed"});
        return;
      }
    }

    if (req.body.offeredTimes) {
      req.body.offeredTimes = req.body.offeredTimes.split(",");
    } else {
      req.body.offeredTimes=[];
    }
    if (req.body.tasteTypes) {
      req.body.tasteTypes = req.body.tasteTypes.split(",");
    } else {
      req.body.tasteTypes=[];
    }
    if (req.body.foodTypes) {
      req.body.foodTypes = req.body.foodTypes.split(",");
    } else {
      req.body.foodTypes=[];
    }
    if (req.body.sauceTypes) {
      req.body.sauceTypes = req.body.sauceTypes.split(",");
    } else {
      req.body.sauceTypes=[];
    }

    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query("INSERT INTO meal"+
                    "(restaurantId, name, chineseName, category, price, picture_url, "+
                    "cuisineTypeId, deliverySpeedId, offeredTimesId, "+
                    "tasteTypesId, ingredientTypesId, sauceTypesId, ingredientsDescription, rating, rating_count)"+
                    " values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
                    [req.body.restaurant_name, req.body.name,
                      req.body.chineseMealName, req.body.category,
                      req.body.price, req.body.picture_url,
                      req.body.cuisineType, req.body.deliverySpeed,
                      req.body.offeredTimes, req.body.tasteTypes,
                      req.body.foodTypes, req.body.sauceTypes, req.body.ingredientsDescription,
                      req.body.rating, 0
                    ],
                    function(err, result) {
        if (err)
         { console.error(err); res.send("Error " + err); }
        else
         { console.log("MEAL UPLOAD SUCCESS"); res.status(200).send({"status":"SUCCESS"}); }
      });
      done();
    });

  });

  /*
    updateMeal
  */
  app.post('/updateMeal', function (req, res) {
    if (auth) {
      if (req.body.password!=auth.lg1 || req.body.password!=auth.apc ||
        req.body.password!=auth.grb || req.body.password!=auth.millano) {
        console.log("ERROR: authentication failed");
        res.send({status:"ERROR: authentication failed"});
        return;
      }
    }
    console.log("POST /updateMeal" + req.body.menuId);
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query("UPDATE meal SET ingredientsDescription = $2, "+
                    "name = $3, chineseMealName = $4, price = $5 "+
                    "WHERE meal.id = $1",
                    [req.body.menuId, req.body.ingredientsDescription,
                      req.body.name, req.body.chineseMealName, req.body.price
                    ],
                    function(err, result) {
        if (err)
        {
          console.error(err); res.send("Error " + err);
        }
        else
        {
          console.log("menu update result:");
          console.log(result.rows);
          res.status(200).send({"status":"SUCCESS"});
        }
      });
      done();
    });
  });

  // DEPRECIATED
  app.post('/admin_only_update_menu', function (req, res) {
    console.log("/admin_only_update_menu menuID = " + req.body.menuId);
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query("UPDATE meal SET ingredientsDescription = $2, rating = $3, rating_count = $4"+
                    "WHERE meal.id = $1",
                    [req.body.menuId, req.body.ingredientsDescription, req.body.rating, 1],
                    function(err, result) {
        if (err)
        {
          console.error(err); res.send("Error " + err);
        }
        else
        {
          console.log("menu update result");
          console.log(result.rows);
          res.status(200).send({"status":"SUCCESS"});
        }
      });
      done();
    });
  });

  //
  app.post('/deleteMeal', function (request, response) {
    if (auth) {
      if (req.body.password!=auth.lg1 || req.body.password!=auth.apc ||
        req.body.password!=auth.grb || req.body.password!=auth.millano) {
        console.log("ERROR: authentication failed");
        res.send({status:"ERROR: authentication failed"});
        return;
      }
    }
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
         { response.status(200).send({"status":"SUCCESSS"}); }
      });
      done();
    });
  });

  app.get('/meal/all', function (request, response) {
    //console.log("database URL = "+(process.env.DATABASE_URL || LOCAL_DATABASE_URL));
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query('SELECT * FROM meal', function(err, result) {
        done();
        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { response.status(200).send({"status":"SUCCESS", "result":result.rows}); }
      });
    });
  });

}

module.exports.init = init;
