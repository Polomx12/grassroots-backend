// Imports
const mongoose = require("mongoose");

// Variable holds the connection to the online or local database
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/grassroots";

// Configures our connection to the database
mongoose
  .set('strictQuery', false)
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
