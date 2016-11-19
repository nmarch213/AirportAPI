var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var bagSchema = mongoose.Schema({
	weight: Number,
	finalDestination: String,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Traveler"
		},
		firstName: String,
		lastName: String
	}
});

module.exports = mongoose.model("Bag", bagSchema);