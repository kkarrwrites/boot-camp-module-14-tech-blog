const router = require("express").Router();
const path = require("path");

// GET (Read) for static homepage
router.get("/", async (req, res) => {
  res.render("home");
});

module.exports = router;
