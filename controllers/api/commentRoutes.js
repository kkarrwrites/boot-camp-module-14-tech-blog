const router = require("express").Router();
const { Comment, User, Blog } = require("../../models");
const withAuth = require("../../utils/withAuth");

// POST (Create) new comment route
router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
