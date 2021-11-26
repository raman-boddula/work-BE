const express = require("express");

const mongoose = require("mongoose");


const connect = () => {
    return mongoose.connect("mongodb+srv://raman_boddula:ramanboddula@cluster0.pxmsk.mongodb.net/test");
};


const app = express();

app.use(express.json());


// const postController = require("./controller/comment.controller.js");
const tagController = require("./controller/tags.controller.js");
const commentController = require("./controller/comment.controller.js");
const userController = require("./controller/user.controller.js")
// app.use("/posts", postController);
app.use("/tags", tagController)
app.use("/users", userController)
app.use("/comments",commentController)

const Post = require("./models/post.model");
// const Tag = require("../models/tags.model")

// const app = express.Router();



app.post("/posts", async (req, res) => {
    try {
        const data = await Post.create(req.body);
        return res.status(201).send(data);
    }
    catch(e) {
        return res.status(500).json({"status":e.message});
    }
})
app.get("/posts", async (req, res) => {
    try {
        const data = await Post.find().populate({path:"user_id" ,select :"first_name"}).populate("tag_ids").lean().exec();
        return res.send({ data });
    }
    catch (e) {
        return res.status(500).send({"error":e});
    }
})

app.get("/posts/:id", async (req, res) => {
    try {
        const data = await Post.findById(req.params.id).lean().exec();
        return res.json(data);
    } catch (e) {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/posts/:id", async(req, res) => {
    try {
        const data = await Post.findByIdAndUpdate(req.params.id, req.body,{ new: true,}).lean().exec();
        return res.status(201).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
});

app.delete("/posts/:id", async (req, res) => {
    try {
        const data = await Post.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
})



app.listen(2679, async function () {
    await connect();
    console.log("listening on port 2678")
});