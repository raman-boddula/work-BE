const express = require("express");

const Product = require("../models/user.model");

const upload =require("../middleware/upload")

const router = express.Router();

router.post("/", upload.single("profile_url"), async (req, res) => {
    try {
        const product = await Product.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_url: req.file.path,
        });
        return res.status(201).json({ product })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});

module.exports = router;