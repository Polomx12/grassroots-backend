// Imports
const router = require("express").Router();
const {Types: {ObjectId}} =  require("mongoose");

// Import models
const User = require("../models/user.model");

//Import middleware
const isLoggedIn = require("../middleware/isLoggedIn");

// Functions
const isValidObjectId = (id) => ObjectId.isValid(id) && (new Object(id)).toString() === id;

//Read Ids
router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .populate("groupsJoinedId")
        .populate("eventsJoinedID")
        .then((user) => {
            return res.json(user);
        })
        .catch((e) => {
            console.log(e);
        });
});

router.post("/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((user) => {
            res.json(user);
        })
        .catch((e) => {
            console.log(e);
        });
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
