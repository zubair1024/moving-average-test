const PORT = 3000;

const express = require("express");
const compression = require("compression");
const cors = require("cors");
const app = express();
const dataset = require("./dataset");
const movingAverages = require("moving-averages");

app.use(compression());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).send({ data: "It is working" });
});
app.get("/data", (req, res) => {
  const items = dataset.map((item) => item.tankLevel);
  res.status(200).send({ data: items });
});
app.get("/data/:type", (req, res) => {
  const type = req?.params?.type;
  const items = dataset.map((item) => item.tankLevel);
  const transform = movingAverages?.[type](items, 10);
  res.status(200).send({ data: transform });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
