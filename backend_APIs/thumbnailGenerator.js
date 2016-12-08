/*
WARNING:::::

MAKE SURE THAT FILENAME DOESN"T CONTAIN ANY '.' CHARACTER




*/


var LARGE_HEIGHT = 800;
var MEDIUM_HEIGHT = 400;
var SMALL_HEIGHT = 200;

var fs = require("fs");
var imageManipulator = require("lwip");

module.exports.createThumbnails = function(image_path, image_path_without_extension, image_extension, callback) {
  console.log("processing "+image_path);
  imageManipulator.open(image_path, function(err, image) {
    if(err){
      console.log(err);
      return;
    }
    //console.log("creating thumbnails for "+image_path);
    //console.log("image size = "+image.width()+"x "+image.height());
    var size_ratio = image.width()/image.height();
    var batch_image = image.batch();

    //LARGE THUMBNAIL: resize to height 800
    batch_image.resize(LARGE_HEIGHT*size_ratio, LARGE_HEIGHT).writeFile(image_path_without_extension+"_L."+image_extension, function(err){
      if (err) {
        console.log(err);return;
      }
      //MEDIUM THUMBNAIL: resize to height 400
      batch_image.resize(MEDIUM_HEIGHT*size_ratio, MEDIUM_HEIGHT).writeFile(image_path_without_extension+"_M."+image_extension, function(err){
        if (err) {
          console.log(err);return;
        }
        //SMALL THUMBNAIL: resize to height 200
        batch_image.resize(SMALL_HEIGHT*size_ratio, SMALL_HEIGHT).writeFile(image_path_without_extension+"_S."+image_extension, function(err){
          if (err) {
            console.log(err);return;
          } else {
            callback(image_path);
          }
        });
      });
    });
    //image.batch().scale(0.5).
  })
}
