//Imports
const router = require("express").Router();

//Import models
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");

//Create Posts
router.post("/create", (req, res, next) => {
  Post.create(req.body)
    .then((post) => {
      res.json(post);
    })
    .catch(console.log);
});

//Read Post
router.get("/post/:postId", (req, res, next) => {
  Post.findById(req.params.postId)
    .then((post) => {
      res.json(post);
    })
    .catch(console.log);
});

//Update Post
router.post("/post/:postId/edit", (req, res, next) => {
  Post.findByIdAndUpdate(req.params.postId, req.body, { new: true })
    .then((post) => {
      res.json(post);
    })
    .catch(console.log);
});

//Delete events
router.post("/post/:postId/delete", (req, res, next) => {
  Post.findByIdAndDelete(req.params.postId)
    .then(res.json("success"))
    .catch(console.log);
});

module.exports = router;
