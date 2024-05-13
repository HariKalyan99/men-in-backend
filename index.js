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
