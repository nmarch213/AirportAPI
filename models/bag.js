var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var bagSchema = new mongoose.Schema({
	weight: Number,
	finalDestination: String,
	owner:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Traveler"
		}
	]
});

module.exports = mongoose.model("Bag", bagSchema);