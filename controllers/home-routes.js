const path = require("path");
const router = require("express").Router();
const { User, Blog, Comment } = require("../models");

// GET (Read) for Home
router.get("/", async (req, res) => {
  try {
    res.render("home");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET (Read) for Dashboard
router.get("/dashboard", async (req, res) => {
  try {
    res.render("dashboard");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET (Read) for Log In
router.get("/login", async (req, res) => {
  // If the user is already logged in, redirect the request to the Dashboard
  try {
    if (req.session.logged_in) {
      res.redirect("/dashboard");
      return;
    }
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET (Read) for Sign Up
router.get("/signup", async (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
