//Imports
const router = require("express").Router();

//Import Models
const Posts = require("../models/post.model");

//Create a post
router.post("/", (req, res) => {
  Posts.create(req.body)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

//Read all posts
router.get("/", (req, res) => {
  Posts.find()
    .then((posts) => {
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

//Read a post
router.get("/:postId", (req, res) => {
  Posts.findById(req.params.postId)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

//Update a post
router.patch("/:postId", (req, res) => {
  Posts.findByIdAndUpdate(req.params.postId, req.body, { new: true })
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

//Deletes a post
router.delete("/:postId", (req, res) => {
  Posts.findByIdAndDelete(req.params.postId)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

module.exports = router;
