//Imports
const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");

//Import models
const Issues = require("../models/issue.model");

//Create Issues
router.post("/create", fileUploader.single("placeholder"), (req, res, next) => {
  Issues.create(req.body)
    .then((issue) => {
      res.json(issue);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Read Issues
router.get("/", (req, res, next) => {
  Issues.find()
    .then((issues) => {
      res.json(issues);
    })
    .catch(console.log);
});

router.get("/issue/:issueId", (req, res, next) => {
  Issues.findById(req.params.issueId)
    .then((event) => {
      res.json(event);
    })
    .catch(console.log);
});

//Update events
router.post("/issue/:issueId/edit", (req, res, next) => {
  Issues.findByIdAndUpdate(req.params.issueId, req.body, { new: true })
    .then((issue) => {
      res.json(issue);
    })
    .catch(console.log);
});

//Delete events
router.post("/issue/:issueId/delete", (req, res, next) => {
  Issues.findByIdAndDelete(req.params.issueId)
    .then(res.json("success"))
    .catch(console.log);
});

module.exports = router;
