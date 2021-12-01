const express = require("express");

const app = express();

app.use(express.json());

const userController = require("./controller/user.controller");

const galleryController = require("./controller/galler.controller")

app.use("/users",userController);

app.use("/gallery",galleryController)
module.exports = app;