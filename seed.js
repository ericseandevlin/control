// var seed = require('./seed.js');  in server.js, un-comment and comment out once seed is run

// ======================================
// ======================================

// REQUIRE MONGOOSE AND MODEL
var mongoose = require('mongoose'),
  Gun = require('./models/gun.js');

// SEED

////////  handguns  ////////
var gun1 = new Gun({
  name: "Ruger 9mm pistol",
  gun_img: "./gunImages/ruger9mm.png",
  init_value: 10,
  given_value: null,
  damage: 2,
  user: null
});
gun1.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: gun1");
});

var gun2 = new Gun({
  name: "Pink Lady revolver",
  gun_img: "./gunImages/pinklady.png",
  init_value: 10,
  given_value: null,
  damage: 3,
  user: null
});
gun2.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: gun2");
});

////////  shotguns  ////////
var gun3 = new Gun({
  name: "American Tactical 12GA shotgun",
  gun_img: "./gunImages/american12GA.png",
  init_value: 50,
  given_value: null,
  damage: 15,
  user: null
});
gun3.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: gun3");
});

var gun4 = new Gun({
  name: "Taylors & Co 12GA lever-action",
  gun_img: "./gunImages/taylors12GA.png",
  init_value: 70,
  given_value: null,
  damage: 18,
  user: null
});
gun4.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: gun4");
});

////////  semi automatics  ////////
var gun5 = new Gun({
  name: "Patriot 308 semi-auto",
  gun_img: "./gunImages/patriotSemi.png",
  init_value: 110,
  given_value: null,
  damage: 30,
  user: null
});
gun5.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: gun5");
});

var gun6 = new Gun({
  name: "Muddygirl 22 rifle",
  gun_img: "./gunImages/muddygirl.png",
  init_value: 100,
  given_value: null,
  damage: 31,
  user: null
});
gun6.save(function(err) {
	if(err) return handleError(err);
	console.log("Saved: gun6");
});

////////  ARs  ////////
