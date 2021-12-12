const express = require("express");

const productController = require("./controller/product.controller");

const app = express();

app.use(express.json());

app.set("view engine", "ejs");

app.use("/products", productController);

module.exports = app;