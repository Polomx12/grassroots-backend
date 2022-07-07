//Imports
const router = require("express").Router();

//Import Models
const Events = require("../models/event.model");

//Create a post
router.post("/", (req, res) => {
  Events.create(req.body)
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
  Events.find()
    .then((events) => {
      res.json(events);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Serer Error" });
    });
});

//Read a post
router.get("/:eventId", (req, res) => {
  Events.findById(req.params.eventId)
    .then((post) => {
      res.json(post);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Erorr" });
    });
});

//Update a post
router.patch("/:eventId", (req, res) => {
  Events.findByIdAndUpdate(req.params.eventId, req.body, { new: true })
    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

//Delete a post
router.delete("/:eventId", (req, res) => {
  Events.findByIdAndDelete(req.params.eventId)
    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: "Internal Server Error" });
    });
});

module.exports = router;
