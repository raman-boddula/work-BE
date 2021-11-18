const { application } = require("express");

const express = require("express");

const data = require("./MOCK_DATA.json")

const app = express();

app.get("/", (req, res) => {
     res.send("Welcome to homepagage")
})

app.get("/users", (req, res) => {
    res.send(data)
})
app.listen(2345, () => {
    console.log('listening on port 2345');
});