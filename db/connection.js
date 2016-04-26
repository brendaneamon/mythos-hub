var mongoose = require("mongoose");

var MythRefSchema = new mongoose.Schema(
  {
    title: String,
    artist: String,
    description: String,
    mediaUrl: String,
    likes: { type: Number, default: 0 }
  }
);

var UserSchema = new mongoose.Schema(
  {
    name: String,
    t_id: Number,
    t_username: String,
    t_photo_url: String
  }
);

mongoose.model("MythRef", MythRefSchema);
mongoose.model("User", UserSchema);

if (process.env.NODE_ENV == "production") {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect("mongodb://localhost/mythrefs");
}

module.exports = mongoose;
