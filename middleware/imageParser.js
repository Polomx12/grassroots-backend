//Imports
const multer = require('multer');

// Save image to local disk
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

// Create function
const upload = multer({storage: storage});

module.exports = upload;