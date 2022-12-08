const express = require('express');
const {isLoggedIn} = require('../middleware/protectors');
const {getRecentPosts, getPostById, getCommentsForPostById} = require('../middleware/posts');
const router = express.Router();

/* GET home page. */
router.get('/', getRecentPosts, function (req, res, next) {
  res.render('index'); //, {js: ["index.js"]});
});

router.get("/login", function (req, res) {
  res.render('login', {js: ["login.js"]});
});

router.get("/register", function (req, res) {
  res.render('registration', {js: ["registration.js"]});
});

router.get("/postimage", isLoggedIn, function (req, res) {
  res.render('postimage', {js: ["postimage.js"]});
});

router.get("/posts/:id(\\d+)", getPostById, getCommentsForPostById, function (req, res) {
  res.render('viewpost', {js: ["viewPost.js"]});
});

module.exports = router;