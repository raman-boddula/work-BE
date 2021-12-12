const express = require("express");

const weatherController = require("./controller/weather.controller");

const app = express();

app.use(express.json());

app.use("/weather", weatherController);

module.exports = app;