const express = require("express");

const { register, login } = require("./controller/author.controller");
const productController = require("./controller/product.controller");

const app = express();

app.use(express.json());

// app.use("/users", userController) /register /login
app.post("/register", register);
app.post("/login", login);

app.use("/products", productController);

module.exports = app;