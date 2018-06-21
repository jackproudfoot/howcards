var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')

router.get('/user/:id', function(req, res, next) {
	var User = mongoose.model('User');
	
	User.findOne({ email: req.params.id }, function(err, user) {
	 	if (err) return console.error(err);
		
		if (user === null) {
			var newUser = new User({
				email: req.params.id,
				name: "",
				moderator: false,
				admin: false,
				owner: false
			});
			
			newUser.save(function(err, newU) {
				if (err) return console.error(err);
				res.json(newU)
			});
		}
		else {
			res.json(user);
		}
	})
});

module.exports = router;
