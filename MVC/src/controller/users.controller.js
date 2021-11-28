const express = require("express");

// const mongoose = require("mongoose");

const User = require("../models/user.models");
const router = require("./students.controller");

const router = express.Router();

router.post("", async (req, res) => {
    try {
        const user = await User.create(req.body);
        return res.status(201).send(user );
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

router.get("", async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        return res.send({ user });
    }
    catch (e) {
        return res.status(500).json({ "status": e.message });
    }
})

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        return res.send({ user });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})
router.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id ,req.body, { new: true }).lean().exec();
        return res.send({ user });
    }
    catch {
        return res.status(500).json({"status":e.message});
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.send({user})
    }
    catch (e) {
        return res.status(500).json({"status":e.message});
    }
})

module.exports = router;