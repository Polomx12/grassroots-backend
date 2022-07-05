//Imports
const router = require("express").Router();

//Routes Imports
const authRoutes = require("./auth.routes");
const usersRoutes = require("./user.routes");
const issuesRoutes = require("./issues.routes");
const eventsRoutes = require("./events.routes");
const groupsRoutes = require("./groups.routes");
const postsRoutes = require("./posts.routes");

//Our API landing page
router.get("/", (req,res)=>{
  res.json({message: "Welcome to the grassroots server"})
});

//Manages the routes to other pages
router.use("/auth", authRoutes);

router.use("/user", usersRoutes);

router.use("/issues", issuesRoutes);

router.use("/events", eventsRoutes);

router.use("/groups", groupsRoutes);

router.use("/posts", postsRoutes);

//Export to App
module.exports = router;
