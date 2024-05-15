const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  authors: { type: [String] },
  publishedAt: { type: Date, default: null },
  content: { type: String, default: "" },
});

const blogsModel = mongoose.model("Blogs", blogSchema); //interface which combines with the collections and schema is called model interface

module.exports = blogsModel;
