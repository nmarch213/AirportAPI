var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

//Set Port
app.set('PORT', process.env.PORT || 3000);
//MongoDB 
mongoose.connect("mongodb://njm24:pass@ds031651.mlab.com:31651/sspdb");

//Models
var Traveler = require("./models/traveler.js");
var Bag = require("./models/bag.js");

//Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));




//get all travelers
app.get("/travelers", function(req, res){
	Traveler.find({}, function (err, travelers) {
		 if(err){
		 	console.log(err)
		 	res.json({"message": "error"});
		 }else{
		 	res.json(travelers);
		 }
	});
});

app.post("/travelers", function(req, res){
	Traveler.create(req.body, function(err, traveler){
		if(err){
			console.log(err)
		 	res.json({"message": "error"});
		}else{
			res.json(traveler);
		}
	})
})

app.get("/", function(req, res){
	res.send("lol");
})


app.listen(app.get('PORT'), function(){
	console.log("Pensacola Air API Running");
});