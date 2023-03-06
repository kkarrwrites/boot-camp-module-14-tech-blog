// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

// Sets up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up Handlebars as the default template engine
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middelware needed by Express for POST (Create) and PUT (Update) requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Sets up controllers/routers
app.use(require("./controllers"));

// Starts the server
app.listen(PORT, () => {
  console.log("\x1b[33m", `Server listening on http://localhost:${PORT}.`);
});
