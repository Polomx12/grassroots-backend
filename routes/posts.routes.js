// Imports
const router = require("express").Router();
const {Types: {ObjectId}} = require("mongoose");

// Import Models
const Posts = require("../models/post.model");
const Comments = require("../models/comment.model");

// Import Middleware
const isLoggedIn = require("../middleware/isLoggedIn");

// Functions
const isValidObjectId = (id) => ObjectId.isValid(id) && (new Object(id)).toString() === id;

//Create a Post
router.post("/", isLoggedIn, (req, res) => {
    // Destructuring constants
    const {postTitle, postText, externalId} = req.body;
    const user = req.user._id;

    // Field validation
    if (!isValidObjectId(externalId)) return res.status(400).json({errorMessage: 'Please provide a valid external ID.'});
    if (typeof postText != 'string') return res.status(400).json({errorMessage: 'Please provide valid post text.'});
    if (typeof postTitle != 'string') return res.status(400).json({errorMessage: 'Please provide a valid post title'});

    // Create a new post object
    const newPost = {postText, postTitle, externalId, user};

    //Create Post
    Posts.create(newPost)
        .then((post) => {
            return res.json(post);
        })
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
});

//Read all posts
router.get("/", (req, res) => {
    Posts.find()
        .then((posts) => {
            return res.json(posts);
        })
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
});

//Read a single post
router.get("/:postId", async (req, res) => {
    // Validate the post ID
    if (!isValidObjectId(req.params.postId)) return res.status(404).json({errorMessage: "Post ID is incorrect"});

    // Retrieve the Post
    const postInfo = await Posts.findById(req.params.postId)
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });

    // Returns error if a post doesn't exist
    if (!postInfo) return res.status(404).json({errorMessage: "Post doesn't exist"});

    // Retrieves all comments from that event
    const commentInfo = await Comments.find({postId: req.params.postId})
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });

    return res.json({postInfo, commentInfo});
});

//Update a post
router.patch("/:postId", isLoggedIn, async (req, res) => {
    // Validate the post ID
    if (!isValidObjectId(req.params.postId)) return res.status(404).json({errorMessage: "Post ID is incorrect."});

    // Retrieve post
    const postInfo = await Posts.findById(req.params.postId).populate({path: "user", model: 'User'})
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });

    // Validate that the post exists and the user is the owner
    if (!postInfo) return res.status(404).json({errorMessage: "Post doesn't exist"});
    if (postInfo['user'].username !== req.user.username) return res.status(401).json({errorMessage: "Not Authorized"});

    // Destructure the request
    const {postTitle, postText} = req.body;

    // Field validation
    if (typeof postTitle != 'string') return res.status(400).json({errorMessage: "Please provide a valid post title"});
    if (typeof postText != 'string') return res.status(400).json({errorMessage: "Please provide a valid post text"});

    // Create post object
    const updatePost = {postTitle, postText};

    // Edit the Post
    Posts.findByIdAndUpdate(req.params.postId, updatePost, {new: true})
        .then((post) => {
            return res.json(post);
        })
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
});

//Deletes a post
router.delete("/:postId", isLoggedIn, async (req, res) => {
    // Validate the post ID
    if (!isValidObjectId(req.params.postId)) return res.status(404).json({errorMessage: "Post ID is incorrect"});

    // Retrieve the post
    const post = await Posts.findById(req.params.postId).populate({path: "user", model: "User"})
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });

    // Validate that the post exists and the user is the owner.
    if (!post) return res.status(404).json({errorMessage: "Post doesn't exist"});
    if (post['user'].username !== req.user.username) return res.status(401).json({errorMessage: "Not Authorized"});


    // Delete Post
    Posts.findByIdAndDelete(req.params.postId)
        .then((post) => {
            return res.json(post);
        })
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
});

module.exports = router;
