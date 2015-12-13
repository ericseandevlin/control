var mongoose = require('mongoose');
var gunSchema = require('./gun').schema;

// SCHEMA
var userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password_hash: { type: String, required: true },
	profile_img: String,
  points: Number,
  equipped: { type: mongoose.Schema.Types.ObjectId, ref: 'Gun' },
  guns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gun' }],
	created_at: { type:Date, default: Date.now },
  updated_at: { type:Date, default: Date.now }
});

// CREATE MODEL USING SCHEMA
var User = mongoose.model('User', userSchema);
module.exports = User;
