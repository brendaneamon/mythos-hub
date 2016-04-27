var mongoose = require("./connection");
var mythSeeds = require("./myth-seeds");
var userSeeds = require("./user-seeds");

var MythRef = mongoose.model("MythRef");
var User = mongoose.model("User");

User.remove({}).then(function(){
  User.collection.insert(userSeeds).then(function(){
    MythRef.remove({}).then(function(){
      MythRef.collection.insert(mythSeeds).then(function(){
        process.exit();
      });
    });
  });
});
