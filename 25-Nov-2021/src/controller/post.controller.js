// const mongoose = require("mongoose")

const express = require("express")

const Post = require("../controller/post.control.js");
// const Tag = require("../models/tags.model")

const app = express.Router();



app.post("", async (req, res) => {
    try {
        const data = await Post.create(req.body);
        return res.status(201).send(data);
    }
    catch(e) {
        return res.status(500).json({"status":e.message});
    }
})
app.get("", async (req, res) => {
    try {
        const data = await Post.find().populate({path:"user_id" ,select:"first_name"}).populate("tag_id").lean().exec();
        return res.send({ data });
    }
    catch (e) {
        return res.status(500).send({"error":e});
    }
})

app.get("/:id", async (req, res) => {
    try {
        const data = await Post.findById(req.params.id).lean().exec();
        return res.json(data);
    } catch (e) {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/:id", async(req, res) => {
    try {
        const data = await Post.findByIdAndUpdate(req.params.id, req.body,{ new: true,}).lean().exec();
        return res.status(201).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
});

app.delete("/:id", async (req, res) => {
    try {
        const data = await Post.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
})

module.exports = app;

