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

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/mythrefs");
}

module.exports = mongoose;
