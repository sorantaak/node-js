import express from "express";
import routes from "./routes.js";
import bodyParser from "body-parser";

const app = express();

app.disable("etag");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(loggerMidleware);
app.use("/contacts", routes);

function loggerMidleware(req, res, next) {
  console.log("Request: ", req.method, req.url);
  next();
}
app.listen(3000, () => {
  console.log("express server is listening on the port 3000");
});
