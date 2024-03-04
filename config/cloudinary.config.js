// Imports
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
    secure: true
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async(req, file) =>{
      const filename = req.body.mediaName.replace(/ /g,"_");
  
      return{
        formats: 'jpeg',
        folder: 'sharex',
        filename: filename
      }
    }
  });
   
  module.exports = multer({ storage });