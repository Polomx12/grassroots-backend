// Imports
const express = require("express");
const cors = require("cors");
const logger = require('morgan')
require("cookie-parser");

// Middleware configuration
module.exports = (app) => {
  // This will allow us to receive requests to be forwarded to our server by the proxy.
  app.set("trust proxy", 1);

  // Allows cors configuration
  app.use(
    cors({
      credentials: true,
      origin: "*",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE"
    })
  );

  app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

  // During development this will log all of our requests.
  app.use(logger("dev"));

  // To have access to `body` property in the request
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
};
