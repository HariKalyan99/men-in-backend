const getPosts = require("../controllers/posts.controller");

const postsRouter = require("express").Router();

postsRouter.get("/posts", getPosts);

module.exports = postsRouter;
