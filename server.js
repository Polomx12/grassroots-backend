//Imports our Application
const app = require("./app");

// Sets the port of our application
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`);
});
