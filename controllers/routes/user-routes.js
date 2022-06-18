const router = require('express').Router();
const { getAttributes } = require('../../models/Blog');
const { Blog, User } = require('../../models');
// async function getAllBlogs() {
//   const blogData = await Blog.findAll({
//     include: [{
//        model: User,
//        attributes: ['name'], 
//     }],
//   });
//   return blogData;
// }

// login
router.get('/login', async (req, res) => {
    res.render('login');
  });
  
// sign up
router.get('/signup', async (req, res) => {
  return res.render('signup');
});

router.get('/dashboard', async (req, res) => {
  return res.render('dashboard');
});

// router.get('/', async (req, res) => {
//   const blogs = await getAllBlogs();
//   console.log('blogs =====>', blogs.map(b => b.dataValues))
//   return res.render('home', { blogs: blogs.map(b => b.dataValues) });
// });
router.get('/', async(req, res) => {
  try {
    // Get all projects and JOIN with user data
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });
    // Serialize data so the template can read it
    const blogs = blogData.map((blogs) => blogs.get({ plain: true }));
    console.log('blogs ====>', blogs)
    console.log("req.session.logged_in  ===>", req.session.logged_in )
    // Pass serialized data and session flag into template
    res.render('home', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
})


module.exports = router;
  