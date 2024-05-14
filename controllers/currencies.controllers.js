const currencyInfo = require("../currencies.json");
// let PASSWORD = process.env.ROUTE_PASSWORD;

const serverInfo = {
  serverName: "Crio Server",
  version: "1.0.0",
  currentDate: new Date().toDateString(),
  currentTime: new Date().toTimeString(),
};

const getServer = (request, response) => {
  response.json(serverInfo);
};

const getDashBoard = (request, response) => {
  response.write("<h1>Currency Dashboard</h1>");
};

const getCurrencies = (request, response) => {
  // response.send("<h1>Currency Info</h1>");
  // response.json(currencyInfo);
  // response.sendStatus(200);

  let queryParams = request.query;
  const { minSize } = queryParams;
  if (minSize) {
    const filteredResult = currencyInfo.data.filter(
      (x) => Number(x["min_size"]) >= Number(minSize)
    );
    if (filteredResult.length > 0) {
      return response.status(200).json(filteredResult);
    } else {
      return response
        .status(404)
        .json({ message: `No values are greated than ${minSize}` });
    }
  } else {
    return response.status(200).json(currencyInfo);
  }
};

const getCurrencyBySymbol = (request, response) => {
  const { symbol } = request.params;
  const findCurrency = currencyInfo.data.find(
    (x) => x.id?.toLowerCase() === symbol.toLowerCase()
  );
  if (findCurrency) {
    response.status(200).json(findCurrency);
  } else {
    response.status(404).json({ message: "Currency not found" });
  }
};

module.exports = {
  getCurrencies,
  getDashBoard,
  getCurrencyBySymbol,
  getServer,
};
