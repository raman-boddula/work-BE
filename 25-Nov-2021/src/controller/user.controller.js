
const express = require("express")

const User = require("../models/user.model")

const app = express.Router();


app.post("", async (req, res) => {
    try {
        const data = await User.create(req.body);
        return res.status(201).send(data);
    }
    catch(e) {
        return res.status(500).json({"status":e.message});
    }
})
app.get("", async (req, res) => {
    try {
        const data = await User.find().lean().exec();
        return res.send({ data });
    }
    catch (e) {
        return res.status(500).send({"error":e});
    }
})

app.get("/:id", async (req, res) => {
    try {
        const data = await User.findById(req.params.id).lean().exec();
        return res.json(data);
    } catch (e) {
        return res.status(500).json({"status":e.message});
    }
})
app.patch("/:id", async(req, res) => {
    try {
        const data = await User.findByIdAndUpdate(req.params.id, req.body,{ new: true,}).lean().exec();
        return res.status(201).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
});

app.delete("/:id", async (req, res) => {
    try {
        const data = await User.findByIdAndDelete(req.params.id).lean().exec();
        return res.status(200).send(data);
    } catch (e) {
        return res.status(500).json({ message: e.message,status:"Failed"});
    }
})

module.exports = app;