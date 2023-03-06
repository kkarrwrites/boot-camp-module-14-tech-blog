const router = require("express").Router();
const path = require("path");

// GET (Read) for homepage
router.get("/", async (req, res) => {
  res.render("homepage");
});

module.exports = router;
