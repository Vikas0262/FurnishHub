// multer.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vikas_folder_name', // optional
    allowed_formats: ['jpg', 'png', 'jpeg', 'svg', 'webp'],
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
