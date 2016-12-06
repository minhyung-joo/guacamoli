var MANIPULATED_EXTENSIONS = ["JPG", "jpg", "png", "PNG", "gif", "GIF", "bmp", "BMP"];
var SMALL_INDICATOR = "_S";
var MEDIUM_INDICATOR = "_M";
var LARGE_INDICATOR = "_L";
var LARGE_HEIGHT = 800;
var MEDIUM_HEIGHT = 400;
var SMALL_HEIGHT = 200;
var PATH = "../imageStorage/";

var fs = require("fs");
var imageManipulator = require("lwip");

var items_at_path;
var ptr=0;
var items_length=0;


function thumbnailCallback(image_name) {
  if (ptr>=items_length) {
    console.log("IMAGE PROCESSING TASK COMPLETE. terminating..");
    return;
  }
  if (image_name) {
    console.log(image_name+": thumbnail creation success ("+SMALL_INDICATOR+", "+MEDIUM_INDICATOR+", "+LARGE_INDICATOR+")");
  }
  var extension = items_at_path[ptr].split(".")[1];
  var name = items_at_path[ptr].split(".")[0];
  // don't process non-images
  var valid_extension_flag = false;
  for (var j=0; j<MANIPULATED_EXTENSIONS.length; ++j) {
    if (extension == MANIPULATED_EXTENSIONS[j]) {
      valid_extension_flag = true;
    }
  }
  // don't process thumbnails that are already created
  //console.log("processing "+items_at_path[ptr]);
  if (valid_extension_flag && !name.endsWith(SMALL_INDICATOR) && !name.endsWith(MEDIUM_INDICATOR) && !name.endsWith(LARGE_INDICATOR)) {
    createThumbnails(PATH+items_at_path[ptr], PATH+name, extension, thumbnailCallback);
    //createThumbnails(PATH+"DSC03750.JPG", PATH+"DSC03750", "JPG", thumbnailCallback);
    ++ptr;
  } else {
    ++ptr;
    thumbnailCallback(null);
  }
}

function createThumbnails(image_path, image_path_without_extension, image_extension, callback) {
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
            thumbnailCallback(image_path);
          }
        });
      });
    });
    //image.batch().scale(0.5).
  })
}

fs.readdir("./", function(err, items) {
  if (err) {
    return;
  }
  items_at_path = items;
  items_length = items.length;

  console.log(items);
  thumbnailCallback(null);
});

//createThumbnails(PATH+"DSC03275.JPG", PATH+"DSC03275", "JPG", thumbnailCallback);
//createThumbnails(PATH+"DSC03750.JPG", PATH+"DSC03750", "JPG", thumbnailCallback);
