//Imports
const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");

//Import models
const User = require("../models/user.model");
const Group = require("../models/group.model");

//TODO: Change cloudinary config
//Create Group
router.post(
  "/create",
  fileUploader.single("event-cover-image"),
  (req, res, next) => {
    Group.create(req.body)
      .then((group) => {
        res.json(group);
      })
      .catch((err) => {
        console.log(err);
      });
  }
);

//Read Groups
router.get("/", (req, res, next) => {
  Group.find()
    .then((groups) => {
      res.json(groups);
    })
    .catch(console.log);
});

router.get("/group/:groupId", (req, res, next) => {
  Group.findById(req.params.groupId)
    .populate("posts")
    .then((group) => {
      res.json(group);
    })
    .catch(console.log);
});

//Update events
router.post("/group/:groupId/edit", (req, res, next) => {
  Group.findByIdAndUpdate(req.params.groupId, req.body, { new: true })
    .populate("posts")
    .then((group) => {
      res.json(group);
    })
    .catch(console.log);
});

router.post("/group/:groupdId/delete", (req, res, next) => {
  Group.findByIdAndDelete(req.params.groupdId)
    .then(res.json("Success"))
    .catch(console.log);
});

module.exports = router;
