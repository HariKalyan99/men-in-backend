let PASSWORD = process.env.ROUTE_PASSWORD;

const verifyAuth = (request, response, next) => {
  const authorization = request.headers["authorization"];

  if (!authorization || authorization !== PASSWORD) {
    return response.status(403).json({ message: "Unauthorization request" });
  }

  next();
};

module.exports = verifyAuth;
