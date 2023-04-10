//Imports
const router = require("express").Router();

//Import models
const Issues = require("../models/issue.model");

//Create an Issue
router.post("/", (req, res) => {
    Issues.create(req.body)
        .then((issue) => {
            res.json(issue);
        })
        .catch((err) => {
            console.log(err);
            res.json({message: "Internal Server Error"});
        });
});

//Read all Issues
router.get("/", (req, res) => {
    Issues.find()
        .then((issues) => {
            res.json(issues);
        })
        .catch((err) => {
            console.log(err);
            res.json({message: "Internal Server Error"});
        });
});

//Read an Issue
router.get("/:issueId", (req, res) => {
    Issues.findById(req.params["issueId"])
        .then((issue) => {
            res.json(issue);
        })
        .catch((err) => {
            console.log(err);
            res.json({message: "Internal Server Error"});
        });
});

//Updates an Issue
router.patch("/:issueId", (req, res) => {
    Issues.findByIdAndUpdate(req.params["issueId"], req.body, {new: true})
        .then((issue) => {
            res.json(issue);
        })
        .catch((err) => {
            console.log(err);
            res.json({message: "Internal Server Error"});
        });
});

//Deletes an issue
router.delete("/:issueId", (req, res) => {
    Issues.findByIdAndDelete(req.params["issueId"])
        .then((issue) => {
            res.json(issue);
        })
        .catch((err) => {
            console.log(err);
            res.json({message: "Internal Server Error"});
        });
});

module.exports = router;
