var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
  res.json(
	  {
		  id: req.params.id,
		  author: "Jack",
		  title: "Print",
		  images: 0,
		  steps: [
			  {
				  title: "First Title",
				  blocks: [
					  {type: 'text', content: "Hello there this is text for the first step"},
					  {type: 'text', content: "Here is some more text"},
					  {type: 'image', content: "/public/12345/0.jpg"}
					  
				  ]
			  },
			  {
				  title: "Second Title",
				  blocks: [
					  {type: 'text', content: "Hello there this is text for the second step"},
					  {type: 'text', content: "Here is some more text"}
				  ]
			  },
			  {
				  title: "Third title",
				  blocks: [
					  {type: 'text', content: "Hello there this is text for the third step"},
					  {type: 'text', content: "Here is some more text"}
				  ]
			  }
		  ]
	  }
  );
});

module.exports = router;
