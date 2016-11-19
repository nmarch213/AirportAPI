var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Traveler Schema
var travelerSchema = new mongoose.Schema({
	firstName: String,
	lastName: String,
	driversLicense: String,
	address: String,
	city: String,
	state: String,
	zip: Number,
	bags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Bag"
		}
	],
	flightNumber: Number
});

module.exports = mongoose.model('Traveler', travelerSchema);