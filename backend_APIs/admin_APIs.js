var pg = require('pg');

var init = function(app, DATABASE_URL) {

  //TODO: insert tasteTypeInfo, and foodTypeInfo
  app.post('/uploadMeal', function (request, response) {
    //console.log("req.body = "+request.body);
    //console.log("restaurant id  = "+ request.body.restaurant_name);
    //console.log("offeredTimes = "+request.body.offeredTimes);
    if (!request.body.name || !request.body.picture_url) {
      console.log("upload meal failed: required fields null");
      response.status(200).send({"status":"FAIL: required fields null"});
      return;
    }
    if (!request.body.price) {
      request.body.price = 0;
    }
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query("INSERT INTO meal"+
                    "(restaurantId, name, chineseName, category, price, picture_url, "+
                    "cuisineTypeId, deliverySpeedId, offeredTimesId, "+
                    "tasteTypesId, ingredientTypesId, sauceTypesId, ingredientsDescription, rating, rating_count)"+
                    " values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)",
                    [request.body.restaurant_name, request.body.name,
                      request.body.chineseMealName, request.body.category,
                      request.body.price, request.body.picture_url,
                      request.body.cuisineType, request.body.deliverySpeed,
                      request.body.offeredTimes, request.body.tasteTypes,
                      request.body.foodTypes, request.body.sauceTypes, request.body.ingredientsDescription,
                      request.body.rating, 1
                    ],
                    function(err, result) {
        if (err)
         { console.error(err); response.send("Error " + err); }
        else
         { response.status(200).send({"status":"SUCCESS"}); }
      });
      done();
    });

  });



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
