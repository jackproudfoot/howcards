var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');

/* GET home page. */
router.get('/', function(req, res, next) {
	var Card = mongoose.model('Card');
	
	Card.find({ approved: true }, function(err, cards) {
		if (err) return console.error(err);
		
		res.json(cards)
	})
});

module.exports = router;
