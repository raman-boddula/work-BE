const express = require("express");

const router = express.Router();

const Product = require("../models/product.model");

const sendMail = require("../sendmail");

router.post("/", async (req, res) => {
    try {
        const product = await Product.create(req.body);
        sendMail(`a@a.com`, "b@b.com", `Welcome to ABC System `, `Please confirm your email address`, "<h1>Click here to confirm mail address</h1>", [{
            filename: "resume.pdf",
            path:"/home/myubuntu/Documents/GitHub/work-BE/Pagination/src/fw12_208_raman_boddula.pdf"
        }])
        res.status(201).json({ product });
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
        const product = await Product.find().skip(offset).limit(size).lean().exec();
        const total_pages = Math.ceil(await (Product.find().countDocuments()) / size);
        res.json({product,total_pages})
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
        
    }
})

module.exports = router;