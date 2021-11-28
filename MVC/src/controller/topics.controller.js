const express = require("express");

// const mongoose = require("mongoose");

const Topic = require("../models/topics.models");

const app = express.Router();

app.post("", async (req, res) => {
    try {
        const topicsList = await Topic.create(req.body);
        return res.status(201).send(topicsList );
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

app.get("", async (req, res) => {
    try {
        const topisList = await Topic.find().lean().exec();
        return res.send({ topisList });
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

app.get("/:id", async (req, res) => {
    try {
        const topicList = await Topic.findById(req.params.id).lean().exec();
        return res.send({ topicList });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/:id", async (req, res) => {
    try {
        const topicList = await Topic.findByIdAndUpdate(req.params.id ,req.body, { new: true }).lean().exec();
        return res.send({ topicList });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})

app.delete("/:id", async (req, res) => {
    try {
        const topicList = await Topic.findByIdAndDelete(req.params.id).lean().exec();
        return res.send({topicList})
    }
    catch (e) {
        return res.status(500).json({"status":e.message});
    }
})

module.exports = app;