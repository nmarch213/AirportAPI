var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//Flgiht Schema
var flightSchema = new mongoose.Schema({
	origin: String,
	destination: String,
	travelers:[
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Traveler"
		}
	]
});

module.exports = mongoose.model('Flight', flightSchema);