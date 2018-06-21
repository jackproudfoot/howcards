var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')

/* GET user page. */
router.get('/:id', function(req, res, next) {
	
	var Card = mongoose.model('Card')
	var Deck = mongoose.model('Deck')
	
	console.log(parseInt(req.params.id))
	
	Card.find({ owner: req.params.id }, function(err, cards) {
		if (err) return console.error(err);
		
		Deck.find({ owner: req.params.id, approved: 2 }, function(err, decks) {
			if (err) return console.error(err);
		
			res.json({
				cards: cards,
				decks: decks
			});
		});
	});
	
});

module.exports = router;
