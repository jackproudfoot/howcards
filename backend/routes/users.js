var express = require('express');
var router = express.Router();

/* GET user page. */
router.get('/:id', function(req, res, next) {
	res.json(
		{
			cards: [
    			{
    				id: "12345",
					title: "Connect to Wifi",
					author: "Jack Proudfoot",
					approved: 0
    			},
				{
					id: "12346",
					title: "Print",
					author: "Jack Proudfoot",
					approved: 1
				},	
				{
					id: "12346",
					title: "Print",
					author: "Jack Proudfoot",
					approved: 2
				}
    		],
			decks: [
				{
					id: 1,
					title: "First Deck"
				},
				{
					id: 2,
					title: "Second Deck"
				},
				{
					id: 3,
					title: "Third Deck"
				},
			]
		}
	);
});

module.exports = router;
