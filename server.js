// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const routes = require("./controllers");
// Enable access to .env variables
require("dotenv").config();

// Sets up Sequelize
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Sets up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up Handlebars (add custom helpers between {})
const hbs = exphbs.create({});

// Sets up Express-Sessions with cookies
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // Expires after 1 day
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
    checkExpirationInterval: 1000 * 60 * 10, // Checks every 10 minutes
    expiration: 1000 * 60 * 30, // Expires after 30 minutes
  }),
};

// Sets up Express-Session
app.use(session(sess));

// Sets up Handlebars as the default template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middelware needed by Express for POST (Create) and PUT (Update) requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Sets up controllers/routers
app.use(routes);

// Starts the database and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("\x1b[33m", `Server listening on http://localhost:${PORT}.`)
  );
});
