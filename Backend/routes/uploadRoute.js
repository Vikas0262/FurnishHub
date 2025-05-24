// uploadRoute.js
const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

router.post('/upload', upload.single('image'), (req, res) => {
  res.json({ imageUrl: req.file.path }); // Cloudinary URL
});

module.exports = router;
