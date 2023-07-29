//Imports
const router = require("express").Router();
const {Types: {ObjectId}} = require('mongoose');

//Import models
const Groups = require("../models/group.model");
const Posts = require("../models/post.model");

// Import Middleware
const isLoggedIn = require("../middleware/isLoggedIn");

//Functions
const isValidObjectId = (id) => ObjectId.isValid(id) && (new ObjectId(id)).toString() === id;

//Create a group
router.post("/", isLoggedIn, (req, res) => {
    //Destructuring constants
    const {groupDescription, groupName} = req.body;
    const user = req.user._id;

    // Validate data
    if (typeof groupDescription != 'string') return res.status(400).json({errorMessage: 'Please provide a group description'});
    if (typeof groupName != 'string') return res.status(400).json({errorMessage: 'Please provide a group name'});

    // Create a group object
    const newGroup = {user, groupName, groupDescription};

    // Create the Group
    Groups.create(newGroup)
        .then((group) => {
            return res.json(group);
        })
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
});

//Read all groups
router.get("/", (req, res) => {
    Groups.find()
        .then((groups) => {
            return res.json(groups);
        })
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
});

//Read a single group
router.get("/:groupId", async (req, res) => {
    // Validate the group ID
    if (!isValidObjectId(req.params.groupId)) return res.status(404).json({errorMessage: "Group ID is incorrect"});

    // Retrieve the group
    const groupInfo = await Groups.findById(req.params.groupId)
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });

    // Returns error if a group doesn't exist
    if (!groupInfo) return res.status(404).json({errorMessage: "Group doesn't exist"});

    // Retrieves all posts from that event
    const postInfo = await Posts.find({groupId: ObjectId(req.params.groupId)})
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });

    return res.json({groupInfo, postInfo});
});

//Update a group
router.patch("/:groupId", isLoggedIn, async (req, res) => {
    // Validate the group ID
    if (!isValidObjectId(req.params.groupId)) return res.status(400).json({errorMessage: "Group ID is incorrect."});

    // Retrieve group
    const groupInfo = await Groups.findById(req.params.groupId).populate({path: "user", model: 'User'})
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });

    // Validate that the group exists and the user is the owner.
    if (!groupInfo) return res.status(404).json({errorMessage: "Group doesn't exist"});
    if (groupInfo["user"].username !== req.user.username) return res.status(401).json({errorMessage: 'Not authorized'});

    // Destructure the request
    const {groupName, groupDescription} = req.body;

    // Field validation
    if (typeof groupDescription != 'string') return res.status(400).json({errorMessage: 'Please provide a group description'});
    if (typeof groupName != 'string') return res.status(400).json({errorMessage: 'Please provide a group name'});

    // Create a group object
    const updateGroup = {groupDescription, groupName};

    // Edit the group
    Groups.findByIdAndUpdate(req.params.groupId, updateGroup, {new: true})
        .then((group) => {
            return res.json(group);
        })
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
});

//Deletes a group
router.delete("/:groupId", isLoggedIn, async (req, res) => {
    // Validate the group ID
    if (!isValidObjectId(req.params.groupId)) return res.status(404).json({errorMessage: "Group ID is incorrect"});

    // Retrieve group
    const group = await Groups.findById(req.params.groupId).populate({path: 'user', model: 'User'});

    // Validate that the group exists and the user is the owner.
    if (!group) return res.status(404).json({errorMessage: "Group doesn't exist"});
    if (group['user'].username !== req.user.username) return res.status(401).json({errorMessage: 'Not Authorized'});

    Groups.findByIdAndDelete(req.params.groupId)
        .then((group) => {
            return res.json(group);
        })
        .catch((err) => {
            return res.status(400).json({errorMessage: err.message});
        });
});

module.exports = router;
