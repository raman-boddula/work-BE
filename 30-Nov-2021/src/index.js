const express = require("express");
const app = express();

app.use(express.json())
const UserController = require("./controllers/user.controller");
const {router} = require("./controllers/admin.controller");
// const { Router } = require("express");

app.use("/users", UserController);

app.use("/admins", router);

module.exports = app;