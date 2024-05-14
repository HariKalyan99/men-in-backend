const currencyRouter = require("express").Router();
const {
  getDashBoard,
  getServer,
  getCurrencies,
  getCurrencyBySymbol,
} = require("../controllers/currencies.controllers");

currencyRouter.get("/", getDashBoard);

currencyRouter.get("/server", getServer);

currencyRouter.get("/currencies", getCurrencies);

currencyRouter.get("/currencies/:symbol", getCurrencyBySymbol);

module.exports = currencyRouter;
