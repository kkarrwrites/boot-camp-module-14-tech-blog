const path = require("path");
const router = require("express").Router();
const { User, Blog, Comment } = require("../models");
const withAuth = require("../utils/withAuth");

// GET (Read) for Home
router.get("/", async (req, res) => {
  try {
    // Get all blogs and JOIN with user
    const blogData = await Blog.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });

    // Serialize blog data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized blog data
    res.render("home", {
      blogs,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET (Read) for a single blog
router.get("/blog/id:", async (req, res) => {});

// GET (Read) for Dashboard
// Use withAuth middleware to prevent access to route unless logged in
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"], include: [{ model: Blog }] },
    });

    const user = userData.get({ plain: true });

    res.render("dashboard", {
      ...user,
      logged_in: true,
    });
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
