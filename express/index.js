const express = require("express");
const users = require("./MOCK_DATA.json");

const app = express();

app.use(express.json());

app.get("/", (req, res) =>
{
    res.send("Hello World");
});
app.get("/users", (req, res) =>
{
    res.send(users);
});
app.get("/:email", (req, res) => {
    const newData = users.filter((user) => user.email == req.params.email);
res.send(newData);
});
app.post("/", (req, res) =>
{
    const newUser =[...users,req.body];
    res.send(newUser);
});
app.patch("/:email",(req,res)=>{
    const newData = users.map((user)=>{
        if (req.params.email === user.email) {
            return req.body;
            if(req?.body?.id) user.id = req.body.id;
            if(req?.body?.first_name) user.first_name = req.body.first_name;
            if(req?.body?.last_name) user.last_name = req.body.last_name;
            if(req?.body?.email) user.email = req.body.email;
            if(req?.body?.gender) user.gender = req.body.gender;
        }
        return user;
    })
    res.send(newData);
});
app.delete("/:email", (req, res) => {
    const newData = users.filter((user) => user.email !== req.params.email);
res.send(newData);
});
app.listen(7000, function () {
    console.log("running on port 7000")
});
