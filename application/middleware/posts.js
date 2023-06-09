const db = require('../conf/database');

module.exports = {
  getRecentPosts: function (req, res, next) {
    db.query('select id, title, description, thumbnail from posts ORDER BY createdAt DESC LIMIT 21')
      .then(function ([results, fields]) {
        if (results && results.length) {
          res.locals.results = results;
        }
        next();
      })
      .catch(err => next(err));
  },

  getPostById: function (req, res, next) {
    let postId = req.params.id;
    let baseSQL = `
      SELECT p.id, p.title, p.description, p.image, p.createdAt, u.username
      FROM posts p
      JOIN users u
      ON p.fk_authorId=u.id
      WHERE p.id=?;`;
    db.query(baseSQL, [postId])
      .then(function ([results, fields]) {
        if (results && results.length == 1) {
          res.locals.currentPost = results[0];
          next();
        } else {
          req.flash("error", `Post ID ${postId} does not exist`);
          req.session.save(function (saveErr) {
            res.redirect('/');
          })
        }
      })
  },

  getCommentsForPostById: function (req, res, next) {
    let postId = req.params.id;
    let baseSQl = `select c.id, c.text, c.createdAt, u.username
      FROM comments c
      JOIN users u
      ON c.fk_authorId=u.id
      WHERE fk_postId=?
      ORDER BY c.createdAt DESC;`;
    db.execute(baseSQl, [postId])
      .then(function ([results, fields]) {
        res.locals.currentPost.comments = results;
        next();
      })
      .catch(err => next(err))
  }
};