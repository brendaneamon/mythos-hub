var mongoose = require("./connection");
var seedData = require("./seed-data");

var MythRef = mongoose.model("MythRef");
var User = mongoose.model("User");

User.remove({}).then(function(){
  MythRef.remove({}).then(function(){
    MythRef.collection.insert(seedData).then(function(){
      process.exit();
    });
  });
});
