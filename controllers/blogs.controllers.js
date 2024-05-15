const Blogs = require("../models/blogs.models");

const getBlogs = async (request, response) => {
  try {
    const newBlog = await Blogs.find({});
    response.status(200).json(newBlog);
  } catch (error) {
    response
      .status(404)
      .json({ message: "Could not fetch blogs from db", error });
  }
};

const postNewBlogs = async (request, response) => {
  const newBlog = new Blogs({ ...request.body });
  const result = await newBlog.save();
  response.status(201).json(result);
};

const deleteBlog = async (request, response) => {
  try {
    const { id } = request.params;
    // findoneanddelete or findoenandremove methods can be used

    const result = await Blogs.findOneAndDelete({ _id: id });

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
    console.log(id, { ...request.body });
    const result = await Blogs.findOneAndUpdate(
      { _id: id },
      { ...request.body },
      { new: true }
    );
    response.json(result);
  } catch (error) {
    response
      .status(500)
      .json({ message: "Could not update the blogs, please try again" });
  }
};

module.exports = { getBlogs, postNewBlogs, deleteBlog, updateBlog };
