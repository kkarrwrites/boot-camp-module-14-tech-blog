const router = require("express").Router();
const { Comment, User, Blog } = require("../../models");
const withAuth = require("../../utils/withAuth");

// GET (Read) for Edit
router.get("/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ["username"] },
        {
          model: Comment,
          attributes: ["content", "created_at"],
          include: { model: User, attributes: ["username"] },
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render("edit", {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT (Edit) for Edit
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updatedBlog = await Blog.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    if (!updatedBlog) {
      res.status(404).json({ message: "No post found with this id." });
      return;
    }

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE (Delete) for Edit
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: "No project found with this id." });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
