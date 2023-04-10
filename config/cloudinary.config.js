//Imports
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

//Configures our cloudinary API keys
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

//Set the configuration of our Cloudinary Storage.
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["jpg", "png", "jpeg"],
    folder: "Grassroots",
  },
});

module.exports = multer({ storage });
