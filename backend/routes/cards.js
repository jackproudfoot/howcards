var express = require('express');
var router = express.Router();

/* GET card listing. */

router.get('/:id', function(req, res, next) {
  res.json(
	  {
		  id: req.params.id,
		  owner: 1,
		  title: "Print Test",
		  description: "Registering your ID to print",
		  images: 1,
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
		  ],
		  approved: 1,
		  approvalMessage: "This card has not been approved",
		  approvalBy: 1
	  }
  );
});

module.exports = router;
