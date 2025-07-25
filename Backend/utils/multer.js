import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinary.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'vikas_folder_name', // optional
    allowed_formats: ['jpg', 'png', 'jpeg', 'svg', 'webp'],
  },
});

const upload = multer({ storage: storage });

export default upload;
