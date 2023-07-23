//Imports
const router = require("express").Router();

//Import models
const User = require("../models/user.model");

//Read Ids
router.get("/:id", (req, res) => {
    User.findById(req.params.id)
        .populate("groupsJoinedId")
        .populate("eventsJoinedID")
        .then((user) => {
            return res.json(user);
        })
        .catch((e) => {
            console.log(e);
        });
});

router.post("/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then((user) => {
            res.json(user);
        })
        .catch((e) => {
            console.log(e);
        });
});

module.exports = router;
