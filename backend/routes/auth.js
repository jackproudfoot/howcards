var express = require('express');
var router = express.Router();

/* GET user page. */
router.get('/user/:id', function(req, res, next) {
	res.json(
		{
			id: 1,
			googleId: req.params.googleId,
			moderator: true,
			admin: true,
			name: "Jack"
		}
	);
});

module.exports = router;
