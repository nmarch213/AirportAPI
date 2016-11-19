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
	Traveler.findByIdAndUpdate(req.params.id, req.body, {new:true}, function(err, updatedTravler){
		if(err){
			console.log(err)
		 	res.json({"message": "update traveler error"});
		}else{
			updatedTravler.bags.push(req.body.bags);
			updatedTravler.save();
			res.json(updatedTravler);
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
			console.log(err)
		}else{
			res.json(updatedBag)
		}
	});
});


app.get("/", function(req, res){
	res.send("lol");
})


app.listen(app.get('PORT'), function(){
	console.log("Pensacola Air API Running");
});