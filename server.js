// Dependencies
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

// Sets up Sequelize
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Sets up the Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Sets up Express-Sessions with cookies
const sess = {
  secret: "Super secret secret", // secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Sets up Express-Session
app.use(session(sess));

// Sets up Handlebars as the default template engine
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middelware needed by Express for POST (Create) and PUT (Update) requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Sets up controllers/routers
app.use(routes);

// Starts the database and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("\x1b[33m", `Server listening on http://localhost:${PORT}.`)
  );
});
