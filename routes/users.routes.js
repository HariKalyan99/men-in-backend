const {
  getUserDashboard,
  getUsers,
  getUsersByGenderAndAge,
  getUsersByUuid,
} = require("../controllers/users.controllers");
const validateSearchQuery = require("../middlewares/validators");

const usersRouter = require("express").Router();

usersRouter.get("/", getUserDashboard); //static routes

usersRouter.get("/users", getUsers); //static routes

usersRouter.get("/users/search", validateSearchQuery, getUsersByGenderAndAge); //static routes

usersRouter.get("/users/:uuid", getUsersByUuid); //dynamic routes

module.exports = usersRouter;
