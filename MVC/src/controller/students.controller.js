const express = require("express");

// const mongoose = require("mongoose");

const Student = require("../models/students.models");

const router = express.Router();

router.post("", async (req, res) => {
    try {
        const student = await Student.create(req.body);
        return res.status(201).send(student );
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

router.get("", async (req, res) => {
    try {
        const student = await Student.find().lean().exec();
        return res.send({ student });
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).lean().exec();
        return res.send({ student });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})
router.patch("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id ,req.body, { new: true }).lean().exec();
        return res.send({ student });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id).lean().exec();
        return res.send({student})
    }
    catch (e) {
        return res.status(500).json({"status":e.message});
    }
})


module.exports = router;