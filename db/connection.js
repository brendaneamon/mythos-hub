var mongoose = require("mongoose");

var MythRefSchema = new mongoose.Schema(
  {
    title: String,
    artist: String,
    description: String,
    mediaUrl: String,
    likes: Number
  }
);

mongoose.model("MythRef", MythRefSchema);
mongoose.connect("mongodb://localhost/mythrefs");

module.exports = mongoose;
