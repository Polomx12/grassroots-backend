//Imports
const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");

//Import models
const User = require("../models/user.model");

//Read Ids
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .populate("groupsJoinedId")
    .then((user) => {
      res.json(user);
    })
    .catch(console.log);
});

router.post("/:id", (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((user) => {
      res.json(user);
    })
    .catch(console.log);
});

module.exports = router;
