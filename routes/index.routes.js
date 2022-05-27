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
const Event = require("../models/event.model");
const User = require("../models/user.model");

//Home routes
router.get("/home", (req, res, next) => {
  Event.find()
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

//Manages the routes to other pages
router.use("/auth", authRoutes);

router.use("/user", userRoutes);

router.use("/issues", issuesRoutes);

router.use("/events", eventsRoutes);

router.use("/groups", groupsRoutes);

router.use("/posts", postsRoutes);

//Export to App
module.exports = router;
