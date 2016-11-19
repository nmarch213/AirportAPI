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
var Flight = require("./models/flight.js");

//Middleware
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));




//get all travelers
app.get("/travelers", function(req, res){
	Traveler.find({}).populate("bags").exec(function (err, travelers) {
		 if(err){
		 	console.log(err)
		 	res.json({"message": "get travelers error"});
		 }else{
		 	res.json(travelers);
		 }
	});
});

//Add a new traveler
app.post("/travelers", function(req, res){
	Traveler.create(req.body, function(err, traveler){
		if(err){
			console.log(err)
		 	res.json({"message": "add traveler error"});
		}else{
			res.json(traveler);
		}
	});
});

//get traveler by id
app.get("/travelers/:id", function(req, res){
	Traveler.findById(req.params.id).populate("bags").exec(function(err, traveler){
		if(err){
			console.log(err)
		 	res.json({"message": "get traveler error"});
		}else{
			res.json(traveler);
		}
	});
});

//remove traveler by id
app.delete('/travelers/:id', function(req, res){
	Traveler.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err)
		 	res.json({"message": "delete traveler error"});
		}else{
			res.json({"message": "traveler removed"});
		}
	});
});

//edit travler by id
app.put('/traveler/:id', function(req, res){
	var isAlreadyOnFlight = false;
	Traveler.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, updatedTraveler){
		if(err){
			console.log(err)
		 	res.json({"message": "update traveler error"});
		}else{
			Flight.findById(updatedTraveler.flightNumber).populate("travelers").exec(function(err, flight){
				if(err){
					console.log(err)
				}else{
					if(req.body.bags != null){
						updatedTraveler.bags.push(req.body.bags);
						updatedTraveler.save();
					}
					for (var i = 0; i < flight.travelers.length; i++) {
						if((flight.travelers[i]._id).equals(updatedTraveler._id)){
							console.log("on flight");
							isAlreadyOnFlight = true;
						}
					}
					if(isAlreadyOnFlight == false){

						flight.travelers.push(updatedTraveler);
						flight.save();
					}
					res.json(updatedTraveler);
				}
			})
		}
	})
})


//get bags
app.get("/bags", function(req, res){
	Bag.find(function(err, bags){
		if(err){
			console.log(err)
		 	res.json({"message": "get bags error"});
		}else{
			res.json(bags);
		}
	});
})

//gets bag by id
app.get("/bag/:id", function(req, res){
	Bag.findById(req.params.id, function(err, bag){
		if(err){
			console.log(err)
		 	res.json({"message": "get bag error"});
		}else{
			res.json(bag);
		}
	});
});

//adds bag to the system, requires given the ID of the Owner
app.post("/bags", function(req, res){
	Bag.create(req.body, function(err, bag){
		if(err){
			console.log(err)
 			res.json({"message": "bag add error"});
		}else{
			res.json(bag);
		}
	})
});

//edit bag by id
app.put("/bag/:id", function(req, res){
	Bag.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, updatedBag){
		if(err){
			console.log(err);
 			res.json({"message": "bag edit error"});
		}else{
			res.json(updatedBag)
		}
	});
});

//delete bag by id
app.delete("/bag/:id", function(req, res){
	Bag.findByIdAndRemove(req.params.id, function(err){
		if(err){
			console.log(err)
 			res.json({"message": "bag remove error"});
		}else{
			res.json({"message": "bag removed"});
		}
	});
});

//get all flights
app.get("/flights", function(req, res){
	Flight.find({}, function(err, flights){
		if(err){
			console.log(err);
 			res.json({"message": "show flights error"});
		}else{
			res.json(flights)
		}
	});
});

//add new flight
app.post("/flights", function(req, res){
	Flight.create(req.body, function(err, flight){
		if(err){
			console.log(err);
 			res.json({"message": "add flight error"});
		}else{
			res.json(flight);
		}
	});
});

//show flight by id
app.get("/flights/:id", function(req, res){
	Flight.findById(req.params.id).populate("travelers").exec(function(err, flight){
		if(err){
			console.log(err)
		 	res.json({"message": "get flight by id error"});
		}else{
			res.json(flight);
		}
	});
})

app.get("/", function(req, res){
	res.send("lol");
})


app.listen(app.get('PORT'), function(){
	console.log("Pensacola Air API Running");
});