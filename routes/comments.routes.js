// Imports
const router = require("express").Router();
const {Types: {ObjectId}} = require("mongoose");

// Import Models
const Comments = require("../models/comment.model");

// Import Middleware
const isLoggedIn = require("../middleware/isLoggedIn");

// Functions
const isValidObjectId = (id) => ObjectId.isValid(id) && (new Object(id)).toString() === id;

//Create a comment
router.post("/", isLoggedIn, (req, res) => {
    // Destructuring constants
    const {commentText, postId} = req.body;
    const user = req.user._id;

    // Field Validation
    if (!isValidObjectId(postId)) return res.status(400).json({errorMessage: "Please provide a valid post Id"});
    if (typeof commentText != 'string') return res.status(400).json({errorMessage: 'Please provide a valid comment text'});

    // Create a new comment
    const newComment = {commentText, postId, user};

    // Create a comment
    Comments.create(newComment)
        .then((comment) => {
            return res.json(comment);
        })
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
});

//Read all comments
router.get("/", (req, res) => {
    Comments.find()
        .then((comments) => {
            return res.json(comments);
        })
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
});

//Read a comment
router.get("/:commentId", async (req, res) => {
    // Validate the comment ID
    if (!isValidObjectId(req.params.commentId)) return res.status(404).json({errorMessage: "Comment ID is incorrect"});

    // Retrieve the comment
    const commentInfo = await Comments.findById(req.params.commentId)
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });

    // Returns error if event doesn't exist
    if (!commentInfo) return res.status(404).json({errorMessage: "Comment doesn't exist"});

    return res.json({commentInfo});
});

//Update a comment
router.patch("/:commentId", isLoggedIn, async (req, res) => {
    // Validate comment ID
    if (!isValidObjectId(req.params.commentId)) return res.status(404).json({errorMessage: "Comment ID is incorrect"});

    // Retrieve comment
    const commentInfo = await Comments.findById(req.params.commentId).populate({path: 'user', model: 'User'})
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });

    // Validate that the comment exists and the user is the owner
    if (!commentInfo) return res.status(404).json({errorMessage: "Comment doesn't exist"});
    if (commentInfo['user'].username !== req.user.username) return res.status(401).json({errorMessage: "Not Authorized"});

    // Destructure the request
    const {commentText} = req.body;

    // Field validation
    if (typeof commentText != 'string') return res.status(400).json({errorMessage: 'Please provide a valid comment text'});

    Comments.findByIdAndUpdate(req.params.commentId, {commentText}, {new: true})
        .then((comment) => {
            return res.json(comment);
        })
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
});

// Deletes a comment
router.delete("/:commentId", isLoggedIn, async (req, res) => {
    // Validate the comment
    if (!isValidObjectId(req.params.commentId)) return res.status(404).json({errorMessage: "Comment ID is incorrect"});

    // Retrieve the comment
    const comment = await Comments.findById(req.params.commentId).populate({path: "user", model: "User"})
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });

    // Validate that the comment exists and the user is the owner.
    if (!comment) return res.status(404).json({errorMessage: "Comment doesn't exist"});
    if (comment['user'].username !== req.user.username) return res.status(401).json({errorMessage: "Not Authorized"});

    // Delete the comment
    Comments.findByIdAndDelete(req.params["commentId"])
        .then((comment) => {
            return res.json(comment);
        })
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
});

module.exports = router;
