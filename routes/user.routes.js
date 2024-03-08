// Imports
const router = require("express").Router();
const {Types: {ObjectId}} =  require("mongoose");
const cloudinary = require("../config/cloudinary.config");
const imageParser = require('../middleware/imageParser');

// Import models
const User = require("../models/user.model");

//Import middleware
const isLoggedIn = require("../middleware/isLoggedIn");

// Functions
const isValidObjectId = (id) => ObjectId.isValid(id) && (new Object(id)).toString() === id;

// Get a user information
router.get("/:userId", async(req, res) => {
    // Validate the user ID
    if (!isValidObjectId(req.params.userId)) return res.status(404).json({errorMessage: "User ID is incorrect"});

    // Retrieve the User
    User.findById(req.params.userId)
        .then((user) => {
            if (!user) return res.status(404).json({errorMessage: "User doesn't exist"});

            return res.json(user);
        })
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
});

//Update a user
router.patch("/:userId", isLoggedIn, imageParser.single('image'), async (req, res) => {
    // Validate the User ID
    if (!isValidObjectId(req.params.userId)) return res.status(404).json({errorMessage: "User ID is incorrect"});

    // Retrieve the User Info
    const userInfo =  await User.findById(req.params.userId)
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
    
    // Validate that the user exists and the user is the owner.
    if (!userInfo) return res.status(404).json({errorMessage: "User doesn't exist"});
    if (userInfo.username !== req.user.username) return res.status(401).json({errorMessage: 'Not Authorized'});
    
    // Creates an empty user information object.
    let updateUser = {};

    // Checks whether this is a request to change the user image or user information.
    if (req.file){
        const imageInfo =  await cloudinary.uploader.upload(req.file.path)
            .catch((err)=>{
                return res.status(400).json({errorMessage: err.messsage});
            })
        const userImage = imageInfo.url;

        updateUser = {userImage};
    } else {
        // Destructure the request
        const {email, userDescription, website} = req.body;
    
        // Field Validation
        const emailRegex = /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*$/
    
        if (typeof email != 'string') return res.status(400).json({errorMessage: 'Please provide a valid email'});
        if (typeof userDescription !== 'string') return res.status(400).json({errorMessage: 'Please provide a valid user description'});
        if (typeof website !== 'string') return res.status(400).json({errorMessage:'Please provide a valid website'});
        if (!emailRegex.test(email)) return res.status(400).json({errorMessage: 'Please provide a valid email'});
    
        //Create a valid object
        updateUser = {email, userDescription, website};
    }

    // Update the user.
    User.findByIdAndUpdate(req.params.userId, updateUser, {new: true})
        .then((user)=>{
            return res.json(user);
        })
        .catch((err)=>{
            return res.status(400).json({errorMessage: err.messsage});
        })

});

// Deletes a user
router.delete('/:userId', isLoggedIn, async (req, res)=>{
    if (!isValidObjectId(req.params.userId)) return res.status(404).json({errorMessage: "User ID is incorrect"});

    // Retrieve the user
    const user = await User.findById(req.params.userId)
        .catch((err)=>{
            return res.status(400).json({errorMessage: err.message});
        });

    // Validate that the user exists and it is the user requesting the deletion.
    if (!user) return res.status(404).json({errorMessage: "User doesn't exist"});
    if (user.username !== req.user.username) return res.status(401).json({errorMessage:"Not Authorized"});

    // Delete the user
    User.findByIdAndDelete(req.params.userId)
        .then((a) => {
            return res.status(200).json("Account deleted.")
        })
        .catch((err)=>{
            return res.status(400).json({errorMessage: err.mesage});
        });
});

module.exports = router;
