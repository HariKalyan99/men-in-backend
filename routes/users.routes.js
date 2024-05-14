const {
  getUserDashboard,
  getUsers,
  getUsersByGenderAndAge,
  getUsersByUuid,
} = require("../controllers/users.controllers");

const usersRouter = require("express").Router();

usersRouter.get("/", getUserDashboard); //static routes

usersRouter.get("/users", getUsers); //static routes

usersRouter.get("/users/search", getUsersByGenderAndAge); //static routes

usersRouter.get("/users/:uuid", getUsersByUuid); //dynamic routes

module.exports = usersRouter;
