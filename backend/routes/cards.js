var fetch = require('node-fetch');

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

router.post('/delete/:id', function(req, res, next) {
        fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+ req.body.token)
        .then(googleRes => googleRes.json())
        .then(googleRes => {
                if(googleRes.aud === process.env.OAUTH_AUD) {

                        var User = mongoose.model('User')
                        var Card = mongoose.model('Card')

                        User.findOne({ email: googleRes.email}, function(err, accessUser) {
                                if (err) return console.error(err);

                                Card.findById(req.params.id, function(err, card) {
                                        if (err) return console.error(err);
										
										if (card.owner === accessUser._id || accessUser.moderator) {
											Card.findByIdAndDelete(req.params.id, function(err) { 
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
	var Card = mongoose.model('Card')
	
	Card.findById(req.params.id, function(err, card) {
		if (err) return console.error(err);
		
		if (card === undefined) res.json({})
		else {
			res.json(card);
		}
	});
});

module.exports = router;
