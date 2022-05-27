//Imports
const router = require("express").Router();

//Routes Imports
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const issuesRoutes = require("./issues.routes");
const eventsRoutes = require("./events.routes");
const groupsRoutes = require("./groups.routes");
const postsRoutes = require("./posts.routes");

//MondoDB imports
const Group = require("../models/group.model");
const User = require("../models/user.model");

//Home routes
router.get("/home", (req, res, next) => {
  Group.find()
    .sort({ likes: -1 })
    .limit(3)
    .then((events) => {
      res.json(events);
    })
    .catch(console.log);
});

router.get("/learn", (req, res, next) => {
  res.json("You have accessed the learn page");
});

router.post("/addgroup", (req, res, next) => {
  User.findById(req.body.user)
    .populate("groupsJoinedId")
    .then((user) => {
      user.groupsJoinedId.push(req.body.group);
      user.save()
      res.json(user)
    });
});

//Manages the routes to other pages
router.use("/auth", authRoutes);

router.use("/user", userRoutes);

router.use("/issues", issuesRoutes);

router.use("/events", eventsRoutes);

router.use("/groups", groupsRoutes);

router.use("/posts", postsRoutes);

//Export to App
module.exports = router;
