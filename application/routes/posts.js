const express = require('express');
const router = express.Router();
const db = require('../conf/database');
const multer = require("multer");
const sharp = require("sharp");
const {isLoggedIn} = require("../middleware/protectors");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/uploads')
  },
  filename: function (req, file, cb) {
    let fileExt = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}-${Math.round(Math.random() * 1E9)}.${fileExt}`)
  }
})

const upload = multer({storage: storage})

router.post("/create", isLoggedIn, upload.single("uploadImage"), async function (req, res, next) {
  let uploadedFile = req.file.path;
  let thumbnailName = `thumbnail-${req.file.filename}`;
  let destinationOfThumbnail = `${req.file.destination}/${thumbnailName}`;
  const {title, description} = req.body;
  const userId = req.session.userId;
  const metadata = await sharp(uploadedFile).metadata();

  if (metadata.width < 300 || metadata.height < 300) {
    sharp(uploadedFile).resize(Math.min(metadata.width), metadata.height);
  } else {
    sharp(uploadedFile).resize(300);
  }
  sharp(uploadedFile)
    .toFile(destinationOfThumbnail)
    .then(function () {
      let baseSQL = `
      INSERT INTO posts (title, description, image, thumbnail, fk_authorId) VALUE (?,?,?,?,?)
      `
      return db.query(baseSQL, [title, description, uploadedFile, destinationOfThumbnail, userId])
    })
    .then(function ([results, fields]) {
      if (results && results.affectedRows) {
        req.flash("success", "Your post has been created!");
        req.session.save(function (saveErr) {
          res.redirect('/');
        })
      }
    })
    .catch(err => next(err));
});

// localhost:3000/posts/search
router.get("/search", function (req, res, next) {
  let searchTerm = `%${req.query.searchTerm}%`;
  let originalSearchTerm = req.query.searchTerm;
  let baseSQL =
    `SELECT id, title, description, thumbnail, concat_ws(" ", title, description) as haystack
    FROM posts
    HAVING haystack like ?;`;
  db.execute(baseSQL, [searchTerm])
    .then(function ([results, fields]) {
      if (originalSearchTerm === "" || originalSearchTerm === " " || results.length < 1) {
        req.flash("error", `0 results found`);
        req.session.save(function (saveErr) {
          res.redirect(`/`);
        })
      } else {
        res.locals.results = results;
        res.locals.searchTerm = originalSearchTerm;
        req.flash("success", `${results.length} results found`);
        req.session.save(function (saveErr) {
          res.render(`index`);
        })
      }
    })
});

module.exports = router;