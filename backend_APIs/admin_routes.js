var pg = require('pg');

var init = function(app, DATABASE_URL) {

  app.get('/admin_only_menu_list', function (req, res) {
    console.log("GET /menu_list");
    pg.connect(DATABASE_URL, function(err, client, done) {
      client.query("SELECT id, name FROM meal",
                    function(err, result) {
        if (err){
          console.error(err); res.send("Error " + err);
        }
        else{
          //console.log(result.rows);
          res.render('pages/menu_list', {results: result.rows});
        }
      });
      done();
    });
  });

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
          //console.log("menu select result");
          //console.log(result.rows);
          res.render('pages/updateMenu', {result: result.rows[0]});
        }
      });
      done();
    });
  });

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
          //console.log("menu select result");
          //console.log(result.rows);
          res.render('pages/updateMenu', {result: result.rows[0]});
        }
      });
      done();
    });
  });

  app.get('/admin_only_insert_menu', function(request, response) {
    response.render('pages/insertMenu');
  });

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
          //console.log("menu select result");
          //console.log(result.rows);
          res.render('pages/menu', {result: result.rows[0]});
        }
      });
      done();
    });
  });
}

module.exports.init = init;
