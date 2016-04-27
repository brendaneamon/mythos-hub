var mongoose = require("mongoose");

var ObjectId = mongoose.Schema.Types.ObjectId;
var MythRefSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    artist: {
      type: String,
      required: true
    },
    description: String,
    mediaUrl: String,
    likes: { type: Number, default: 0 }
  }
);

var UserSchema = new mongoose.Schema(
  {
    name: String,
    isAdmin: Boolean,
    t_id: String,
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
