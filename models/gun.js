var mongoose = require('mongoose');
var userSchema = require('./user').schema;

// SCHEMA
var gunSchema = new mongoose.Schema({
  name: String,
	gun_img: String,
  init_value: Number,
  given_value: Number,
  damage: Number,
  forSale: Boolean,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	updated_at: { type:Date, default: Date.now }
});

// CREATE MODEL USING SCHEMA
var Gun = mongoose.model('Gun', gunSchema);
module.exports = Gun;
