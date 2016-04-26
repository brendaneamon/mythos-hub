var request = require("request");
var qstring = require("qs");
var mongoose= require("../db/connection");

var MythRef = mongoose.model("MythRef");

var twitter = {};

twitter.getSigninURL = function(req, res, callback){
  var url = "https://api.twitter.com/oauth/request_token";
  var oauth = {
    callback:         process.env.t_callback_url,
    consumer_key:     process.env.t_consumer_key,
    consumer_secret:  process.env.t_consumer_secret
  };
  request.post({url: url, oauth: oauth}, function(e, response){
    var auth_data = qstring.parse(response.body);
    var post_data = qstring.stringify({oauth_token: auth_data.oauth_token});
    req.session.t_oauth_token         = auth_data.oauth_token;
    req.session.t_oauth_token_secret  = auth_data.oauth_token_secret;
    callback("https://api.twitter.com/oauth/authenticate?" + post_data);
  });
};

twitter.whenSignedIn = function(req, res, callback){
  var url = "https://api.twitter.com/oauth/access_token";
  var auth_data = qstring.parse(req.query);
  var oauth = {
    consumer_key:     process.env.t_consumer_key,
    consumer_secret:  process.env.t_consumer_secret,
    token:            req.session.t_oauth_token,
    token_secret:     req.session.t_oauth_token_secret,
    verifier:         auth_data.oauth_verifier
  };
  request.post({url: url, oauth: oauth}, function(e, response){
    var auth_data = qstring.parse(response.body);
    req.session.t_user_id             = auth_data.user_id;
    req.session.t_screen_name         = auth_data.screen_name;
    req.session.t_oauth               = {
      consumer_key:     process.env.t_consumer_key,
      consumer_secret:  process.env.t_consumer_secret,
      token:            auth_data.oauth_token,
      token_secret:     auth_data.oauth_token_secret
    };
    request.get({
      url:    "https://api.twitter.com/1.1/users/show.json",
      json:   true,
      oauth:  req.session.t_oauth,
      qs:     {
        screen_name: req.session.t_screen_name
      }
    }, function(e, response){
      var user_info = {
        name:         response.body.name,
        t_id:         response.body.id,
        t_username:   response.body.screen_name,
        t_photo_url:  response.body.profile_image_url
      };
      User.findOneAndUpdate({t_id: response.body.id}, user_info, {new: true}).then(function(user){
        if(user){
          sendUser(user);
        }else{
          User.create(user_info).then(user);
        }
      });
      function sendUser(user){
        req.session.user_id = user._id;
        res.redirect("/");
      }
    });
  });
};

twitter.checkIfSignedIn = function(req, res, callback){
  User.findById(req.session.user_id).then(function(user){
    if(user) res.locals.user = user;
    callback();
  });
};

module.exports = twitter;
