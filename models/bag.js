var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var bagSchema = new mongoose.Schema({
	weight: Number,
	finalDestination: String
});

module.exports = mongoose.model("Bag", bagSchema);