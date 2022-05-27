//Imports
const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");

//Import models
const User = require("../models/user.model");
const Event = require("../models/event.model");
const { compareSync } = require("bcrypt");

//TODO: Change cloudinary config
//Create Events
router.post("/create", fileUploader.single("eventImage"), (req, res, next) => {
  Event.create(req.body)
    .then((event) => {
      res.json(event);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/upload", fileUploader.single("imageUrl"), (req, res, next) => {
 
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ fileUrl: req.file.path });
})
//Read events
router.get("/", (req, res, next) => {
  Event.find()
    .then((events) => {
      res.json(events);
    })
    .catch(console.log);
});

router.get(
  "/event/:eventId",
  (req, res, next) => {
    Event.findById(req.params.eventId)
      .then((event) => {
        res.json(event);
      })
      .catch(console.log);
  }
);

//Update events
router.post("/event/:eventId/edit", (req, res, next) => {
  Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true })
    .then((event) => {
      res.json(event);
    })
    .catch(console.log);
});

//Delete events
router.post("/event/:eventId/delete", (req, res, next) => {
  Event.findByIdAndDelete(req.params.eventId)
    .then(res.json("success"))
    .catch(console.log);
});

module.exports = router;
