var mongoose = require('mongoose');
var gunSchema = require('./gun').schema;

// SCHEMA
var userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password_hash: { type: String, required: true },
	profile_img: String,
  points: Number,
  kills: 0,
  show: Boolean,
  dead: Boolean,
  equipped: Object,
  guns: Array,
	created_at: { type:Date, default: Date.now },
  updated_at: { type:Date, default: Date.now }
});

// CREATE MODEL USING SCHEMA
var User = mongoose.model('User', userSchema);
module.exports = User;
