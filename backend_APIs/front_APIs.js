var pg = require('pg');

var init = function(app, DATABASE_URL) {

  app.get('/api/menu/:menuId', function (req, res) {
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
          res.status(200).send(result.rows[0]);
        }
      });
      done();
    });
  });


  app.get('/api/getCanteenList', function(req,res) {
    console.log(req.query.restaurantId+" menus");

    restaurantId=req.query.restaurantId;
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query("SELECT id, name, picture_url, price FROM meal WHERE restaurantId = $1",[restaurantId],
      function(err, result) {
        if (err){
          console.error(err); res.send("Error " + err);
        }
        else{
          console.log(result.rows);
          res.status(200).send(result.rows);
        }
      });
      done();
    });
  });

  app.get('/api/getAllRankings', function(req, res) {
    console.log("/api/getAllRankings");


    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query("SELECT id, name, picture_url, rating, price, restaurantid FROM meal",
      function(err, result) {
        if (err){
          console.error(err); res.send("Error " + err);
        }
        else{
          console.log(result.rows);

          var lg1Result = new Array();
          var grbResult = new Array();
          var apcResult = new Array();
          var millanoResult = new Array();

          for (var i=0; i<result.rows.length; ++i) {
            if ((result.rows[i].restaurantid) == 1) { // restaurant id == lg1
              lg1Result.push(result.rows[i]);
            }
            else if ((result.rows[i].restaurantid) == 3) { // restaurant id == GRB
              grbResult.push(result.rows[i]);
            }
            else if ((result.rows[i].restaurantid) == 4) { // restaurant id == APC
              apcResult.push(result.rows[i]);
            }
            else if ((result.rows[i].restaurantid) == 5) { // restaurant id == APC
              millanoResult.push(result.rows[i]);
            }
          }

          lg1Result = lg1Result.sort(function(a,b){return b.rating-a.rating;}).slice(0,10);
          grbResult = grbResult.sort(function(a,b){return b.rating-a.rating;}).slice(0,10);
          apcResult = apcResult.sort(function(a,b){return b.rating-a.rating;}).slice(0,10);
          millanoResult = millanoResult.sort(function(a,b){return b.rating-a.rating;}).slice(0,10);

          var finalResult = [{restaurant_id: 1, title:'lg1 ranking', rankingArray:lg1Result},
                              {restaurant_id: 3, title:'grb ranking', rankingArray:grbResult},
                              {restaurant_id: 4, title:'apc ranking', rankingArray:apcResult},
                              {restaurant_id: 5, title:'millano ranking', rankingArray:millanoResult}
                            ];

          res.status(200).send(finalResult);
        }
      });
      done();
    });

  });

  app.get('/api/query_search', function (req,res) {
    var keyword = req.query.query.toLowerCase();
    console.log('GET /api/query_search');
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query("SELECT id, name, picture_url, price FROM meal",
      function(err, result) {
        if (err){
          console.error(err); res.send("Error " + err);
        }
        else{
          var finalResult = new Array();

          for (var i=0; i<result.rows.length; ++i) {
            // keyword is a substring of the meal name
            if ((result.rows[i].name.toLowerCase()).indexOf(keyword) !== -1) {
              //console.log(result.rows[i]);
              finalResult.push(result.rows[i]);
            }
          }
          console.log(finalResult);
          res.status(200).send(finalResult);
        }
      });
      done();
    });
  });

  app.post('/api/filter_search', function (req,res) {
    console.log('POST /api/filter_search');
    var _restaurantId = req.body.restaurantId;
    var _deliveryTime = req.body.deliveryTime;
    var _offeredTime = req.body.offeredTime;
    var _cusine = req.body.cuisine;
    var _tasteType = req.body.tasteType;
    var _sauceType = req.body.sauceType;
    var _ingredientsType = req.body.ingredientsType;
    var _without = req.body.without;

    //console.log("getMenusByFilterTerm: ");
    //console.log("req.query.restaurantId="+_restaurantId);
    //console.log("req.query.tasteType="+_tasteType);

    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query("SELECT * FROM meal",
      function(err, result) {
        if (err){
          console.error(err); res.send("Error " + err);
        }
        else{
          var finalResult = new Array();
          // filter each item one by one
          for (var i=0; i<result.rows.length; ++i) {
            var validMenuFlag = true;

            if (!(_restaurantId==0 || _restaurantId == result.rows[i].restaurantid)) {
              validMenuFlag = false;
            }
            if (!(_deliveryTime==0 || _deliveryTime == result.rows[i].deliveryspeedid)) {
              validMenuFlag = false;
            }
            if (!(_cusine==0 || _cusine == result.rows[i].cusinetypeid)) {
              validMenuFlag = false;
            }
            //console.log("offeredTimes = "+result.rows[i]);
            // TODO!!!!! : DO THIS
            // filter one - array fields:
            if (result.rows[i].offeredTimesId) {
              var arrMatchExists = _offeredTime==0;
              for (var j=0; j< result.rows[i].offeredTimesId.length; ++j) {
                if (_offeredTime == result.rows[i].offeredTimesId[i]) {
                  arrMatchExists = true;
                }
              }
              if (!arrMatchExists) {
                validMenuFlag = false;
              }
            }

            // filter array fields: tasteType [2]  == [2,4]
            if (result.rows[i].tastetypesid && _tasteType) {
              var db_tasteType = result.rows[i].tastetypesid;
              for (var j=0; j< _tasteType.length; ++j) {
                var matchExists=false;
                if (db_tasteType) {
                  for (var k=0; k< db_tasteType.length; ++k) {
                    if (_tasteType[j] == db_tasteType[k]) {
                      matchExists=true;
                    }
                  }
                }
                if (!matchExists) {
                  validMenuFlag=false;
                }
              }
            }

            // filter array fields: ingredientTypesId
            if (result.rows[i].ingredienttypesid && _ingredientsType) {
              var db_ingredienttypes = result.rows[i].ingredienttypesid;
              for (var j=0; j< _ingredientsType.length; ++j) {
                var matchExists=false;
                if (db_ingredienttypes) {
                  for (var k=0; k< db_ingredienttypes.length; ++k) {
                    if (_ingredientsType[j] == db_ingredienttypes[k]) {
                      matchExists=true;
                    }
                  }
                }
                if (!matchExists) {
                  validMenuFlag=false;
                }
              }

            }

            // filter array fields: sauceTypesId
            if (result.rows[i].saucetypesid && _sauceType) {
              var db_suaceType = result.rows[i].saucetypesid;
              for (var j=0; j< _sauceType.length; ++j) {
                var matchExists=false;
                if (db_suaceType) {
                  for (var k=0; k< db_suaceType.length; ++k) {
                    if (_sauceType[j] == db_suaceType[k]) {
                      matchExists=true;
                    }
                  }
                }
                if (!matchExists) {
                  validMenuFlag=false;
                }
              }
            }

            // filter array fields: without
            if (result.rows[i].ingredienttypesid && _without) {
              var db_ingredienttypes = result.rows[i].ingredienttypesid;
              for (var j=0; j< _without.length; ++j) {
                var matchExists=false;
                if (db_ingredienttypes) {
                  for (var k=0; k< db_ingredienttypes.length; ++k) {
                    if (_without[j] == db_ingredienttypes[k]) {
                      matchExists=true;
                    }
                  }
                }
                if (matchExists) {
                  validMenuFlag=false;
                }
              }
            }
            
            if (validMenuFlag) {
              finalResult.push(result.rows[i]);
            }


          }
          console.log(finalResult);
          res.status(200).send(finalResult);
        }
      });
      done();
    });
  });
}


module.exports.init = init;
