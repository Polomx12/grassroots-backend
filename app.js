//This gives us access to our environment variables
require("dotenv/config");

//This connects us to the MongoDB database
require("./config/mongoAtlas.config");

// This connects us to Cloduinary
require("./config/cloudinary.config");

//Express handles our HTTP requests and initializes our application
const express = require("express");

const app = express();

//Imports our server configurations
require("./config/server.config")(app);

//This handles all of our routes
const allRoutes = require("./routes/index.routes");
app.use("/api", allRoutes);

//This will handle all of our errors
require("./error-handling")(app);

module.exports = app;
