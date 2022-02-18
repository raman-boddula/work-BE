//pagination and email assignment
const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

const sendMail = require("../sendmail");

const { sendAdmin } = require("../controllers/admin.controller");

router.post("/", async (req, res) => {
    try {
        const user = await User.create(req.body);
        
        sendMail(`a@a.com`,`${req.body.email}`,`Welcome to ABC System ${req.body.first_name} ${req.body.last_name}` ,`hi ${req.body.first_name}`,`Please confirm your email address`,"Please confirm your email address","<h1>Click here to confirm mail address</h1>")
        sendAdmin(req.body.first_name,req.body.last_name)
        res.status(201).json({ user });
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});

router.get("/", async (req, res) => {
    try {
        const page = +(req.query.Page) || 1;
        const size = +(req.query.size) || 2;
        const offset = (page - 1) * size;
        const user = await User.find().skip(offset).limit(size).lean().exec();
        const total_pages = Math.ceil(await (User.find().countDocuments()) / size);
        res.json({user,total_pages})
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
        
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();
        res.status(201).json({ user });
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});



module.exports = router;
