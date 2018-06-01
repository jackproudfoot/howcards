var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    res.json(
  	  {
  		  id: req.params.id,
  		  author: "Jack"
  	  }
    );
});

module.exports = router;
