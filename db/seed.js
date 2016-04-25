var mongoose = require("./connection");
var seedData = require("./seed-data");

var MythRef = mongoose.model("MythRef");

MythRef.remove({}).then(function(){
  MythRef.collection.insert(seedData).then(function(){
    process.exit();
  });
});
