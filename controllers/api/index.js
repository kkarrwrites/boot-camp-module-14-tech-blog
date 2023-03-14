const router = require("express").Router();

const userRoutes = require("./userRoutes");
const commentRoutes = require("./commentRoutes");
const blogRoutes = require("./blogRoutes");
const editRoutes = require("./editRoutes");

router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use("/blogs", blogRoutes);
router.use("/edit", editRoutes);

module.exports = router;
