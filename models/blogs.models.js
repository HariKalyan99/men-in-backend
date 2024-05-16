const mongoose = require("mongoose");
const validator = require("validator");

const authorSchema = new mongoose.Schema(
  {
    fullName: { type: String, maxlength: 25 },
    twitterHandle: { type: String },
    email: {
      type: String,
      required: true,
      maxlength: 50,
      validate: (value) => validator.isEmail(value),
    },
    image: {
      type: String,
      validate: (value) =>
        validator.isURL(value, {
          require_host: true,
          require_protocol: true,
        }),
    },
  },
  {
    _id: false,
  }
);

// nested schema

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    authors: { type: [authorSchema] },
    publishedAt: { type: Date, default: null },
    content: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const blogsModel = mongoose.model("Blogs", blogSchema); //interface which combines with the collections and schema is called model interface

module.exports = blogsModel;
