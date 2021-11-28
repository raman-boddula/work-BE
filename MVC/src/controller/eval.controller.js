const express = require("express");


const Eval = require("../models/eval.models");

const app = express.Router();

app.post("", async (req, res) => {
    try {
        const eval = await Eval.create(req.body);
        return res.status(201).send(eval );
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

app.get("", async (req, res) => {
    try {
        const eval = await Eval.find().lean().exec();
        return res.send({ eval });
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

app.get("/:id", async (req, res) => {
    try {
        const eval = await Eval.findById(req.params.id).lean().exec();
        return res.send({ eval });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/:id", async (req, res) => {
    try {
        const eval = await Eval.findByIdAndUpdate(req.params.id ,req.body, { new: true }).lean().exec();
        return res.send({ eval });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})

app.delete("/:id", async (req, res) => {
    try {
        const eval = await Eval.findByIdAndDelete(req.params.id).lean().exec();
        return res.send({eval})
    }
    catch (e) {
        return res.status(500).json({"status":e.message});
    }
})

module.exports = app;