var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*
function validateUsername(req, res, next) {
  if (`username is unique`) {
    next();
  }
  else {
    res.json({message: `username already taken`});
  }
}

function validateEmail(req, res, next) {
  if (`email is unique`) {
    next();
  }
  else {
    res.json({message: `email already taken`});
  }
}

router.post("/register",
    validateUsername,
    validateEmail,
    function(req, res) {
      res.json({status: 200, message: `user was made.`});
    });
*/

module.exports = router;