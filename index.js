const http = require("http");
const port1 = 8081;
const currencyInfo = require("./currencies.json");

const serverInfo = {
  serverName: "Crio Server",
  version: "1.0.0",
  currentDate: new Date().toDateString(),
  currentTime: new Date().toTimeString(),
};

const server = http.createServer((request, response) => {
  if (request.method === "GET") {
    const matchId = request.url.split("/")[1];
    const id = request.url.split("/")[2];
    if (matchId === "hello") {
      response.writeHead(200, { "Content-Type": "application.json" });
      response.write(JSON.stringify("hello from server"));
      response.end();
    } else if (request.url === "/server") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(serverInfo));
      response.end();
    } else if (request.url === "/currencies") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(currencyInfo));
      response.end();
    } else if (id) {
      let findId = currencyInfo.data.find(
        (x) => x.id?.toLowerCase() === id.toLowerCase()
      );
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(findId));
      response.end();
    } else {
      response.write("<h1>page not found</h1>");
      response.end();
    }
  } else if (request.method === "POST") {
    console.log("post request");
    if (request.url === "/currency") {
      let body = "";
      request
        .on("error", (err) => {
          console.log(err);
        })
        .on("data", (chunk) => {
          body += chunk;
        })
        .on("end", () => {
          body = JSON.parse(body);
          currencyInfo.data = [...currencyInfo.data, body];
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify(currencyInfo.data));
          response.end();
        });
    }
  }
});

server.listen(port1, () => {
  console.log(`listening on port: ${port1}`);
});

const port2 = 8082;

const express = require("express");
const getCurrencies = require("./controllers/currencies.controllers");

const expressCurrency = express();

expressCurrency.get("/", (request, response) => {
  response.write("<h1>Currency Dashboard</h1>");
});

expressCurrency.get("/server", (request, response) => {
  response.json(serverInfo);
});

expressCurrency.get("/currencies", getCurrencies);

expressCurrency.get("/currencies/:symbol", (request, response) => {
  const { symbol } = request.params;
  const findCurrency = currencyInfo.data.find(
    (x) => x.id?.toLowerCase() === symbol.toLowerCase()
  );
  if (findCurrency) {
    response.status(200).json(findCurrency);
  } else {
    response.status(404).json({ message: "Currency not found" });
  }
});

// expressCurrency.post("/currency", (request, response) => {
//   console.log(request.url, request.body);
// });

expressCurrency.listen(port2, () => {
  console.log(`listening on port: ${port2}`);
});
