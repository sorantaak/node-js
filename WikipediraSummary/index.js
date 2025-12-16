import express from "express";
import { load } from "cheerio";

const app = express();

app.get("/topic/:topic", async (req, res) => {
  const response = await fetch(
    `https://en.wikipedia.org/wiki/${req.params.topic}`
  );
  const data = await response.text();
  const $ = load(data);
  const summary = $(
    "#mw-content-text > div.mw-parser-output > table + p"
  ).text();
  if (summary.length < 1) {
    res.status(404).send(`Topic"${req.params.topic}" not found`);
    res.send(res.status());
    return;
  }
  res.send(summary);
});

// console.log("Wikipedia page summary:", summary);

app.listen(3000, () => {
  console.log("WikipediaSummray is running on port 3000");
});
