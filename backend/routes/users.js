var express = require('express');
var router = express.Router();

/* GET user page. */
router.get('/:id', function(req, res, next) {
	res.json([
    	{
    		id: "12345",
			title: "Connect to Wifi",
			author: "Jack Proudfoot"
    	},
		{
			id: "12346",
			title: "Print",
			author: "Jack Proudfoot"
		},
		{
			id: "12346",
			title: "Print",
			author: "Jack Proudfoot"
		}
    ]);
});

module.exports = router;
