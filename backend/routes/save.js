var fetch = require('node-fetch');
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

router.post('/c/:id', function(req, res, next) {
	
	fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+ req.body.token)
	.then(googleRes => googleRes.json())
	.then(googleRes => {
		if (googleRes.aud === "538060071841-5re2m26t7j4ld0qbl60dt0cfg0fek943.apps.googleusercontent.com") {
			
			//Validate that user has proper permissions
			var User = mongoose.model('User')
			
			var reqCard = JSON.parse(req.body.card);
			
			User.findOne({ email: googleRes.email}, function(err, accessUser) {
				if (err) return console.error(err);
				
				if (reqCard.owner === accessUser._id || accessUser.owner || accessUser.admin || accessUser.moderator) {
					
					var Card = mongoose.model('Card');
					
					Card.findById(reqCard._id, function(err, card) {
						if (err) return console.error(err);
				
						card.title = reqCard.title;
						card.description = reqCard.description;
						card.images = reqCard.images;
						card.steps = reqCard.steps;
						card.approved = 2;
						
						card.save(function(err, newC) {
							if (err) return console.error(err);
							res.json(newC);
						})
					})
					
				}
				
			})
			
			
		}
	})
	
})

router.post('/d/:id', function(req, res, next) {
	
	fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+ req.body.token)
	.then(googleRes => googleRes.json())
	.then(googleRes => {
		if (googleRes.aud === "538060071841-5re2m26t7j4ld0qbl60dt0cfg0fek943.apps.googleusercontent.com") {
			
			//Validate that user has proper permissions
			var User = mongoose.model('User')
			
			var reqDeck = JSON.parse(req.body.deck);
			
			User.findOne({ email: googleRes.email}, function(err, accessUser) {
				if (err) return console.error(err);
				
				if (reqDeck.owner === accessUser._id || accessUser.owner || accessUser.admin || accessUser.moderator) {
					
					var Deck = mongoose.model('Deck');
					
					Deck.findById(reqDeck._id, function(err, deck) {
						if (err) return console.error(err);
				
						deck.title = reqDeck.title;
						deck.description = reqDeck.description;
						deck.cards = reqDeck.cards;
						deck.approved = 2;
						
						deck.save(function(err, newD) {
							if (err) return console.error(err);
							res.json(newD);
						})
					})
					
				}
				
			})
			
			
		}
	})
	
})


module.exports = router;
