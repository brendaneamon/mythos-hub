var express = require("express");
var hbs = require("express-handlebars");
var mongoose = require("./db/connection");
var parser = require("body-parser");

var app = express();
var MythRef = mongoose.model("MythRef");

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


app.get("/api/myth-references", function(req, res){
  MythRef.find({}).then(function(references){
    res.json(references);
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
