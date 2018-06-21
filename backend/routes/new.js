var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')

//Handle Creating New Card
router.post('/card', (req, res, next) => {
	var Card = mongoose.model('Card')
	
	var newCard = new Card({
		title: "",
		description: "",
		owner: req.body.id,
		images: 0,
		steps: [],
		approved: 3
	});
	
	newCard.save(function(err, card) {
		if (err) return console.error(err);
		
		res.json(card)
	})

});

router.post('/deck', (req, res, next) => {
	var Deck = mongoose.model('Deck')
	
	var newDeck = new Deck({
		title: "",
		description: "",
		owner: req.body.id,
		cards: [],
		approved: 3
	})
	
	newDeck.save(function(err, deck) {
		if (err) return console.error(err);
		
		res.json(deck)
	})
	
});

module.exports = router;
