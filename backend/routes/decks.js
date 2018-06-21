var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')

router.get('/all', function(req, res, next) {
	var Deck = mongoose.model('Deck')
	
	Deck.find({ approved: 2 }, '_id title', function(err, decks) {
		if (err) return console.error(err);
		
		res.json(decks);
	})
	
	
});

router.get('/:id', function(req, res, next) {
	var Deck = mongoose.model('Deck');
	
	Deck.findById(req.params.id, function(err, deck) {
		if (err) return console.error(err);
		
		res.json(deck);
	})
   
});

module.exports = router;
