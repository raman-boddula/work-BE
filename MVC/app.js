const express = require("express");

const mongoose = require("mongoose");

const connect =  require("./src/configs/db")

const app = express();

app.use(express.json());

const TopicController = require("./src/models/topics.models.js")

const EvalController = require("./src/models/eval.models.js")

const UserController = require("./src/models/user.models.js")

const StudentController = require("./src/models/students.models.js")

const LeaderController = require("./src/controller/leader.controller");

const resultsController = require("./src/controller/results.controller")


app.use("/topics", TopicController);

app.use("/evals", EvalController);

app.use("/users", UserController);

app.use("/students", StudentController);

app.use("/leaderboard",LeaderController)

app.use("/results", resultsController);

app.listen(7000, async () => {
    await connect();
    console.log("listening on 7000 port")
})