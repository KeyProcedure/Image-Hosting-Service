var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {js: ["index.js"]});
});

router.get("/login",function(req, res){
  res.render('login');
});

// VALIDATION IS DISABLED, REMOVE COMMENT TO ENABLE---------------------------------------------------------------
// Method: GET
// localhose:3000/register
router.get("/register",function(req, res){
  res.render('registration', {/*js: ["registration.js"]*/});
});

router.get("/postimage",function(req, res){
  res.render('postimage');
});

router.get("/posts/:id(\\d+)",function(req, res){
  res.render('viewpost');
});

module.exports = router;