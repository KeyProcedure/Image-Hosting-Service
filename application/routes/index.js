var express = require('express');
const {isLoggedIn} = require('../middleware/protectors');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {js: ["index.js"]});
});

router.get("/login", function (req, res) {
  res.render('login');
});

// Method: GET
// localhost:3000/register
router.get("/register", function (req, res) {
  res.render('registration', {js: ["registration.js"]});
});

router.get("/postimage", isLoggedIn, function (req, res) {
  res.render('postimage');
});

router.get("/posts/:id(\\d+)", function (req, res) {
  res.render('viewpost');
});

module.exports = router;