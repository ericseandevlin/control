// ----------------------------------
// DEPENDANCIES ---------------------
// ----------------------------------

var express      = require('express'),
    mongoose     = require('mongoose'),
    bodyParser   = require('body-parser'),
    md5          = require('md5'),
    cookieParser = require('cookie-parser'),
    morgan       = require('morgan');

    app          = express();

// ----------------------------------
// PORT -----------------------------
// ----------------------------------
var port = process.env.PORT || 3000;
    app.listen(port);

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
// console.log("server working");
// mongoose.connect('mongodb://localhost/control_app');

var mongoUri =  process.env.MONGOLAB_URI || 'mongodb://localhost/control_app';
mongoose.connect(mongoUri);

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
    kills: 0
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
// GET ALL GUNS -----------------
// ------------------------------
app.get('/guns', function(req, res) {
  console.log('got get all guns');

	Gun.find().then(function(guns) {

    console.log("sending "+guns.length+" guns");

		res.send(guns);
	});
});


// ------------------------------
// UPDATE GUN BUY ---------
// ------------------------------
app.put('/gun/:id', function(req, res) {
  console.log(req.params.id);
  console.log("got gun gun buy");
  console.log(req.body);

	Gun.findByIdAndUpdate(
    req.params.id, {
      forSale: false,
      owner: req.cookies.loggedinId
    }, function(err, gun) {
    if (err) {
      console.log(err);
      res.statusCode = 503;
    } else {
    console.log('Gun updated');
		res.send(gun);
    };

  });

});


// ------------------------------
// UPDATE USER BUY --------------
// ------------------------------
app.put('/user/:id', function(req, res) {
console.log("got user gun buy");

	User.findByIdAndUpdate(
    req.params.id,
    {$push: {guns: req.body.newGun},
    points: req.body.points},
    {safe: true, upsert: true},
    function(err, user) {
    console.log('User gun added, points updated');

    res.send(user);
	});
});


// ------------------------------
// UPDATE GUN EQUIP -------------
// ------------------------------
app.put('/equip/:id', function(req, res) {
console.log("got gun equip");

  // find User with cookie, add gun to user's equipped parameter

	User.findByIdAndUpdate(
    req.cookies.loggedinId,
    {equipped: req.params.id},
    function(err, user) {
      if (err) {
        console.log(err);
        res.statusCode = 503;
      } else {
        console.log('gun equipped');
        res.send(user);
	    };
    });
  // delete it from user's guns array

});

    // $pull: {guns: tempGun}
