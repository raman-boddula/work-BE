const express = require("express");

const multer = require("multer");

const upload = require("../middlewares/file-upload");

const router = express.Router();

const Product = require("../models/product.model");

router.get("/", async(req, res) => {
    const product = await Product.find().lean().exec();
    return res.render("products/all",{product});
})

router.post("/single", upload.single("image_url"), async (req, res) => {
    try {
        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image_url: req.file.path,
        });
        return res.status(201).send(product);
    }
    catch (e){
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
})
router.post("/multiple", upload.any("image_url"), async (req, res) => {
    const filePaths = req.files.map((file) => file.path);
    try {
        const products = await Product.create({
            name: req.body.name,
            price: req.body.price,
            image_url:filePaths,
        })
        return res.status(201).json({ products })
    }
    catch (e) {
        res.status(500).json({ "message": e.message, "status": "Failed" });
    }
})


module.exports = router;