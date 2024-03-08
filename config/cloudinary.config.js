// Imports
const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({
    secure: true
});

module.exports = cloudinary;