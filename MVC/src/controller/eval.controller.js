const express = require("express");

// const mongoose = require("mongoose");

const Eval = require("../models/eval.models");

const router = express.Router();

router.post("", async (req, res) => {
    try {
        const eval = await Eval.create(req.body);
        return res.status(201).send(eval );
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

router.get("", async (req, res) => {
    try {
        const eval = await Eval.find().lean().exec();
        return res.send({ eval });
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const eval = await Eval.findById(req.params.id).lean().exec();
        return res.send({ eval });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})
router.patch("/:id", async (req, res) => {
    try {
        const eval = await Eval.findByIdAndUpdate(req.params.id ,req.body, { new: true }).lean().exec();
        return res.send({ eval });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const eval = await Eval.findByIdAndDelete(req.params.id).lean().exec();
        return res.send({eval})
    }
    catch (e) {
        return res.status(500).json({"status":e.message});
    }
})

module.exports = router;