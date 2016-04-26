var express = require("express");
var hbs = require("express-handlebars");
var parser = require("body-parser");
var session = require("express-session");
var request = require("request");
var qstring = require("qs");
var cmongo = require("connect-mongo");
var mongoose = require("./db/connection");
var twitter = require("./lib/twitter_auth");

var app = express();
var SMongo = cmongo(session);

var MythRef = mongoose.model("MythRef");

if(process.env.NODE_ENV !== "production"){
  var env = require("./env");
  process.env.session_secret = env.session_secret;
  process.env.t_callback_url = env.t_callback_url;
  process.env.t_consumer_key = env.t_consumer_key;
  process.env.t_consumer_secret = env.t_consumer_secret;
}

app.use(session({
  secret: process.env.session_secret,
  resave: false,
  saveUninitialized: false,
  store: new SMongo({
    mongooseConnection: mongoose.connection
  })
}));

app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:       ".hbs",
  partialsDir:   "views/",
  layoutsDir:    "views/",
  defaultLayout: "layout-main"
}));

app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json({extended: true}));
app.use(function(req, res, next){
  res.locals.isProduction = (process.env.NODE_ENV == "production");
  twitter.checkIfSignedIn(req, res, function(){
    next();
  });
});

app.get("/login/twitter", function(req, res){
  twitter.getSigninURL(req, res, function(url){
    res.redirect(url);
  });
});

app.get("/login/twitter/callback", function(req, res){
  twitter.whenSignedIn(req, res, function(){
    res.redirect("/");
  });
});

app.get("/logout", function(req, res){
  req.session.destroy();
  res.redirect("/");
});

app.get("/api/myth-references", function(req, res){
  MythRef.find({}).then(function(references){
    res.json(references);
  });
});

app.post("/api/myth-references", function(req, res){
  MythRef.create(req.body.reference).then(function(reference){
    res.json(reference);
  });
});

app.get("/api/myth-references/:title", function(req, res){
  MythRef.findOne({title: req.params.title}).then(function(reference){
    res.json(reference);
  });
});

app.delete("/api/myth-references/:title", function(req, res){
  MythRef.findOneAndRemove({title: req.params.title}).then(function(){
    res.json({success: true});
  });
});

app.put("/api/myth-references/:title", function(req, res){
  MythRef.findOneAndUpdate({title: req.params.title}, req.body.reference, {new: true}).then(function(reference){
    res.json(reference);
  });
});

app.get("/*", function(req, res){
  res.render("myth-references");
});

app.listen(app.get("port"), function(){
  console.log("Help, I'm Alive");
});
