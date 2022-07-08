//Imports
const router = require("express").Router();

//Import Models
const Comments = require("../models/comment.model");

//Create a comment
router.post("/", (req, res) => {
  Comments.create(req.body)
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

//Read all comments
router.get("/", (req, res) => {
  Comments.find()
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

//Read a comment
router.get("/:commentId", (req, res) => {
  Comments.findById(req.params.commentId)
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

//Update a comment
router.patch("/:commentId", (req, res) => {
  Comments.findByIdAndUpdate(req.params.commentId, req.body, { new: true })
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      console.log(err);
      res.json("Internal Server Error");
    });
});

router.delete("/:commentId", (req, res) => {
  Comments.findByIdAndDelete(req.params.commentId)
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

module.exports = router;
