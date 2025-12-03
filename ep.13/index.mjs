import http from "http";

const server = http.createServer((req, res) => {
  res.write("Hello form NodeJs HTTP server!");
  res.end();
});

server.listen(3000, () => {
  console.log("HTTP server is listening on the port 3000");
});
