var express = require('express');
var router = express.Router();

//Handle Creating New Card
router.post('/card', (req, res, next) => {
	res.json(
		{
			id: "newcard",
			title: "",
			description: "",
		  	owner: parseInt(req.body.id),
		  	images: 0,
		  	steps: [],
			approved: 2
		}
	)
});

router.post('/deck', (req, res, next) => {
	res.json(
		{
			id: "newdeck",
			title: "",
			description: "",
		  	owner: parseInt(req.body.id),
		  	cards: []
		}
	)
});

module.exports = router;
