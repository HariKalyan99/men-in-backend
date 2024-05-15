const http = require("http");
const port1 = 8081;
const currencyInfo = require("./currencies.json");
const usersInfo = require("./users.json");
require("dotenv").config(); //this is helpful for normalizing the env variables and access it accross any cross-platforms

const serverInfo = {
  serverName: "Crio Server",
  version: "1.0.0",
  currentDate: new Date().toDateString(),
  currentTime: new Date().toTimeString(),
};
const mongoose = require("mongoose"); //this is a object modelling library, which has a relational b/w databases, builds a schema validation for data types in the application layer and converts bson to json.
const DB_URI = "mongodb://localhost:27017";

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

const port2 = 8082;
const express = require("express");

const currencyRouter = require("./ROUTES/currencies.routes");
const usersRouter = require("./routes/users.routes");
const verifyAuth = require("./middlewares/verifyAuth");
const blogsRouter = require("./routes/blogs.routes");

const expressCurrency = express();

expressCurrency.use(verifyAuth);
expressCurrency.use("/", currencyRouter);

const port3 = 8083;

const expressUsers = express();

expressUsers.use("/", usersRouter);

const port4 = 8084;
const expressBlogs = express();

// expressBlogs.use(verifyAuth);
expressBlogs.use(express.json());
expressBlogs.use("/blogs", blogsRouter);

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("db connection is suucessfull");

    server.listen(port1, () => {
      console.log(`listening on port: ${port1}`);
    });

    expressCurrency.listen(port2, () => {
      console.log(`listening on port: ${port2}`);
    });

    expressUsers.listen(port3, () => {
      console.log(`Listening on port: ${port3}`);
    });

    expressBlogs.listen(port4, () => {
      console.log(`Listening the mongodb server on port ${port4}`);
    });
  })
  .catch(() => {
    console.log("connection failed to connect to mongoDb");
  });
