const {
  getBlogs,
  postNewBlogs,
  deleteBlog,
  updateBlog,
} = require("../controllers/blogs.controllers");

const blogsRouter = require("express").Router();

blogsRouter.get("/new", getBlogs);
blogsRouter.post("/new", postNewBlogs);
blogsRouter.delete("/:id", deleteBlog);
blogsRouter.put("/:id", updateBlog);

module.exports = blogsRouter;
