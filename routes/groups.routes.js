//Imports
const router = require("express").Router();

//Import models
const Groups = require("../models/group.model");

//Create a group
router.post("/", (req, res) => {
  Groups.create(req.body)
    .then((group) => {
      res.json(group);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

//Read all Groups
router.get("/", (req, res) => {
  Groups.find()
    .then((groups) => {
      res.json(groups);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

//Read an Issue
router.get("/:groupId", (req, res) => {
  Groups.findById(req.params.groupId)
    .then((group) => {
      res.json(group);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

//Updates a group
router.patch("/:groupId", (req, res) => {
  Groups.findByIdAndUpdate(req.params.groupId, req.body, { new: true })
    .then((group) => {
      res.json(group);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

//Deletes a group
router.delete("/:groupId", (req, res) => {
  Groups.findByIdAndDelete(req.params.groupId)
    .then((group) => {
      res.json(group);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

module.exports = router;
