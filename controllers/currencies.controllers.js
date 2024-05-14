const currencyInfo = require("../currencies.json");
const serverInfo = {
  serverName: "Crio Server",
  version: "1.0.0",
  currentDate: new Date().toDateString(),
  currentTime: new Date().toTimeString(),
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

module.exports = getCurrencies;
