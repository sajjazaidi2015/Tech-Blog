const router = require('express').Router();
const Blog = require('../../models/Blog');


router.get("/", async (req, res) => {
    // find all Blogs
    try {
      const blogData = await Blog.findAll({
        attributes: ["id", "title","content","user_id"],
      });
      res.json(blogData);
    } catch (error) {
      res.status(400).json({ message: "Server is down" });
    }
  });

  router.get("/:id", async (req, res) => {
    // find one Blog by its `id` value
    try {
      const blogID = await Blog.findOne({
        where: {
          id: req.params.id,
        },
        attributes: ["id", "title","content","user_id"],
        
      });
      return res.json(blogID);
    } catch (error) {
      res.status(400).json({ message: "Server is down" });
    }
  });

  router.post("/", async (req, res) => {
    // create a new createBlog
    try {
      const createBlog = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id
      });
      return res.json(createBlog);
    } catch (error) {
      res.status(400).json({ message: "Server is down" });
    }
  });

  router.put("/:id", async (req, res) => {
    // update a category by its `id` value
    try {
      console.log("req.params.id ===>", req.params.id);
      const updatedBlog = await Blog.update(
        {content: req.body.content,},
        {
          where: {
            id: req.params.id,
          },
        }
      );
      console.log("updatedBlog ====>", updatedBlog);
  
      return res.json(updatedBlog);
    } catch (error) {
      res.status(400).json({ message: "Server is down" });
    }
  });
  

  router.delete("/:id", async (req, res) => {
    // delete a Blog by its `id` value
    try {
      const deleteBlog = await Blog.destroy({
        where: {
          id: req.params.id,
        },
      });
      return res.json(deleteBlog);
    } catch (error) {
      res.status(400).json({ message: "Server is down" });
    }
  });

module.exports = router;