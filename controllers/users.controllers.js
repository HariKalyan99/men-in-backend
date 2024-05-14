const usersInfo = require("../users.json");

// const Joi = require("joi");

// //method chaining
// const schema = Joi.object()
//   .keys({
//     gender: Joi.string().valid("male", "female"),
//     age: Joi.number().integer().min(0).max(100),
//   })
//   .or("gender", "age");
// //we can give a validation b/w gender or age by using .or function or perhaps we can call required function for the specific keys

const getUserDashboard = (request, response) => {
  response.send("<h1>Users Dashboard</h1>");
};
const getUsers = (request, response) => {
  return response.status(200).json(usersInfo);
};

const getUsersByGenderAndAge = (request, response) => {
  const { gender, age } = request.query;

  // const error = getQueryErrors({ gender, age });

  // if (error) {
  //   return response.status(422).json(error);
  // }
  if (gender && age) {
    const getUserGenderAndAge = usersInfo.data.filter(
      (x) => x.gender === gender && x.dob.age === Number(age)
    );
    return response.status(200).json(getUserGenderAndAge);
  }

  if (!gender && !age) {
    return response.status(422).json({
      message: "Missing Search Parameters, search using age and/or gender",
    });
  }

  if (gender) {
    const getUsersGender = usersInfo.data.filter(
      (x) => x.gender === gender.toLowerCase()
    );
    return response.status(200).json(getUsersGender);
  }
  if (age) {
    const getUsersAge = usersInfo.data.filter((x) => x.dob.age === Number(age));
    return response.status(200).json(getUsersAge);
  }
};

const getUsersByUuid = (request, response) => {
  const queryParams = request.params;
  const { uuid } = queryParams;
  if (uuid) {
    const findUuid = usersInfo.data.find((x) => x.login.uuid === uuid);
    if (findUuid) {
      response.json(findUuid);
    } else {
      response.status(401).json({ message: "Invalid uuid" });
    }
  }
};

module.exports = {
  getUserDashboard,
  getUsers,
  getUsersByUuid,
  getUsersByGenderAndAge,
};
