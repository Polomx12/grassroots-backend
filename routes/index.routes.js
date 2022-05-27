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
const Post = require("../models/post.model");

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

router.post("/addgroup", (req, res, next) => {
  User.findById("628f088bc9086d416afbc97f")
    .populate("groupsJoinedId")
    .then((user) => {
      user.groupsJoinedId.push(req.body.group);
      user.save();
      res.json(user);
    });
});

router.post("/group/:group/comments", (req, res, next) => {
  console.log(req.body)
  Post.create(req.body)
    .then((comment) => {
      let typo = 0;
      typo = comment._id;   

      Group.findById(req.body.groupId)
        .then((group) => {
          group.posts.push(typo);
          group.save();
        })
        .catch(console.log);

      res.json("success");
    })
    .catch(console.log);
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
