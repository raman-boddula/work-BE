const express = require("express");
// const { sendMail } = require("../mail");

const router = express.Router();

const Admin = require("../models/admin.model");

const sendMail = require("../sendmail");


router.post("/", async (req, res) => {
    try {
        const admin = await Admin.create(req.body);
        res.status(201).json({ admin });
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
        const admin = await Admin.find().skip(offset).limit(size).lean().exec();
        const total_pages = Math.ceil(await (Admin.find().countDocuments()) / size);
        res.json({admin,total_pages})
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
        
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await Admin.findByIdAndDelete(req.params.id).lean().exec();
        res.status(201).json({ user });
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});

sendAdmin = async (f, l) => {
    const admin_mails = await Admin.find({}, { "email": 1, "_id": 0 }).lean().exec();
    const mails = [];
    admin_mails.forEach((el) => {
        mails.push(el.email);
    })
    sendMail("mainADmin@gmail.com",mails,`${f} ${l} has registered with us`,`please welcome ${f} ${l} to our ABS Systems`,`<h1>please welcome to ABS System MR.${f} ${l}</h1>`)
}

module.exports = {router,sendAdmin};