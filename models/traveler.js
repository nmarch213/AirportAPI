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
	flightNumber: String,
	bags: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Bag"
		}
	]
});

module.exports = mongoose.model('Traveler', travelerSchema);