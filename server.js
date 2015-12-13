// ----------------------------------
// DEPENDANCIES ---------------------
// ----------------------------------

var express      = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    md5          = require('md5'),
    cookieParser = require('cookie-parser'),
    morgan       = require('morgan');

// var port         = process.env.PORT || 3000;
    app          = express();
    app.listen(3000);

// ----------------------------------
// MIDDLEWARE -----------------------
// ----------------------------------
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cookieParser());

// ----------------------------------
// DB STUFF -------------------------
// ----------------------------------
console.log("server working");
mongoose.connect('mongodb://localhost/control_app');

// ----------------------------------
// SEED -----------------------------
// ----------------------------------
// already seeded
// var seed = require('./seed.js')

var User = require("./models/user.js");
var Gun = require("./models/gun.js");

// ------------------------------
// GET ALL USERS ----------------
// ------------------------------
app.get('/users', function(req, res) {
  console.log('got get all users');

	User.find().then(function(users) {

    console.log("sending "+users.length+" sites");

		res.send(users);
	});
});


// ------------------------------
// POST USER SIGNUP -------------
// ------------------------------
app.post('/signup', function(req, res) {
  console.log('got post users signup');

  var password_hash = md5(req.body.password);

  var user = new User({
    username: req.body.username,
    password_hash: password_hash,
    profile_img: req.body.profile_img,
    points: 100,
  });

  user.save(function(err) {
    if (err) {
      console.log('Error! '+err);
    } else {
      console.log(user.username + " created server side");
      console.log('---------------');

      //setting session cookie
      res.cookie("loggedinId", user.id);

      res.send(user);
    }; // end if/else
  }); // end save
}); // end post

// ------------------------------
// POST USER LOGIN --------------
// ------------------------------
app.post('/login', function(req, res) {
  console.log('got post users login');

  var req_username = req.body.username;
  var req_password= req.body.password;

  console.log('username '+req_username);
  console.log('password '+req_password);

  req_password_hash = md5(req_password);

  User.findOne( {'username' : req_username} ).exec(function(err, user){

    if (user != null && req_password_hash  == user.password_hash){
      res.cookie("loggedinId", user.id);
      res.send(user);
    } else {
      // res.status(400);
      res.send({err: "let's try this again!"});
    }; // end if/else
  }); // end findOne
}); // end login


// ------------------------------
// POST USER LOGOUT -------------
// ------------------------------
app.post('/logout', function(req, res) {
  console.log('got post users logout');

  User.findOne( {'username' : req_username} ).exec(function(err, user){

    if (user != null && req_password_hash  == user.password_hash){
      res.cookie("loggedinId", user.id);
      res.send(user);
    } else {
      // res.status(400);
      res.send({err: "let's try this again!"});
    }; // end if/else
  }); // end findOne
}); // end login


// ------------------------------
// SHOW STATUS ------------------
// ------------------------------
app.get('/user/:id', function(req, res) {
  console.log('got status req');

	User.findOne( {_id: req.params.id} ).then(function(user) {

    console.log("sending status");
		res.send(user);
	});
});


// ------------------------------
// GET ALL GUNS ----------------
// ------------------------------
app.get('/guns', function(req, res) {
  console.log('got get all guns');

	Gun.find().then(function(guns) {

    console.log("sending "+guns.length+" guns");

		res.send(guns);
	});
});
