const express = require("express");


const Product = require("../models/product.model");

const upload =require("../middleware/upload")

const router = express.Router();

router.post("/", upload.single("image_urls"), async (req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image_urls: req.file.path,
        });
        return res.status(201).json({ product })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
});

router.post("/multiple", upload.any("image_urls"), async (req, res) => {
    const filePaths = req.files.map((file) => file.path);
    try {
        const products = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image_urls:filePaths,
        })
        // console.log(products)
        return res.status(201).json({ products })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
})


module.exports = router;