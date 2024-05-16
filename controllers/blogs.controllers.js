const Blogs = require("../models/blogs.models");
const Operations = require("../services/blogs.service");
const BlogOperations = new Operations();

const getBlogs = async (request, response) => {
  try {
    const newBlog = await BlogOperations.allBlogs();

    response.status(200).json(newBlog);
  } catch (error) {
    response
      .status(404)
      .json({ message: "Could not fetch blogs from db", error });
  }
};

const postNewBlogs = async (request, response) => {
  try {
    const result = await BlogOperations.post({ ...request.body });
    response.status(201).json(result);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

const deleteBlog = async (request, response) => {
  try {
    const { id } = request.params;
    // findoneanddelete or findoenandremove methods can be used

    const result = await BlogOperations.delete(id);

    response.json(result);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Could not delete the blogs, please try again" });
  }
};

const updateBlog = async (request, response) => {
  try {
    const { id } = request.params;
    const result = await BlogOperations.update(id, { ...request.body });
    response.json(result);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Could not update the blogs, please try again" });
  }
};

const searchBlog = async (request, response) => {
  try {
    const { title, authors } = request.query;
    const result = await Blogs.find({
      $or: [
        { title: { $regex: new RegExp(title) } },
        { authors: { $elemMatch: { email: authors } } },
      ],
    });
    return response.status(200).json(result);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

module.exports = { getBlogs, postNewBlogs, deleteBlog, updateBlog, searchBlog };
