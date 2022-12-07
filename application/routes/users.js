const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const UserError = require('../helpers/error/UserError');
const db = require('../conf/database');

// Method: POST
// localhost:3000/users/register
router.post("/register", function (req, res, next) {
  const {username, email, password} = req.body;

  db.query('select id from users where username=?', [username])
    .then(function ([results, fields]) {
      if (results && results.length === 0) {
        return db.query('select id from users where email=?', [email])
      } else {
        throw new UserError('Sign Up Failed: username already exists', "/register", 200);
      }
    }).then(function ([results, fields]) {
    if (results && results.length === 0) {
      return bcrypt.hash(password, 2);
    } else {
      throw new UserError('Sign Up Failed: email already exists', "/register", 200);
    }
  }).then(function (hashedPassword) {
    return db.query('insert into users(username, email, password) value (?,?,?)', [username, email, hashedPassword])
  })
    .then(function ([results, fields]) {
      if (results && results.affectedRows === 1) {
        req.flash("success", `Your account has been created, sign in to continue`);
        req.session.save(function(saveErr) {
          res.redirect('/login');
        })
      } else {
        throw new UserError('Sign Up Failed: account could not be made', "/register", 200);
      }
    })
    .catch(function(err) {
      if (err instanceof UserError) {
        req.flash("error", err.getMessage());
        req.session.save(function(saveErr) {
          res.redirect(err.getRedirectURL());
        })
      } else {
        next(err);
      }
    })
});

// Method: POST
// localhost:3000/users/login
router.post("/login", function (req, res, next) {
  const {username, password} = req.body;

  let loggedUserId;
  let loggedUsername;

  db.query('select id, username, password from users where username=?', [username])
    .then(function ([results, fields]) {
      if (results && results.length === 1) {
        loggedUserId = results[0].id;
        loggedUsername = results[0].username;
        let dbPassword = results[0].password;
        return bcrypt.compare(password, dbPassword);
      } else {
        throw new UserError('Failed Sign In: invalid user credentials', "/login", 200);
      }
    })
    .then(function (passwordsMatched) {
      if (passwordsMatched) {
        req.session.userId = loggedUserId;
        req.session.username = loggedUsername;
        req.flash("success", `Hi ${loggedUsername}, you are now signed in`);
        req.session.save(function(saveErr) {
          res.redirect('/');
        })
      } else {
        throw new UserError('Failed Sign In: invalid user credentials', "/login", 200);
      }
    })
    .catch(function (err) {
      if (err instanceof UserError) {
        req.flash("error", err.getMessage());
        req.session.save(function(saveErr) {
          res.redirect(err.getRedirectURL());
        })
      } else {
        next(err);
      }
    })
});

router.post("/logout", function (req, res, next) {
  req.flash([]);
  req.session.destroy(function(destroyError) {
    if (destroyError) {
      next(destroyError);
    } else {
      res.json({
        status: 200,
        message: "You have been signed out"
      });
    }
  })
});

module.exports = router;