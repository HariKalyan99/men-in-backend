const Blogs = require("../models/blogs.models");

// const findAllBlogs = async () => {
//   const blogs = await Blogs.find({});
//   return blogs;
// };

// const postBlogs = async (body) => {
//   const newBlog = new Blogs({ ...body });
//   const result = await newBlog.save();
//   return result;
// };

// const deleteBlogs = async (id) => {
//   const result = await Blogs.findOneAndDelete({ _id: id });
//   return result;
// };

// const updateBlogs = async (id, body) => {
//   console.log(id, body);
//   const result = await Blogs.findOneAndUpdate(
//     { _id: id },
//     { ...body },
//     { new: true }
//   );
//   return result;
// };

class BlogOperations {
  allBlogs = async () => {
    const blogs = await Blogs.find({});
    return blogs;
  };

  post = async (body) => {
    const newBlog = new Blogs({ ...body });
    const result = await newBlog.save();
    return result;
  };

  delete = async (id) => {
    const result = await Blogs.findOneAndDelete({ _id: id });
    return result;
  };

  update = async (id, body) => {
    const result = await Blogs.findOneAndUpdate(
      { _id: id },
      { ...body },
      { new: true }
    );
    return result;
  };
}

module.exports = BlogOperations;
