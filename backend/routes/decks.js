var fetch = require('node-fetch');

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')

router.get('/all', function(req, res, next) {
	var Deck = mongoose.model('Deck')
	
	Deck.find({ approved: 2 }, '_id title isFaculty', function(err, decks) {
		if (err) return console.error(err);
		
		res.json(decks);
	})
	
	
});

router.post('/delete/:id', function(req, res, next) {
        fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+ req.body.token)
        .then(googleRes => googleRes.json())
        .then(googleRes => {
                if(googleRes.aud === process.env.OAUTH_AUD) {
						var User = mongoose.model('User')
                        var Deck = mongoose.model('Deck')

                        User.findOne({ email: googleRes.email}, function(err, accessUser) {
                                if (err) return console.error(err);

                                Deck.findById(req.params.id, function(err, deck) {
                                        if (err) return console.error(err);
										
										if (deck.owner === accessUser._id || accessUser.moderator) {
											Deck.findByIdAndDelete(req.params.id, function(err) { 
												if(err) return console.error(err); 
											});
										 }
								});
						});
				}
	});
		
	res.json({});
})

router.get('/:id', function(req, res, next) {
	var Deck = mongoose.model('Deck');
	
	Deck.findById(req.params.id, function(err, deck) {
		if (err) return console.error(err);
		
		res.json(deck);
	})
   
});

module.exports = router;
