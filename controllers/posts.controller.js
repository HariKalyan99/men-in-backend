const Posts = require("../models/posts.model");

const getPosts = async (request, response) => {
  try {
    const posts = await Posts.find({});
    console.log(posts);
    response.json(posts);
  } catch (error) {
    response.status(404).json({ message: "not found" });
  }
};

module.exports = getPosts;
