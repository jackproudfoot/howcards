var fetch = require('node-fetch');

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

router.get('/delete/:id', function(req, res, next) {
	/*fetch('https://www.googleapis.com/oauth2/v3/tokeninfo?id_token='+ req.body.token)
	.then(googleRes => googleRes.json())
	.then(googleRes => {
		if(googleRes.aud === "538060071841-5re2m26t7j4ld0qbl60dt0cfg0fek943.apps.googleusercontent.com") {
			
			var User = mongoose.model('User')
			var Card = mongoose.model('Card')
			
			User.findOne({ email: googleRes.email}, function(err, accessUser) {
				if (err) return console.error(err);
				
				if (accessUser.owner) {
					
				}
			}
			*/
	
	//NOT YET IMPLEMENTED
			
	res.json({})
	
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
