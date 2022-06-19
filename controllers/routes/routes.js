const router = require("express").Router();
const { getAttributes } = require("../../models/Blog");
const { Blog, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/login", async (req, res) => {
  res.render("login");
});

router.get("/signup", async (req, res) => {
  return res.render("signup");
});

router.get("/post", async (req, res) => {
  return res.render("post");
});

router.get("/post/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('post', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      where: {
        user_id: req.session.user_id
      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    })
    const blogs =  blogData.map((blogs) => blogs.get({ plain: true }));
    return res.render("dashboard", {
      blogs,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    // Serialize data so the template can read it
    const blogs = blogData.map((blogs) => blogs.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("home", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
